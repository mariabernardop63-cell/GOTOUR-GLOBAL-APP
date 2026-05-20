import { Feather } from "@expo/vector-icons";
import React, { useState, useMemo } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { CategoryChip } from "@/components/CategoryChip";
import { DestinationCard } from "@/components/DestinationCard";
import { CATEGORIES, DESTINATIONS } from "@/data/mockData";
import { useColors } from "@/hooks/useColors";

export default function ExploreScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const filtered = useMemo(() => {
    return DESTINATIONS.filter((d) => {
      const matchCat = activeCategory === "all" || d.category === activeCategory;
      const matchQ =
        !query ||
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.location.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: topPadding + 12, backgroundColor: colors.background, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Explorar</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          {filtered.length} destinos disponíveis
        </Text>

        {/* Search */}
        <View
          style={[
            styles.searchBar,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Feather name="search" size={18} color={colors.mutedForeground} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Pesquisar destinos..."
            placeholderTextColor={colors.mutedForeground}
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Feather
              name="x"
              size={18}
              color={colors.mutedForeground}
              onPress={() => setQuery("")}
            />
          )}
        </View>

        {/* Category chips */}
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
          contentContainerStyle={styles.chips}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Results */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <DestinationCard destination={item} horizontal />
          </View>
        )}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: bottomPadding + 100 },
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="map-pin" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              Nenhum destino encontrado
            </Text>
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Tenta uma pesquisa diferente ou seleciona outra categoria.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
  chips: {
    gap: 8,
    paddingVertical: 4,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  cardWrapper: {
    marginBottom: 12,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    gap: 12,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
});
