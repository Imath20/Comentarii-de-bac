/**
 * Cloudinary utility for image transformations
 * Uses Cloudinary's fetch feature to transform external images (like Google profile pictures)
 */

const CLOUDINARY_CONFIG = {
  cloudName: 'dktbqgxcc',
  apiKey: '323711783762796',
  apiSecret: 'CUk21-Vnyb3SvAyTfAhcjZ2PnK0',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
};

/**
 * Transforms a profile image URL using Cloudinary
 * Applies optimizations and transformations for profile pictures
 * 
 * @param {string} imageUrl - The original image URL (e.g., from Google)
 * @param {Object} options - Transformation options
 * @param {number} options.width - Desired width (default: 400)
 * @param {number} options.height - Desired height (default: 400)
 * @param {string} options.crop - Crop mode (default: 'fill')
 * @param {string} options.gravity - Gravity for cropping (default: 'face' for face detection)
 * @param {string} options.format - Output format (default: 'auto' for WebP when supported)
 * @param {number} options.quality - Image quality (default: 'auto')
 * @param {boolean} options.circle - Whether to make the image circular (default: true)
 * @returns {string} - Transformed Cloudinary URL
 */
export const transformProfileImage = (imageUrl, options = {}) => {
  // If no image URL provided, return empty string
  if (!imageUrl || typeof imageUrl !== 'string') {
    return '';
  }

  // If it's already a Cloudinary URL, return as is
  if (imageUrl.includes('res.cloudinary.com')) {
    return imageUrl;
  }

  // Default options for profile images
  const {
    width = 400,
    height = 400,
    crop = 'fill',
    gravity = 'face:auto', // Auto-detect face for better cropping
    format = 'auto', // Automatically use WebP when supported
    quality = 'auto',
    circle = true,
  } = options;

  // Build transformation string
  let transformations = [];

  // Add dimensions and crop first
  transformations.push(`w_${width}`, `h_${height}`, `c_${crop}`, `g_${gravity}`);

  // Add circular mask if requested (must come after dimensions)
  if (circle) {
    transformations.push('r_max'); // Maximum radius for circular crop
  }

  // Add quality and format
  transformations.push(`q_${quality}`, `f_${format}`);

  // Additional optimizations
  transformations.push('fl_immutable_cache'); // Cache optimization

  const transformationString = transformations.join(',');

  // Encode the source URL
  const encodedUrl = encodeURIComponent(imageUrl);

  // Build Cloudinary fetch URL
  const cloudinaryUrl = `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/fetch/${transformationString}/${encodedUrl}`;

  return cloudinaryUrl;
};

/**
 * Gets a profile image URL with Cloudinary transformations
 * Specifically optimized for Google profile pictures
 * 
 * @param {string} photoURL - Original photo URL
 * @param {Object} options - Optional size and transformation options
 * @param {number} options.size - Desired size in pixels (default: 400)
 * @param {boolean} options.circle - Whether to apply circular crop (default: true)
 * @returns {string} - Transformed URL or original if transformation fails
 */
export const getProfileImageUrl = (photoURL, options = {}) => {
  if (!photoURL) {
    return '';
  }

  const { size = 400, circle = true } = options;

  // Check if it's a Google profile image
  const isGoogleImage = photoURL.includes('googleusercontent.com') || 
                        photoURL.includes('google.com') ||
                        photoURL.includes('lh3.googleusercontent.com');

  // Transform Google images and other external images
  if (isGoogleImage || (!photoURL.startsWith('/') && !photoURL.startsWith('data:'))) {
    try {
      return transformProfileImage(photoURL, {
        width: size,
        height: size,
        circle: circle,
        quality: 'auto',
        format: 'auto',
      });
    } catch (error) {
      console.error('Error transforming image with Cloudinary:', error);
      // Fallback to original URL if transformation fails
      return photoURL;
    }
  }

  // Return original URL for local images or data URIs
  return photoURL;
};

/**
 * Generates a Cloudinary signature for signed uploads
 * NOTE: In production, this should be done server-side for security
 * 
 * @param {Object} params - Upload parameters
 * @returns {string} - Signature string
 */
const generateSignature = (params) => {
  const crypto = window.crypto || window.msCrypto;
  if (!crypto || !crypto.subtle) {
    // Fallback: use unsigned upload (requires upload preset)
    return null;
  }

  // Sort parameters
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  // In a real app, this should be done server-side
  // For now, we'll use unsigned uploads which require an upload preset
  return null;
};

/**
 * Tests connectivity to Cloudinary API
 * @returns {Promise<boolean>} - True if connection is successful
 */
export const testCloudinaryConnection = async () => {
  try {
    // Try to fetch Cloudinary's status or a simple endpoint
    const testUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/ping`;
    const response = await fetch(testUrl, { method: 'GET' });
    return response.ok || response.status !== 404; // Even 404 means DNS resolved
  } catch (error) {
    console.error('Cloudinary connection test failed:', error);
    return false;
  }
};

/**
 * Uploads an image file to Cloudinary
 * 
 * @param {File} file - The image file to upload
 * @param {string} folder - Optional folder path in Cloudinary
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadImageToCloudinary = async (file, folder = 'profile-pictures') => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    throw new Error('File must be an image');
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB
  if (file.size > maxSize) {
    throw new Error('Image size must be less than 10MB');
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset); // Create this in Cloudinary dashboard: Settings > Upload > Upload presets
  if (folder) {
    formData.append('folder', folder);
  }

  // For signed uploads (if you have upload preset configured)
  // If you don't have an upload preset, you'll need to create one in Cloudinary dashboard
  // Settings > Upload > Upload presets > Add upload preset
  // Set it to "Unsigned" and name it (e.g., "ml_default")

  try {
    // Try primary endpoint first
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
    
    // Log for debugging
    console.log('Uploading to Cloudinary:', {
      url: uploadUrl,
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
      folder: folder,
      fileSize: file.size,
      fileType: file.type
    });
    
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - let browser set it with boundary for FormData
    });

    if (!response.ok) {
      let errorMessage = `Upload failed: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        if (errorData.error?.message) {
          errorMessage = errorData.error.message;
        }
      } catch (e) {
        // If we can't parse the error, use the status text
        const errorText = await response.text().catch(() => '');
        if (errorText) {
          errorMessage = errorText;
        }
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    
    if (!data.secure_url && !data.url) {
      throw new Error('Cloudinary nu a returnat URL-ul imaginii. Verifică configurația upload preset.');
    }
    
    return data.secure_url || data.url; // Return the secure URL
  } catch (error) {
    console.error('Cloudinary upload error:', {
      error: error,
      message: error.message,
      name: error.name,
      stack: error.stack,
      cloudName: CLOUDINARY_CONFIG.cloudName,
      uploadPreset: CLOUDINARY_CONFIG.uploadPreset
    });
    
    // Provide more helpful error messages
    if (error.message.includes('Failed to fetch') || 
        error.message.includes('ERR_NAME_NOT_RESOLVED') ||
        error.name === 'TypeError' && error.message.includes('fetch')) {
      
      // Try to provide more specific guidance
      const errorDetails = [
        'Nu s-a putut conecta la Cloudinary.',
        '',
        'Posibile cauze:',
        '1. Problema de conexiune la internet - verifică conexiunea',
        '2. Server DNS nu poate rezolva api.cloudinary.com - încearcă să schimbi DNS-ul (ex: 8.8.8.8)',
        '3. Firewall/proxy blochează conexiunea - verifică setările de firewall',
        '4. Extensii de browser (ad-blocker) blochează cererea - dezactivează temporar',
        '',
        `URL încercat: https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`
      ].join('\n');
      
      throw new Error(errorDetails);
    }
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      throw new Error(`Eroare de autentificare Cloudinary. Verifică upload preset-ul "${CLOUDINARY_CONFIG.uploadPreset}" în Cloudinary Dashboard (Settings > Upload > Upload presets).`);
    }
    
    if (error.message.includes('400') || error.message.includes('Invalid')) {
      throw new Error(`Upload preset "${CLOUDINARY_CONFIG.uploadPreset}" nu există sau nu este configurat corect în Cloudinary Dashboard.`);
    }
    
    throw error;
  }
};

/**
 * Cloudinary configuration export
 */
export default {
  config: CLOUDINARY_CONFIG,
  transformProfileImage,
  getProfileImageUrl,
  uploadImageToCloudinary,
};

