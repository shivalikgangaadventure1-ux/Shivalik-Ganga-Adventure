import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  studioHost: "shivalik-ganga-adventure",
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
});
