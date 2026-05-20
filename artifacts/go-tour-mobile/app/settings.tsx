import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useAuth } from "@/context/AuthContext";

interface SettingRowProps {
  icon: string;
  label: string;
  value?: string;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  onPress?: () => void;
  danger?: boolean;
}

function SettingRow({ icon, label, value, toggle, toggleValue, onToggle, onPress, danger }: SettingRowProps) {
  const colors = useColors();
  return (
    <Pressable style={[styles.row, { borderBottomColor: colors.border }]} onPress={onPress}>
      <View style={[styles.rowIcon, { backgroundColor: danger ? "#fee2e2" : colors.primarySoft }]}>
        <Feather name={icon as any} size={17} color={danger ? "#ef4444" : colors.primary} />
      </View>
      <Text style={[styles.rowLabel, { color: danger ? "#ef4444" : colors.text }]}>{label}</Text>
      {toggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ true: colors.primary, false: colors.muted }}
          thumbColor="#fff"
        />
      ) : value ? (
        <Text style={[styles.rowValue, { color: colors.mutedForeground }]}>{value}</Text>
      ) : !danger ? (
        <Feather name="chevron-right" size={18} color={colors.mutedForeground} />
      ) : null}
    </Pressable>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const colors = useColors();
  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.mutedForeground }]}>{title}</Text>
      <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Definições</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding + 100 }]}
      >
        <Section title="CONTA">
          <SettingRow icon="user" label="Editar Perfil" onPress={() => router.push("/edit-profile")} />
          <SettingRow icon="mail" label="Email" value="●●●●@email.com" />
          <SettingRow icon="smartphone" label="Número de Telefone" />
          <SettingRow icon="lock" label="Palavra-passe" />
        </Section>

        <Section title="PRIVACIDADE">
          <SettingRow icon="eye-off" label="Conta Privada" toggle toggleValue={privateAccount} onToggle={setPrivateAccount} />
          <SettingRow icon="message-circle" label="Quem pode enviar mensagens" value="Todos" />
          <SettingRow icon="slash" label="Contas Bloqueadas" />
        </Section>

        <Section title="NOTIFICAÇÕES">
          <SettingRow icon="bell" label="Notificações Push" toggle toggleValue={pushNotifs} onToggle={setPushNotifs} />
          <SettingRow icon="mail" label="Notificações por Email" toggle toggleValue={emailNotifs} onToggle={setEmailNotifs} />
        </Section>

        <Section title="PREFERÊNCIAS">
          <SettingRow icon="globe" label="Idioma" value="Português" />
          <SettingRow icon="moon" label="Tema" value="Automático" />
          <SettingRow icon="dollar-sign" label="Moeda Preferida" value="MZN" />
        </Section>

        <Section title="SUPORTE">
          <SettingRow icon="help-circle" label="Centro de Ajuda" />
          <SettingRow icon="file-text" label="Termos e Política" onPress={() => router.push("/legal")} />
          <SettingRow icon="info" label="Sobre o GO TOUR" value="v1.0.0" />
        </Section>

        <Section title="SESSÃO">
          <SettingRow icon="log-out" label="Terminar Sessão" onPress={signOut} danger />
        </Section>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  scroll: { paddingTop: 20 },
  section: { marginBottom: 8, paddingHorizontal: 16 },
  sectionTitle: { fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, marginLeft: 4 },
  sectionCard: { borderRadius: 16, borderWidth: 1, overflow: "hidden" },
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12, borderBottomWidth: 1 },
  rowIcon: { width: 34, height: 34, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  rowLabel: { flex: 1, fontSize: 15, fontWeight: "500" },
  rowValue: { fontSize: 14, marginRight: 4 },
});
