'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// ── Types ──────────────────────────────────────────────────────────
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

type VoiceInputProps = {
  /** Called whenever a final transcript chunk is produced */
  onTranscript: (text: string) => void;
  /** Currently accumulated narrative (used to decide append vs fresh) */
  currentNarrative: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

// ── Feature detection ──────────────────────────────────────────────
function getSpeechRecognition(): (new () => any) | null {
  if (typeof window === 'undefined') return null;
  return (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition || null;
}

// ── Component ──────────────────────────────────────────────────────
export function VoiceInput({ onTranscript, currentNarrative, disabled, style, className }: VoiceInputProps) {
  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [volume, setVolume] = useState(0); // 0-1 for visualiser

  const recognitionRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Check support on mount
  useEffect(() => {
    if (!getSpeechRecognition()) setSupported(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Audio analyser for volume meter ────────────────────────────
  const startAudioAnalyser = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      const audioCtx = new AudioContext();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArr = new Uint8Array(analyser.frequencyBinCount);
      const tick = () => {
        analyser.getByteFrequencyData(dataArr);
        const avg = dataArr.reduce((sum, v) => sum + v, 0) / dataArr.length;
        setVolume(Math.min(avg / 128, 1));
        animFrameRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch {
      // Mic access denied — speech recognition may still work
    }
  }, []);

  const stopAudioAnalyser = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    mediaStreamRef.current?.getTracks().forEach((t) => t.stop());
    mediaStreamRef.current = null;
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    analyserRef.current = null;
    setVolume(0);
  }, []);

  // ── Recognition lifecycle ──────────────────────────────────────
  const startListening = useCallback(() => {
    setErrorMsg('');
    const SpeechRec = getSpeechRecognition();
    if (!SpeechRec) {
      setErrorMsg('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    const recognition = new SpeechRec();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    // No recognition.lang set — browser auto-detects any language

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          onTranscript(transcript);
          setInterimText('');
        } else {
          interim += transcript;
        }
      }
      if (interim) setInterimText(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'no-speech') {
        setErrorMsg('No speech detected. Please try speaking again.');
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setErrorMsg('Microphone access was denied. Please allow microphone access in your browser settings.');
      } else if (event.error === 'network') {
        setErrorMsg('Network error. Speech recognition requires an internet connection.');
      } else {
        setErrorMsg(`Speech recognition error: ${event.error}`);
      }
      setListening(false);
      stopAudioAnalyser();
    };

    recognition.onend = () => {
      // Auto-restart if still in listening state (handles Chrome's auto-stop)
      if (recognitionRef.current === recognition) {
        try {
          recognition.start();
        } catch {
          setListening(false);
          stopAudioAnalyser();
        }
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setListening(true);
      startAudioAnalyser();
    } catch {
      setErrorMsg('Could not start speech recognition. Please try again.');
    }
  }, [onTranscript, startAudioAnalyser, stopAudioAnalyser]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      const ref = recognitionRef.current;
      recognitionRef.current = null; // Clear first to prevent auto-restart
      try { ref.stop(); } catch { /* ignore */ }
    }
    setListening(false);
    setInterimText('');
    stopAudioAnalyser();
  }, [stopAudioAnalyser]);

  // ── Not supported fallback ─────────────────────────────────────
  if (!supported) {
    return (
      <div style={{
        background: '#FFF7ED',
        border: '1px solid #FDE68A',
        borderRadius: '10px',
        padding: '0.85rem 1rem',
        fontSize: '0.825rem',
        color: '#92400E',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span className="ux4g-icon-outlined notranslate" translate="no" aria-hidden="true" style={{ fontSize: '1.2rem', color: '#92400E' }}>mic_off</span>
        Voice input is not supported in your browser. Please use Google Chrome or Microsoft Edge for voice input.
      </div>
    );
  }


  // ── Render ─────────────────────────────────────────────────────
  return (
    <div style={{ marginBlockEnd: '1.25rem', ...style }} className={className}>
      {/* Voice Input Panel */}
      <div
        style={{
          background: listening
            ? 'linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 50%, #ECFDF5 100%)'
            : '#F8FAFC',
          border: listening ? '1.5px solid #60A5FA' : '1px solid #E2E8F0',
          borderRadius: '14px',
          padding: '1.15rem',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Animated background pulse when listening */}
        {listening && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(circle at center, rgba(59, 130, 246, ${0.04 + volume * 0.08}) 0%, transparent 70%)`,
              transition: 'background 0.15s ease',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Top Row: Label + Status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBlockEnd: '0.85rem', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0F172A' }}>
              Use your voice
            </span>
            {listening && (
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: '#DC2626',
                  background: '#FEF2F2',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '10px',
                  border: '1px solid #FECACA',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  animation: 'cfr-voice-pulse 1.5s ease-in-out infinite',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#DC2626',
                  animation: 'cfr-voice-dot 1s ease-in-out infinite',
                }} />
                RECORDING
              </span>
            )}
          </div>
        </div>

        {/* Mic Button + Waveform Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 2 }}>
          {/* Big Mic Button */}
          <button
            type="button"
            onClick={listening ? stopListening : startListening}
            disabled={disabled}
            aria-label={listening ? 'Stop recording' : 'Start voice recording'}
            style={{
              width: '56px',
              height: '56px',
              minWidth: '56px',
              minHeight: '56px',
              padding: 0,
              margin: 0,
              borderRadius: '50%',
              border: 'none',
              background: listening
                ? 'linear-gradient(135deg, #DC2626, #EF4444)'
                : 'linear-gradient(135deg, #1E40AF, #3B82F6)',
              color: '#FFFFFF',
              cursor: disabled ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.25s ease',
              boxShadow: listening
                ? `0 0 0 ${4 + volume * 12}px rgba(220, 38, 38, ${0.12 + volume * 0.15}), 0 4px 12px rgba(220, 38, 38, 0.3)`
                : '0 4px 12px rgba(30, 64, 175, 0.25)',
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {listening ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'block' }}>
                <rect x="5" y="5" width="14" height="14" rx="2.5" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            )}
          </button>

          {/* Waveform / Instructions */}
          <div style={{ flex: 1 }}>
            {listening ? (
              <div>
                {/* Sound wave bars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '32px', marginBlockEnd: '0.35rem' }}>
                  {Array.from({ length: 20 }).map((_, i) => {
                    const baseHeight = 4;
                    const maxExtra = 24;
                    const wave = Math.sin((i / 20) * Math.PI * 2 + Date.now() / 300) * 0.5 + 0.5;
                    const height = baseHeight + (maxExtra * volume * wave);
                    return (
                      <div
                        key={i}
                        style={{
                          width: '3px',
                          height: `${Math.max(baseHeight, height)}px`,
                          borderRadius: '2px',
                          background: `linear-gradient(180deg, #3B82F6 0%, #1E40AF 100%)`,
                          opacity: 0.4 + volume * 0.6,
                          transition: 'height 0.1s ease',
                        }}
                      />
                    );
                  })}
                </div>
                <p style={{ fontSize: '0.775rem', color: '#64748B', margin: 0 }}>
                  Speak clearly — your words will appear in the text box below. Press stop when finished.
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.85rem', color: '#334155', fontWeight: 600, margin: '0 0 0.2rem 0' }}>
                  Tap the mic to describe what happened using your voice
                </p>
                <p style={{ fontSize: '0.775rem', color: '#64748B', margin: 0 }}>
                  Speak in any language — Hindi, English, Hinglish, or your regional language. Your words will be typed automatically.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Interim transcript preview */}
        {interimText && (
          <div
            style={{
              marginBlockStart: '0.85rem',
              padding: '0.65rem 0.85rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              borderRadius: '8px',
              border: '1px solid #BFDBFE',
              fontSize: '0.85rem',
              color: '#475569',
              fontStyle: 'italic',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', display: 'block', marginBlockEnd: '0.25rem' }}>
              Listening...
            </span>
            {interimText}
          </div>
        )}
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div
          style={{
            marginBlockStart: '0.65rem',
            padding: '0.65rem 0.85rem',
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: '8px',
            fontSize: '0.825rem',
            color: '#991B1B',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
          }}
        >
          <span className="ux4g-icon-outlined" aria-hidden="true" style={{ fontSize: '1.15rem', flexShrink: 0, color: '#DC2626' }}>warning</span>
          <div>
            <strong style={{ display: 'block', marginBlockEnd: '0.15rem' }}>Voice input issue</strong>
            {errorMsg}
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes cfr-voice-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes cfr-voice-dot {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
