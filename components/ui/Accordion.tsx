"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItem {
  question: string;
  answer: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-heading text-sm font-bold text-heading sm:text-base">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-primary"
              >
                <ChevronDown size={20} aria-hidden="true" />
              </motion.span>
            </button>
            {/*
              The answer stays mounted in the DOM at all times (visibility toggled
              via max-height, not conditional rendering) so every FAQ answer is
              present in server-rendered HTML for crawlers/AI extraction that read
              rendered text rather than parsing the FAQPage JSON-LD — previously
              only the open item's answer existed in the DOM at all.
            */}
            <motion.div
              animate={{ maxHeight: isOpen ? 400 : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="px-5 pb-5 text-sm leading-relaxed text-body">{item.answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
