/**
 * Helper to resolve static assets and internal links with Astro's configured base path.
 * Supports both GitHub Pages subpath deployment (/businessCenterPrestigeServicesSococe) and root.
 */
export function getAssetPath(path: string): string {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('tel:') ||
    path.startsWith('mailto:') ||
    path.startsWith('#')
  ) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.replace(/\/$/, '');

  // If path already starts with base, don't duplicate
  if (base && path.startsWith(base)) {
    return path;
  }

  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
}
