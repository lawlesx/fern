"use client";

import useAudioRecorder from "@/hooks/useAudioRecorder";
import { Expense } from "@/interfaces";
import axios from "axios";
import { useState } from "react";
import Expenses from "./Expenses";

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
      <button
        onClick={startRecording}
        disabled={isRecording}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Start Recording
      </button>
      <button
        onClick={pauseRecording}
        disabled={!isRecording || isPaused}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Pause Recording
      </button>
      <button
        onClick={resumeRecording}
        disabled={!isRecording || !isPaused}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Resume Recording
      </button>
      <button
        onClick={stopRecording}
        disabled={!isRecording}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Stop Recording
      </button>
      <p className="text-lg font-semibold">
        Status: {isRecording ? (isPaused ? "paused" : "recording") : "idle"}
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
      />
    </div>
  );
};

export default AudioRecorder;
