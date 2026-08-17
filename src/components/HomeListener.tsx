"use client";

import useAudioRecorder from "@/hooks/useAudioRecorder";
import { ExpenseWithId } from "@/interfaces";
import axios from "axios";
import { MicIcon, PauseIcon, PlayIcon, Square } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import EtherScreen from "./EtherScreen";
import Expenses from "./Expenses";
import GlassButton from "./GlassButton";
import Menu from "./Menu";
import { StrandVisualizer } from "./StrandVisualizer";
import { BorderBeam } from "./ui/border-beam";

const HomeListener = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseWithId[]>([]);
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
        toast.error("Failed to process audio. Please try again later.");
        console.error("Failed to process audio:", error);
        setIsRecorded(false);
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
      <div className="absolute">
        <Menu />
      </div>
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

        <Link
          href="/dashboard"
          className="text-xs font-exo2 text-white/30 hover:text-white/70 tracking-widest uppercase transition-colors duration-300 -rotate-90 fixed -right-8 bottom-0 -translate-y-20"
        >
          View Dashboard
        </Link>

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
