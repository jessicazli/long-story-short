"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  const featuredBooks = [
    {
      title: "Pride and Prejudice",
      coverUrl: "/pride.jpg",
      audioUrl: "/pride.mp3",
    },
    {
      title: "To Kill a Mockingbird",
      coverUrl: "/mockingbird.jpg",
      audioUrl: "/mockingbird.mp3",
    },
    {
      title: "The Great Gatsby",
      coverUrl: "/gatsby.jpg",
      audioUrl: "/gatsby.mp3",
    },
  ];

  const handleSubmit = () => {
    if (!title) return;
    const encodedTitle = encodeURIComponent(title);
    router.push(`/podcast?title=${encodedTitle}`);
  };

  return (
    <div className="grid items-center justify-items-center min-h-screen p-20 px-30 gap-6 sm:py-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto space-y-18">
        <h1 className="text-2xl sm:text-5xl font-bold pt-16">
          Summarize any book into a short-form podcast—written by AI and voiced
          in seconds.
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-6 md:text-left items-center md:items-start">
            <p className="text-lg text-muted-foreground max-w-md">
              Whether you're catching up on a classic or previewing something
              new, just type a title and get a podcast-style recap to listen to
              on the go.
            </p>

            <p className="text-lg text-muted-foreground max-w-md italic">
              Turn your next read into a listen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Input
                placeholder="Enter a book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button onClick={handleSubmit} disabled={!title.trim()}>
                Try it now
              </Button>
            </div>
          </div>
          <div className="flex flex-col space-y-8 items-center text-center w-full">
            <h2 className="text-lg font-semibold">Check out a few examples</h2>
            <Carousel>
              <CarouselContent>
                {featuredBooks.map((book) => (
                  <CarouselItem
                    key={book.title}
                    className="flex flex-col gap-4 justify-center items-center"
                  >
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="w-32"
                    />
                    <h3 className="font-semibold text-sm text-center">
                      {book.title}
                    </h3>
                    <audio controls src={book.audioUrl} className="w-full" />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
