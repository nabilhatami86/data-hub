"use client";

import data from "./data.json";
import WordAssistant from "@/components/word-assistant";

export default function Page() {
  return (
    <div className="@container/main flex flex-1 p-4">
      <WordAssistant data={data} />
    </div>
  );
}
