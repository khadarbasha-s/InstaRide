"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollUp}
      className={cn(
        "fixed bottom-6 right-6 z-30 h-11 w-11 rounded-full bg-brand-yellow text-brand-black shadow-lg grid place-items-center hover:bg-brand-yellow-600 hover:scale-110 transition-all",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ChevronUp className="h-5 w-5" />
    </button>
  );
}
