import React from 'react';

const SkeletonAuth = () => {
    return (
        <>
            <div className="dl-form-section" style={{ animation: 'skeletonFadeIn 0.3s ease-out forwards' }}>
                {/* Title Skeleton */}
                <div className="shimmer" style={{ width: '60%', height: '36px', borderRadius: '4px', marginBottom: '28px' }} />

                <div className="dl-form">
                    {/* Inputs Skeleton */}
                    <div className="shimmer" style={{ width: '100%', height: '56px', borderRadius: '4px', marginBottom: '16px' }} />
                    <div className="shimmer" style={{ width: '100%', height: '56px', borderRadius: '4px', marginBottom: '16px' }} />

                    {/* Forgot Password / extra link Skeleton */}
                    <div className="shimmer" style={{ width: '130px', height: '16px', borderRadius: '4px', marginBottom: '28px' }} />

                    {/* Submit Button Skeleton */}
                    <div className="shimmer" style={{ width: '100%', height: '56px', borderRadius: '4px' }} />
                </div>
            </div>

            <div className="dl-social-section" style={{ animation: 'skeletonFadeIn 0.3s ease-out forwards', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="dl-social-buttons">
                    {/* Social Buttons Skeleton */}
                    <div className="shimmer" style={{ width: '100%', height: '52px', borderRadius: '0', marginBottom: '12px' }} />
                    <div className="shimmer" style={{ width: '100%', height: '52px', borderRadius: '0', marginBottom: '12px' }} />
                    <div className="shimmer" style={{ width: '100%', height: '52px', borderRadius: '0' }} />
                </div>
            </div>
        </>
    );
};

export default SkeletonAuth;
