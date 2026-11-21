"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/build/tooltips.css";

interface GithubContributionsProps {
  username?: string;
}

export function GithubContributions({ username = "phalladavid" }: GithubContributionsProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full flex items-center justify-center p-8 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-zinc-50/85 dark:bg-white/[0.04] min-h-[160px]">
        <div className="flex items-center gap-2 text-sm text-zinc-500 font-mono animate-pulse">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Loading GitHub contributions...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-zinc-50/85 dark:bg-white/[0.04] overflow-x-auto flex flex-col items-center justify-center">
      <GitHubCalendar
        username={username}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        fontSize={12}
        blockSize={12}
        blockMargin={4}
        blockRadius={3}
      />
    </div>
  );
}
