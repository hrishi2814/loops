"use client";

import { Loop } from "@/types/loop";
import { X, Check, Clock, Edit2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { TagPill } from "./tag-selector";

interface LoopCardProps {
  loop: Loop;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, content: string) => void;
}

export function LoopCard({ loop, onToggle, onDelete, onEdit }: LoopCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(loop.content);

  const handleEdit = () => {
    if (editContent.trim()) {
      onEdit(loop.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEdit();
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setEditContent(loop.content);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`group relative p-4 rounded-lg border transition-all ${
        loop.status === "closed"
          ? "bg-muted/50 border-muted line-through opacity-60"
          : "bg-card border-border hover:border-ring hover:shadow-sm"
      }`}
    >
      {/* Time indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-muted-foreground">
        <Clock className="h-3 w-3" />
        <time dateTime={loop.updatedAt}>
          {new Date(loop.updatedAt).toLocaleDateString()}
        </time>
      </div>

      {/* Energy Level Indicator */}
      {loop.energyLevel && loop.status === "open" && (
        <div className="absolute top-12 right-2 flex items-center gap-1 text-xs">
          <span className="font-medium text-muted-foreground">
            Energy: {loop.energyLevel}/5
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full ${
                  i < loop.energyLevel!
                    ? "bg-amber-500"
                    : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="pr-20">
        {isEditing ? (
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="w-full min-h-[60px] p-2 rounded border border-ring focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            autoFocus
          />
        ) : (
          <p className="text-foreground whitespace-pre-wrap break-words">
            {loop.content}
          </p>
        )}
      </div>

      {/* Tags */}
      {loop.tags && loop.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {loop.tags.map((tag) => (
            <TagPill key={tag} tagValue={tag} />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggle(loop.id)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
            loop.status === "open"
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          {loop.status === "open" ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Close
            </>
          ) : (
            <>
              <Clock className="h-3.5 w-3.5" />
              Reopen
            </>
          )}
        </button>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors flex items-center gap-1.5"
          >
            <Edit2 className="h-3.5 w-3.5" />
            Edit
          </button>
        )}
        <button
          onClick={() => onDelete(loop.id)}
          className="px-3 py-1.5 rounded-md text-xs font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors flex items-center gap-1.5"
        >
          <X className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>
    </motion.div>
  );
}

