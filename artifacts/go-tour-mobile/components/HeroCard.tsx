import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
}

export function HeroCard({ destination }: Props) {
  const colors = useColors();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        router.push({ pathname: "/destination/[id]", params: { id: destination.id } })
      }
    >
      <Image
        source={{ uri: destination.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.75)"]}
        style={styles.gradient}
      />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={[styles.featuredBadge, { backgroundColor: colors.primary }]}>
            <Feather name="trending-up" size={11} color="#fff" />
            <Text style={styles.featuredText}>Em Destaque</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Feather name="star" size={11} color="#f59e0b" />
            <Text style={styles.ratingText}>{destination.rating}</Text>
          </View>
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.name} numberOfLines={1}>
            {destination.name}
          </Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={13} color="rgba(255,255,255,0.85)" />
            <Text style={styles.location}>
              {destination.location}, {destination.country}
            </Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              {destination.currency} {destination.price}
            </Text>
            <Text style={styles.perNight}>/noite</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width * 0.78,
    height: 280,
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 14,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "65%",
  },
  content: {
    flex: 1,
    padding: 16,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  featuredText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  ratingBadge: {
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
  bottomContent: {
    gap: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  perNight: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    marginLeft: 3,
  },
});
