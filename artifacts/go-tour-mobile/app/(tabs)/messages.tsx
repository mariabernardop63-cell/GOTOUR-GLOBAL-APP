import { Feather } from "@expo/vector-icons";
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

import { MESSAGES, type Message } from "@/data/mockData";
import { useColors } from "@/hooks/useColors";

function MessageRow({ msg }: { msg: Message }) {
  const colors = useColors();
  return (
    <Pressable
      style={[
        styles.row,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: msg.user.avatar }} style={styles.avatar} />
        <View style={[styles.onlineDot, { backgroundColor: colors.success }]} />
      </View>
      <View style={styles.rowContent}>
        <View style={styles.rowTop}>
          <Text style={[styles.name, { color: colors.text }]}>{msg.user.name}</Text>
          <Text style={[styles.time, { color: colors.mutedForeground }]}>{msg.timeAgo}</Text>
        </View>
        <View style={styles.rowBottom}>
          <Text
            style={[
              styles.lastMsg,
              {
                color: msg.unread > 0 ? colors.text : colors.mutedForeground,
                fontWeight: msg.unread > 0 ? "600" : "400",
              },
            ]}
            numberOfLines={1}
          >
            {msg.lastMessage}
          </Text>
          {msg.unread > 0 && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>{msg.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

export default function MessagesScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Mensagens</Text>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.primary }]}>
          <Feather name="edit" size={18} color="#fff" />
        </Pressable>
      </View>

      <FlatList
        data={MESSAGES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageRow msg={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={[styles.sectionLabel, { color: colors.mutedForeground }]}>
            Conversas Recentes
          </Text>
        }
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="message-circle" size={40} color={colors.mutedForeground} />
            <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
              Nenhuma mensagem ainda
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  list: { padding: 16 },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  onlineDot: {
    position: "absolute",
    bottom: 1,
    right: 1,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#fff",
  },
  rowContent: { flex: 1, gap: 4 },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
  },
  time: {
    fontSize: 12,
  },
  rowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMsg: {
    fontSize: 14,
    flex: 1,
    marginRight: 8,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  empty: {
    alignItems: "center",
    paddingTop: 80,
    gap: 12,
  },
  emptyText: {
    fontSize: 16,
  },
});
