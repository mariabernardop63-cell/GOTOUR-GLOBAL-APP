import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  title: string;
  subtitle?: string;
  showAll?: boolean;
  onShowAll?: () => void;
}

export function SectionHeader({ title, subtitle, showAll = true, onShowAll }: Props) {
  const colors = useColors();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            {subtitle}
          </Text>
        )}
      </View>
      {showAll && (
        <Pressable onPress={onShowAll ?? (() => router.push("/(tabs)/explore"))}>
          <Text style={[styles.seeAll, { color: colors.primary }]}>Ver todos</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
});
