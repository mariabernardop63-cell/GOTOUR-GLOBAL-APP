import { useNavigate, useLocation } from 'react-router-dom';
import { ListFilter, User, ChevronLeft, Search } from 'lucide-react';
import gotourLogo from '../../assets/images/gotour_icon.png';
import { useNavigation } from '../../context/NavigationContext';
import { useAuth } from '../../context/AuthContext';
import './HomeHeader.css';

const HomeHeader = ({ onMenuClick, onLogoClick, isDrawerOpen, isSearching, searchQuery, onSearchClick }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setModalBackground } = useNavigation();
    const { profile } = useAuth();

    const avatarUrl = profile?.avatar_url || null;

    return (
        <header className="home-header" style={{ background: '#ffffff' }}>
            <button className="logo-button" onClick={onLogoClick} aria-label={isSearching ? "Back to Home" : "Go to Home"}>
                {isSearching ? (
                    <ChevronLeft size={28} color="#1e293b" />
                ) : (
                    <img src={gotourLogo} alt="GoTour" className="home-header-logo" />
                )}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                    onClick={() => {
                        setModalBackground(location);
                        navigate('/profile');
                    }}
                    className="header-avatar-btn"
                    aria-label="Ir para o Perfil"
                >
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Perfil"
                            className="header-avatar-img"
                        />
                    ) : (
                        <div className="header-avatar-placeholder">
                            <User size={20} strokeWidth={2} color="#475569" />
                        </div>
                    )}
                </button>
                <button className="menu-pill-button" onClick={onMenuClick} aria-label="Toggle menu" aria-expanded={isDrawerOpen}>
                    <ListFilter size={24} strokeWidth={2.5} color="#0e172a" />
                </button>
            </div>
        </header>
    );
};

export default HomeHeader;
