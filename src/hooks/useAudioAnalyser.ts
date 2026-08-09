import { useEffect, useRef, useState } from "react";

/**
 *
 * @param stream The media stream from the user's microphone
 * @param easingFactor The factor used to smooth the volume changes, Default is 0.1 (lower is smoother, higher is more reactive)
 * @returns The smoothed volume level (0.0 to 1.0)
 */
export default function useAudioAnalyser(
  stream: MediaStream | null,
  easingFactor: number = 0.1,
) {
  const [volume, setVolume] = useState(0);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    if (!stream) {
      setVolume(0);
      return;
    }

    const audioContext = new window.AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 256;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    // We store the smoothed value outside the loop so it persists between frames
    let smoothedVolume = 0;

    const updateVolume = () => {
      analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }

      // 1. Calculate the raw, spiky target volume (0.0 to 1.0)
      const rawTargetVolume = sum / dataArray.length / 255;

      // 2. LERP Math: current = current + (target - current) * easing
      // A lower easing factor (like 0.1) makes it smoother and slower.
      // A higher factor (like 0.5) makes it faster and more reactive.
      smoothedVolume += (rawTargetVolume - smoothedVolume) * easingFactor;

      // 3. Set the state to the heavily smoothed value
      setVolume(smoothedVolume);

      animationRef.current = requestAnimationFrame(updateVolume);
    };

    updateVolume();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      audioContext.close();
    };
  }, [stream]);

  return volume;
}
