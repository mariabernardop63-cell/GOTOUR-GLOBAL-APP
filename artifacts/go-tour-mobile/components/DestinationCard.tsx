import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { Destination } from "@/data/mockData";
import { useColors } from "@/hooks/useColors";

const { width } = Dimensions.get("window");

interface Props {
  destination: Destination;
  size?: "large" | "medium" | "small";
  horizontal?: boolean;
}

export function DestinationCard({ destination, size = "medium", horizontal = false }: Props) {
  const colors = useColors();

  const cardWidth = size === "large" ? width * 0.72 : size === "small" ? 160 : 200;
  const cardHeight = size === "large" ? 260 : size === "small" ? 200 : 220;

  return (
    <Pressable
      style={[
        styles.card,
        {
          width: horizontal ? "100%" : cardWidth,
          backgroundColor: colors.card,
          borderColor: colors.border,
        },
      ]}
      onPress={() => router.push({ pathname: "/destination/[id]", params: { id: destination.id } })}
    >
      <View style={[styles.imageContainer, { height: horizontal ? 180 : cardHeight }]}>
        <Image
          source={{ uri: destination.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Feather name="star" size={11} color="#f59e0b" />
          <Text style={styles.ratingText}>{destination.rating}</Text>
        </View>
        <View style={[styles.categoryBadge, { backgroundColor: colors.primary }]}>
          <Text style={styles.categoryText}>{destination.category === "resorts" ? "Resort" : destination.category === "hotels" ? "Hotel" : destination.category === "apartments" ? "Apart." : destination.category === "ecolodges" ? "Eco" : destination.category === "camping" ? "Camp" : "Pensão"}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {destination.name}
        </Text>
        <View style={styles.locationRow}>
          <Feather name="map-pin" size={12} color={colors.mutedForeground} />
          <Text style={[styles.location, { color: colors.mutedForeground }]} numberOfLines={1}>
            {destination.location}, {destination.country}
          </Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.primary }]}>
            {destination.currency} {destination.price}
          </Text>
          <Text style={[styles.perNight, { color: colors.mutedForeground }]}>/noite</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  ratingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#1e293b",
  },
  categoryBadge: {
    position: "absolute",
    bottom: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#ffffff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  info: {
    padding: 12,
    gap: 4,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 12,
    flex: 1,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
  },
  perNight: {
    fontSize: 12,
    marginLeft: 2,
  },
});
