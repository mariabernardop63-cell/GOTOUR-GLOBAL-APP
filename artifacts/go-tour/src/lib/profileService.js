import { supabase, STORAGE_URL } from './supabase';

const AVATARS_BUCKET = 'avatars';
const COVERS_BUCKET = 'covers';

export async function getProfile(userId) {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
    if (error) throw error;
    return data;
}

export async function upsertProfile(userId, updates) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            ...updates,
            updated_at: new Date().toISOString()
        }, { onConflict: 'id' })
        .select()
        .single();
    if (error) throw error;
    return data;
}

export async function uploadAvatar(userId, file) {
    const ext = file.name.split('.').pop();
    const path = `${userId}/avatar.${ext}`;

    const { error } = await supabase.storage
        .from(AVATARS_BUCKET)
        .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
        .from(AVATARS_BUCKET)
        .getPublicUrl(path);

    return data.publicUrl + `?t=${Date.now()}`;
}

export async function uploadCover(userId, file) {
    const ext = file.name.split('.').pop();
    const path = `${userId}/cover.${ext}`;

    const { error } = await supabase.storage
        .from(COVERS_BUCKET)
        .upload(path, file, { upsert: true });

    if (error) throw error;

    const { data } = supabase.storage
        .from(COVERS_BUCKET)
        .getPublicUrl(path);

    return data.publicUrl + `?t=${Date.now()}`;
}

export async function uploadAvatarFromBlob(userId, blobUrl) {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const ext = blob.type.split('/')[1] || 'jpg';
    const file = new File([blob], `avatar.${ext}`, { type: blob.type });
    return uploadAvatar(userId, file);
}

export function getAvatarUrl(profile) {
    return profile?.avatar_url || null;
}

export function getDisplayName(profile, authUser) {
    if (profile?.name) return profile.name;
    if (authUser?.email) {
        const emailName = authUser.email.split('@')[0];
        return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'Viajante';
}

export function getUsername(profile, authUser) {
    if (profile?.username) return `@${profile.username}`;
    if (authUser?.email) return `@${authUser.email.split('@')[0].toLowerCase()}`;
    return '@utilizador';
}
