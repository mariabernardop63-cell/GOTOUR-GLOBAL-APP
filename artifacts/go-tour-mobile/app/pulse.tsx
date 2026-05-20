import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
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

const CATEGORIES = ["Todos", "Eventos", "Restaurantes", "Arte & Cultura", "Música", "Desporto"];

const PULSE_ITEMS = [
  { id: "1", title: "Festival de Jazz de Maputo", category: "Música", location: "Praça da Independência, Maputo", date: "Sáb, 24 Maio", time: "18:00", trending: true, hot: 892 },
  { id: "2", title: "Mercado de Artesanato do Baixa", category: "Arte & Cultura", location: "Baixa, Maputo", date: "Todos os fins de semana", time: "08:00 – 18:00", trending: false, hot: 345 },
  { id: "3", title: "Torneio de Futebol de Praia", category: "Desporto", location: "Praia da Costa do Sol", date: "Dom, 25 Maio", time: "10:00", trending: true, hot: 621 },
  { id: "4", title: "Noite Gastronómica Moçambicana", category: "Restaurantes", location: "Polana, Maputo", date: "Sex, 23 Maio", time: "19:30", trending: false, hot: 234 },
  { id: "5", title: "Exposição de Arte Contemporânea", category: "Arte & Cultura", location: "Centro Cultural Franco-Moçambicano", date: "Até 30 Maio", time: "10:00 – 17:00", trending: true, hot: 417 },
  { id: "6", title: "Concerto de Marrabenta", category: "Música", location: "Teatro Avenida", date: "Qui, 22 Maio", time: "20:00", trending: false, hot: 198 },
];

export default function PulseScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = PULSE_ITEMS.filter(
    (item) => activeCategory === "Todos" || item.category === activeCategory
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Pulso Local</Text>
          <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>O que acontece agora</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={(c) => c}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.chip, { backgroundColor: activeCategory === item ? colors.primary : colors.card, borderColor: activeCategory === item ? colors.primary : colors.border }]}
                onPress={() => setActiveCategory(item)}
              >
                <Text style={[styles.chipText, { color: activeCategory === item ? "#fff" : colors.mutedForeground }]}>{item}</Text>
              </Pressable>
            )}
            contentContainerStyle={styles.chips}
            showsHorizontalScrollIndicator={false}
          />
        }
        renderItem={({ item }) => (
          <Pressable style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.cardTop}>
              <View style={[styles.catBadge, { backgroundColor: colors.primarySoft }]}>
                <Text style={[styles.catText, { color: colors.primary }]}>{item.category}</Text>
              </View>
              {item.trending && (
                <View style={[styles.trendBadge, { backgroundColor: "#fef3c7" }]}>
                  <Feather name="trending-up" size={11} color="#d97706" />
                  <Text style={styles.trendText}>Em Alta</Text>
                </View>
              )}
            </View>
            <Text style={[styles.eventTitle, { color: colors.text }]}>{item.title}</Text>
            <View style={styles.eventMeta}>
              <View style={styles.metaRow}>
                <Feather name="map-pin" size={13} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]} numberOfLines={1}>{item.location}</Text>
              </View>
              <View style={styles.metaRow}>
                <Feather name="calendar" size={13} color={colors.mutedForeground} />
                <Text style={[styles.metaText, { color: colors.mutedForeground }]}>{item.date} · {item.time}</Text>
              </View>
            </View>
            <View style={styles.cardFooter}>
              <View style={styles.hotRow}>
                <Feather name="activity" size={14} color="#ef4444" />
                <Text style={[styles.hotText, { color: colors.mutedForeground }]}>{item.hot} interessados</Text>
              </View>
              <Pressable style={[styles.intBtn, { backgroundColor: colors.primary }]}>
                <Text style={styles.intBtnText}>Tenho Interesse</Text>
              </Pressable>
            </View>
          </Pressable>
        )}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 40 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  headerSub: { fontSize: 12, marginTop: 1 },
  chips: { paddingHorizontal: 16, gap: 8, paddingVertical: 14 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  chipText: { fontSize: 13, fontWeight: "600" },
  list: { paddingHorizontal: 16 },
  card: { borderRadius: 16, borderWidth: 1, padding: 16, gap: 10 },
  cardTop: { flexDirection: "row", gap: 8 },
  catBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  catText: { fontSize: 11, fontWeight: "700" },
  trendBadge: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20 },
  trendText: { color: "#d97706", fontSize: 11, fontWeight: "700" },
  eventTitle: { fontSize: 16, fontWeight: "700" },
  eventMeta: { gap: 5 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 13, flex: 1 },
  cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  hotRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  hotText: { fontSize: 13 },
  intBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
  intBtnText: { color: "#fff", fontSize: 13, fontWeight: "700" },
});
