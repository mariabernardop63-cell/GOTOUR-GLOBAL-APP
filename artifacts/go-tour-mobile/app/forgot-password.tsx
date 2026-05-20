import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useColors } from "@/hooks/useColors";

export default function ForgotPasswordScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const handleReset = async () => {
    if (!email) { setError("Insere o teu email."); return; }
    setError(null);
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    if (error) { setError("Erro ao enviar email. Verifica o endereço."); }
    else { setSent(true); }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingTop: topPadding + 12, paddingBottom: bottomPadding + 24 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>

        <View style={styles.logoArea}>
          <View style={[styles.iconCircle, { backgroundColor: colors.primarySoft }]}>
            <Feather name="lock" size={32} color={colors.primary} />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Recuperar Conta</Text>
          <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
            Envia um link de recuperação para o teu email.
          </Text>
        </View>

        {sent ? (
          <View style={[styles.successBox, { backgroundColor: "#dcfce7", borderColor: "#86efac" }]}>
            <Feather name="check-circle" size={24} color="#10b981" />
            <View style={{ flex: 1 }}>
              <Text style={[styles.successTitle, { color: "#065f46" }]}>Email enviado!</Text>
              <Text style={[styles.successText, { color: "#047857" }]}>
                Verifica a tua caixa de entrada e segue as instruções.
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            {error && (
              <View style={[styles.errorBox, { backgroundColor: "#fee2e2", borderColor: "#fca5a5" }]}>
                <Feather name="alert-circle" size={16} color="#ef4444" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <View style={styles.field}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name="mail" size={18} color={colors.mutedForeground} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="o.teu@email.com"
                  placeholderTextColor={colors.mutedForeground}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                />
              </View>
            </View>
            <Pressable
              style={[styles.btn, { backgroundColor: colors.primary }]}
              onPress={handleReset}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Enviar Link</Text>}
            </Pressable>
          </View>
        )}

        <Pressable onPress={() => router.replace("/login")}>
          <Text style={[styles.backToLogin, { color: colors.primary }]}>Voltar ao Login</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24 },
  backBtn: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, alignItems: "center", justifyContent: "center", marginBottom: 32 },
  logoArea: { alignItems: "center", marginBottom: 32, gap: 10 },
  iconCircle: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 4 },
  title: { fontSize: 26, fontWeight: "800" },
  subtitle: { fontSize: 15, textAlign: "center", lineHeight: 21 },
  form: { gap: 16 },
  errorBox: { flexDirection: "row", alignItems: "center", padding: 12, borderRadius: 12, borderWidth: 1, gap: 8 },
  errorText: { color: "#ef4444", fontSize: 14, flex: 1 },
  successBox: { flexDirection: "row", alignItems: "flex-start", padding: 16, borderRadius: 16, borderWidth: 1, gap: 12, marginBottom: 16 },
  successTitle: { fontSize: 15, fontWeight: "700" },
  successText: { fontSize: 14, marginTop: 2, lineHeight: 20 },
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: "600" },
  inputContainer: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14, borderWidth: 1, gap: 10 },
  input: { flex: 1, fontSize: 16 },
  btn: { paddingVertical: 16, borderRadius: 14, alignItems: "center", marginTop: 8 },
  btnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  backToLogin: { textAlign: "center", fontSize: 15, fontWeight: "600", marginTop: 20 },
});
