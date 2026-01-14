"use client";

import { useCallback, useEffect } from "react";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  preventDefault?: boolean;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlOrMeta = shortcut.ctrlKey || shortcut.metaKey;
        const matchesCtrlMeta = ctrlOrMeta
          ? event.ctrlKey || event.metaKey
          : true;
        const matchesShift = shortcut.shiftKey
          ? event.shiftKey
          : !event.shiftKey;
        const matchesAlt = shortcut.altKey ? event.altKey : !event.altKey;
        const matchesKey =
          event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (matchesKey && matchesCtrlMeta && matchesShift && matchesAlt) {
          if (shortcut.preventDefault !== false) {
            event.preventDefault();
          }
          shortcut.callback();
          break;
        }
      }
    },
    [shortcuts],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}

// Common shortcut: Cmd/Ctrl + K for search focus
export function useSearchShortcut(onFocus: () => void) {
  useKeyboardShortcuts([
    {
      key: "k",
      ctrlKey: true,
      callback: onFocus,
    },
  ]);
}
