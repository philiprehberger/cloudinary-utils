// =============================================================================
// CLOUDINARY URL BUILDER
// =============================================================================

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  crop?: 'fill' | 'fit' | 'scale' | 'thumb';
  gravity?: 'auto' | 'center' | 'face' | 'faces';
  blur?: number;
}

export function buildCloudinaryUrl(
  cloudName: string,
  publicId: string,
  options: CloudinaryTransformOptions = {}
): string {
  const transforms: string[] = [];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  if (options.gravity) transforms.push(`g_${options.gravity}`);
  if (options.blur) transforms.push(`e_blur:${options.blur}`);
  transforms.push(`q_${options.quality || 'auto'}`);
  transforms.push(`f_${options.format || 'auto'}`);
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms.join(',')}/${publicId}`;
}

export function buildCloudinaryBlurPlaceholder(cloudName: string, publicId: string): string {
  return buildCloudinaryUrl(cloudName, publicId, { width: 20, quality: 30, blur: 1000 });
}

export function buildCloudinarySrcset(
  cloudName: string,
  publicId: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1536],
  format?: 'webp' | 'avif'
): string {
  return widths
    .map((width) => `${buildCloudinaryUrl(cloudName, publicId, { width, format })} ${width}w`)
    .join(', ');
}

// =============================================================================
// NEXT.JS IMAGE LOADER
// =============================================================================

export interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export function createCloudinaryLoader(cloudName: string) {
  return function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
    if (src.includes('res.cloudinary.com')) {
      const parts = src.split('/upload/');
      if (parts.length === 2) {
        return `${parts[0]}/upload/w_${width},q_${quality || 'auto'},f_auto/${parts[1]}`;
      }
    }
    if (src.startsWith('/')) return src;
    return `https://res.cloudinary.com/${cloudName}/image/upload/w_${width},q_${quality || 'auto'},f_auto,c_limit/${src}`;
  };
}

// =============================================================================
// BLUR PLACEHOLDERS
// =============================================================================

function toBase64(str: string): string {
  if (typeof window === 'undefined') return Buffer.from(str).toString('base64');
  return btoa(str);
}

export function generateBlurPlaceholder(width: number, height: number, color = '#e5e7eb'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><rect fill="${color}" width="${width}" height="${height}"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export function shimmerPlaceholder(w: number, h: number): string {
  const svg = `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="g"><stop stop-color="#f6f7f8" offset="0%"/><stop stop-color="#edeef1" offset="20%"/><stop stop-color="#f6f7f8" offset="40%"/><stop stop-color="#f6f7f8" offset="100%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#f6f7f8"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/><animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export function shimmerPlaceholderDark(w: number, h: number): string {
  const svg = `<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient id="g"><stop stop-color="#374151" offset="0%"/><stop stop-color="#4b5563" offset="20%"/><stop stop-color="#374151" offset="40%"/><stop stop-color="#374151" offset="100%"/></linearGradient></defs><rect width="${w}" height="${h}" fill="#374151"/><rect id="r" width="${w}" height="${h}" fill="url(#g)"/><animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export function colorPlaceholder(hexColor: string): string {
  const svg = `<svg width="1" height="1" xmlns="http://www.w3.org/2000/svg"><rect width="1" height="1" fill="${hexColor}"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export function gradientPlaceholder(fromColor: string, toColor: string, direction: 'horizontal' | 'vertical' | 'diagonal' = 'vertical'): string {
  const coords = {
    horizontal: { x1: '0%', y1: '0%', x2: '100%', y2: '0%' },
    vertical: { x1: '0%', y1: '0%', x2: '0%', y2: '100%' },
    diagonal: { x1: '0%', y1: '0%', x2: '100%', y2: '100%' },
  };
  const { x1, y1, x2, y2 } = coords[direction];
  const svg = `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0%" style="stop-color:${fromColor}"/><stop offset="100%" style="stop-color:${toColor}"/></linearGradient></defs><rect width="10" height="10" fill="url(#grad)"/></svg>`;
  return `data:image/svg+xml;base64,${toBase64(svg)}`;
}

export const placeholders = {
  gray: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/BfwYACwsB/q5kG+AAAAAASUVORK5CYII=',
  white: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
  dark: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  transparent: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
} as const;
