import { Pizza } from "lucide-react";

export default function DemoSection() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 lg:pt-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-linear-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="mb-4 flex items-center justify-center rounded-2xl border border-gray-500/20 bg-gray-100/80 p-2 backdrop-blur-xs">
            <Pizza className="h-6 w-6 text-rose-500" />
          </div>
          <div className="mb-16 text-center">
            <h3 className="mx-auto max-w-2xl px-4 text-3xl font-bold sm:px-6">
              Watch how ConciseAI transforms{" "}
              <span className="bg-linear-to-r from-rose-500 to-rose-700 bg-clip-text text-transparent">
                this Next.js course PDF
              </span>{" "}
              into an easy-to-read summary!
            </h3>
          </div>

          <div className="flex items-center justify-center px-2 sm:px-4 lg:px-6">
            {/* Summary Viewer */}
          </div>
        </div>
      </div>
    </section>
  );
}
