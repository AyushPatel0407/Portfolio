// My binge-watch list. Edit this file to update /watchlist.
//
// These are SAMPLE entries to show the layout. Replace them with your own and
// delete `sample: true` from each one; the "sample list" notice disappears when
// no entry is marked as a sample.

export type WatchStatus = "Watching" | "Completed" | "Plan to watch" | "Dropped";
export type WatchType = "Series" | "Movie" | "Anime" | "Documentary";

export type WatchItem = {
  title: string;
  type: WatchType;
  year: number;
  status: WatchStatus;
  genres: string[];
  platform?: string;
  seasons?: { watched: number; total: number }; // series: seasons finished out of seasons released
  rating?: number; // out of 10, only for titles you've watched
  note?: string; // one line, optional
  sample?: boolean;
};

export const watchlist: WatchItem[] = [
  { title: "Dark", type: "Series", year: 2017, status: "Completed", seasons: { watched: 3, total: 3 }, genres: ["Sci-fi", "Mystery"], platform: "Netflix", rating: 10, sample: true },
  { title: "Breaking Bad", type: "Series", year: 2008, status: "Completed", seasons: { watched: 5, total: 5 }, genres: ["Crime", "Drama"], platform: "Netflix", rating: 10, sample: true },
  { title: "Panchayat", type: "Series", year: 2020, status: "Completed", seasons: { watched: 4, total: 4 }, genres: ["Comedy", "Drama"], platform: "Prime Video", rating: 9, sample: true },
  { title: "Scam 1992", type: "Series", year: 2020, status: "Completed", seasons: { watched: 1, total: 1 }, genres: ["Biography", "Drama"], platform: "SonyLIV", rating: 9, sample: true },
  { title: "Kota Factory", type: "Series", year: 2019, status: "Completed", seasons: { watched: 3, total: 3 }, genres: ["Drama", "Comedy"], platform: "Netflix", rating: 8, sample: true },
  { title: "The Family Man", type: "Series", year: 2019, status: "Watching", seasons: { watched: 2, total: 3 }, genres: ["Thriller", "Action"], platform: "Prime Video", sample: true },
  { title: "Severance", type: "Series", year: 2022, status: "Plan to watch", seasons: { watched: 0, total: 2 }, genres: ["Sci-fi", "Thriller"], platform: "Apple TV+", sample: true },
  { title: "Arcane", type: "Series", year: 2021, status: "Plan to watch", seasons: { watched: 0, total: 2 }, genres: ["Animation", "Fantasy"], platform: "Netflix", sample: true },
  { title: "Interstellar", type: "Movie", year: 2014, status: "Completed", genres: ["Sci-fi", "Drama"], rating: 10, sample: true },
  { title: "Oppenheimer", type: "Movie", year: 2023, status: "Completed", genres: ["Biography", "History"], rating: 9, sample: true },
];

export const STATUS_ORDER: WatchStatus[] = ["Watching", "Completed", "Plan to watch", "Dropped"];
