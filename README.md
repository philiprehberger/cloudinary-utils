# @philiprehberger/cloudinary-utils

Cloudinary image URL builder, srcset generation, and blur placeholders.

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

## License

MIT
