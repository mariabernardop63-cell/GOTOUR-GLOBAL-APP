import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authEvent, setAuthEvent] = useState(null);
    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);

    const fetchProfile = useCallback(async (userId) => {
        if (!userId) { setProfile(null); return; }
        setProfileLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();
            if (error) {
                console.error('Error fetching profile:', error);
            } else {
                setProfile(data || null);
            }
        } catch (err) {
            console.error('Error fetching profile:', err);
        } finally {
            setProfileLoading(false);
        }
    }, []);

    const refreshProfile = useCallback(async () => {
        if (user?.id) {
            await fetchProfile(user.id);
        }
    }, [user, fetchProfile]);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
            if (session?.user) {
                ensureProfile(session.user).then(() => fetchProfile(session.user.id));
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setAuthEvent(event);
                setLoading(false);

                if (event === 'SIGNED_IN' && session?.user) {
                    ensureProfile(session.user)
                        .then(() => fetchProfile(session.user.id))
                        .catch(err => console.error('Ensure profile err:', err));
                } else if (event === 'SIGNED_OUT') {
                    setProfile(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, [fetchProfile]);

    const ensureProfile = async (user) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .maybeSingle();

            if (!data && !error) {
                const emailName = user.email ? user.email.split('@')[0] : 'viajante';
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        name: null,
                        username: null,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    });

                if (insertError && insertError.code !== '23505') {
                    console.error('Error creating profile:', insertError);
                }
            }
        } catch (err) {
            console.error('Error checking profile:', err);
        }
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        setUser(null);
        setSession(null);
        setAuthEvent(null);
        setProfile(null);
    };

    const value = {
        user,
        setUser,
        session,
        setSession,
        loading,
        authEvent,
        profile,
        profileLoading,
        refreshProfile,
        signOut,
        supabase
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
