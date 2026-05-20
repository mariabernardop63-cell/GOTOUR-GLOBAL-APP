import React from 'react';
import './SkeletonHome.css';

/* ============================================================
   Airbnb-style Skeletons (Geometry Matched)
   ============================================================ */

/** 1. SearchBar: Real white pill with ghost items inside */
export const SkeletonSearchBar = () => (
    <div className="skeleton-search-bar">
        <div className="skeleton-search-pill-container">
            <div className="skeleton-search-text shimmer" />
            <div className="skeleton-search-icon-round shimmer" />
        </div>
    </div>
);

/** 2. Chips: Small round items */
export const SkeletonChips = () => (
    <div className="skeleton-chips-row">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <div key={i} className="skeleton-chip shimmer" />
        ))}
    </div>
);

/** Generic Title-only skeleton (for sections that share cards) */
export const SkeletonSectionHeader = () => (
    <div className="skeleton-section-header-simple">
        <div className="skeleton-ab-line-main shimmer" style={{ width: '220px', height: '20px', marginBottom: '16px', marginLeft: '20px' }} />
    </div>
);

/** 3. MustSee: 210px cards */
export const SkeletonMustSee = () => (
    <div className="skeleton-must-see">
        <SkeletonSectionHeader />
        <div className="skeleton-horizontal-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={`ms-${i}`} className="skeleton-ab-card skeleton-must-see-card">
                    <div className="skeleton-ab-image shimmer" />
                    <div className="skeleton-ab-text-block">
                        <div className="skeleton-ab-line-main shimmer" />
                        <div className="skeleton-ab-line-sub shimmer" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/** 4. NearYou: Small 160px cards */
export const SkeletonNearYou = () => (
    <div className="skeleton-near-you">
        <SkeletonSectionHeader />
        <div className="skeleton-horizontal-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={`ny-${i}`} className="skeleton-ab-card skeleton-near-you-card">
                    <div className="skeleton-ab-image shimmer" />
                    <div className="skeleton-ab-text-block">
                        <div className="skeleton-ab-line-main shimmer" />
                        <div className="skeleton-ab-line-sub shimmer" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/** 5. Explore Regions: 260px wide vertical cards */
export const SkeletonExploreRegions = () => (
    <div className="skeleton-explore-regions">
        <SkeletonSectionHeader />
        <div className="skeleton-horizontal-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={`reg-${i}`} className="skeleton-ab-card skeleton-region-card">
                    <div className="skeleton-ab-image shimmer" />
                </div>
            ))}
        </div>
    </div>
);

/** 6. Standard/Category Sections: Recyclable 180px cards */
export const SkeletonStandardSection = () => (
    <div className="skeleton-standard-section" style={{ marginBottom: '32px' }}>
        <SkeletonSectionHeader />
        <div className="skeleton-horizontal-scroll">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={`std-${i}`} className="skeleton-ab-card skeleton-must-see-card">
                    <div className="skeleton-ab-image shimmer" />
                    <div className="skeleton-ab-text-block">
                        <div className="skeleton-ab-line-main shimmer" />
                        <div className="skeleton-ab-line-sub shimmer" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

/** 7. Recommendations: Full vertical grid cards */
export const SkeletonRecommendations = () => (
    <div className="skeleton-recommendations">
        <SkeletonSectionHeader />
        <div className="skeleton-vertical-grid">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                <div key={`rc-${i}`} className="skeleton-ab-card skeleton-large-card">
                    <div className="skeleton-ab-image shimmer" />
                    <div className="skeleton-ab-text-block">
                        <div className="skeleton-ab-line-main shimmer" />
                        <div className="skeleton-ab-line-sub shimmer" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default SkeletonMustSee;
