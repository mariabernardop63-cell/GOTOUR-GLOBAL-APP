import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Loader2 } from 'lucide-react';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [status, setStatus] = useState('A preparar a sua conta...');

    useEffect(() => {
        let mounted = true;

        const checkUrlErrors = () => {
            const searchParams = new URLSearchParams(location.search);
            const error = searchParams.get('error_description') || searchParams.get('error');
            if (error) {
                console.error('OAuth Callback: Error in URL:', error);
                setStatus(`Erro de Autenticação: ${error}`);
                setTimeout(() => { if (mounted) navigate('/'); }, 3000);
                return true;
            }
            return false;
        };

        if (checkUrlErrors()) return;

        const handleSession = async (session) => {
            if (!mounted) return;
            try {
                const user = session.user;
                console.log('OAuth Callback: Session found for user', user.email);
                setStatus('A verificar o seu perfil...');

                // Check profile completeness in DB
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('phone, nationality')
                    .eq('id', user.id)
                    .single();

                if (profileError && profileError.code !== 'PGRST116') {
                    console.error('Error fetching profile:', profileError);
                }

                const hasPhone = profile?.phone && String(profile.phone).trim().length > 0;
                const hasNationality = profile?.nationality && String(profile.nationality).trim().length > 0;

                const isFullyRegistered = user.user_metadata?.full_signup_completed;

                if (isFullyRegistered) {
                    console.log('OAuth Callback: Registration complete, redirecting to home');
                    navigate('/home');
                } else {
                    console.log('OAuth Callback: Registration incomplete, redirecting to profile completion');
                    navigate('/signup', {
                        replace: true,
                        state: {
                            requireProfileCompletion: true,
                            isOAuthFlow: true,
                            email: user.email,
                            fullName: user.user_metadata?.full_name || user.user_metadata?.name || user.user_metadata?.custom_claims?.full_name || ''
                        }
                    });
                }
            } catch (err) {
                console.error('Exception in OAuth Callback handleSession:', err);
                if (mounted) navigate('/');
            }
        };

        const checkUserSession = async () => {
            try {
                console.log('OAuth Callback: Checking for session...');
                const { data: { session }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error('OAuth Callback: getSession error:', error);
                }

                if (session) {
                    console.log('OAuth Callback: Session obtained directly');
                    await handleSession(session);
                } else {
                    console.log('OAuth Callback: No session found directly, listening for changes...');
                    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, newSession) => {
                        console.log('OAuth Callback: Auth state changed:', event);
                        if (newSession && mounted) {
                            handleSession(newSession);
                            subscription.unsubscribe();
                        }
                    });

                    setTimeout(() => {
                        if (mounted) {
                            // If we already navigated or handled it, this is a no-op
                            const currentPath = window.location.pathname;
                            if (currentPath === '/oauth-callback') {
                                console.error('OAuth Callback: No session found after 5s timeout');
                                setStatus('Erro: Sessão não encontrada. A voltar...');
                                setTimeout(() => { if (mounted) navigate('/'); }, 2000);
                            }
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
            width: '100vw',
            backgroundColor: '#00B4A9',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontFamily: 'Poppins, sans-serif'
        }}>
            <Loader2 className="animate-spin" size={48} style={{ marginBottom: '20px' }} />
            <p style={{ fontSize: '18px', fontWeight: '500' }}>{status}</p>
        </div>
    );
};

export default OAuthCallback;
