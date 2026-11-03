import type { DetailCard, Takeaway } from "./types";

export const TAKEAWAYS: Takeaway[] = [
  {
    title: "Product ownership",
    description:
      "Defined the business rules and requirements myself, starting from a problem I had.",
  },
  {
    title: "End-to-end delivery",
    description:
      "Built every layer, from the database to the interface, and took it to launch.",
  },
  {
    title: "Making value obvious",
    description:
      "Learned that a strong feature isn’t enough if users can’t see its value. I had plans to address it, but the money ran out first.",
  },
];

export const DETAIL_CARDS: DetailCard[] = [
  {
    title: "Frontend Implementation",
    description:
      "Implemented a designer’s visual design, including asset management, the transactions table, and a chart tracking how the real average price evolved with each transaction.",
    tags: ["React", "TypeScript", "Material UI", "Chart.js"],
  },
  {
    title: "Backend & Core Logic",
    description:
      "Built the backend and data model, plus the complex algorithm behind the real average price, covering scenarios like sales made below it.",
    tags: ["Node.js", "Fastify", "Prisma", "PostgreSQL"],
  },
];
