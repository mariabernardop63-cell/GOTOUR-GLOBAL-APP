import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
                setLoading(false);

                // Auto-create profile on first sign-in
                if (event === 'SIGNED_IN' && session?.user) {
                    await ensureProfile(session.user);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const ensureProfile = async (user) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single();

            if (error && error.code === 'PGRST116') {
                // Profile doesn't exist, create it
                const { error: insertError } = await supabase
                    .from('profiles')
                    .insert({
                        id: user.id,
                        phone: user.phone || null,
                        created_at: new Date().toISOString()
                    });

                if (insertError) {
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
    };

    const value = {
        user,
        session,
        loading,
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
