import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DESTINATIONS } from "@/data/mockData";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [saved, setSaved] = useState(false);

  const destination = DESTINATIONS.find((d) => d.id === id);
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const topPadding = Platform.OS === "web" ? 67 : insets.top;

  if (!destination) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Feather name="map-pin" size={40} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.text }]}>
          Destino não encontrado
        </Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.goBack, { color: colors.primary }]}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const handleSave = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSaved((v) => !v);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: bottomPadding + 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.hero}>
          <Image
            source={{ uri: destination.image }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(0,0,0,0.55)", "transparent"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[styles.topGradient, { height: topPadding + 80 }]}
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.4)"]}
            style={styles.bottomGradient}
          />

          {/* Back & Save buttons */}
          <View style={[styles.heroActions, { top: topPadding + 12 }]}>
            <Pressable
              style={styles.heroBtn}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" size={22} color="#fff" />
            </Pressable>
            <Pressable style={styles.heroBtn} onPress={handleSave}>
              <Feather
                name={saved ? "bookmark" : "bookmark"}
                size={22}
                color={saved ? "#f59e0b" : "#fff"}
              />
            </Pressable>
          </View>

          {/* Hero text overlay */}
          <View style={styles.heroText}>
            <View style={[styles.countryBadge, { backgroundColor: colors.primary }]}>
              <Text style={styles.countryBadgeText}>{destination.country}</Text>
            </View>
            <Text style={styles.heroName}>{destination.name}</Text>
            <View style={styles.heroMeta}>
              <Feather name="map-pin" size={14} color="rgba(255,255,255,0.9)" />
              <Text style={styles.heroLocation}>{destination.location}</Text>
              <View style={styles.ratingPill}>
                <Feather name="star" size={12} color="#f59e0b" />
                <Text style={styles.ratingText}>{destination.rating}</Text>
                <Text style={styles.reviewsText}>({destination.reviews})</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Price & book row */}
          <View style={[styles.priceCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View>
              <Text style={[styles.priceLabel, { color: colors.mutedForeground }]}>
                A partir de
              </Text>
              <View style={styles.priceRow}>
                <Text style={[styles.price, { color: colors.primary }]}>
                  {destination.currency} {destination.price}
                </Text>
                <Text style={[styles.perNight, { color: colors.mutedForeground }]}>/noite</Text>
              </View>
            </View>
            <Pressable style={[styles.bookBtn, { backgroundColor: colors.primary }]}>
              <Text style={styles.bookBtnText}>Reservar</Text>
            </Pressable>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Sobre</Text>
            <Text style={[styles.description, { color: colors.mutedForeground }]}>
              {destination.description}
            </Text>
          </View>

          {/* Tags */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>O que fazer</Text>
            <View style={styles.tags}>
              {destination.tags.map((tag) => (
                <View
                  key={tag}
                  style={[styles.tag, { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }]}
                >
                  <Text style={[styles.tagText, { color: colors.primaryDark }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Info grid */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Informações</Text>
            <View style={[styles.infoGrid, { borderColor: colors.border }]}>
              {[
                { icon: "star", label: "Avaliação", value: `${destination.rating}/5` },
                { icon: "message-circle", label: "Opiniões", value: `${destination.reviews}` },
                { icon: "tag", label: "Tipo", value: destination.category },
                { icon: "flag", label: "País", value: destination.country },
              ].map((item, i) => (
                <View
                  key={item.label}
                  style={[
                    styles.infoCell,
                    {
                      borderRightWidth: i % 2 === 0 ? 1 : 0,
                      borderBottomWidth: i < 2 ? 1 : 0,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Feather name={item.icon as any} size={20} color={colors.primary} />
                  <Text style={[styles.infoCellValue, { color: colors.text }]}>{item.value}</Text>
                  <Text style={[styles.infoCellLabel, { color: colors.mutedForeground }]}>
                    {item.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed bottom bar */}
      <View
        style={[
          styles.bottomBar,
          {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            paddingBottom: bottomPadding + 16,
          },
        ]}
      >
        <View>
          <Text style={[styles.bottomPriceLabel, { color: colors.mutedForeground }]}>
            Preço por noite
          </Text>
          <Text style={[styles.bottomPrice, { color: colors.primary }]}>
            {destination.currency} {destination.price}
          </Text>
        </View>
        <Pressable
          style={[styles.reserveBtn, { backgroundColor: colors.primary }]}
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
        >
          <Feather name="calendar" size={18} color="#fff" />
          <Text style={styles.reserveBtnText}>Reservar Agora</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  notFoundText: { fontSize: 18, fontWeight: "700" },
  goBack: { fontSize: 16, fontWeight: "600" },
  hero: {
    width,
    height: 380,
    position: "relative",
  },
  heroImage: { width: "100%", height: "100%" },
  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 160,
  },
  heroActions: {
    position: "absolute",
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  heroBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroText: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    gap: 6,
  },
  countryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 4,
  },
  countryBadgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  heroName: { color: "#fff", fontSize: 26, fontWeight: "800" },
  heroMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flexWrap: "wrap",
  },
  heroLocation: { color: "rgba(255,255,255,0.9)", fontSize: 14, flex: 1 },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: { color: "#fff", fontSize: 13, fontWeight: "700" },
  reviewsText: { color: "rgba(255,255,255,0.8)", fontSize: 12 },
  content: { padding: 16, gap: 4 },
  priceCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 8,
  },
  priceLabel: { fontSize: 12 },
  priceRow: { flexDirection: "row", alignItems: "baseline", gap: 2 },
  price: { fontSize: 22, fontWeight: "800" },
  perNight: { fontSize: 13 },
  bookBtn: {
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: "center",
  },
  bookBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  section: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  description: { fontSize: 15, lineHeight: 22 },
  tags: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
  },
  tagText: { fontSize: 13, fontWeight: "600" },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
  },
  infoCell: {
    width: "50%",
    padding: 16,
    alignItems: "center",
    gap: 4,
  },
  infoCellValue: { fontSize: 16, fontWeight: "700", textTransform: "capitalize" },
  infoCellLabel: { fontSize: 12 },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  bottomPriceLabel: { fontSize: 12 },
  bottomPrice: { fontSize: 22, fontWeight: "800" },
  reserveBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  reserveBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
});
