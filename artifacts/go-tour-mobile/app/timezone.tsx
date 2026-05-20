import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const WORLD_CITIES = [
  { id: "1", name: "Nova Iorque", tz: "America/New_York", flag: "🇺🇸" },
  { id: "2", name: "Londres", tz: "Europe/London", flag: "🇬🇧" },
  { id: "3", name: "Tóquio", tz: "Asia/Tokyo", flag: "🇯🇵" },
  { id: "4", name: "Maputo", tz: "Africa/Maputo", flag: "🇲🇿" },
  { id: "5", name: "Lisboa", tz: "Europe/Lisbon", flag: "🇵🇹" },
  { id: "6", name: "Sydney", tz: "Australia/Sydney", flag: "🇦🇺" },
  { id: "7", name: "Dubai", tz: "Asia/Dubai", flag: "🇦🇪" },
  { id: "8", name: "São Paulo", tz: "America/Sao_Paulo", flag: "🇧🇷" },
];

export default function TimezoneScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const localTime = now.toLocaleTimeString("pt-MZ", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const localDate = now.toLocaleDateString("pt-MZ", { weekday: "long", day: "numeric", month: "long" });
  const localCityName = localTz.split("/").pop()?.replace(/_/g, " ") ?? "Local";

  const getWorldTime = (tz: string) => now.toLocaleTimeString("pt-MZ", { timeZone: tz, hour: "2-digit", minute: "2-digit" });
  const getWorldDate = (tz: string) => now.toLocaleDateString("pt-MZ", { timeZone: tz, day: "numeric", month: "short" });
  const getDiff = (tz: string) => {
    const target = new Date(now.toLocaleString("en-US", { timeZone: tz }));
    const local = new Date(now.toLocaleString("en-US", { timeZone: localTz }));
    const h = Math.round((target.getTime() - local.getTime()) / 3600000);
    if (h === 0) return { label: "Mesmo fuso", color: colors.mutedForeground };
    if (h > 0) return { label: `+${h}h`, color: colors.success };
    return { label: `${h}h`, color: "#ef4444" };
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Fuso Horário</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={WORLD_CITIES}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={[styles.localCard, { backgroundColor: colors.primary }]}>
            <Text style={styles.localLabel}>Hora Local · {localCityName}</Text>
            <Text style={styles.localTime}>{localTime}</Text>
            <Text style={styles.localDate}>{localDate}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const diff = getDiff(item.tz);
          return (
            <View style={[styles.cityRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Text style={styles.cityFlag}>{item.flag}</Text>
              <View style={styles.cityInfo}>
                <Text style={[styles.cityName, { color: colors.text }]}>{item.name}</Text>
                <Text style={[styles.cityDate, { color: colors.mutedForeground }]}>{getWorldDate(item.tz)}</Text>
              </View>
              <View style={styles.cityRight}>
                <Text style={[styles.cityTime, { color: colors.text }]}>{getWorldTime(item.tz)}</Text>
                <Text style={[styles.cityDiff, { color: diff.color }]}>{diff.label}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 40 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  list: { padding: 16 },
  localCard: { borderRadius: 20, padding: 24, marginBottom: 20, alignItems: "center" },
  localLabel: { color: "rgba(255,255,255,0.8)", fontSize: 13, marginBottom: 4 },
  localTime: { color: "#fff", fontSize: 52, fontWeight: "800", letterSpacing: -1 },
  localDate: { color: "rgba(255,255,255,0.85)", fontSize: 14, marginTop: 4, textTransform: "capitalize" },
  cityRow: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 16, borderWidth: 1, gap: 12 },
  cityFlag: { fontSize: 28 },
  cityInfo: { flex: 1, gap: 3 },
  cityName: { fontSize: 15, fontWeight: "700" },
  cityDate: { fontSize: 12 },
  cityRight: { alignItems: "flex-end", gap: 3 },
  cityTime: { fontSize: 18, fontWeight: "700" },
  cityDiff: { fontSize: 12, fontWeight: "600" },
});
