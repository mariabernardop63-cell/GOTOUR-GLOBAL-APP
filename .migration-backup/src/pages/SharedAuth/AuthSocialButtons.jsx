import React from 'react';

const AuthSocialButtons = ({ onGoogleClick, onDiscordClick }) => {
    return (
        <>
            <div className="da-divider da-social-divider" style={{ width: '100%' }}>
                <span>Ou continue com</span>
            </div>
            <div className="da-social-row">
                {/* Google */}
                <button className="da-social-btn-transparent" onClick={onGoogleClick} aria-label="Continue with Google">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" width="24" height="24" />
                </button>
                {/* Apple */}
                <button className="da-social-btn-transparent" aria-label="Continue with Apple">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.647-.026 2.669-1.48 3.669-2.948 1.16-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.091-3.623-2.324-4.39-2.376-2.092-.208-4.08 1.258-5.111 1.258zm-1.03-3.414c.831-1.026 1.4-2.455 1.246-3.868-1.22.052-2.73.818-3.58 1.831-.762.909-1.44 2.364-1.26 3.766 1.364.104 2.766-.688 3.594-1.729z" />
                    </svg>
                </button>
                {/* Microsoft */}
                <button className="da-social-btn-transparent" aria-label="Continue with Microsoft">
                    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#f35325" d="M1 1h10.5v10.5H1z" />
                        <path fill="#81bc06" d="M12.5 1H23v10.5H12.5z" />
                        <path fill="#05a6f0" d="M1 12.5h10.5V23H1z" />
                        <path fill="#ffba08" d="M12.5 12.5H23V23H12.5z" />
                    </svg>
                </button>
                {/* Facebook */}
                <button className="da-social-btn-transparent" aria-label="Continue with Facebook">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" width="24" height="24" />
                </button>
                {/* Discord */}
                <button className="da-social-btn-transparent" onClick={onDiscordClick} aria-label="Continue with Discord">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#5865F2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.27 4.73C17.81 4.05 16.2 3.56 14.53 3.32C14.32 3.68 14.07 4.18 13.9 4.59C12.11 4.32 10.33 4.32 8.57 4.59C8.4 4.18 8.13 3.68 7.92 3.32C6.25 3.56 4.64 4.05 3.18 4.73C0.25 9.17 -0.54 13.5 0.14 17.76C2.1 19.22 3.99 20.11 5.86 20.68C6.33 20.04 6.74 19.34 7.08 18.61C6.41 18.36 5.77 18.04 5.17 17.67C5.33 17.55 5.49 17.43 5.64 17.3C9.38 19.04 13.46 19.04 17.16 17.3C17.31 17.43 17.47 17.55 17.64 17.67C17.03 18.04 16.39 18.36 15.73 18.61C16.07 19.34 16.48 20.04 16.95 20.68C18.82 20.11 20.72 19.22 22.68 17.76C23.47 12.89 21.36 8.57 19.27 4.73ZM8.02 15.33C6.9 15.33 5.97 14.3 5.97 13.04C5.97 11.78 6.9 10.75 8.02 10.75C9.15 10.75 10.06 11.78 10.05 13.04C10.05 14.3 9.15 15.33 8.02 15.33ZM14.79 15.33C13.67 15.33 12.74 14.3 12.74 13.04C12.74 11.78 13.67 10.75 14.79 10.75C15.91 10.75 16.83 11.78 16.82 13.04C16.82 14.3 15.91 15.33 14.79 15.33Z" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default AuthSocialButtons;
