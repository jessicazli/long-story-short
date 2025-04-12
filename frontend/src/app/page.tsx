import Image from 'next/image'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-2">
          <Image src="/scroll.svg" alt="Scroll" width={24} height={24} />
          <h1 className="text-3xl font-bold">The Living Archive</h1>
        </div>
        <p className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)] tracking-[-.01em]">
          History speaks. You just have to ask.
        </p>
      </main>
    </div>
  );
}
