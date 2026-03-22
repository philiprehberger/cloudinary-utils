# @philiprehberger/cloudinary-utils

[![CI](https://github.com/philiprehberger/ts-cloudinary-utils/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-cloudinary-utils/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/cloudinary-utils.svg)](https://www.npmjs.com/package/@philiprehberger/cloudinary-utils)
[![License](https://img.shields.io/github/license/philiprehberger/ts-cloudinary-utils)](LICENSE)

Cloudinary image URL builder, srcset generation, and blur placeholders

## Installation

```bash
npm install @philiprehberger/cloudinary-utils
```

## Usage

```ts
import { buildCloudinaryUrl, buildCloudinarySrcset, createCloudinaryLoader } from '@philiprehberger/cloudinary-utils';

const url = buildCloudinaryUrl('my-cloud', 'folder/image.jpg', {
  width: 800,
  quality: 'auto',
  format: 'webp',
  crop: 'fill',
});

const srcset = buildCloudinarySrcset('my-cloud', 'folder/image.jpg');

// Next.js Image loader
const loader = createCloudinaryLoader('my-cloud');
// <Image loader={loader} src="folder/image.jpg" ... />
```

### Blur Placeholders

```ts
import { shimmerPlaceholder, generateBlurPlaceholder, gradientPlaceholder } from '@philiprehberger/cloudinary-utils';

const shimmer = shimmerPlaceholder(300, 300);
const blur = generateBlurPlaceholder(300, 200, '#f0f0f0');
const gradient = gradientPlaceholder('#f0f0f0', '#e0e0e0', 'diagonal');
```

## API

### URL Building

| Function | Signature | Description |
|----------|-----------|-------------|
| `buildCloudinaryUrl` | `(cloudName, publicId, options?) => string` | Build a Cloudinary URL with transforms. |
| `buildCloudinaryBlurPlaceholder` | `(cloudName, publicId) => string` | Low-quality blurred placeholder URL. |
| `buildCloudinarySrcset` | `(cloudName, publicId, widths?, format?) => string` | Responsive srcset string. Default widths: 320–1536. |

### `CloudinaryTransformOptions`

| Property | Type | Description |
|----------|------|-------------|
| `width` | `number` | Output width in pixels. |
| `height` | `number` | Output height in pixels. |
| `quality` | `'auto' \| number` | Image quality. Default: `'auto'`. |
| `format` | `'auto' \| 'webp' \| 'avif' \| 'jpg' \| 'png'` | Output format. Default: `'auto'`. |
| `crop` | `'fill' \| 'fit' \| 'scale' \| 'thumb'` | Crop mode. |
| `gravity` | `'auto' \| 'center' \| 'face' \| 'faces'` | Crop gravity. |
| `blur` | `number` | Blur effect strength. |

### Next.js Integration

| Function | Signature | Description |
|----------|-----------|-------------|
| `createCloudinaryLoader` | `(cloudName) => ImageLoader` | Returns a loader compatible with Next.js `<Image>`. |

### Blur Placeholders

| Function | Description |
|----------|-------------|
| `generateBlurPlaceholder(w, h, color?)` | Solid color SVG as base64 data URI. |
| `shimmerPlaceholder(w, h)` | Animated shimmer (light theme). |
| `shimmerPlaceholderDark(w, h)` | Animated shimmer (dark theme). |
| `colorPlaceholder(hexColor)` | 1x1 color swatch. |
| `gradientPlaceholder(from, to, direction?)` | Gradient placeholder. Directions: `'horizontal'` `'vertical'` `'diagonal'`. |
| `placeholders` | Static object with `gray`, `white`, `dark`, `transparent` 1px PNGs. |


## Development

```bash
npm install
npm run build
npm test
```

## License

MIT
