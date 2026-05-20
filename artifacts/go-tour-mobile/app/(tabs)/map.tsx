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
import { DESTINATIONS } from "@/data/mockData";

const MOZAMBIQUE_REGIONS = [
  { id: "1", name: "Maputo", subtitle: "Capital Nacional", lat: -25.97, lng: 32.59, color: "#f0fdfa" },
  { id: "2", name: "Vilankulo", subtitle: "Arquipélago de Bazaruto", lat: -21.15, lng: 35.3, color: "#ecfeff" },
  { id: "3", name: "Inhambane", subtitle: "Praia de Tofo", lat: -23.87, lng: 35.38, color: "#f0f9ff" },
  { id: "4", name: "Pemba", subtitle: "Norte de Moçambique", lat: -12.97, lng: 40.52, color: "#fef9c3" },
  { id: "5", name: "Beira", subtitle: "Cidade da Sofala", lat: -19.84, lng: 34.84, color: "#fdf4ff" },
  { id: "6", name: "Ilha de Moçambique", subtitle: "Património da UNESCO", lat: -15.03, lng: 40.73, color: "#fff7ed" },
  { id: "7", name: "Nampula", subtitle: "Monapo & Arredores", lat: -15.12, lng: 39.28, color: "#f0fdf4" },
  { id: "8", name: "Sofala / Gorongosa", subtitle: "Parque Nacional", lat: -18.67, lng: 34.9, color: "#f0fdfa" },
];

export default function MapScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regionDestinations = selectedRegion
    ? DESTINATIONS.filter((d) =>
        d.location.toLowerCase().includes(
          MOZAMBIQUE_REGIONS.find((r) => r.id === selectedRegion)?.name.toLowerCase() ?? ""
        )
      )
    : DESTINATIONS;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Mapa</Text>
        <Text style={[styles.headerSub, { color: colors.mutedForeground }]}>Destinos em Moçambique</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: bottomPadding + 100 }}>
        {/* SVG-style static map placeholder */}
        <View style={[styles.mapCard, { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }]}>
          <View style={styles.mapGrid}>
            {MOZAMBIQUE_REGIONS.map((region) => (
              <Pressable
                key={region.id}
                style={[
                  styles.regionPin,
                  {
                    backgroundColor: selectedRegion === region.id ? colors.primary : "#fff",
                    borderColor: selectedRegion === region.id ? colors.primary : colors.border,
                  },
                ]}
                onPress={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              >
                <Feather
                  name="map-pin"
                  size={16}
                  color={selectedRegion === region.id ? "#fff" : colors.primary}
                />
                <Text
                  style={[styles.pinName, { color: selectedRegion === region.id ? "#fff" : colors.text }]}
                  numberOfLines={1}
                >
                  {region.name}
                </Text>
              </Pressable>
            ))}
          </View>
          <Text style={[styles.mapHint, { color: colors.mutedForeground }]}>
            Selecciona uma região para filtrar destinos
          </Text>
        </View>

        {/* Region Detail */}
        {selectedRegion && (
          <View style={[styles.regionInfo, { backgroundColor: colors.card, borderColor: colors.border, marginHorizontal: 16 }]}>
            {(() => {
              const r = MOZAMBIQUE_REGIONS.find((r) => r.id === selectedRegion);
              return r ? (
                <View style={styles.regionRow}>
                  <View style={[styles.regionIcon, { backgroundColor: colors.primarySoft }]}>
                    <Feather name="navigation" size={20} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.regionName, { color: colors.text }]}>{r.name}</Text>
                    <Text style={[styles.regionSubtitle, { color: colors.mutedForeground }]}>{r.subtitle}</Text>
                    <Text style={[styles.regionCoords, { color: colors.mutedForeground }]}>
                      {Math.abs(r.lat).toFixed(2)}°{r.lat < 0 ? "S" : "N"}, {Math.abs(r.lng).toFixed(2)}°{r.lng > 0 ? "E" : "W"}
                    </Text>
                  </View>
                  <Pressable onPress={() => setSelectedRegion(null)}>
                    <Feather name="x" size={18} color={colors.mutedForeground} />
                  </Pressable>
                </View>
              ) : null;
            })()}
          </View>
        )}

        {/* Destinations list */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            {selectedRegion
              ? `Destinos em ${MOZAMBIQUE_REGIONS.find((r) => r.id === selectedRegion)?.name ?? ""}`
              : "Todos os Destinos"}
            {" "}
            <Text style={{ color: colors.mutedForeground, fontWeight: "400", fontSize: 14 }}>
              ({(selectedRegion ? regionDestinations : DESTINATIONS).length})
            </Text>
          </Text>

          {(selectedRegion ? regionDestinations : DESTINATIONS).length === 0 ? (
            <View style={[styles.emptyBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name="map-pin" size={28} color={colors.mutedForeground} />
              <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Sem destinos nesta região</Text>
            </View>
          ) : (
            (selectedRegion ? regionDestinations : DESTINATIONS).map((dest) => (
              <Pressable
                key={dest.id}
                style={[styles.destCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                onPress={() => router.push({ pathname: "/destination/[id]", params: { id: dest.id } })}
              >
                <View style={[styles.destIcon, { backgroundColor: colors.primarySoft }]}>
                  <Feather name="map-pin" size={18} color={colors.primary} />
                </View>
                <View style={styles.destInfo}>
                  <Text style={[styles.destName, { color: colors.text }]}>{dest.name}</Text>
                  <Text style={[styles.destLocation, { color: colors.mutedForeground }]}>{dest.location}</Text>
                  <View style={styles.destMeta}>
                    <Feather name="star" size={12} color="#f59e0b" />
                    <Text style={[styles.destRating, { color: colors.mutedForeground }]}>{dest.rating}</Text>
                    <Text style={[styles.destCategory, { color: colors.mutedForeground }]}>· {dest.category}</Text>
                  </View>
                </View>
                <View style={styles.destRight}>
                  <Text style={[styles.destPrice, { color: colors.primary }]}>${dest.price}</Text>
                  <Text style={[styles.destPriceSub, { color: colors.mutedForeground }]}>/noite</Text>
                </View>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  headerTitle: { fontSize: 22, fontWeight: "800" },
  headerSub: { fontSize: 13, marginTop: 2 },
  mapCard: { margin: 16, borderRadius: 20, borderWidth: 1, padding: 16 },
  mapGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 12 },
  regionPin: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
  pinName: { fontSize: 12, fontWeight: "600" },
  mapHint: { fontSize: 12, textAlign: "center" },
  regionInfo: { borderRadius: 14, borderWidth: 1, padding: 14, marginBottom: 8 },
  regionRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  regionIcon: { width: 42, height: 42, borderRadius: 21, alignItems: "center", justifyContent: "center" },
  regionName: { fontSize: 15, fontWeight: "700" },
  regionSubtitle: { fontSize: 13 },
  regionCoords: { fontSize: 11, fontFamily: "monospace", marginTop: 2 },
  section: { paddingHorizontal: 16, paddingTop: 12 },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },
  emptyBox: { borderRadius: 14, borderWidth: 1, padding: 32, alignItems: "center", gap: 10 },
  emptyText: { fontSize: 14 },
  destCard: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 14, borderWidth: 1, gap: 12, marginBottom: 10 },
  destIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  destInfo: { flex: 1, gap: 3 },
  destName: { fontSize: 15, fontWeight: "700" },
  destLocation: { fontSize: 13 },
  destMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  destRating: { fontSize: 12 },
  destCategory: { fontSize: 12 },
  destRight: { alignItems: "flex-end" },
  destPrice: { fontSize: 16, fontWeight: "800" },
  destPriceSub: { fontSize: 11 },
});
