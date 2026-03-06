import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('cloudinary-utils', async () => {
  const mod = await import('../../dist/index.mjs');

  it('exports buildCloudinaryUrl as a function', () => {
    assert.ok(typeof mod.buildCloudinaryUrl === 'function');
  });

  it('exports createCloudinaryLoader as a function', () => {
    assert.ok(typeof mod.createCloudinaryLoader === 'function');
  });

  it('exports shimmerPlaceholder as a function', () => {
    assert.ok(typeof mod.shimmerPlaceholder === 'function');
  });
});
