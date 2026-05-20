import { Feather } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

export function CategoryChip({ label, icon, active, onPress }: Props) {
  const colors = useColors();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.primary : colors.card,
          borderColor: active ? colors.primary : colors.border,
        },
      ]}
    >
      <Feather
        name={icon as any}
        size={14}
        color={active ? "#ffffff" : colors.mutedForeground}
      />
      <Text
        style={[
          styles.label,
          { color: active ? "#ffffff" : colors.mutedForeground },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 24,
    borderWidth: 1,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
  },
});
