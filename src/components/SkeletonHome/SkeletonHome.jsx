import React from 'react';
import './SkeletonHome.css';

/* ============================================================
   Per-section skeleton components that match real content layout
   ============================================================ */

/** Skeleton for SearchBar area */
export const SkeletonSearchBar = () => (
    <div className="skeleton-search-bar">
        <div className="skeleton-country-btn shimmer" />
        <div className="skeleton-search-input shimmer" />
        <div className="skeleton-search-icon shimmer" />
    </div>
);

/** Skeleton for Filter Chips Row */
export const SkeletonChips = () => (
    <div className="skeleton-chips-row">
        {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-chip shimmer" />
        ))}
    </div>
);

/** Skeleton for MustSee Section — matches horizontal scroll cards */
export const SkeletonMustSee = () => (
    <div className="skeleton-must-see">
        {/* Title area */}
        <div className="skeleton-section-header">
            <div>
                <div className="skeleton-title shimmer" />
                <div className="skeleton-subtitle shimmer" />
            </div>
            <div className="skeleton-link shimmer" />
        </div>
        {/* Horizontal cards matching destination-card dimensions */}
        <div className="skeleton-horizontal-scroll">
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-dest-card shimmer" />
            ))}
        </div>
    </div>
);

/** Skeleton for NearYou Section — matches horizontal small cards */
export const SkeletonNearYou = () => (
    <div className="skeleton-near-you">
        {/* Title area */}
        <div className="skeleton-section-header">
            <div>
                <div className="skeleton-title shimmer" />
                <div className="skeleton-subtitle shimmer" />
            </div>
            <div className="skeleton-link shimmer" />
        </div>
        {/* Horizontal small cards */}
        <div className="skeleton-horizontal-scroll">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="skeleton-near-card">
                    <div className="skeleton-near-img shimmer" />
                    <div className="skeleton-near-info">
                        <div className="skeleton-near-name shimmer" />
                        <div className="skeleton-near-category shimmer" />
                        <div className="skeleton-near-meta shimmer" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/** Skeleton for Recommendations Section — matches vertical place-cards */
export const SkeletonRecommendations = () => (
    <div className="skeleton-recommendations">
        <div className="skeleton-title shimmer" style={{ margin: '24px 20px 16px' }} />
        <div className="skeleton-vertical-cards">
            {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-vertical-card">
                    <div className="skeleton-vcard-image shimmer" />
                    <div className="skeleton-vcard-info">
                        <div className="skeleton-vcard-title shimmer" />
                        <div className="skeleton-vcard-text shimmer" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/** Legacy full-page skeleton (kept for backwards compatibility) */
const SkeletonHome = () => {
    return (
        <div className="skeleton-home">
            <SkeletonMustSee />
            <SkeletonNearYou />
            <SkeletonRecommendations />
        </div>
    );
};

export default SkeletonHome;
