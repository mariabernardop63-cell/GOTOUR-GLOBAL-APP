import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('A preparar a sua conta...');

    useEffect(() => {
        let mounted = true;

        const handleSession = async (session) => {
            if (!mounted) return;
            try {
                const user = session.user;

                // Check profile completeness in DB
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('phone, nationality')
                    .eq('id', user.id)
                    .single();

                if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "Not Found"
                    console.error('Error fetching profile:', profileError);
                }

                // Does user have phone and nationality?
                const hasPhone = profile?.phone && String(profile.phone).trim().length > 0;
                const hasNationality = profile?.nationality && String(profile.nationality).trim().length > 0;

                if (hasPhone && hasNationality) {
                    // Profile complete -> Treated as LOGIN
                    navigate('/home');
                } else {
                    // Profile incomplete -> Treated as SIGNUP! Sent to "Quase lá"
                    // We can pass state so Demo Signup knows to start at step 2.
                    navigate('/signup', {
                        state: {
                            requireProfileCompletion: true,
                            email: user.email,
                            fullName: user.user_metadata?.full_name || ''
                        }
                    });
                }
            } catch (err) {
                console.error('Exception in OAuth Callback:', err);
                if (mounted) navigate('/');
            }
        };

        const checkUserSession = async () => {
            try {
                // Get the session that Supabase just created from the URL hash
                const { data: { session }, error } = await supabase.auth.getSession();

                if (session) {
                    await handleSession(session);
                } else {
                    // Fallback: wait for onAuthStateChange to fire if session is parsed asynchronously
                    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
                        if (newSession && mounted) {
                            handleSession(newSession);
                            subscription.unsubscribe();
                        }
                    });

                    // Timeout fallback in case no session is ever found
                    setTimeout(() => {
                        if (mounted) {
                            console.error('OAuth Callback Error: No session found after timeout');
                            navigate('/');
                        }
                    }, 5000);
                }
            } catch (err) {
                console.error('Exception in checkUserSession:', err);
                if (mounted) navigate('/');
            }
        };

        checkUserSession();

        return () => {
            mounted = false;
        };
    }, [navigate]);

    return (
        <div style={{
            height: '100vh',
            backgroundColor: '#00B4A9'
        }} />
    );
};

export default OAuthCallback;
