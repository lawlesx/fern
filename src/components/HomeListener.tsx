"use client";

import useAudioRecorder from "@/hooks/useAudioRecorder";
import { Expense } from "@/interfaces";
import axios from "axios";
import { MicIcon, PauseIcon, PlayIcon, Square } from "lucide-react";
import { useState } from "react";
import EtherScreen from "./EtherScreen";
import Expenses from "./Expenses";
import GlassButton from "./GlassButton";
import { StrandVisualizer } from "./StrandVisualizer";

const HomeListener = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isRecorded, setIsRecorded] = useState(false);

  const {
    startRecording,
    stopRecording,
    isRecording,
    isPaused,
    pauseRecording,
    resumeRecording,
    stream,
  } = useAudioRecorder({
    onFinish: async (audioData: Blob) => {
      setIsProcessing(true);
      setIsRecorded(true);

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

  const getTitle = () => {
    if (isRecording) {
      return "Judging your choices...";
    } else if (isProcessing) {
      return "Calculating the damage...";
    } else {
      return "Hi, what did you spend on today?";
    }
  };

  return (
    <>
      {isRecording ? <StrandVisualizer stream={stream} /> : <EtherScreen />}
      <div className="flex flex-col items-center justify-start gap-48 z-1 py-32">
        {!isRecorded ? (
          <>
            <h1 className="text-6xl font-bold text-white font-audiowide text-center">
              {getTitle()}
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
          </>
        ) : null}

        {(isProcessing || expenses.length > 0) && (
          <Expenses
            expenses={expenses}
            setExpenses={setExpenses}
            isExtracting={isProcessing}
            isRecorded={isRecorded}
            setIsRecorded={setIsRecorded}
          />
        )}
      </div>
    </>
  );
};

export default HomeListener;
