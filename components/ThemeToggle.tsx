"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <button className="hover:text-zinc-500 dark:hover:text-zinc-200 transition-colors w-[16px] h-[16px]" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Moon size={16} fill="currentColor" />
      ) : (
        <Sun size={16} fill="currentColor" />
      )}
    </button>
  )
}
