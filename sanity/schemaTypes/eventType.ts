import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "details", title: "Details", default: true },
    { name: "media", title: "Media & Gallery" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "details",
      description: "This is used for the event page URL. Click Generate after entering the title.",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "venue",
      title: "Venue",
      type: "string",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      group: "details",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ticketUrl",
      title: "Ticket URL",
      type: "url",
      group: "details",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      description: "Main image used for the event card and gallery header.",
      group: "media",
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
    defineField({
      name: "photos",
      title: "Event Photos",
      type: "array",
      description: "Upload all recap/gallery images for this event here. These images power the Gallery page automatically.",
      group: "media",
      options: {
        layout: "grid",
      },
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
  preview: {
    select: {
      title: "title",
      date: "date",
      venue: "venue",
      media: "coverImage",
    },
    prepare({ title, date, venue, media }) {
      return {
        title,
        subtitle: `${new Date(date).toLocaleDateString()} • ${venue}`,
        media,
      };
    },
  },
});
