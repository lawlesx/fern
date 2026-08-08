import { useRef, useState } from "react";

interface IUseAudioRecorder {
  onFinish?: (audioData: Blob) => void | Promise<void>;
}

const useAudioRecorder = ({ onFinish }: IUseAudioRecorder) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);

  // useRef keeps these values safe between React re-renders
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingBlob(null); // Clear any previous recordings
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  }

  function pauseRecording() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
    }
  }

  function resumeRecording() {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
    }
  }

  async function stopRecording() {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) {
        resolve(null);
        return;
      }

      mediaRecorderRef.current.onstop = async () => {
        // Create the final Blob
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        // Update states
        setRecordingBlob(blob);
        setIsRecording(false);
        setIsPaused(false);

        // Call the onFinish callback with the final Blob
        onFinish?.(blob);

        // Crucial: Stop all microphone tracks to remove the recording red dot in the browser tab
        mediaRecorderRef.current?.stream
          .getTracks()
          .forEach((track) => track.stop());

        // Keep your original return structure resolving the Uint8Array
        const arrayBuffer = await blob.arrayBuffer();
        resolve(new Uint8Array(arrayBuffer));
      };

      mediaRecorderRef.current.stop();
    });
  }

  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    recordingBlob,
    isRecording,
    isPaused,
  };
};

export default useAudioRecorder;
