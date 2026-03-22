import { supabase } from './supabase';

/**
 * GO TOUR – Centralized Input Validators & Real Supabase Checks
 * Auth (login/password) is handled by Supabase directly.
 */

// ── Exact Email Existence Check via Supabase RPC ──

/**
 * Accurately checks if an email exists AND is OTP-confirmed in Supabase Auth.
 * A user is only "registered" if they completed OTP verification (email_confirmed_at IS NOT NULL).
 * Users who started signup but abandoned before OTP are NOT considered registered.
 * 
 * To make this work, the Supabase project MUST have this function created:
 * 
 * CREATE OR REPLACE FUNCTION check_user_exists(user_email TEXT) RETURNS BOOLEAN
 * LANGUAGE plpgsql SECURITY DEFINER AS $$
 * BEGIN RETURN EXISTS (SELECT 1 FROM auth.users WHERE email = user_email AND email_confirmed_at IS NOT NULL); END; $$;
 * 
 * @param {string} email
 * @returns {Promise<{ exists: boolean, error: string|null }>}
 */
export const checkEmailExists = async (email) => {
    try {
        const rpcPromise = supabase.rpc('check_user_exists', { user_email: email.trim().toLowerCase() });
        const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('TIMEOUT_RPC')), 5000));
        
        const { data, error } = await Promise.race([rpcPromise, timeoutPromise]);
        
        if (error) {
            console.warn('RPC check_user_exists error:', error);
            // We return the error rather than failing silently, so the UI can display it
            return { exists: false, error: 'A validação do servidor falhou. Tente novamente mais tarde.' };
        }
        
        return { exists: !!data, error: null };
    } catch (err) {
        if (err.message === 'TIMEOUT_RPC') {
            return { exists: false, error: 'O servidor está a demorar demasiado. Verifique a internet e tente novamente.' };
        }
        return { exists: false, error: 'Erro de conexão ao validar dados.' };
    }
};

// ── Validators ──

/**
 * Validate full name: must contain at least one space (first + last name)
 * and at least one vowel character.
 * @param {string} name
 * @returns {{ isValid: boolean, error: string }}
 */
export const validateFullName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) {
        return { isValid: false, error: 'Nome obrigatório' };
    }
    if (trimmed.length < 2) {
        return { isValid: false, error: 'Nome deve ter no mínimo 2 caracteres' };
    }
    if (!trimmed.includes(' ') || trimmed.split(' ').filter(p => p.length > 0).length < 2) {
        return { isValid: false, error: 'Introduza o nome completo (primeiro e último nome)' };
    }
    const vowels = /[aeiouàáâãèéêìíîòóôõùúûAEIOUÀÁÂÃÈÉÊÌÍÎÒÓÔÕÙÚÛ]/;
    if (!vowels.test(trimmed)) {
        return { isValid: false, error: 'O nome deve conter pelo menos uma vogal' };
    }
    return { isValid: true, error: '' };
};

/**
 * Validate phone number: only digits, min 7, max 15.
 * @param {string} phone
 * @returns {{ isValid: boolean, error: string }}
 */
export const validatePhone = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (!digitsOnly) {
        return { isValid: false, error: 'Telefone obrigatório' };
    }
    if (digitsOnly.length < 7) {
        return { isValid: false, error: 'O número deve ter no mínimo 7 dígitos' };
    }
    if (digitsOnly.length > 15) {
        return { isValid: false, error: 'O número deve ter no máximo 15 dígitos' };
    }
    return { isValid: true, error: '' };
};

/**
 * Validate age: user must be at least 16 years old.
 * @param {number|string} day
 * @param {number|string} month
 * @param {number|string} year
 * @returns {{ isValid: boolean, error: string }}
 */
export const validateAge = (day, month, year) => {
    if (!day || !month || !year) {
        return { isValid: false, error: 'Data de nascimento obrigatória' };
    }

    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 16) {
        return { isValid: false, error: 'A idade mínima para utilizar a GoTour é de 16 anos.' };
    }

    return { isValid: true, error: '' };
};
