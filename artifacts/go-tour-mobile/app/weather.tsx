import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const LOCATIONS = [
  { id: "1", name: "Maputo", temp: 28, feels: 31, humidity: 75, wind: 18, condition: "Ensolarado", icon: "sun" },
  { id: "2", name: "Beira", temp: 30, feels: 33, humidity: 82, wind: 22, condition: "Parcialmente nublado", icon: "cloud" },
  { id: "3", name: "Nampula", temp: 32, feels: 35, humidity: 60, wind: 15, condition: "Ensolarado", icon: "sun" },
  { id: "4", name: "Pemba", temp: 29, feels: 32, humidity: 78, wind: 20, condition: "Chuva leve", icon: "cloud-rain" },
  { id: "5", name: "Vilankulo", temp: 27, feels: 29, humidity: 70, wind: 25, condition: "Ventoso", icon: "wind" },
  { id: "6", name: "Inhambane", temp: 26, feels: 28, humidity: 72, wind: 16, condition: "Nublado", icon: "cloud" },
];

const FORECAST = [
  { day: "Seg", icon: "sun", high: 30, low: 22 },
  { day: "Ter", icon: "cloud", high: 27, low: 21 },
  { day: "Qua", icon: "cloud-rain", high: 24, low: 19 },
  { day: "Qui", icon: "sun", high: 29, low: 20 },
  { day: "Sex", icon: "sun", high: 31, low: 23 },
  { day: "Sáb", icon: "cloud", high: 28, low: 21 },
  { day: "Dom", icon: "sun", high: 30, low: 22 },
];

export default function WeatherScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const [selected, setSelected] = useState(LOCATIONS[0]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Radar Meteorológico</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPadding + 40 }}>
        {/* Hero weather card */}
        <View style={[styles.heroCard, { backgroundColor: colors.primary }]}>
          <Text style={styles.heroCity}>{selected.name}</Text>
          <Text style={styles.heroCountry}>Moçambique</Text>
          <Feather name={selected.icon as any} size={64} color="rgba(255,255,255,0.9)" style={styles.heroIcon} />
          <Text style={styles.heroTemp}>{selected.temp}°C</Text>
          <Text style={styles.heroCondition}>{selected.condition}</Text>
          <View style={styles.heroStats}>
            {[
              { icon: "droplets" as const, label: "Humidade", value: `${selected.humidity}%` },
              { icon: "wind" as const, label: "Vento", value: `${selected.wind} km/h` },
              { icon: "thermometer" as const, label: "Sensação", value: `${selected.feels}°C` },
            ].map((s) => (
              <View key={s.label} style={styles.heroStat}>
                <Feather name={s.icon} size={16} color="rgba(255,255,255,0.8)" />
                <Text style={styles.heroStatValue}>{s.value}</Text>
                <Text style={styles.heroStatLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Forecast */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Previsão 7 Dias</Text>
          <View style={[styles.forecastCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {FORECAST.map((f, i) => (
              <View key={f.day} style={[styles.forecastRow, { borderBottomColor: colors.border, borderBottomWidth: i < FORECAST.length - 1 ? 1 : 0 }]}>
                <Text style={[styles.forecastDay, { color: colors.mutedForeground }]}>{f.day}</Text>
                <Feather name={f.icon as any} size={20} color={colors.primary} />
                <View style={styles.forecastTemps}>
                  <Text style={[styles.forecastHigh, { color: colors.text }]}>{f.high}°</Text>
                  <Text style={[styles.forecastLow, { color: colors.mutedForeground }]}>{f.low}°</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Other locations */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Outras Cidades</Text>
          {LOCATIONS.map((loc) => (
            <Pressable
              key={loc.id}
              style={[styles.locRow, { backgroundColor: selected.id === loc.id ? colors.primarySoft : colors.card, borderColor: selected.id === loc.id ? colors.primaryLight : colors.border }]}
              onPress={() => setSelected(loc)}
            >
              <Feather name={loc.icon as any} size={20} color={selected.id === loc.id ? colors.primary : colors.mutedForeground} />
              <Text style={[styles.locName, { color: colors.text }]}>{loc.name}</Text>
              <Text style={[styles.locCondition, { color: colors.mutedForeground }]} numberOfLines={1}>{loc.condition}</Text>
              <Text style={[styles.locTemp, { color: selected.id === loc.id ? colors.primary : colors.text }]}>{loc.temp}°C</Text>
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
  heroCard: { margin: 16, borderRadius: 24, padding: 24, alignItems: "center" },
  heroCity: { color: "#fff", fontSize: 26, fontWeight: "800" },
  heroCountry: { color: "rgba(255,255,255,0.75)", fontSize: 14, marginBottom: 8 },
  heroIcon: { marginVertical: 8 },
  heroTemp: { color: "#fff", fontSize: 56, fontWeight: "800", lineHeight: 64 },
  heroCondition: { color: "rgba(255,255,255,0.85)", fontSize: 16, marginTop: 4 },
  heroStats: { flexDirection: "row", gap: 24, marginTop: 20 },
  heroStat: { alignItems: "center", gap: 4 },
  heroStatValue: { color: "#fff", fontSize: 15, fontWeight: "700" },
  heroStatLabel: { color: "rgba(255,255,255,0.7)", fontSize: 11 },
  section: { paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },
  forecastCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  forecastRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 12, gap: 16 },
  forecastDay: { width: 36, fontSize: 14, fontWeight: "600" },
  forecastTemps: { flex: 1, flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  forecastHigh: { fontSize: 15, fontWeight: "700" },
  forecastLow: { fontSize: 15 },
  locRow: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14, borderWidth: 1, gap: 10, marginBottom: 8 },
  locName: { fontSize: 15, fontWeight: "700", width: 80 },
  locCondition: { flex: 1, fontSize: 13 },
  locTemp: { fontSize: 16, fontWeight: "700" },
});
