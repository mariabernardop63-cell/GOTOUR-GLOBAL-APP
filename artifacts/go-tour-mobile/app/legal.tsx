import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";

const SECTIONS = [
  { id: "terms", title: "Termos de Utilização", icon: "file-text" as const },
  { id: "privacy", title: "Política de Privacidade", icon: "shield" as const },
  { id: "cookies", title: "Política de Cookies", icon: "info" as const },
];

const CONTENT: Record<string, string> = {
  terms: `Ao utilizar o GO TOUR, concordas com estes termos. A plataforma destina-se à descoberta de destinos turísticos em Moçambique e África.\n\nOs utilizadores são responsáveis pelas informações partilhadas. O conteúdo da plataforma é propriedade do GO TOUR e não pode ser reproduzido sem autorização.\n\nReservamo-nos o direito de suspender contas que violem as nossas políticas de uso.`,
  privacy: `O GO TOUR recolhe apenas os dados necessários para o funcionamento da plataforma: email, preferências de viagem e histórico de pesquisa.\n\nNão partilhamos dados pessoais com terceiros sem o teu consentimento explícito.\n\nPodes solicitar a eliminação da tua conta e todos os dados associados a qualquer momento.`,
  cookies: `Utilizamos cookies essenciais para manter a tua sessão activa e cookies de análise para melhorar a experiência.\n\nPodes desactivar cookies não essenciais nas definições do teu browser, mas isso pode afectar algumas funcionalidades.`,
};

export default function LegalScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;
  const [active, setActive] = useState("terms");

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.backBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Legal</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
        {SECTIONS.map((s) => (
          <Pressable key={s.id} style={[styles.tab, active === s.id && { borderBottomColor: colors.primary, borderBottomWidth: 2 }]} onPress={() => setActive(s.id)}>
            <Feather name={s.icon} size={15} color={active === s.id ? colors.primary : colors.mutedForeground} />
            <Text style={[styles.tabText, { color: active === s.id ? colors.primary : colors.mutedForeground }]} numberOfLines={1}>{s.title}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding + 40 }]} showsVerticalScrollIndicator={false}>
        <Text style={[styles.content, { color: colors.mutedForeground }]}>{CONTENT[active]}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  backBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  tabs: { flexDirection: "row", borderBottomWidth: 1 },
  tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 12 },
  tabText: { fontSize: 12, fontWeight: "600" },
  scroll: { padding: 20 },
  content: { fontSize: 15, lineHeight: 24 },
});
