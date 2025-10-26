export interface Loop {
  id: string;
  content: string;
  status: "open" | "closed";
  createdAt: string;
  updatedAt: string;
  closedAt?: string;
  tags: string[];
  energyLevel?: number; // 1-5, how much energy this loop drains
}

export type LoopStatus = "open" | "closed";

export const AVAILABLE_TAGS = [
  { value: "work", label: "Work", color: "blue" },
  { value: "personal", label: "Personal", color: "purple" },
  { value: "urgent", label: "Urgent", color: "red" },
  { value: "someday", label: "Someday", color: "gray" },
  { value: "shopping", label: "Shopping", color: "green" },
  { value: "health", label: "Health", color: "orange" },
  { value: "learning", label: "Learning", color: "cyan" },
  { value: "creative", label: "Creative", color: "pink" },
] as const;

export type TagValue = (typeof AVAILABLE_TAGS)[number]["value"];

