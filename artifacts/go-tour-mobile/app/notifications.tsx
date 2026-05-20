import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const NOTIFICATIONS = [
  { id: "n1", type: "like", user: "Ana Silva", avatar: "https://i.pravatar.cc/100?img=1", text: "gostou da tua publicação em Bazaruto.", time: "2m", read: false },
  { id: "n2", type: "comment", user: "Carlos Machava", avatar: "https://i.pravatar.cc/100?img=3", text: "comentou: \"Que destino incrível!\"", time: "15m", read: false },
  { id: "n3", type: "follow", user: "Fátima Mussa", avatar: "https://i.pravatar.cc/100?img=5", text: "começou a seguir-te.", time: "1h", read: true },
  { id: "n4", type: "like", user: "João Ndlovu", avatar: "https://i.pravatar.cc/100?img=7", text: "gostou do teu comentário.", time: "3h", read: true },
  { id: "n5", type: "promo", user: "GO TOUR", avatar: "", text: "Nova rota disponível: Maputo → Vilankulo com 20% de desconto!", time: "1d", read: true },
];

const iconForType: Record<string, { name: string; color: string }> = {
  like: { name: "heart", color: "#ef4444" },
  comment: { name: "message-circle", color: "#3b82f6" },
  follow: { name: "user-plus", color: "#10b981" },
  promo: { name: "tag", color: "#f59e0b" },
};

export default function NotificationsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Notificações</Text>
        <Pressable>
          <Text style={[styles.markAll, { color: colors.primary }]}>Marcar todas</Text>
        </Pressable>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const icon = iconForType[item.type] ?? { name: "bell", color: colors.primary };
          return (
            <Pressable style={[styles.notif, { backgroundColor: item.read ? colors.background : colors.primarySoft, borderBottomColor: colors.border }]}>
              <View style={styles.avatarContainer}>
                {item.avatar ? (
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, { backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" }]}>
                    <Feather name="map" size={18} color="#fff" />
                  </View>
                )}
                <View style={[styles.iconBadge, { backgroundColor: icon.color }]}>
                  <Feather name={icon.name as any} size={10} color="#fff" />
                </View>
              </View>
              <View style={styles.notifContent}>
                <Text style={[styles.notifText, { color: colors.text }]}>
                  <Text style={{ fontWeight: "700" }}>{item.user}</Text> {item.text}
                </Text>
                <Text style={[styles.notifTime, { color: colors.mutedForeground }]}>{item.time}</Text>
              </View>
              {!item.read && <View style={[styles.unreadDot, { backgroundColor: colors.primary }]} />}
            </Pressable>
          );
        }}
        contentContainerStyle={{ paddingBottom: bottomPadding + 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="bell-off" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Sem notificações</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  markAll: { fontSize: 13, fontWeight: "600" },
  notif: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 14, gap: 12, borderBottomWidth: 1 },
  avatarContainer: { position: "relative" },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  iconBadge: { position: "absolute", bottom: 0, right: 0, width: 18, height: 18, borderRadius: 9, alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#fff" },
  notifContent: { flex: 1, gap: 3 },
  notifText: { fontSize: 14, lineHeight: 20 },
  notifTime: { fontSize: 12 },
  unreadDot: { width: 8, height: 8, borderRadius: 4 },
  empty: { alignItems: "center", paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 16 },
});
