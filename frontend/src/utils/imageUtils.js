/**
 * Image Utilities
 * Provides helper functions for image manipulation and processing
 */

/**
 * Load an image from a URL or File object
 * @param {string|File} source - Image URL or File object
 * @returns {Promise<HTMLImageElement>}
 */
export const loadImage = (source) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => resolve(img);
    img.onerror = reject;
    
    if (source instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(source);
    } else {
      img.src = source;
    }
  });
};

/**
 * Resize an image to specified dimensions
 * @param {HTMLImageElement} image - Source image
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @param {string} format - Output format (image/png, image/jpeg, image/webp)
 * @param {number} quality - Quality (0-1) for lossy formats
 * @returns {Promise<string>} - Data URL of resized image
 */
export const resizeImage = (image, maxWidth, maxHeight, format = 'image/png', quality = 0.9) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    let width = image.width;
    let height = image.height;
    
    // Calculate new dimensions while maintaining aspect ratio
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }
    
    canvas.width = width;
    canvas.height = height;
    
    ctx.drawImage(image, 0, 0, width, height);
    resolve(canvas.toDataURL(format, quality));
  });
};

/**
 * Crop an image to specified dimensions
 * @param {HTMLImageElement} image - Source image
 * @param {Object} cropArea - Crop area {x, y, width, height}
 * @param {string} format - Output format
 * @param {number} quality - Quality (0-1)
 * @returns {Promise<string>} - Data URL of cropped image
 */
export const cropImage = (image, cropArea, format = 'image/png', quality = 0.9) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = cropArea.width;
    canvas.height = cropArea.height;
    
    ctx.drawImage(
      image,
      cropArea.x,
      cropArea.y,
      cropArea.width,
      cropArea.height,
      0,
      0,
      cropArea.width,
      cropArea.height
    );
    
    resolve(canvas.toDataURL(format, quality));
  });
};

/**
 * Apply a filter to an image
 * @param {HTMLImageElement} image - Source image
 * @param {string} filterType - Filter type (grayscale, sepia, brightness, contrast, invert)
 * @param {number} intensity - Filter intensity:
 *   - grayscale/sepia: 0-1 (0 = no effect, 1 = full effect)
 *   - brightness: -1 to 1 (multiplied by 50 for pixel adjustment, e.g., 0.5 adds 25 to each pixel)
 *   - contrast: 0-1 (uses contrast enhancement formula, 0.5 = neutral, 1 = maximum)
 *   - invert: not used (always full invert)
 * @returns {Promise<string>} - Data URL of filtered image
 */
export const applyFilter = (image, filterType, intensity = 1) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    ctx.drawImage(image, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    switch (filterType) {
      case 'grayscale':
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i] * (1 - intensity) + avg * intensity;
          data[i + 1] = data[i + 1] * (1 - intensity) + avg * intensity;
          data[i + 2] = data[i + 2] * (1 - intensity) + avg * intensity;
        }
        break;
      
      case 'sepia':
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          const tr = 0.393 * r + 0.769 * g + 0.189 * b;
          const tg = 0.349 * r + 0.686 * g + 0.168 * b;
          const tb = 0.272 * r + 0.534 * g + 0.131 * b;
          
          data[i] = r * (1 - intensity) + tr * intensity;
          data[i + 1] = g * (1 - intensity) + tg * intensity;
          data[i + 2] = b * (1 - intensity) + tb * intensity;
        }
        break;
      
      case 'brightness': {
        // Brightness adjustment: intensity * 50 = pixel value change
        // Range: -1 to 1, where -1 darkens by 50, 1 brightens by 50
        const brightnessFactor = intensity * 50;
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, data[i] + brightnessFactor));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + brightnessFactor));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + brightnessFactor));
        }
        break;
      }
      
      case 'contrast': {
        // Contrast enhancement using standard formula: (259(C+255))/(255(259-C))
        // where C = intensity * 100, giving range 0-100 for the contrast value
        const contrastFactor = (259 * (intensity * 100 + 255)) / (255 * (259 - intensity * 100));
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, contrastFactor * (data[i] - 128) + 128));
          data[i + 1] = Math.min(255, Math.max(0, contrastFactor * (data[i + 1] - 128) + 128));
          data[i + 2] = Math.min(255, Math.max(0, contrastFactor * (data[i + 2] - 128) + 128));
        }
        break;
      }
      
      case 'invert':
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];
          data[i + 1] = 255 - data[i + 1];
          data[i + 2] = 255 - data[i + 2];
        }
        break;
      
      default:
        break;
    }
    
    ctx.putImageData(imageData, 0, 0);
    resolve(canvas.toDataURL('image/png'));
  });
};

/**
 * Convert image to different format
 * @param {HTMLImageElement} image - Source image
 * @param {string} format - Target format (image/png, image/jpeg, image/webp)
 * @param {number} quality - Quality (0-1)
 * @returns {Promise<string>} - Data URL
 */
export const convertFormat = (image, format = 'image/png', quality = 0.9) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    
    resolve(canvas.toDataURL(format, quality));
  });
};

/**
 * Rotate image by specified degrees
 * @param {HTMLImageElement} image - Source image
 * @param {number} degrees - Rotation angle (90, 180, 270)
 * @returns {Promise<string>} - Data URL
 */
export const rotateImage = (image, degrees) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    const radians = (degrees * Math.PI) / 180;
    
    if (degrees === 90 || degrees === 270) {
      canvas.width = image.height;
      canvas.height = image.width;
    } else {
      canvas.width = image.width;
      canvas.height = image.height;
    }
    
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(radians);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    
    resolve(canvas.toDataURL('image/png'));
  });
};

/**
 * Flip image horizontally or vertically
 * @param {HTMLImageElement} image - Source image
 * @param {string} direction - 'horizontal' or 'vertical'
 * @returns {Promise<string>} - Data URL
 */
export const flipImage = (image, direction = 'horizontal') => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = image.width;
    canvas.height = image.height;
    
    ctx.save();
    
    if (direction === 'horizontal') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }
    
    ctx.drawImage(image, 0, 0);
    ctx.restore();
    
    resolve(canvas.toDataURL('image/png'));
  });
};

/**
 * Download image to user's device
 * @param {string} dataUrl - Image data URL
 * @param {string} filename - Download filename
 */
export const downloadImage = (dataUrl, filename = 'image.png') => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
