"use client";

import React, { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Upload, Film } from "lucide-react";
import { useUIStore } from "@/store/useUIStore";
import { FeatureSegments } from "./FeatureSegments";

export const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const {
    customVideoUrl,
    setCustomVideoUrl,
    isPlaying,
    isMuted,
    togglePlay,
    toggleMute,
    activeTab,
  } = useUIStore();

  const [showVideoUploader, setShowVideoUploader] = useState(false);

  const defaultVideos = [
    "https://assets.mixkit.co/videos/34487/34487-720.mp4",
    "https://www.pexels.com/download/video/37634863",
    "https://assets.mixkit.co/videos/34484/34484-720.mp4",
  ];

  const currentVideoSrc = customVideoUrl || defaultVideos[activeTab % defaultVideos.length];

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, currentVideoSrc]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomVideoUrl(url);
      setShowVideoUploader(false);
    }
  };

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex flex-col justify-between overflow-hidden bg-black select-none">
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          key={currentVideoSrc}
          src={currentVideoSrc}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover object-center transform scale-[1.02] transition-opacity duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/75 z-10" />
      </div>

      {/* Hero Central Content - Text Heavy Section Boundary (max-width: 1200px) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="max-w-[1200px] mx-auto space-y-6 sm:space-y-8 animate-fade-in">
          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-wide text-shadow-hero leading-[1.15]">
            Refined Luxury Living
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm tracking-[0.25em] text-white/90 uppercase font-light max-w-[900px] mx-auto text-shadow-nav">
            Handcrafted Architectural Furniture & Timeless Interiors
          </p>

          {/* CTA Button */}
          <div className="pt-2">
            <a
              href="#shop"
              className="inline-block bg-white text-black font-medium text-xs sm:text-sm tracking-[0.22em] uppercase px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 hover:bg-black hover:text-white hover:border hover:border-white shadow-xl hover:scale-105"
            >
              SHOP NOW
            </a>
          </div>
        </div>
      </div>

      {/* Floating Video Control Widget */}
      <div className="absolute bottom-24 right-4 sm:right-8 z-30 flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs shadow-lg">
        <button
          onClick={togglePlay}
          className="p-1.5 hover:text-white/70 transition-colors focus:outline-none"
          title={isPlaying ? "Pause Video" : "Play Video"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 hover:text-white/70 transition-colors focus:outline-none"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        <button
          onClick={() => setShowVideoUploader(!showVideoUploader)}
          className="flex items-center space-x-1 pl-1.5 border-l border-white/20 hover:text-white/70 transition-colors focus:outline-none"
          title="Provide Custom Video"
        >
          <Film className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px] tracking-wider uppercase">Video</span>
        </button>
      </div>

      {/* Custom Video Uploader */}
      {showVideoUploader && (
        <div className="absolute bottom-36 right-4 sm:right-8 z-40 bg-black/90 backdrop-blur-lg border border-white/20 p-4 rounded-lg shadow-2xl w-72 text-white">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-semibold tracking-wider uppercase">Use Custom Video</h4>
            <button
              onClick={() => setShowVideoUploader(false)}
              className="text-xs opacity-60 hover:opacity-100"
            >
              ✕
            </button>
          </div>
          <p className="text-[11px] text-white/70 mb-3">
            Select a video file from your computer to preview as the background.
          </p>
          <label className="flex items-center justify-center space-x-2 w-full py-2 px-3 border border-dashed border-white/40 rounded-md cursor-pointer hover:bg-white/10 transition-colors text-xs">
            <Upload className="w-3.5 h-3.5" />
            <span>Choose Video File</span>
            <input
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {customVideoUrl && (
            <button
              onClick={() => setCustomVideoUrl(null)}
              className="mt-2 text-[10px] text-red-400 hover:underline block text-center w-full"
            >
              Reset to Default Video
            </button>
          )}
        </div>
      )}

      {/* Bottom Feature Segment Tabs */}
      <FeatureSegments />
    </section>
  );
};
