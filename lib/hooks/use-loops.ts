import { useState, useEffect } from "react";
import { Loop } from "@/types/loop";

const STORAGE_KEY = "loops-data";

export function useLoops() {
  const [loops, setLoops] = useState<Loop[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load loops from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Handle backward compatibility - ensure all loops have tags array
        const updatedData = data.map((loop: any) => ({
          ...loop,
          tags: loop.tags || [],
        }));
        setLoops(updatedData);
      }
    } catch (error) {
      console.error("Failed to load loops from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save loops to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loops));
      } catch (error) {
        console.error("Failed to save loops to localStorage:", error);
      }
    }
  }, [loops, isLoaded]);

  const createLoop = (
    content: string,
    tags: string[] = [],
    energyLevel?: number
  ): Loop => {
    const now = new Date().toISOString();
    const newLoop: Loop = {
      id: crypto.randomUUID(),
      content,
      status: "open",
      createdAt: now,
      updatedAt: now,
      tags,
      energyLevel,
    };

    setLoops((prev) => [newLoop, ...prev]);
    return newLoop;
  };

  const updateLoop = (id: string, updates: Partial<Loop>): void => {
    setLoops((prev) =>
      prev.map((loop) =>
        loop.id === id
          ? {
              ...loop,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : loop
      )
    );
  };

  const deleteLoop = (id: string): void => {
    setLoops((prev) => prev.filter((loop) => loop.id !== id));
  };

  const toggleLoopStatus = (id: string): void => {
    setLoops((prev) =>
      prev.map((loop) => {
        if (loop.id === id) {
          const newStatus = loop.status === "open" ? "closed" : "open";
          return {
            ...loop,
            status: newStatus,
            closedAt: newStatus === "closed" ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString(),
          };
        }
        return loop;
      })
    );
  };

  const openLoops = loops.filter((loop) => loop.status === "open");
  const closedLoops = loops.filter((loop) => loop.status === "closed");

  return {
    loops,
    openLoops,
    closedLoops,
    isLoaded,
    createLoop,
    updateLoop,
    deleteLoop,
    toggleLoopStatus,
  };
}

