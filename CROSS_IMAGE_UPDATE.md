# Cross-Image 0.2.4 Update

## Overview
CrimShop has been updated to use @cross/image version 0.2.4 (from 0.2.2), which brings several new features and improvements.

## Changes Made

### 1. Version Update
- Updated cross-image CDN import from `0.2.2` to `0.2.4` in `js/constants.js`

### 2. New Image Format Support
Added support for modern image formats:
- **HEIC** (High Efficiency Image Container)
  - Read and write support
  - Quality parameter support (0-100)
  - Comprehensive EXIF metadata extraction
- **AVIF** (AV1 Image File Format)
  - Read and write support
  - Quality parameter support (0-100)
  - Enhanced metadata support

**Files Modified:**
- `index.html`: Added HEIC and AVIF options to save format dropdown
- `js/file-io.js`: Added save cases for HEIC and AVIF formats
- `app.js`: Updated quality slider display logic to include HEIC and AVIF

### 3. Improved Rotation and Flip Operations
Replaced manual canvas transformations with cross-image's built-in methods:

**Before (manual canvas operations):**
```javascript
// Manual rotation using canvas transforms
const tempCanvas = document.createElement('canvas');
const tempCtx = tempCanvas.getContext('2d');
tempCtx.translate(tempCanvas.width / 2, tempCanvas.height / 2);
tempCtx.rotate(Math.PI / 2);
tempCtx.drawImage(layer.canvas, -layer.canvas.width / 2, -layer.canvas.height / 2);
```

**After (using built-in methods):**
```javascript
// Using cross-image's optimized rotate90 method
const image = Image.fromRGBA(width, height, data);
image.rotate90();
```

**Benefits:**
- Pixel-perfect transformations
- Better performance
- Automatic dimension handling
- More maintainable code
- Error handling

**Files Modified:**
- `js/effects.js`: Updated `rotateLayer()`, `flipLayerHorizontal()`, and `flipLayerVertical()` functions

### 4. New Metadata Fields
Added support for new technical metadata fields:
- **format**: Image format (read-only)
- **compression**: Compression type used (read-only)
- **frameCount**: Number of frames in image (read-only)
- **bitDepth**: Bits per pixel (read-only)
- **colorType**: Color type/mode (read-only)

These fields are displayed in the metadata panel under the "Technical" group as read-only fields.

**Files Modified:**
- `app.js`: Added new fields to metadata groups and read-only support
- `js/state.js`: Metadata structure supports these fields

## New Features Available from cross-image 0.2.4

### Available but Not Yet Implemented
The following features are available in cross-image 0.2.4 but not yet integrated into CrimShop:

1. **Image.extractMetadata()** - Static method to extract metadata without decoding pixel data
   - Useful for displaying metadata without loading full image
   
2. **Additional rotation methods:**
   - `rotate()` - Rotate by arbitrary degrees (rounds to nearest 90°)
   - `rotate180()` - 180° rotation
   - `rotate270()` - 270° clockwise rotation

3. **Enhanced metadata support:**
   - XMP metadata in WebP
   - Comprehensive EXIF parsing for HEIC/AVIF (19 fields)
   - GPS coordinates with microsecond precision

4. **Format capability discovery:**
   - `Image.getSupportedMetadata(format)` - Check which metadata fields are supported per format

## Testing Notes

### Format Compatibility
- HEIC and AVIF require modern browser support (ImageDecoder/OffscreenCanvas API)
- Older browsers may not support these formats
- Fallback to PNG is available if encoding fails

### Known Limitations
- HEIC and AVIF are single-frame formats (no animation support)
- Some browsers may have limited HEIC/AVIF support

## Future Enhancements

Potential improvements for future updates:
1. Implement `Image.extractMetadata()` for faster metadata preview
2. Add UI for 180° and 270° rotation options
3. Add `Image.getSupportedMetadata()` to show format-specific metadata capabilities
4. Implement EXIF orientation correction using built-in rotation methods
5. Add support for arbitrary angle rotation (with cropping)

## References

- [cross-image Changelog](https://github.com/cross-org/image/blob/main/CHANGELOG.md)
- [Metadata Documentation](https://cross-image.56k.guru/metadata/)
- [Filters Documentation](https://cross-image.56k.guru/processing/filters/)
- [Color Adjustments](https://cross-image.56k.guru/processing/color-adjustments/)
- [Image Manipulation](https://cross-image.56k.guru/processing/manipulation/)
