import { supabase } from './supabase';

/**
 * The `friendships` table schema:
 *   id, requester_id, addressee_id, status ('pending'|'accepted'|'rejected'), created_at, updated_at
 *
 * A friendship is accepted when status = 'accepted' and the current user is either requester or addressee.
 * A received request is status = 'pending' and current user is addressee.
 * A sent request is status = 'pending' and current user is requester.
 */

export const friendsService = {

    async getFriends(userId) {
        const { data, error } = await supabase
            .from('friendships')
            .select(`
                id,
                requester_id,
                addressee_id,
                created_at,
                requester:profiles!friendships_requester_id_fkey(id, name, username, avatar_url, nationality),
                addressee:profiles!friendships_addressee_id_fkey(id, name, username, avatar_url, nationality)
            `)
            .eq('status', 'accepted')
            .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

        if (error) throw error;

        return (data || []).map(row => {
            const friend = row.requester_id === userId ? row.addressee : row.requester;
            return {
                id: friend?.id,
                friendshipId: row.id,
                name: friend?.name || 'Utilizador',
                username: friend?.username ? `@${friend.username}` : null,
                avatar: friend?.avatar_url || null,
                nationality: friend?.nationality || null,
                online: false,
                isFavorite: false,
            };
        });
    },

    async getReceivedRequests(userId) {
        const { data, error } = await supabase
            .from('friendships')
            .select(`
                id,
                created_at,
                requester:profiles!friendships_requester_id_fkey(id, name, username, avatar_url)
            `)
            .eq('addressee_id', userId)
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(r => ({
            id: r.id,
            senderId: r.requester?.id,
            name: r.requester?.name || 'Utilizador',
            username: r.requester?.username ? `@${r.requester.username}` : null,
            avatar: r.requester?.avatar_url || null,
            date: formatDate(r.created_at),
        }));
    },

    async getSentRequests(userId) {
        const { data, error } = await supabase
            .from('friendships')
            .select(`
                id,
                created_at,
                addressee:profiles!friendships_addressee_id_fkey(id, name, username, avatar_url)
            `)
            .eq('requester_id', userId)
            .eq('status', 'pending')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(r => ({
            id: r.id,
            receiverId: r.addressee?.id,
            name: r.addressee?.name || 'Utilizador',
            username: r.addressee?.username ? `@${r.addressee.username}` : null,
            avatar: r.addressee?.avatar_url || null,
            status: 'pending',
            date: formatDate(r.created_at),
        }));
    },

    async getSuggestions(userId, searchTerm = '') {
        // Get IDs of users already in a friendship relationship (any status)
        const { data: existing } = await supabase
            .from('friendships')
            .select('requester_id, addressee_id')
            .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

        const excludeIds = new Set([userId]);
        (existing || []).forEach(r => {
            excludeIds.add(r.requester_id);
            excludeIds.add(r.addressee_id);
        });

        let query = supabase
            .from('profiles')
            .select('id, name, username, avatar_url, nationality')
            .order('created_at', { ascending: false })
            .limit(30);

        if (searchTerm.trim()) {
            query = query.or(`username.ilike.%${searchTerm.trim()}%,name.ilike.%${searchTerm.trim()}%`);
        }

        const { data, error } = await query;
        if (error) throw error;

        return (data || [])
            .filter(p => !excludeIds.has(p.id))
            .map(p => ({
                id: p.id,
                name: p.name || 'Utilizador',
                username: p.username ? `@${p.username}` : null,
                avatar: p.avatar_url || null,
                nationality: p.nationality || null,
            }));
    },

    async sendFriendRequest(senderId, receiverId) {
        const { error } = await supabase
            .from('friendships')
            .insert({
                requester_id: senderId,
                addressee_id: receiverId,
                status: 'pending'
            });
        if (error) throw error;
    },

    async acceptFriendRequest(requestId) {
        const { error } = await supabase
            .from('friendships')
            .update({ status: 'accepted', updated_at: new Date().toISOString() })
            .eq('id', requestId);
        if (error) throw error;
    },

    async rejectFriendRequest(requestId) {
        const { error } = await supabase
            .from('friendships')
            .update({ status: 'rejected', updated_at: new Date().toISOString() })
            .eq('id', requestId);
        if (error) throw error;
    },

    async cancelFriendRequest(requestId) {
        const { error } = await supabase
            .from('friendships')
            .delete()
            .eq('id', requestId);
        if (error) throw error;
    },

    async removeFriend(userId, friendId) {
        const { error } = await supabase
            .from('friendships')
            .delete()
            .or(
                `and(requester_id.eq.${userId},addressee_id.eq.${friendId}),` +
                `and(requester_id.eq.${friendId},addressee_id.eq.${userId})`
            );
        if (error) throw error;
    },
};

function formatDate(isoString) {
    if (!isoString) return '';
    const d = new Date(isoString);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'Agora';
    if (diffMin < 60) return `Há ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `Há ${diffH} hora${diffH > 1 ? 's' : ''}`;
    const diffD = Math.floor(diffH / 24);
    if (diffD === 1) return 'Ontem';
    if (diffD < 7) return `Há ${diffD} dias`;
    const diffW = Math.floor(diffD / 7);
    if (diffW === 1) return 'Há 1 semana';
    return `Há ${diffW} semanas`;
}
