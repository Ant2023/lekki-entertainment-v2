import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "featuredEvent",
      title: "Featured Event",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "details",
          title: "Details",
          type: "text",
          rows: 5,
        }),
        defineField({
          name: "date",
          title: "Date",
          type: "datetime",
        }),
        defineField({
          name: "venue",
          title: "Venue",
          type: "string",
        }),
        defineField({
          name: "city",
          title: "City",
          type: "string",
        }),
        defineField({
          name: "buttonLabel",
          title: "Button Label",
          type: "string",
          initialValue: "Get Tickets",
        }),
        defineField({
          name: "ticketUrl",
          title: "Ticket URL",
          type: "url",
        }),
        defineField({
          name: "flyer",
          title: "Flyer",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
          validation: (rule) => rule.required(),
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: "eventHighlights",
      title: "Event Highlights",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Section Title",
          type: "string",
          initialValue: "Event Highlights",
        }),
        defineField({
          name: "subtitle",
          title: "Section Subtitle",
          type: "string",
          description: "Optional short line under the Event Highlights heading.",
        }),
        defineField({
          name: "galleryImages",
          title: "Gallery Images",
          type: "array",
          description: "These are added on top of the built-in Denver recap images.",
          of: [
            defineArrayMember({
              type: "image",
              options: { hotspot: true },
              fields: [
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                }),
              ],
            }),
          ],
        }),
      ],
      options: {
        collapsible: true,
        collapsed: false,
      },
    }),
    defineField({
      name: "galleryImages",
      title: "Legacy Gallery Images",
      type: "array",
      hidden: true,
      readOnly: true,
      description: "Deprecated field kept temporarily so older content does not show as unknown.",
      of: [
        defineArrayMember({
          type: "image",
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
        subtitle: "Featured event and event highlights",
      };
    },
  },
});
