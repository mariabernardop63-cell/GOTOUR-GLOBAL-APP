import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { ChevronLeft, Check, RotateCw, FlipHorizontal, RefreshCcw, Image as ImageIcon, Circle, Square } from 'lucide-react';
import getCroppedImg from '../../utils/cropImage';
import './ProfilePictureCropper.css';

const FILTERS = [
    { id: 'none', label: 'Normal', css: 'none' },
    { id: 'brightness(1.15) contrast(1.1) saturate(1.2)', label: 'Vívido', css: 'brightness(1.15) contrast(1.1) saturate(1.2)' },
    { id: 'sepia(0.5) contrast(1.05)', label: 'Quente', css: 'sepia(0.5) contrast(1.05)' },
    { id: 'grayscale(1) contrast(1.2)', label: 'Noir', css: 'grayscale(1) contrast(1.2)' },
    { id: 'brightness(0.9) contrast(1.2) sepia(0.2)', label: 'Cinema', css: 'brightness(0.9) contrast(1.2) sepia(0.2)' },
];

const ProfilePictureCropper = ({ photoUrl, onSave, onCancel }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [flip, setFlip] = useState({ horizontal: false, vertical: false });
    const [activeFilter, setActiveFilter] = useState('none');
    const [frameType, setFrameType] = useState('circle');
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [lowResWarning, setLowResWarning] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onCropComplete = useCallback((croppedArea, currentCroppedAreaPixels) => {
        setCroppedAreaPixels(currentCroppedAreaPixels);
        // Minimum size check for profile pictures (e.g. 150px)
        if (currentCroppedAreaPixels.width < 150 || currentCroppedAreaPixels.height < 150) {
            setLowResWarning(true);
        } else {
            setLowResWarning(false);
        }
    }, []);

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        setIsProcessing(true);
        try {
            const croppedImageBlobUrl = await getCroppedImg(
                photoUrl,
                croppedAreaPixels,
                rotation,
                flip,
                activeFilter
            );
            onSave(croppedImageBlobUrl);
        } catch (e) {
            console.error('Error cropping image:', e);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleReset = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
        setFlip({ horizontal: false, vertical: false });
        setActiveFilter('none');
    };

    const generatePreview = async () => {
        if (!croppedAreaPixels) return;
        try {
            const url = await getCroppedImg(photoUrl, croppedAreaPixels, rotation, flip, activeFilter);
            setPreviewUrl(url);
        } catch (e) {}
    };

    return (
        <div className="cropper-fullscreen-overlay" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <header className="cropper-header">
                <button className="cropper-icon-btn" onClick={onCancel} aria-label="Cancelar">
                    <ChevronLeft size={28} />
                </button>
                <h2 className="cropper-title">Ajustar Foto</h2>
                <button 
                    className="cropper-icon-btn success" 
                    onClick={handleSave} 
                    disabled={lowResWarning || isProcessing}
                    aria-label="Concluir"
                >
                    {isProcessing ? <div className="cropper-spinner" /> : <Check size={28} />}
                </button>
            </header>

            {/* Main Canvas Area */}
            <div className="cropper-canvas-wrapper">
                <div 
                    className="cropper-canvas-container" 
                    style={{ 
                        filter: activeFilter,
                        transform: `${flip.horizontal ? 'scaleX(-1)' : ''} ${flip.vertical ? 'scaleY(-1)' : ''}`.trim() || 'none'
                    }}
                >
                    <Cropper
                        image={photoUrl}
                        crop={crop}
                        zoom={zoom}
                        rotation={rotation}
                        aspect={1}
                        cropShape={frameType === 'circle' ? 'round' : 'rect'}
                        showGrid={true}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        onRotationChange={setRotation}
                    />
                </div>
                
                {/* Warning Banner Overlay */}
                {lowResWarning && (
                    <div className="cropper-warning-banner">
                        ⚠️ Imagem pixelada. Aumente ou troque de ficheiro.
                    </div>
                )}
            </div>

            {/* Bottom Controls Area */}
            <div className="cropper-controls-bottom">
                
                {/* Zoom Slider */}
                <div className="cropper-slider-container">
                    <span className="slider-icon">-</span>
                    <input
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.01}
                        aria-label="Zoom"
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="cropper-slider"
                    />
                    <span className="slider-icon">+</span>
                </div>

                {/* Core Tools */}
                <div className="cropper-tools-row">
                    <button className="cropper-tool-btn" onClick={() => setRotation((r) => (r + 90) % 360)}>
                        <RotateCw size={22} />
                        <span>Rodar</span>
                    </button>
                    <button className="cropper-tool-btn" onClick={() => setFlip(f => ({ ...f, horizontal: !f.horizontal }))}>
                        <FlipHorizontal size={22} />
                        <span>Inverter</span>
                    </button>
                    <button className="cropper-tool-btn" onClick={() => setFrameType(prev => prev === 'circle' ? 'rect' : 'circle')}>
                        {frameType === 'circle' ? <Square size={22} /> : <Circle size={22} />}
                        <span>Moldura</span>
                    </button>
                    <button className="cropper-tool-btn" onClick={handleReset}>
                        <RefreshCcw size={22} />
                        <span>Repor</span>
                    </button>
                </div>

                {/* Filters & Preview Row */}
                <div className="cropper-filters-container">
                    <div className="cropper-filters-row">
                        {FILTERS.map(f => (
                            <button 
                                key={f.id} 
                                className={`cropper-filter-btn ${activeFilter === f.css ? 'active' : ''}`}
                                onClick={() => setActiveFilter(f.css)}
                            >
                                <div className="filter-preview-circle">
                                    <img 
                                        src={photoUrl} 
                                        alt={f.label} 
                                        style={{ filter: f.css }} 
                                        className="filter-thumb-img"
                                    />
                                </div>
                                <span className="filter-label">{f.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Compact Preview Trigger */}
                    <button className="cropper-preview-pill" onClick={generatePreview} title="Ver Preview Final">
                        <span>Preview</span>
                        <Check size={16} />
                    </button>
                </div>

                {previewUrl && (
                    <div className="cropper-preview-modal" onClick={() => setPreviewUrl(null)}>
                        <div className="preview-modal-content" onClick={e => e.stopPropagation()}>
                            <h3 className="preview-title">Resultado no Perfil</h3>
                            <div className={`preview-avatar-wrapper ${frameType === 'circle' ? 'is-circle' : 'is-rect'}`}>
                                <img src={previewUrl} alt="Preview final" />
                            </div>
                            <button className="preview-close-btn" onClick={() => setPreviewUrl(null)}>Fechar Preview</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePictureCropper;
