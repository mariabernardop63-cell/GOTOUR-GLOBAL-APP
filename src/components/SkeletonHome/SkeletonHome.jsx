import React from 'react';
import './SkeletonHome.css';

const SkeletonHome = () => {
    return (
        <div className="skeleton-home">
            {/* Skeleton Chips Row */}
            <div className="skeleton-chips-row">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="skeleton-chip shimmer" />
                ))}
            </div>

            {/* Skeleton Section Title */}
            <div className="skeleton-section">
                <div className="skeleton-title shimmer" />
                <div className="skeleton-subtitle shimmer" />
            </div>

            {/* Skeleton Destination Cards (horizontal scroll) */}
            <div className="skeleton-cards-row">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="skeleton-card">
                        <div className="skeleton-card-image shimmer" />
                        <div className="skeleton-card-info">
                            <div className="skeleton-card-title shimmer" />
                            <div className="skeleton-card-text shimmer" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Skeleton Section Title 2 */}
            <div className="skeleton-section">
                <div className="skeleton-title shimmer" />
                <div className="skeleton-subtitle shimmer" />
            </div>

            {/* Skeleton Vertical Cards */}
            <div className="skeleton-vertical-cards">
                {[1, 2].map((i) => (
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
};

export default SkeletonHome;
