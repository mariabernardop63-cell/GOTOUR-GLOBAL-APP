import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";

import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

interface MenuItemProps {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}

function MenuItem({ icon, label, value, onPress, danger }: MenuItemProps) {
  const colors = useColors();
  return (
    <Pressable
      style={[styles.menuItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: danger ? "#fee2e2" : colors.primarySoft }]}>
        <Feather name={icon as any} size={18} color={danger ? "#ef4444" : colors.primary} />
      </View>
      <Text style={[styles.menuLabel, { color: danger ? "#ef4444" : colors.text }]}>{label}</Text>
      {value && (
        <Text style={[styles.menuValue, { color: colors.mutedForeground }]}>{value}</Text>
      )}
      {!danger && <Feather name="chevron-right" size={18} color={colors.mutedForeground} />}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user, signOut } = useAuth();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const displayName = user?.email?.split("@")[0] ?? "Utilizador";
  const email = user?.email ?? "";
  const initial = displayName.charAt(0).toUpperCase();

  const handleSignOut = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await signOut();
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View
          style={[
            styles.header,
            { paddingTop: topPadding + 12, borderBottomColor: colors.border },
          ]}
        >
          <Text style={[styles.headerTitle, { color: colors.text }]}>Perfil</Text>
        </View>
        <View style={styles.guestContainer}>
          <View style={[styles.guestAvatar, { backgroundColor: colors.primarySoft }]}>
            <Feather name="user" size={40} color={colors.primary} />
          </View>
          <Text style={[styles.guestTitle, { color: colors.text }]}>
            Entra para ver o teu perfil
          </Text>
          <Text style={[styles.guestSubtitle, { color: colors.mutedForeground }]}>
            Guarda os teus destinos favoritos e planeia as tuas viagens.
          </Text>
          <Pressable
            style={[styles.loginBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginBtnText}>Entrar</Text>
          </Pressable>
          <Pressable onPress={() => router.push("/signup")}>
            <Text style={[styles.signupLink, { color: colors.primary }]}>
              Criar conta
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View
        style={[
          styles.header,
          { paddingTop: topPadding + 12, borderBottomColor: colors.border },
        ]}
      >
        <Text style={[styles.headerTitle, { color: colors.text }]}>Perfil</Text>
        <Pressable style={[styles.settingsBtn, { borderColor: colors.border }]}>
          <Feather name="settings" size={20} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar & info */}
        <View style={styles.profileSection}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarInitial}>{initial}</Text>
          </View>
          <Text style={[styles.displayName, { color: colors.text }]}>{displayName}</Text>
          <Text style={[styles.email, { color: colors.mutedForeground }]}>{email}</Text>

          {/* Stats */}
          <View style={[styles.statsRow, { borderColor: colors.border }]}>
            {[
              { label: "Viagens", value: "3" },
              { label: "Favoritos", value: "12" },
              { label: "Amigos", value: "8" },
            ].map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <View style={[styles.statDivider, { backgroundColor: colors.border }]} />}
                <View style={styles.stat}>
                  <Text style={[styles.statValue, { color: colors.text }]}>{s.value}</Text>
                  <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>{s.label}</Text>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Menu */}
        <View style={[styles.menuSection, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <MenuItem icon="heart" label="Favoritos" />
          <MenuItem icon="map" label="As Minhas Viagens" />
          <MenuItem icon="users" label="Amigos" />
          <MenuItem icon="bell" label="Notificações" />
          <MenuItem icon="globe" label="Idioma" value="Português" />
          <MenuItem icon="moon" label="Tema" value="Automático" />
          <MenuItem icon="help-circle" label="Ajuda & Suporte" />
        </View>

        <View style={[styles.menuSection, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 12 }]}>
          <MenuItem icon="log-out" label="Terminar Sessão" onPress={handleSignOut} danger />
        </View>
      </ScrollView>
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
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingTop: 24,
  },
  profileSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  avatarCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarInitial: {
    fontSize: 36,
    fontWeight: "800",
    color: "#ffffff",
  },
  displayName: {
    fontSize: 22,
    fontWeight: "800",
    textTransform: "capitalize",
  },
  email: {
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 16,
    overflow: "hidden",
    width: "100%",
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
  },
  statDivider: {
    width: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  menuSection: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
  },
  menuValue: {
    fontSize: 14,
    marginRight: 4,
  },
  guestContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    gap: 12,
  },
  guestAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  guestTitle: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
  },
  guestSubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  loginBtn: {
    paddingHorizontal: 48,
    paddingVertical: 15,
    borderRadius: 14,
    marginTop: 12,
    width: "100%",
    alignItems: "center",
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  signupLink: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
  },
});
