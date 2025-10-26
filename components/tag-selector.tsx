"use client";

import { AVAILABLE_TAGS, TagValue } from "@/types/loop";
import { motion } from "motion/react";

interface TagSelectorProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const tagColorClasses = {
  blue: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
  purple: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  red: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  gray: "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-800",
  green: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
  orange: "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
  cyan: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800",
  pink: "bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-800",
};

export function TagSelector({ selectedTags, onTagsChange }: TagSelectorProps) {
  const toggleTag = (tagValue: TagValue) => {
    if (selectedTags.includes(tagValue)) {
      onTagsChange(selectedTags.filter((t) => t !== tagValue));
    } else {
      onTagsChange([...selectedTags, tagValue]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {AVAILABLE_TAGS.map((tag) => {
        const isSelected = selectedTags.includes(tag.value);
        const colorClass = tagColorClasses[tag.color];

        return (
          <motion.button
            key={tag.value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleTag(tag.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
              isSelected
                ? colorClass
                : "bg-muted text-muted-foreground border-border hover:bg-muted/80"
            }`}
          >
            {tag.label}
          </motion.button>
        );
      })}
    </div>
  );
}

export function TagPill({ tagValue }: { tagValue: string }) {
  const tag = AVAILABLE_TAGS.find((t) => t.value === tagValue);
  if (!tag) return null;

  const colorClass = tagColorClasses[tag.color];

  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {tag.label}
    </span>
  );
}

