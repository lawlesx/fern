"use client";

import useAudioRecorder from "@/hooks/useAudioRecorder";
import { ExpenseWithId } from "@/interfaces";
import axios from "axios";
import { MicIcon, PauseIcon, PlayIcon, Square } from "lucide-react";
import { useState } from "react";
import EtherScreen from "./EtherScreen";
import Expenses from "./Expenses";
import GlassButton from "./GlassButton";
import { StrandVisualizer } from "./StrandVisualizer";
import { BorderBeam } from "./ui/border-beam";

const HomeListener = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseWithId[]>([
    {
      id: "1",
      amount: 20,
      category: "Snacks",
      description: "Chocolates",
    },
    {
      id: "2",
      amount: 50,
      category: "Shopping",
      description: "Pencils",
    },
    {
      id: "3",
      amount: 50,
      category: "Transportation",
      description: "Bus travel",
    },
  ]);
  const [isRecorded, setIsRecorded] = useState(true);

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

  const startButton = (
    <button
      onClick={startRecording}
      disabled={isRecording}
      className="button rounded-full w-20 h-20"
    >
      <MicIcon />
      <BorderBeam
        duration={6}
        size={80}
        className="from-transparent via-[#FF9FFC] to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={90}
        className="from-transparent via-[#5227FF] to-transparent"
      />
    </button>
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
              startButton
            )}
          </>
        ) : null}

        {(isRecorded || expenses.length > 0) && (
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
