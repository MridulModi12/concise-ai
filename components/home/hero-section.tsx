import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="animate-in relative z-0 mx-auto flex max-w-7xl flex-col items-center justify-center py-16 transition-all sm:py-20 lg:px-12 lg:pb-28">
      <div className="animate-gradient-x group relative overflow-hidden rounded-full bg-linear-to-r from-rose-200 via-rose-500 to-rose-800 p-[1px]">
        <Badge
          variant={"secondary"}
          className="animate-gradient-x relative flex rounded-full bg-white px-6 py-2 text-base font-medium transition-colors duration-200 group-hover:overflow-hidden group-hover:bg-linear-to-r group-hover:from-rose-100 group-hover:via-rose-200 group-hover:to-rose-100"
        >
          <Sparkles className="mr-2 !h-6 !w-6 animate-pulse text-rose-600" />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </div>
      <h1 className="py-6 text-center font-bold">
        Transform PDFs into{" "}
        <span className="relative inline-block">
          <span className="relative z-10 px-2">concise</span>
          <span
            className="absolute inset-0 -rotate-2 -skew-y-1 transform rounded-lg bg-rose-200/50"
            aria-hidden="true"
          ></span>
        </span>{" "}
        summaries
      </h1>
      <h2 className="px-4 text-center text-lg text-gray-600 sm:text-xl lg:max-w-4xl lg:px-0 lg:text-2xl">
        Get a beautiful summary reel of the document in seconds.
      </h2>
      <div>
        <Button
          variant={"link"}
          className="mt-6 rounded-full bg-linear-to-r from-slate-900 to-rose-500 px-8 py-6 text-base font-bold text-white shadow-lg transition-all duration-300 hover:from-rose-500 hover:to-slate-900 hover:no-underline sm:px-10 sm:py-7 sm:text-lg lg:mt-16 lg:px-12 lg:py-8 lg:text-xl"
        >
          <Link href="/#pricing" className="flex items-center gap-2">
            <span>Try ConciseAI</span>
            <ArrowRight className="animate-pulse" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
