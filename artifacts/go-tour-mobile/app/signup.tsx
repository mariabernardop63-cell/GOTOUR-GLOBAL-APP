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

import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function SignupScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const handleSignUp = async () => {
    if (!email || !password || !confirm) {
      setError("Por favor, preenche todos os campos.");
      return;
    }
    if (password !== confirm) {
      setError("As palavras-passe não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A palavra-passe deve ter pelo menos 6 caracteres.");
      return;
    }
    setError(null);
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const { error } = await signUp(email.trim(), password);
    setLoading(false);
    if (error) {
      setError("Erro ao criar conta. Verifica os teus dados.");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.successContainer}>
          <View style={[styles.successIcon, { backgroundColor: "#dcfce7" }]}>
            <Feather name="check-circle" size={48} color="#10b981" />
          </View>
          <Text style={[styles.successTitle, { color: colors.text }]}>
            Conta criada!
          </Text>
          <Text style={[styles.successSubtitle, { color: colors.mutedForeground }]}>
            Verifica o teu email para confirmar a conta.
          </Text>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.replace("/login")}
          >
            <Text style={styles.primaryBtnText}>Ir para o Login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: topPadding + 12, paddingBottom: bottomPadding + 24 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={[styles.backBtn, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={20} color={colors.text} />
        </Pressable>

        <View style={styles.titleArea}>
          <View style={[styles.logoCircle, { backgroundColor: colors.primary }]}>
            <Feather name="map" size={32} color="#fff" />
          </View>
          <Text style={[styles.appName, { color: colors.primary }]}>GO TOUR</Text>
          <Text style={[styles.pageTitle, { color: colors.text }]}>Criar Conta</Text>
          <Text style={[styles.pageSubtitle, { color: colors.mutedForeground }]}>
            Junta-te a milhares de viajantes
          </Text>
        </View>

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

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Palavra-passe</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name="lock" size={18} color={colors.mutedForeground} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Mín. 6 caracteres"
                placeholderTextColor={colors.mutedForeground}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPw}
                autoCorrect={false}
              />
              <Pressable onPress={() => setShowPw((v) => !v)}>
                <Feather name={showPw ? "eye-off" : "eye"} size={18} color={colors.mutedForeground} />
              </Pressable>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={[styles.label, { color: colors.text }]}>Confirmar Palavra-passe</Text>
            <View style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Feather name="lock" size={18} color={colors.mutedForeground} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Repete a palavra-passe"
                placeholderTextColor={colors.mutedForeground}
                value={confirm}
                onChangeText={setConfirm}
                secureTextEntry={!showPw}
                autoCorrect={false}
              />
            </View>
          </View>

          <Pressable
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryBtnText}>Criar Conta</Text>
            )}
          </Pressable>

          <Pressable onPress={() => router.replace("/login")}>
            <Text style={[styles.switchText, { color: colors.mutedForeground }]}>
              Já tens conta?{" "}
              <Text style={{ color: colors.primary, fontWeight: "700" }}>Entrar</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { paddingHorizontal: 24 },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  titleArea: {
    alignItems: "center",
    marginBottom: 32,
    gap: 8,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  appName: {
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 3,
  },
  pageTitle: {
    fontSize: 26,
    fontWeight: "800",
  },
  pageSubtitle: {
    fontSize: 15,
    textAlign: "center",
  },
  form: { gap: 14 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  errorText: { color: "#ef4444", fontSize: 14, flex: 1 },
  field: { gap: 6 },
  label: { fontSize: 14, fontWeight: "600" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 10,
  },
  input: { flex: 1, fontSize: 16 },
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#048c83",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  switchText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 4,
  },
  successContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    gap: 16,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: "800",
  },
  successSubtitle: {
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },
});
