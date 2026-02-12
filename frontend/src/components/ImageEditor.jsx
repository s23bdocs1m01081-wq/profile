import React, { useState, useRef, useEffect } from 'react';
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

function ImageEditor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [activeTab, setActiveTab] = useState('upload');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Edit states
  const [rotation, setRotation] = useState(0);
  const [filter, setFilter] = useState({ type: 'none', intensity: 1 });
  const [resizeWidth, setResizeWidth] = useState('');
  const [resizeHeight, setResizeHeight] = useState('');
  const [outputFormat, setOutputFormat] = useState('image/png');
  const [quality, setQuality] = useState(0.9);
  
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle file selection
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsProcessing(true);
    try {
      const img = await loadImage(file);
      setSelectedFile(file);
      setOriginalImage(img);
      setPreviewImage(img.src);
      setResizeWidth(img.width);
      setResizeHeight(img.height);
      setActiveTab('edit');
    } catch (error) {
      console.error('Error loading image:', error);
      alert('Failed to load image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply rotation
  const handleRotate = async (degrees) => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    try {
      const newRotation = (rotation + degrees) % 360;
      setRotation(newRotation);
      
      const rotatedDataUrl = await rotateImage(originalImage, degrees);
      const rotatedImg = await loadImage(rotatedDataUrl);
      setPreviewImage(rotatedDataUrl);
      setOriginalImage(rotatedImg);
    } catch (error) {
      console.error('Error rotating image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply flip
  const handleFlip = async (direction) => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    try {
      const flippedDataUrl = await flipImage(originalImage, direction);
      const flippedImg = await loadImage(flippedDataUrl);
      setPreviewImage(flippedDataUrl);
      setOriginalImage(flippedImg);
    } catch (error) {
      console.error('Error flipping image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply filter
  const handleFilterChange = async (filterType, intensity = 1) => {
    if (!originalImage) return;
    
    setIsProcessing(true);
    setFilter({ type: filterType, intensity });
    
    try {
      if (filterType === 'none') {
        // Reset to original
        const originalDataUrl = await convertFormat(originalImage);
        setPreviewImage(originalDataUrl);
      } else {
        const filteredDataUrl = await applyFilter(originalImage, filterType, intensity);
        setPreviewImage(filteredDataUrl);
      }
    } catch (error) {
      console.error('Error applying filter:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Apply resize
  const handleResize = async () => {
    if (!originalImage || !resizeWidth || !resizeHeight) return;
    
    setIsProcessing(true);
    try {
      const resizedDataUrl = await resizeImage(
        originalImage,
        parseInt(resizeWidth),
        parseInt(resizeHeight),
        outputFormat,
        quality
      );
      setPreviewImage(resizedDataUrl);
    } catch (error) {
      console.error('Error resizing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Download image
  const handleDownload = () => {
    if (!previewImage) return;
    
    const extension = outputFormat.split('/')[1];
    const filename = `edited-image-${Date.now()}.${extension}`;
    downloadImage(previewImage, filename);
  };

  // Reset all edits
  const handleReset = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    try {
      const img = await loadImage(selectedFile);
      setOriginalImage(img);
      setPreviewImage(img.src);
      setRotation(0);
      setFilter({ type: 'none', intensity: 1 });
      setResizeWidth(img.width);
      setResizeHeight(img.height);
    } catch (error) {
      console.error('Error resetting image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Image Editor</h1>
          <p className="text-gray-600">Upload and edit your images with powerful tools</p>
        </header>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-4 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('upload')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'upload'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                disabled={!originalImage}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'edit'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } ${!originalImage ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Edit
              </button>
              <button
                onClick={() => setActiveTab('export')}
                disabled={!originalImage}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'export'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } ${!originalImage ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Export
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-blue-600">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
                {selectedFile && (
                  <div className="mt-4 text-sm text-gray-600">
                    Selected: {selectedFile.name}
                  </div>
                )}
              </div>
            )}

            {/* Edit Tab */}
            {activeTab === 'edit' && originalImage && (
              <div className="space-y-6">
                {/* Preview */}
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[400px]">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="max-h-96 max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400">Loading preview...</div>
                  )}
                </div>

                {/* Transform Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Rotation & Flip */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Transform</h3>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRotate(90)}
                          disabled={isProcessing}
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Rotate 90°
                        </button>
                        <button
                          onClick={() => handleRotate(180)}
                          disabled={isProcessing}
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Rotate 180°
                        </button>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleFlip('horizontal')}
                          disabled={isProcessing}
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Flip Horizontal
                        </button>
                        <button
                          onClick={() => handleFlip('vertical')}
                          disabled={isProcessing}
                          className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                        >
                          Flip Vertical
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Filters</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleFilterChange('none')}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-left"
                      >
                        None
                      </button>
                      <button
                        onClick={() => handleFilterChange('grayscale', 1)}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-left"
                      >
                        Grayscale
                      </button>
                      <button
                        onClick={() => handleFilterChange('sepia', 1)}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-left"
                      >
                        Sepia
                      </button>
                      <button
                        onClick={() => handleFilterChange('invert', 1)}
                        disabled={isProcessing}
                        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 text-left"
                      >
                        Invert
                      </button>
                    </div>
                  </div>

                  {/* Resize */}
                  <div className="bg-gray-50 rounded-lg p-4 md:col-span-2">
                    <h3 className="font-semibold text-gray-900 mb-3">Resize</h3>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={resizeWidth}
                          onChange={(e) => setResizeWidth(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={resizeHeight}
                          onChange={(e) => setResizeHeight(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <button
                        onClick={handleResize}
                        disabled={isProcessing}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    onClick={handleReset}
                    disabled={isProcessing}
                    className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}

            {/* Export Tab */}
            {activeTab === 'export' && originalImage && (
              <div className="space-y-6">
                <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Final preview"
                      className="max-h-72 max-w-full object-contain"
                    />
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Output Format
                    </label>
                    <select
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="image/png">PNG</option>
                      <option value="image/jpeg">JPEG</option>
                      <option value="image/webp">WebP</option>
                    </select>
                  </div>

                  {outputFormat !== 'image/png' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quality: {Math.round(quality * 100)}%
                      </label>
                      <input
                        type="range"
                        min="0.1"
                        max="1"
                        step="0.1"
                        value={quality}
                        onChange={(e) => setQuality(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}

                  <button
                    onClick={handleDownload}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                  >
                    Download Image
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {isProcessing && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageEditor;
