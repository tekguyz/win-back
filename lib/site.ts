// The site's public address and the words every link preview uses.

export const siteName = "Win-Back";
export const siteTagline = "Bring back the customers who stopped calling";
export const siteDescription =
  "Finds past customers who stopped coming back in your own records, says who and why, and drafts a message to each. Nothing goes out until you approve it.";

/** `SITE_URL` (set in the host) wins; then the host's production URL; locally, localhost. */
export function siteUrl(): URL {
  if (process.env.SITE_URL) return new URL(process.env.SITE_URL);
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(production ? `https://${production}` : "http://localhost:3000");
}
