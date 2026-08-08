"use client";

import useAudioRecorder from "@/hooks/useAudioRecorder";
import { Expense } from "@/interfaces";
import axios from "axios";
import { useState } from "react";
import EtherScreen from "./EtherScreen";
import Expenses from "./Expenses";
import GlassButton from "./GlassButton";

const AudioRecorder = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const {
    startRecording,
    stopRecording,
    recordingBlob,
    isRecording,
    isPaused,
    pauseRecording,
    resumeRecording,
  } = useAudioRecorder({
    onFinish: async (audioData: Blob) => {
      setIsProcessing(true);

      try {
        const formData = new FormData();
        formData.append("audio", audioData, "recording.webm");

        const response = await axios.post("/api/process-expense", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setExpenses(response.data.expenses);
      } catch (error) {
        console.error("Failed to process audio:", error);
      }
      setIsProcessing(false);
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <EtherScreen />
      <GlassButton
        onClick={startRecording}
        disabled={isRecording}
        className="text-xl text-white font-mono"
      >
        Record
      </GlassButton>
      <GlassButton onClick={pauseRecording} disabled={!isRecording || isPaused}>
        Pause
      </GlassButton>
      <GlassButton
        onClick={resumeRecording}
        disabled={!isRecording || !isPaused}
      >
        Resume
      </GlassButton>
      <GlassButton onClick={stopRecording} disabled={!isRecording}>
        Stop
      </GlassButton>
      <p className="text-lg font-semibold">
        Status: {isRecording ? (isPaused ? "paused" : "Listening") : "idle"}
      </p>
      {recordingBlob && (
        <audio controls src={URL.createObjectURL(recordingBlob)}>
          Your browser does not support the audio element.
        </audio>
      )}
      <Expenses
        expenses={expenses}
        setExpenses={setExpenses}
        isExtracting={isProcessing}
        isRecorded={!!recordingBlob}
      />
    </div>
  );
};

export default AudioRecorder;
