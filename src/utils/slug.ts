// @/utils/slug.ts
export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with dashes
    .replace(/(^-|-$)+/g, ""); // Remove leading or trailing dashes
}
