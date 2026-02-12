# Image Creation and Editing Guide

This document explains how to use the image creation and editing functionality in this portfolio website.

## Overview

The portfolio now includes a powerful image editor built with React and Canvas API. You can use it to:
- Upload images from your device
- Apply transformations (rotate, flip)
- Add filters (grayscale, sepia, invert)
- Resize images
- Export in different formats (PNG, JPEG, WebP)

## Accessing the Image Editor

### Via Navigation
1. Navigate to the website
2. Click on "Image Editor" in the navigation menu
3. The editor will open in a new page

### Via URL
Visit: `/image-editor` route

## Using the Image Editor Component

### Step 1: Upload an Image

1. Click on the upload area or drag and drop an image
2. Supported formats: PNG, JPG, GIF (up to 10MB)
3. The image will be loaded and displayed in the editor

### Step 2: Edit the Image

The editor provides several tools organized in tabs:

#### Transform Tools
- **Rotate 90°**: Rotate the image clockwise by 90 degrees
- **Rotate 180°**: Rotate the image by 180 degrees
- **Flip Horizontal**: Mirror the image horizontally
- **Flip Vertical**: Mirror the image vertically

#### Filters
- **None**: Remove all filters (reset to original)
- **Grayscale**: Convert image to black and white
- **Sepia**: Apply a vintage sepia tone
- **Invert**: Invert all colors

#### Resize
- Enter new width and height in pixels
- Click "Apply" to resize the image
- The aspect ratio is not locked, allowing custom dimensions

### Step 3: Export the Image

1. Switch to the "Export" tab
2. Choose output format:
   - PNG: Lossless, best for graphics and screenshots
   - JPEG: Lossy, smaller file size, good for photos
   - WebP: Modern format, good compression
3. For JPEG/WebP, adjust quality slider (10-100%)
4. Click "Download Image" to save to your device

### Additional Features

- **Reset**: Click "Reset" button to discard all changes and return to original image
- **Processing Indicator**: A loading overlay appears during processing

## Using Image Utilities Programmatically

You can also use the image utility functions directly in your code:

### Import the utilities

```javascript
import {
  loadImage,
  resizeImage,
  cropImage,
  applyFilter,
  rotateImage,
  flipImage,
  downloadImage,
  convertFormat
} from '../utils/imageUtils';
```

### Load an Image

```javascript
// From URL
const img = await loadImage('/path/to/image.jpg');

// From File object
const file = event.target.files[0];
const img = await loadImage(file);
```

### Resize an Image

```javascript
const resizedDataUrl = await resizeImage(
  img,           // HTMLImageElement
  800,           // maxWidth
  600,           // maxHeight
  'image/png',   // format
  0.9            // quality
);
```

### Crop an Image

```javascript
const croppedDataUrl = await cropImage(
  img,
  {
    x: 100,      // start x position
    y: 100,      // start y position
    width: 400,  // crop width
    height: 300  // crop height
  },
  'image/png',
  0.9
);
```

### Apply Filters

```javascript
// Grayscale
const grayscaleDataUrl = await applyFilter(img, 'grayscale', 1);

// Sepia
const sepiaDataUrl = await applyFilter(img, 'sepia', 1);

// Brightness (intensity: -1 to 1)
const brighterDataUrl = await applyFilter(img, 'brightness', 0.5);

// Contrast (intensity: -1 to 1)
const contrastDataUrl = await applyFilter(img, 'contrast', 0.5);

// Invert colors
const invertedDataUrl = await applyFilter(img, 'invert', 1);
```

### Rotate an Image

```javascript
// Rotate by 90 degrees
const rotatedDataUrl = await rotateImage(img, 90);

// Rotate by 180 degrees
const rotatedDataUrl = await rotateImage(img, 180);

// Rotate by 270 degrees
const rotatedDataUrl = await rotateImage(img, 270);
```

### Flip an Image

```javascript
// Flip horizontally
const flippedDataUrl = await flipImage(img, 'horizontal');

// Flip vertically
const flippedDataUrl = await flipImage(img, 'vertical');
```

### Convert Format

```javascript
const convertedDataUrl = await convertFormat(
  img,
  'image/jpeg',  // format
  0.8            // quality
);
```

### Download Image

```javascript
downloadImage(dataUrl, 'my-edited-image.png');
```

## Example: Create a Custom Image Editor

Here's an example of creating a simple custom image workflow:

```javascript
import { loadImage, applyFilter, resizeImage, downloadImage } from '../utils/imageUtils';

async function processProjectImage() {
  // 1. Load the image
  const img = await loadImage('/mockups/project.png');
  
  // 2. Resize to thumbnail size
  const resized = await resizeImage(img, 400, 300);
  
  // 3. Load the resized image
  const resizedImg = await loadImage(resized);
  
  // 4. Apply grayscale filter
  const filtered = await applyFilter(resizedImg, 'grayscale', 0.5);
  
  // 5. Download the result
  downloadImage(filtered, 'project-thumbnail.png');
}
```

## Technical Details

### Browser Compatibility
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Requires Canvas API support
- Uses HTML5 File API for uploads

### Performance Considerations
- Large images may take time to process
- Processing is done client-side (no server required)
- Memory usage increases with image size

### Limitations
- Maximum file size: 10MB (configurable)
- Some filters may be CPU intensive on large images
- Canvas API limitations apply

## Adding to Projects

To use edited images in your projects:

1. Edit the image using the Image Editor
2. Download the edited image
3. Place it in `/frontend/public/mockups/` directory
4. Update the project data in `/frontend/src/data/projects.js`
5. Reference the image path in your project object

Example:
```javascript
{
  slug: 'my-project',
  title: 'My Project',
  cover: '/mockups/my-edited-image.png',
  // ...
}
```

## Troubleshooting

### Image won't load
- Check file format is supported (PNG, JPG, GIF)
- Ensure file size is under 10MB
- Verify file is not corrupted

### Processing is slow
- Large images take longer to process
- Try resizing the image first
- Close other browser tabs to free up memory

### Download doesn't work
- Check browser permissions
- Ensure pop-up blocker is not active
- Try a different browser

## Future Enhancements

Potential features for future versions:
- Batch processing multiple images
- More advanced filters (blur, sharpen, etc.)
- Drawing tools (text, shapes, annotations)
- Undo/redo functionality
- Save presets for common workflows
- Integration with project upload

## Support

For issues or questions, please contact the developer or open an issue on GitHub.
