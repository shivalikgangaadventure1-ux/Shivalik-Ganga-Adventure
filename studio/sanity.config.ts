import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "Shivalik Ganga Adventure",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
