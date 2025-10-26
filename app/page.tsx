"use client";

import { useState, useMemo } from "react";
import { useLoops } from "@/lib/hooks/use-loops";
import { LoopCard } from "@/components/loop-card";
import { TagSelector } from "@/components/tag-selector";
import { Plus, Brain, CheckCircle, Target, Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { AVAILABLE_TAGS } from "@/types/loop";

export default function LoopsPage() {
  const {
    openLoops,
    closedLoops,
    isLoaded,
    createLoop,
    updateLoop,
    deleteLoop,
    toggleLoopStatus,
  } = useLoops();

  const [newLoopContent, setNewLoopContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<number | undefined>(undefined);
  const [showClosed, setShowClosed] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLoopContent.trim()) {
      createLoop(newLoopContent.trim(), selectedTags, energyLevel);
      setNewLoopContent("");
      setSelectedTags([]);
      setEnergyLevel(undefined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (newLoopContent.trim()) {
        createLoop(newLoopContent.trim(), selectedTags, energyLevel);
        setNewLoopContent("");
        setSelectedTags([]);
        setEnergyLevel(undefined);
      }
    }
  };

  // Filter loops by tag
  const filteredOpenLoops = useMemo(() => {
    if (!activeFilter) return openLoops;
    return openLoops.filter((loop) => loop.tags?.includes(activeFilter));
  }, [openLoops, activeFilter]);

  const filteredClosedLoops = useMemo(() => {
    if (!activeFilter) return closedLoops;
    return closedLoops.filter((loop) => loop.tags?.includes(activeFilter));
  }, [closedLoops, activeFilter]);

  // Calculate total energy drain
  const totalEnergyDrain = useMemo(() => {
    return openLoops.reduce((sum, loop) => sum + (loop.energyLevel || 0), 0);
  }, [openLoops]);

  // Sort loops by energy level (highest first)
  const sortedOpenLoops = useMemo(() => {
    return [...filteredOpenLoops].sort((a, b) => (b.energyLevel || 0) - (a.energyLevel || 0));
  }, [filteredOpenLoops]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Loops</h1>
              <p className="text-sm text-muted-foreground">
                Close your open loops. Reclaim your mental energy.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-muted-foreground">Active:</span>
              <span className="font-semibold text-foreground">
                {openLoops.length}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Closed:</span>
              <span className="font-semibold text-foreground">
                {closedLoops.length}
              </span>
            </div>
            {totalEnergyDrain > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Brain className="h-4 w-4 text-orange-500" />
                <span className="text-muted-foreground">Energy Drain:</span>
                <span className="font-semibold text-foreground">
                  {totalEnergyDrain}/5
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Create Form */}
        <motion.form
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="mb-8"
        >
          <div className="relative">
            <textarea
              value={newLoopContent}
              onChange={(e) => setNewLoopContent(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What's on your mind? Write it down and close it when you're done..."
              rows={3}
              className="w-full p-4 pr-24 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none transition-all"
            />
            <button
              type="submit"
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              disabled={!newLoopContent.trim()}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Loop</span>
            </button>
          </div>
          
          {/* Tags */}
          <div className="mt-3">
            <p className="text-xs text-muted-foreground mb-2">Tags:</p>
            <TagSelector selectedTags={selectedTags} onTagsChange={setSelectedTags} />
          </div>

          {/* Energy Level */}
          <div className="mt-4">
            <p className="text-xs text-muted-foreground mb-2">
              Energy Level (How much does this drain you?):
            </p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setEnergyLevel(energyLevel === level ? undefined : level)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    energyLevel === level
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-ring"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Press Enter to add, Shift+Enter for new line
          </p>
        </motion.form>

        {/* Filter Bar */}
        {openLoops.length > 0 && (
          <div className="mb-6 p-4 rounded-lg border border-border bg-card/50">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Filter:</span>
              </div>
              <button
                onClick={() => setActiveFilter(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  !activeFilter
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                }`}
              >
                All
              </button>
              {AVAILABLE_TAGS.map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => setActiveFilter(activeFilter === tag.value ? null : tag.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    activeFilter === tag.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
                  }`}
                >
                  {tag.label}
                  {activeFilter === tag.value && (
                    <X className="inline-block h-3 w-3 ml-1.5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Open Loops */}
        {sortedOpenLoops.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="h-5 w-5 text-amber-500" />
              Open Loops {activeFilter && `(${sortedOpenLoops.length})`}
            </h2>
            <AnimatePresence>
              <div className="space-y-3">
                {sortedOpenLoops.map((loop) => (
                  <LoopCard
                    key={loop.id}
                    loop={loop}
                    onToggle={toggleLoopStatus}
                    onDelete={deleteLoop}
                    onEdit={(id, content) => updateLoop(id, { content })}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}

        {/* Empty State */}
        {sortedOpenLoops.length === 0 && closedLoops.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Brain className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No loops yet
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your mind is clear! When thoughts come up, add them above. Close them when you're done to reclaim your mental energy.
            </p>
          </motion.div>
        )}

        {sortedOpenLoops.length === 0 && closedLoops.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 mb-8 p-6 rounded-lg border border-green-500/20 bg-green-500/5"
          >
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-2">All loops closed! 🎉</h3>
            <p className="text-muted-foreground">
              Your mind is clear. Great work closing {closedLoops.length}{" "}
              {closedLoops.length === 1 ? "loop" : "loops"}!
            </p>
          </motion.div>
        )}

        {/* Closed Loops Section */}
        {filteredClosedLoops.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowClosed(!showClosed)}
              className="text-lg font-semibold mb-4 flex items-center gap-2 hover:text-foreground/80 transition-colors"
            >
              <CheckCircle className="h-5 w-5 text-green-500" />
              Closed Loops ({filteredClosedLoops.length})
            </button>

            {showClosed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {filteredClosedLoops.map((loop) => (
                  <LoopCard
                    key={loop.id}
                    loop={loop}
                    onToggle={toggleLoopStatus}
                    onDelete={deleteLoop}
                    onEdit={(id, content) => updateLoop(id, { content })}
                  />
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
