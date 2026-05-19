"use client";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();
  return (
    <button className="back-btn" onClick={() => router.back()}>
      ← Back
    </button>
  );
}
