"use client";

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#171717] flex items-center justify-center">
      <div className="w-15 h-15 border-t-2 border-b-2 border-purple-500 rounded-full animate-spin"></div>
    </div>
  );
}
