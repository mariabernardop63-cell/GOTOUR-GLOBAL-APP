import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ChevronLeft, Check, RotateCw, RefreshCcw } from 'lucide-react';
import getCroppedImg from '../../utils/cropImage';
import './BannerCropper.css';

const BannerCropper = ({ photoUrl, onSave, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const onCropComplete = useCallback((croppedArea, currentCroppedAreaPixels) => {
        setCroppedAreaPixels(currentCroppedAreaPixels);
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels || isProcessing) return;
        setIsProcessing(true);
        try {
            const croppedImageBlobUrl = await getCroppedImg(
                photoUrl,
                croppedAreaPixels,
                rotation,
                { horizontal: false, vertical: false },
                'none'
            );
            if (croppedImageBlobUrl) {
                onSave(croppedImageBlobUrl);
            }
        } catch (e) {
            console.error('Error cropping banner:', e);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
    };

    return (
        <div className="banner-cropper-overlay" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <header className="banner-cropper-header">
                <button className="banner-cropper-btn" onClick={onCancel} aria-label="Cancelar">
                    <ChevronLeft size={26} />
                    <span>Cancelar</span>
                </button>
                <h2 className="banner-cropper-title">Ajustar Capa</h2>
                <button 
                    className="banner-cropper-btn save" 
                    onClick={handleSave} 
                    disabled={isProcessing}
                    aria-label="Concluir"
                >
                    {isProcessing ? <div className="banner-cropper-spinner" /> : (
                        <>
                            <Check size={22} />
                            <span>Salvar</span>
                        </>
                    )}
                </button>
            </header>

            {/* Crop Area */}
            <div className="banner-cropper-canvas">
                <Cropper
                    image={photoUrl}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    cropShape="rect"
                    showGrid={true}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>

            {/* Controls */}
            <div className="banner-cropper-controls">
                <div className="banner-cropper-zoom">
                    <span className="banner-zoom-label">−</span>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.01}
                        aria-label="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="banner-cropper-slider"
                    />
                    <span className="banner-zoom-label">+</span>
                </div>
                <div className="banner-cropper-tools">
                    <button className="banner-tool-btn" onClick={() => setRotation((r) => (r + 90) % 360)}>
                        <RotateCw size={20} />
                        <span>Rodar</span>
                    </button>
                    <button className="banner-tool-btn" onClick={handleReset}>
                        <RefreshCcw size={20} />
                        <span>Repor</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BannerCropper;
