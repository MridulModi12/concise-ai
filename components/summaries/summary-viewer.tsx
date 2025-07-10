"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";
import { NavigationControls } from "@/components/summaries/navigation-controls";
import ProgressBar from "@/components/summaries/progress-bar";
import { parseSection } from "@/utils/summary-helpers";
import ContentSection from "@/components/summaries/content-section";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="bg-background/80 sticky top-0 z-10 mb-6 flex flex-col gap-2 pt-2 pb-4 backdrop-blur-xs">
      <h2 className="flex items-center justify-center gap-2 text-center text-3xl font-bold lg:text-4xl">
        {title}
      </h2>
    </div>
  );
};

export default function SummaryViewer({ summary }: { summary: string }) {
  const [currentSection, setCurrentSection] = useState(0);

  const handleNext = () =>
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));

  const handlePrevious = () =>
    setCurrentSection((prev) => Math.max(prev - 1, 0));

  const sections = summary
    .split("\n# ")
    .map((section) => section.trim())
    .filter(Boolean)
    .map(parseSection);

  return (
    <Card className="from-background via-background/95 relative h-[500px] w-full overflow-hidden rounded-3xl border border-rose-500/10 bg-linear-to-br to-rose-500/5 px-2 shadow-2xl backdrop-blur-lg lg:h-[600px] xl:w-[600px]">
      <ProgressBar sections={sections} currentSection={currentSection} />
      <div className="bg-background/80 pointer-events-none absolute top-0 right-0 left-0 z-5 h-28 backdrop-blur-xs" />
      <div className="scrollbar-hide h-full overflow-y-auto pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="px-4 sm:px-6">
          <SectionTitle title={sections[currentSection]?.title || ""} />
          <ContentSection points={sections[currentSection]?.points || []} />
        </div>
      </div>

      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSectionSelect={setCurrentSection}
      />
    </Card>
  );
}
