import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useColors } from "@/hooks/useColors";

const FRIENDS = [
  { id: "f1", name: "Ana Silva", username: "@ana.silva", avatar: "https://i.pravatar.cc/100?img=1", mutual: 3, following: true },
  { id: "f2", name: "Carlos Machava", username: "@c.machava", avatar: "https://i.pravatar.cc/100?img=3", mutual: 7, following: false },
  { id: "f3", name: "Fátima Mussa", username: "@fatima.m", avatar: "https://i.pravatar.cc/100?img=5", mutual: 2, following: true },
  { id: "f4", name: "João Ndlovu", username: "@j.ndlovu", avatar: "https://i.pravatar.cc/100?img=7", mutual: 5, following: false },
  { id: "f5", name: "Sofia Dlamini", username: "@sofia.d", avatar: "https://i.pravatar.cc/100?img=9", mutual: 1, following: true },
  { id: "f6", name: "Pedro Tembe", username: "@pedro.t", avatar: "https://i.pravatar.cc/100?img=11", mutual: 4, following: false },
];

export default function FriendsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const [following, setFollowing] = useState<Record<string, boolean>>(
    Object.fromEntries(FRIENDS.map((f) => [f.id, f.following]))
  );
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const filtered = FRIENDS.filter(
    (f) =>
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.username.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFollow = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setFollowing((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Amigos</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border, margin: 16 }]}>
        <Feather name="search" size={17} color={colors.mutedForeground} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Pesquisar amigos..."
          placeholderTextColor={colors.mutedForeground}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.friendRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.username, { color: colors.mutedForeground }]}>{item.username}</Text>
              <Text style={[styles.mutual, { color: colors.mutedForeground }]}>{item.mutual} amigos em comum</Text>
            </View>
            <Pressable
              style={[
                styles.followBtn,
                { backgroundColor: following[item.id] ? colors.muted : colors.primary, borderColor: following[item.id] ? colors.border : colors.primary },
              ]}
              onPress={() => toggleFollow(item.id)}
            >
              <Text style={[styles.followBtnText, { color: following[item.id] ? colors.text : "#fff" }]}>
                {following[item.id] ? "Seguindo" : "Seguir"}
              </Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  searchBar: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, borderRadius: 14, borderWidth: 1, gap: 10 },
  searchInput: { flex: 1, fontSize: 15 },
  list: { paddingHorizontal: 16 },
  friendRow: { flexDirection: "row", alignItems: "center", padding: 14, borderRadius: 16, borderWidth: 1, gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 15, fontWeight: "700" },
  username: { fontSize: 13 },
  mutual: { fontSize: 12 },
  followBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  followBtnText: { fontSize: 13, fontWeight: "700" },
});
