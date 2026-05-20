import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
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
import * as Haptics from "expo-haptics";

import { FEED_POSTS, type FeedPost } from "@/data/mockData";
import { useColors } from "@/hooks/useColors";

function PostCard({ post }: { post: FeedPost }) {
  const colors = useColors();
  const [liked, setLiked] = useState(post.liked ?? false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const toggleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <View style={[styles.post, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* User row */}
      <View style={styles.userRow}>
        <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.text }]}>{post.user.name}</Text>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={11} color={colors.primary} />
            <Text style={[styles.postLocation, { color: colors.mutedForeground }]}>
              {post.destination}
            </Text>
          </View>
        </View>
        <Text style={[styles.timeAgo, { color: colors.mutedForeground }]}>{post.timeAgo}</Text>
      </View>

      {/* Image */}
      <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />

      {/* Caption */}
      <View style={styles.postBody}>
        <Text style={[styles.caption, { color: colors.text }]}>{post.caption}</Text>

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={toggleLike}>
            <Feather
              name="heart"
              size={22}
              color={liked ? "#ef4444" : colors.mutedForeground}
              style={liked ? { opacity: 1 } : { opacity: 0.7 }}
            />
            <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>
              {likeCount}
            </Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Feather name="message-circle" size={22} color={colors.mutedForeground} style={{ opacity: 0.7 }} />
            <Text style={[styles.actionCount, { color: colors.mutedForeground }]}>
              {post.comments}
            </Text>
          </Pressable>
          <Pressable style={styles.actionBtn}>
            <Feather name="share-2" size={22} color={colors.mutedForeground} style={{ opacity: 0.7 }} />
          </Pressable>
          <Pressable style={[styles.actionBtn, { marginLeft: "auto" }]}>
            <Feather name="bookmark" size={22} color={colors.mutedForeground} style={{ opacity: 0.7 }} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default function FeedScreen() {
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
        <Text style={[styles.headerTitle, { color: colors.text }]}>Feed</Text>
        <View style={styles.headerActions}>
          <Pressable style={[styles.iconBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Feather name="users" size={20} color={colors.text} />
          </Pressable>
          <Pressable style={[styles.iconBtn, { backgroundColor: colors.primary }]}>
            <Feather name="plus" size={20} color="#fff" />
          </Pressable>
        </View>
      </View>

      <FlatList
        data={FEED_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  list: { padding: 16 },
  post: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  userInfo: { flex: 1 },
  userName: {
    fontSize: 14,
    fontWeight: "700",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  postLocation: {
    fontSize: 12,
  },
  timeAgo: {
    fontSize: 12,
  },
  postImage: {
    width: "100%",
    height: 260,
  },
  postBody: {
    padding: 12,
    gap: 10,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  actionCount: {
    fontSize: 14,
    fontWeight: "600",
  },
});
