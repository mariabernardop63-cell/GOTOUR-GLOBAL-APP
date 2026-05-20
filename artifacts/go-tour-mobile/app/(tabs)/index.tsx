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

import { CategoryChip } from "@/components/CategoryChip";
import { DestinationCard } from "@/components/DestinationCard";
import { HeroCard } from "@/components/HeroCard";
import { SectionHeader } from "@/components/SectionHeader";
import { useAuth } from "@/context/AuthContext";
import {
  CATEGORIES,
  DESTINATIONS,
  FEATURED_DESTINATIONS,
  RECOMMENDED_DESTINATIONS,
} from "@/data/mockData";
import { useColors } from "@/hooks/useColors";

export default function HomeScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState("all");

  const firstName = user?.email?.split("@")[0] ?? "Viajante";
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const filteredDestinations =
    activeCategory === "all"
      ? DESTINATIONS
      : DESTINATIONS.filter((d) => d.category === activeCategory);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          {
            paddingTop: topPadding + 12,
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.greeting, { color: colors.mutedForeground }]}>
            Olá, {firstName} 👋
          </Text>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Descobre Moçambique
          </Text>
        </View>
        <Pressable
          style={[styles.notifBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => {}}
        >
          <Feather name="bell" size={20} color={colors.text} />
          <View style={[styles.notifDot, { backgroundColor: colors.primary }]} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding + 100 }]}
      >
        {/* Search bar */}
        <Pressable
          style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.push("/(tabs)/explore")}
        >
          <Feather name="search" size={18} color={colors.mutedForeground} />
          <Text style={[styles.searchPlaceholder, { color: colors.mutedForeground }]}>
            Procurar destinos, hotéis...
          </Text>
          <View style={[styles.filterBtn, { backgroundColor: colors.primary }]}>
            <Feather name="sliders" size={14} color="#fff" />
          </View>
        </Pressable>

        {/* Featured Destinations */}
        <View style={styles.section}>
          <SectionHeader title="Em Destaque" subtitle="Os melhores destinos" />
          <FlatList
            horizontal
            data={FEATURED_DESTINATIONS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <HeroCard destination={item} />}
            contentContainerStyle={styles.horizontalList}
            showsHorizontalScrollIndicator={false}
            scrollEnabled={!!FEATURED_DESTINATIONS.length}
          />
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <SectionHeader title="Categorias" showAll={false} />
          <FlatList
            horizontal
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CategoryChip
                label={item.label}
                icon={item.icon}
                active={activeCategory === item.id}
                onPress={() => setActiveCategory(item.id)}
              />
            )}
            contentContainerStyle={styles.horizontalList}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Recommended */}
        <View style={styles.section}>
          <SectionHeader
            title="Recomendados"
            subtitle={`${filteredDestinations.length} destinos encontrados`}
          />
          <FlatList
            horizontal
            data={activeCategory === "all" ? RECOMMENDED_DESTINATIONS : filteredDestinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <DestinationCard destination={item} size="medium" />
              </View>
            )}
            contentContainerStyle={styles.horizontalList}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Trending — vertical list */}
        <View style={styles.section}>
          <SectionHeader title="Tendências" subtitle="O que está popular agora" />
          {DESTINATIONS.slice(2, 6).map((dest) => (
            <View key={dest.id} style={styles.verticalCard}>
              <DestinationCard destination={dest} size="medium" horizontal />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 13,
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    position: "absolute",
    top: 9,
    right: 9,
    borderWidth: 1.5,
    borderColor: "#fff",
  },
  scroll: {
    paddingTop: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 16,
    borderWidth: 1,
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 15,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    marginBottom: 28,
  },
  horizontalList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  cardWrapper: {},
  verticalCard: {
    marginHorizontal: 20,
    marginBottom: 12,
  },
});
