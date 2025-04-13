'use client';

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleSubmit = () => {
    if (!title) return;
    const encodedTitle = encodeURIComponent(title);
    router.push(`/podcast?title=${encodedTitle}`);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          BookBite
        </h1>
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Input
            placeholder="Book Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button variant="outline" size="icon" onClick={handleSubmit} disabled={!title.trim()}>
            <ArrowRight />
          </Button>
        </div>
      </main>
    </div>
  );
}
