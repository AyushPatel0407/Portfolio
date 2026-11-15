// Marvel Cinematic Universe titles for /marvel.
// Release dates are US premieres. `chrono` is the position in Disney+'s official
// timeline order (null = not placed there: upcoming, or set in another universe).
// Sources checked 15 Nov 2026: Marvel.com "MCU timeline order" (Oct 2026) and Wikipedia.

import data from "./mcu.json";

export type McuEntry = {
  title: string;
  kind: "film" | "series" | "special" | "animated";
  phase: number;
  saga: "Infinity" | "Multiverse";
  released: string; // YYYY-MM-DD
  monthOnly?: boolean; // only the month is announced
  status: "released" | "upcoming";
  chrono: number | null;
  setting: string;
  note?: string;
};

export const mcu = data as McuEntry[];
export const mcuUpdated = "15 Nov 2026";
