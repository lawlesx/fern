"use client";

import useAudioAnalyser from "@/hooks/useAudioAnalyser";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import { Expense } from "@/interfaces";
import axios from "axios";
import { MicIcon, PauseIcon, PlayIcon, Square } from "lucide-react";
import { useState } from "react";
import EtherScreen from "./EtherScreen";
import Expenses from "./Expenses";
import GlassButton from "./GlassButton";
import Strands from "./Strands";

const HomeListener = () => {
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
    stream,
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

  const volume = useAudioAnalyser(stream, 0.05);

  const pauseButton = (
    <GlassButton
      onClick={pauseRecording}
      disabled={!isRecording || isPaused}
      glassSize={50}
    >
      <PauseIcon fill="#f7eed5" />
    </GlassButton>
  );

  const resumeButton = (
    <GlassButton
      onClick={resumeRecording}
      disabled={!isRecording || !isPaused}
      glassSize={50}
    >
      <PlayIcon fill="#f7eed5" />
    </GlassButton>
  );

  const stopButton = (
    <GlassButton onClick={stopRecording} disabled={!isRecording}>
      <Square fill="#f7eed5" />
    </GlassButton>
  );

  const strands = (
    <div className="overflow-hidden h-screen w-screen fixed top-0 z-0">
      <Strands amplitude={1 + volume * 10} speed={1 + volume * 0.3} />
    </div>
  );

  return (
    <>
      {isRecording ? strands : <EtherScreen />}
      <div className="flex flex-col min-h-dvh items-center justify-start gap-48 z-1 py-32">
        <h1 className="text-6xl font-bold text-white font-audiowide text-center">
          {isRecording
            ? "Umm, Listening..."
            : "Hi, what did you spend on today?"}
        </h1>
        {isRecording ? (
          <div className="flex flex-col gap-4 items-center">
            {stopButton}
            {isPaused ? resumeButton : pauseButton}
          </div>
        ) : (
          <GlassButton
            onClick={startRecording}
            disabled={isRecording}
            className="text-xl text-white font-mono"
          >
            <MicIcon />
          </GlassButton>
        )}

        {recordingBlob && (
          <audio controls src={URL.createObjectURL(recordingBlob)}>
            Your browser does not support the audio element.
          </audio>
        )}
        {expenses?.length > 0 && (
          <Expenses
            expenses={expenses}
            setExpenses={setExpenses}
            isExtracting={isProcessing}
            isRecorded={!!recordingBlob}
          />
        )}
      </div>
    </>
  );
};

export default HomeListener;
