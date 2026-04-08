import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";

import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./structure";

export default defineConfig({
  name: "default",
  title: "Lekki Entertainment Studio",
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "ek3ayeg5",
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [deskTool({ structure: deskStructure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
