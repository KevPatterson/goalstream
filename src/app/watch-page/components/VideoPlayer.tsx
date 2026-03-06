'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Icon from '@/components/ui/AppIcon';

interface VideoPlayerProps {
  streamUrl: string;
  matchTitle: string;
}

interface QualityLevel {
  height: number;
  bitrate: number;
  index: number;
}

export default function VideoPlayer({ streamUrl, matchTitle }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [qualityLevels, setQualityLevels] = useState<QualityLevel[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1);
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [latency, setLatency] = useState<number | null>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    setIsLoading(true);
    setHasError(false);
    setQualityLevels([]);
    setCurrentQuality(-1);

    const initPlayer = async () => {
      // Cleanup previous instance
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      const isHlsUrl = streamUrl.includes('.m3u8');

      if (isHlsUrl) {
        try {
          const Hls = (await import('hls.js')).default;
          if (Hls.isSupported()) {
            const hls = new Hls({
              enableWorker: true,
              lowLatencyMode: true,
              backBufferLength: 90,
            });
            hlsRef.current = hls;
            hls.loadSource(streamUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, (_: any, data: any) => {
              setIsLoading(false);
              const levels: QualityLevel[] = data.levels.map((l: any, i: number) => ({
                height: l.height,
                bitrate: l.bitrate,
                index: i,
              }));
              setQualityLevels(levels);
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            });

            hls.on(Hls.Events.LEVEL_SWITCHED, (_: any, data: any) => {
              setCurrentQuality(data.level);
            });

            hls.on(Hls.Events.FRAG_LOADED, (_: any, data: any) => {
              if (data.frag.stats) {
                const lat = Math.round(data.frag.stats.loading.end - data.frag.stats.loading.start);
                setLatency(lat);
              }
            });

            hls.on(Hls.Events.ERROR, (_: any, data: any) => {
              if (data.fatal) {
                setHasError(true);
                setIsLoading(false);
              }
            });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Safari native HLS
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
              setIsLoading(false);
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            });
          } else {
            setHasError(true);
            setIsLoading(false);
          }
        } catch {
          setHasError(true);
          setIsLoading(false);
        }
      } else {
        // Direct video URL
        video.src = streamUrl;
        setIsLoading(false);
      }
    };

    initPlayer();

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      if (video.buffered.length > 0) {
        setBuffered((video.buffered.end(video.buffered.length - 1) / (video.duration || 1)) * 100);
      }
    };
    const onDurationChange = () => setDuration(video.duration);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('durationchange', onDurationChange);
    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('waiting', onWaiting);
    video.addEventListener('canplay', onCanPlay);

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('durationchange', onDurationChange);
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('waiting', onWaiting);
      video.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const val = parseFloat(e.target.value);
    video.volume = val;
    setVolume(val);
    setIsMuted(val === 0);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const togglePiP = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch {}
  };

  const handleQualityChange = (index: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = index;
      setCurrentQuality(index);
    }
    setShowQualityMenu(false);
  };

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    const video = videoRef.current;
    if (video) {
      video.load();
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '--:--';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const getQualityLabel = (index: number) => {
    if (index === -1) return 'AUTO';
    const level = qualityLevels[index];
    if (!level) return 'AUTO';
    return level.height ? `${level.height}p` : 'AUTO';
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black rounded-sm overflow-hidden border border-border group"
      style={{ aspectRatio: '16/9' }}
      onMouseMove={resetControlsTimer}
      onMouseEnter={resetControlsTimer}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        playsInline
        aria-label={`Reproducción de ${matchTitle}`}
      />

      {/* Loading Overlay */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-10">
          <div className="w-12 h-12 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
          <span className="font-mono text-xs text-primary tracking-widest">CARGANDO SEÑAL...</span>
        </div>
      )}

      {/* Error Overlay */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 z-10">
          <Icon name="ExclamationTriangleIcon" size={40} className="text-error mb-3" />
          <p className="font-mono text-sm text-error mb-4 tracking-wider">ERROR DE SEÑAL</p>
          <button
            onClick={(e) => { e.stopPropagation(); handleRetry(); }}
            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-mono text-xs hover:bg-primary hover:text-background transition-all duration-200 rounded-sm"
          >
            <Icon name="ArrowPathIcon" size={14} />
            REINTENTAR
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-end transition-opacity duration-300 z-20 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
          <span className="font-mono text-xs text-primary tracking-widest truncate">{matchTitle}</span>
          {latency !== null && (
            <span className="font-mono text-xs text-muted-foreground">
              LAT: <span className="text-primary">{latency}ms</span>
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="px-4 mb-2">
          <div className="relative h-1 bg-border rounded-full overflow-hidden cursor-pointer">
            <div className="absolute inset-y-0 left-0 bg-border" style={{ width: `${buffered}%` }} />
            <div className="absolute inset-y-0 left-0 bg-primary transition-all duration-100" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3 px-4 pb-3">
          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="flex items-center justify-center w-9 h-9 rounded-sm border border-border bg-surface2 hover:border-primary hover:text-primary text-foreground transition-all duration-200"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          >
            <Icon name={isPlaying ? 'PauseIcon' : 'PlayIcon'} size={16} variant="solid" />
          </button>

          {/* Time */}
          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="text-muted-foreground hover:text-primary transition-colors duration-200"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              <Icon name={isMuted || volume === 0 ? 'SpeakerXMarkIcon' : 'SpeakerWaveIcon'} size={16} />
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 accent-primary cursor-pointer"
              aria-label="Volumen"
            />
          </div>

          <div className="flex-1" />

          {/* Quality Selector */}
          <div className="relative">
            <button
              onClick={() => setShowQualityMenu((p) => !p)}
              className="flex items-center gap-1 px-2 py-1 border border-border rounded-sm font-mono text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all duration-200"
              aria-label="Seleccionar calidad"
            >
              <Icon name="AdjustmentsHorizontalIcon" size={12} />
              {getQualityLabel(currentQuality)}
            </button>
            {showQualityMenu && (
              <div className="absolute bottom-full right-0 mb-2 bg-surface2 border border-border rounded-sm overflow-hidden z-30 min-w-[100px]">
                <button
                  onClick={() => handleQualityChange(-1)}
                  className={`w-full px-3 py-2 font-mono text-xs text-left hover:bg-surface hover:text-primary transition-colors duration-150 ${currentQuality === -1 ? 'text-primary' : 'text-muted-foreground'}`}
                >
                  AUTO
                </button>
                {qualityLevels.map((level) => (
                  <button
                    key={level.index}
                    onClick={() => handleQualityChange(level.index)}
                    className={`w-full px-3 py-2 font-mono text-xs text-left hover:bg-surface hover:text-primary transition-colors duration-150 ${currentQuality === level.index ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {level.height}p
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* PiP */}
          <button
            onClick={togglePiP}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label="Picture in Picture"
          >
            <Icon name="RectangleStackIcon" size={16} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            <Icon name={isFullscreen ? 'ArrowsPointingInIcon' : 'ArrowsPointingOutIcon'} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}