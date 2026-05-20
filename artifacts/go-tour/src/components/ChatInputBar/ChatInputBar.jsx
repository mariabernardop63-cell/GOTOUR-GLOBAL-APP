import React, { useState, useRef, useEffect } from 'react';
import { 
    Paperclip, Camera, MapPin, Mic, Send, 
    X, RotateCcw, Video, Type, Check
} from 'lucide-react';
import './ChatInputBar.css';

const ChatInputBar = ({ 
    onSendMessage, 
    onSendImage, 
    onSendAudio, 
    onSendLocation 
}) => {
    // --- States ---
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordTime, setRecordTime] = useState(0);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [videoStream, setVideoStream] = useState(null);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [attachedFile, setAttachedFile] = useState(null); // From gallery
    
    // --- Refs ---
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const timerRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    // --- Cleanup ---
    useEffect(() => {
        return () => {
            stopCamera();
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    // --- Text Input Handlers ---
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const handleSend = () => {
        if (capturedPhoto) {
            onSendImage(capturedPhoto, inputText);
            setCapturedPhoto(null);
            setInputText('');
            return;
        }

        if (attachedFile) {
            // Mock sending attached file
            onSendImage(URL.createObjectURL(attachedFile), inputText);
            setAttachedFile(null);
            setInputText('');
            return;
        }

        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    // --- Gallery / Paperclip ---
    const handleGalleryClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachedFile(file);
            setCapturedPhoto(null);
        }
    };

    const clearAttachment = () => {
        setAttachedFile(null);
        setCapturedPhoto(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    // --- Location ---
    const handleLocationClick = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    onSendLocation(lat, lng);
                },
                (error) => {
                    console.error('Erro de localização:', error);
                    // Mocked location fallback
                    onSendLocation(-25.9692, 32.5732); // Maputo Coordinates
                }
            );
        } else {
            // Mocked location fallback
            onSendLocation(-25.9692, 32.5732);
        }
    };

    // --- Audio Recording (Mock / Real) ---
    const startRecording = async () => {
        setIsRecording(true);
        setRecordTime(0);
        audioChunksRef.current = [];

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) audioChunksRef.current.push(event.data);
            };

            mediaRecorder.start();
        } catch (err) {
            console.warn('Microfone não acessível, simulando gravação', err);
        }

        timerRef.current = setInterval(() => {
            setRecordTime(prev => prev + 1);
        }, 1000);
    };

    const cancelRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
        }
        setIsRecording(false);
        clearInterval(timerRef.current);
        setRecordTime(0);
    };

    const finishRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                // We mock the send audio URL
                onSendAudio(URL.createObjectURL(audioBlob), recordTime);
            };
            mediaRecorderRef.current.stop();
            mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
        } else {
            // Simulated send if mic failed
            onSendAudio(null, recordTime);
        }

        setIsRecording(false);
        clearInterval(timerRef.current);
        setRecordTime(0);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // --- Camera Integration ---
    const openCamera = async () => {
        setIsCameraOpen(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            setVideoStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Câmera não permitida', err);
            // Fallback: open file picker for image if camera fails
            setIsCameraOpen(false);
            handleGalleryClick();
        }
    };

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const photoUrl = canvas.toDataURL('image/jpeg');
            setCapturedPhoto(photoUrl);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            setVideoStream(null);
        }
        setIsCameraOpen(false);
    };

    return (
        <div className="chat-input-bar-v2">
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*,video/*,application/pdf"
                onChange={handleFileChange}
            />

            {/* FULLSCREEN CAMERA VIEW */}
            {isCameraOpen && (
                <div className="chat-fullscreen-camera">
                    <div className="camera-controls-overlay">
                        <button className="camera-close-btn" onClick={stopCamera}>
                            <X size={24} />
                        </button>
                        <button className="camera-switch-btn">
                            <RotateCcw size={20} />
                        </button>
                    </div>
                    <video 
                        ref={videoRef} 
                        autoPlay 
                        playsInline 
                        className="camera-video-element"
                    ></video>
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    <div className="camera-bottom-bar">
                        <div className="camera-capture-trigger" onClick={capturePhoto}>
                            <div className="camera-capture-inner"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* PREVIEW ATTACHMENT */}
            {(capturedPhoto || attachedFile) && !isCameraOpen && (
                <div className="chat-preview-container">
                    <div className="chat-preview-header">
                        <span>Anexo Pronto</span>
                        <button className="chat-preview-close" onClick={clearAttachment}>
                            <X size={18} />
                        </button>
                    </div>
                    <img 
                        src={capturedPhoto || (attachedFile ? URL.createObjectURL(attachedFile) : '')} 
                        alt="Preview" 
                        className="chat-photo-preview"
                    />
                </div>
            )}

            {/* MAIN INPUT ROW */}
            <div className="chat-pill-container">
                {isRecording ? (
                    // RECORDING UI
                    <div className="chat-audio-recording-ui">
                        <div className="audio-timer-group">
                            <div className="audio-blob-pulse"></div>
                            {formatTime(recordTime)}
                        </div>
                        <span className="audio-cancel-text">{"< Deslize para cancelar"}</span>
                        <button className="chat-pill-icon-btn" onClick={cancelRecording}>
                            <X size={20} color="#ef4444" />
                        </button>
                    </div>
                ) : (
                    <>
                        <button className="chat-pill-icon-btn" onClick={handleGalleryClick} aria-label="Galeria">
                            <Paperclip size={20} />
                        </button>

                        <input 
                            type="text"
                            className="chat-pill-input" 
                            placeholder={capturedPhoto || attachedFile ? "Adicione uma legenda..." : "Digite uma mensagem..."} 
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyPress}
                        />

                        <div className="chat-pill-right-actions">
                            {!inputText && !(capturedPhoto || attachedFile) && (
                                <>
                                    <button className="chat-pill-icon-btn" onClick={openCamera} aria-label="Câmera">
                                        <Camera size={20} />
                                    </button>
                                    <button className="chat-pill-icon-btn active-loc" onClick={handleLocationClick} aria-label="Localização">
                                        <MapPin size={20} />
                                    </button>
                                    <button className="chat-pill-icon-btn" onClick={startRecording} aria-label="Microfone">
                                        <Mic size={20} />
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}

                {/* SEND BUTTON (Visible if texting, attaching, or recording) */}
                {(inputText || capturedPhoto || attachedFile || isRecording) && (
                    <button className="chat-send-pill-btn" onClick={isRecording ? finishRecording : handleSend}>
                        {isRecording ? <Check size={20} /> : <Send size={20} strokeWidth={2.5} style={{ transform: 'translateX(-2px) translateY(1px)' }} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ChatInputBar;
