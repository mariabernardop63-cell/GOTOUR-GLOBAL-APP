import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useColors } from "@/hooks/useColors";

interface Props {
  width?: number | string;
  height?: number;
  borderRadius?: number;
}

export function SkeletonBox({ width = "100%", height = 20, borderRadius = 8 }: Props) {
  const colors = useColors();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.4, 0.9] });

  return (
    <Animated.View
      style={[
        { width: width as any, height, borderRadius, backgroundColor: colors.muted, opacity },
      ]}
    />
  );
}

export function SkeletonCard() {
  const colors = useColors();
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <SkeletonBox height={180} borderRadius={0} />
      <View style={styles.info}>
        <SkeletonBox height={16} width="75%" />
        <SkeletonBox height={12} width="55%" />
        <SkeletonBox height={18} width="40%" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    marginRight: 12,
  },
  info: {
    padding: 12,
    gap: 8,
  },
});
