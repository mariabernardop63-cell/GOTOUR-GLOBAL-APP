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
import { useAuth } from "@/context/AuthContext";
import { useColors } from "@/hooks/useColors";

export default function EditProfileScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : insets.bottom;

  const [displayName, setDisplayName] = useState(user?.email?.split("@")[0] ?? "");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user?.id,
          display_name: displayName,
          bio,
          location_text: location,
          updated_at: new Date().toISOString(),
        });
      if (!error) { setSaved(true); setTimeout(() => { setSaved(false); router.back(); }, 1200); }
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[styles.header, { paddingTop: topPadding + 12, borderBottomColor: colors.border, backgroundColor: colors.background }]}>
        <Pressable style={[styles.iconBtn, { borderColor: colors.border }]} onPress={() => router.back()}>
          <Feather name="x" size={20} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Editar Perfil</Text>
        <Pressable style={[styles.saveBtn, { backgroundColor: colors.primary }]} onPress={handleSave} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" size="small" /> : <Text style={styles.saveBtnText}>{saved ? "Guardado!" : "Guardar"}</Text>}
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: bottomPadding + 40 }]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatarCircle, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarInitial}>{displayName.charAt(0).toUpperCase() || "U"}</Text>
          </View>
          <Pressable style={[styles.changePhoto, { backgroundColor: colors.primarySoft, borderColor: colors.primaryLight }]}>
            <Feather name="camera" size={14} color={colors.primary} />
            <Text style={[styles.changePhotoText, { color: colors.primary }]}>Alterar Foto</Text>
          </Pressable>
        </View>

        {/* Fields */}
        <View style={styles.fields}>
          {[
            { label: "Nome de Utilizador", value: displayName, onChange: setDisplayName, icon: "user", placeholder: "Como te chamas?" },
            { label: "Bio", value: bio, onChange: setBio, icon: "edit-2", placeholder: "Conta-nos sobre ti..." },
            { label: "Localização", value: location, onChange: setLocation, icon: "map-pin", placeholder: "De onde és?" },
          ].map((field) => (
            <View key={field.label} style={styles.field}>
              <Text style={[styles.fieldLabel, { color: colors.text }]}>{field.label}</Text>
              <View style={[styles.inputRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <Feather name={field.icon as any} size={17} color={colors.mutedForeground} />
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  value={field.value}
                  onChangeText={field.onChange}
                  placeholder={field.placeholder}
                  placeholderTextColor={colors.mutedForeground}
                  autoCorrect={false}
                  multiline={field.label === "Bio"}
                  numberOfLines={field.label === "Bio" ? 3 : 1}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: 17, fontWeight: "700" },
  saveBtn: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 12 },
  saveBtnText: { color: "#fff", fontSize: 14, fontWeight: "700" },
  scroll: { paddingTop: 24, paddingHorizontal: 20 },
  avatarSection: { alignItems: "center", marginBottom: 32, gap: 12 },
  avatarCircle: { width: 90, height: 90, borderRadius: 45, alignItems: "center", justifyContent: "center" },
  avatarInitial: { fontSize: 36, fontWeight: "800", color: "#fff" },
  changePhoto: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  changePhotoText: { fontSize: 13, fontWeight: "600" },
  fields: { gap: 16 },
  field: { gap: 6 },
  fieldLabel: { fontSize: 14, fontWeight: "600" },
  inputRow: { flexDirection: "row", alignItems: "flex-start", paddingHorizontal: 16, paddingVertical: 13, borderRadius: 14, borderWidth: 1, gap: 10 },
  input: { flex: 1, fontSize: 16 },
});
