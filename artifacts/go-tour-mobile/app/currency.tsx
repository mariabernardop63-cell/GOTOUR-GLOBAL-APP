import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const CURRENCIES = [
  { code: "USD", name: "Dólar Americano", flag: "🇺🇸" },
  { code: "MZN", name: "Metical Moçambicano", flag: "🇲🇿" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "ZAR", name: "Rand Sul-Africano", flag: "🇿🇦" },
  { code: "GBP", name: "Libra Esterlina", flag: "🇬🇧" },
  { code: "BRL", name: "Real Brasileiro", flag: "🇧🇷" },
];

export default function CurrencyScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("MZN");
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchRate = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
      const data = await res.json();
      if (data?.rates?.[to]) {
        setRate(data.rates[to]);
        setLastUpdated(new Date().toLocaleTimeString("pt-MZ", { hour: "2-digit", minute: "2-digit" }));
      }
    } catch (e) {
      setRate(null);
    }
    setLoading(false);
  }, [from, to]);

  useEffect(() => { fetchRate(); }, [fetchRate]);

  const handleSwap = () => { setFrom(to); setTo(from); };

  const converted = rate && amount ? (parseFloat(amount) * rate).toFixed(2) : "—";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Monitor de Câmbio</Text>
          {lastUpdated ? <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>Actualizado: {lastUpdated}</Text> : null}
        </View>
        <Pressable
          style={[styles.iconBtn, { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }]}
          onPress={fetchRate}
        >
          <Feather name="refresh-cw" size={18} color={colors.primary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding + 40 }]} showsVerticalScrollIndicator={false}>
        {/* Converter card */}
        <View style={[styles.converterCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>Conversor de Moeda</Text>

          {/* Amount input */}
          <View style={[styles.amountBox, { backgroundColor: colors.background, borderColor: colors.border }]}>
            <Text style={[styles.amountLabel, { color: colors.mutedForeground }]}>Valor</Text>
            <TextInput
              style={[styles.amountInput, { color: colors.text }]}
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
              placeholder="0"
              placeholderTextColor={colors.mutedForeground}
            />
          </View>

          {/* Currency selectors */}
          <View style={styles.currencyRow}>
            <View style={[styles.currencyPicker, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={styles.flag}>{CURRENCIES.find((c) => c.code === from)?.flag}</Text>
              <View>
                <Text style={[styles.currencyCode, { color: colors.text }]}>{from}</Text>
                <Text style={[styles.currencyName, { color: colors.mutedForeground }]} numberOfLines={1}>{CURRENCIES.find((c) => c.code === from)?.name}</Text>
              </View>
            </View>

            <Pressable style={[styles.swapBtn, { backgroundColor: colors.primary }]} onPress={handleSwap}>
              <Feather name="arrow-right-circle" size={24} color="#fff" />
            </Pressable>

            <View style={[styles.currencyPicker, { backgroundColor: colors.background, borderColor: colors.border }]}>
              <Text style={styles.flag}>{CURRENCIES.find((c) => c.code === to)?.flag}</Text>
              <View>
                <Text style={[styles.currencyCode, { color: colors.text }]}>{to}</Text>
                <Text style={[styles.currencyName, { color: colors.mutedForeground }]} numberOfLines={1}>{CURRENCIES.find((c) => c.code === to)?.name}</Text>
              </View>
            </View>
          </View>

          {/* Result */}
          <View style={[styles.resultBox, { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }]}>
            {loading ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <Text style={[styles.resultAmount, { color: colors.text }]}>{amount || "0"} {from}</Text>
                <Text style={[styles.resultEquals, { color: colors.mutedForeground }]}>=</Text>
                <Text style={[styles.resultConverted, { color: colors.primary }]}>{converted} {to}</Text>
                {rate && <Text style={[styles.rateInfo, { color: colors.mutedForeground }]}>1 {from} = {rate.toFixed(4)} {to}</Text>}
              </>
            )}
          </View>
        </View>

        {/* Quick conversions */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Conversões Rápidas</Text>
        <View style={styles.quickGrid}>
          {[1, 5, 10, 50, 100, 500].map((val) => (
            <Pressable
              key={val}
              style={[styles.quickChip, { backgroundColor: colors.card, borderColor: colors.border }]}
              onPress={() => setAmount(String(val))}
            >
              <Text style={[styles.quickFrom, { color: colors.text }]}>{val} {from}</Text>
              <Text style={[styles.quickTo, { color: colors.primary }]}>{rate ? (val * rate).toFixed(0) : "—"} {to}</Text>
            </Pressable>
          ))}
        </View>

        {/* All rates */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Outras Moedas</Text>
        <View style={[styles.ratesCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {CURRENCIES.filter((c) => c.code !== from).map((cur, i, arr) => (
            <Pressable
              key={cur.code}
              style={[styles.rateRow, { borderBottomColor: colors.border, borderBottomWidth: i < arr.length - 1 ? 1 : 0 }]}
              onPress={() => setTo(cur.code)}
            >
              <Text style={styles.rateFlag}>{cur.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={[styles.rateCode, { color: colors.text }]}>{cur.code}</Text>
                <Text style={[styles.rateName, { color: colors.mutedForeground }]}>{cur.name}</Text>
              </View>
              <Text style={[styles.rateValue, { color: cur.code === to ? colors.primary : colors.text }]}>
                {rate ? (rate * (1)).toFixed(4) : "—"}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  headerSub: { fontSize: 12, marginTop: 2 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  scroll: { padding: 16 },
  converterCard: { borderRadius: 20, borderWidth: 1, padding: 20, marginBottom: 24, gap: 16 },
  cardTitle: { fontSize: 16, fontWeight: "700", marginBottom: 4 },
  amountBox: { borderRadius: 14, borderWidth: 1, padding: 14 },
  amountLabel: { fontSize: 12, marginBottom: 4 },
  amountInput: { fontSize: 28, fontWeight: "800" },
  currencyRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  currencyPicker: { flex: 1, flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderRadius: 14, borderWidth: 1 },
  flag: { fontSize: 24 },
  currencyCode: { fontSize: 16, fontWeight: "700" },
  currencyName: { fontSize: 11, maxWidth: 80 },
  swapBtn: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  resultBox: { borderRadius: 14, borderWidth: 1, padding: 16, alignItems: "center", gap: 4 },
  resultAmount: { fontSize: 16, fontWeight: "600" },
  resultEquals: { fontSize: 18 },
  resultConverted: { fontSize: 28, fontWeight: "800" },
  rateInfo: { fontSize: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12, marginTop: 4 },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 24 },
  quickChip: { width: "30%", padding: 12, borderRadius: 14, borderWidth: 1, alignItems: "center", gap: 4 },
  quickFrom: { fontSize: 13, fontWeight: "600" },
  quickTo: { fontSize: 14, fontWeight: "700" },
  ratesCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  rateRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
  rateFlag: { fontSize: 22 },
  rateCode: { fontSize: 15, fontWeight: "700" },
  rateName: { fontSize: 12 },
  rateValue: { fontSize: 15, fontWeight: "700" },
});
