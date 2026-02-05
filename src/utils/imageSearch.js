/**
 * Utility for searching and generating copyright-free images
 * 
 * ⚙️ Hugging Face Spaces (prioritate):
 * - Poți rula Gradio / Streamlit
 * - Îți faci UI-ul tău
 * - Îi dai JSON → îți scuipă zip cu imagini
 * - 💡 Practic: mini-generatorul tău de BAC images
 * 
 * Fallback: Freepik, Unsplash, and Pexels APIs
 */

// ⚙️ Hugging Face Spaces API - Configure your HF Space URL
// Format: https://{username}-{space-name}.hf.space
// Example: https://yourusername-bac-image-generator.hf.space
// 
// Your HF Space should:
// - Accept JSON input with format: { "concepts": ["keyword1", "keyword2", ...], "options": {...} }
// - Return either:
//   a) A zip file URL with images
//   b) An array of image URLs
//   c) A structured object with zip_url or image_urls
//
// Set in .env.local:
// VITE_HF_SPACE_URL=https://yourusername-spacename.hf.space
// VITE_HF_API_KEY=your_hf_token (optional, for private spaces)
const HF_SPACE_URL = import.meta.env.VITE_HF_SPACE_URL || '';
const HF_SPACE_API_URL = HF_SPACE_URL ? `${HF_SPACE_URL}/api/predict` : '';
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY || '';

// Freepik API - Get API key from https://www.freepik.com/developers
// Note: In Vite, env variables must be prefixed with VITE_ to be accessible in client-side
const FREEPIK_API_KEY = import.meta.env.VITE_FREEPIK_API_KEY || import.meta.env.FREEPIK_API_KEY;
const FREEPIK_AI_API_URL = import.meta.env.VITE_FREEPIK_API_URL || 'https://api.freepik.com/v1/ai/mystic';
const FREEPIK_SEARCH_API_URL = 'https://api.freepik.com/v1/resources';
// Unsplash API - Get free access key from https://unsplash.com/developers
const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
// Pexels API - Get free access key from https://www.pexels.com/api/
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos';

// Cache pentru imagini deja folosite pentru a evita duplicatele
let usedImageUrls = new Set();

/**
 * Resets the image cache (call this when starting a new comment processing)
 */
export const resetImageCache = () => {
  usedImageUrls = new Set();
  console.log('[Image] Cache reset');
};

/**
 * Generates images using Hugging Face Spaces (Gradio/Streamlit)
 * Sends JSON input and receives a zip file with images or direct image URLs
 * 
 * @param {Array<string>|Object} input - Array of keywords or JSON object with image generation parameters
 * @param {Object} options - Generation options
 * @returns {Promise<Array<string>|null>} - Array of image URLs or null if failed
 */
export const generateImagesWithHuggingFace = async (input = [], options = {}) => {
  if (!HF_SPACE_API_URL) {
    console.warn('[HF] Hugging Face Space URL not configured');
    return null;
  }

  try {
    // Prepare JSON input for HF Space
    // Support both array of keywords and structured JSON object
    let inputData;
    
    if (Array.isArray(input)) {
      // Simple array of keywords
      inputData = {
        keywords: input,
        ...options
      };
    } else if (typeof input === 'object' && input !== null) {
      // Already structured JSON
      inputData = { ...input, ...options };
    } else if (typeof input === 'string') {
      // Single keyword as string
      inputData = {
        keywords: [input],
        ...options
      };
    } else {
      console.warn('[HF] Invalid input format');
      return null;
    }

    if (!inputData.keywords || (Array.isArray(inputData.keywords) && inputData.keywords.length === 0)) {
      console.warn('[HF] No keywords provided');
      return null;
    }

    console.log(`[HF] Generating images for:`, inputData);

    // Call HF Space API (Gradio format)
    // Gradio API expects: { "data": [input1, input2, ...] }
    // For a JSON input, we pass the JSON string as the first parameter
    const response = await fetch(HF_SPACE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(HF_API_KEY && { 'Authorization': `Bearer ${HF_API_KEY}` })
      },
      body: JSON.stringify({
        data: [JSON.stringify(inputData)] // Pass JSON as string in data array
      })
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`HF Space API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('[HF] API Response:', result);
    
    // Gradio API returns: { "data": [...] }
    // The response could be:
    // 1. A zip file URL (string ending with .zip)
    // 2. An array of image URLs
    // 3. A base64 encoded zip file (data:application/zip;base64,...)
    // 4. A structured object with zip_url or image_urls
    
    let zipUrl = null;
    let imageUrls = [];

    if (result.data && Array.isArray(result.data) && result.data.length > 0) {
      const firstResult = result.data[0];
      
      // Check if it's a zip file URL
      if (typeof firstResult === 'string') {
        if (firstResult.endsWith('.zip') || firstResult.includes('.zip') || firstResult.includes('application/zip')) {
          zipUrl = firstResult;
        } else if (firstResult.startsWith('http') || firstResult.startsWith('data:')) {
          // Could be direct image URL or base64
          imageUrls.push(firstResult);
        }
      } else if (firstResult && typeof firstResult === 'object') {
        // Could be structured response with zip_url or image_urls
        zipUrl = firstResult.zip_url || firstResult.zipUrl || firstResult.url || firstResult.file;
        imageUrls = firstResult.image_urls || firstResult.images || firstResult.data || [];
        
        // If imageUrls is still empty but we have other properties, check for nested arrays
        if (imageUrls.length === 0 && Array.isArray(firstResult)) {
          imageUrls = firstResult;
        }
      }
      
      // Check all results, not just the first one
      result.data.forEach((item, index) => {
        if (index === 0) return; // Already processed
        if (typeof item === 'string' && (item.startsWith('http') || item.startsWith('data:'))) {
          if (!item.endsWith('.zip') && !item.includes('.zip')) {
            imageUrls.push(item);
          }
        }
      });
    }

    // If we got a zip URL, download and try to extract it
    if (zipUrl) {
      console.log(`[HF] Received zip file: ${zipUrl}`);
      
      try {
        // Download the zip file
        const zipResponse = await fetch(zipUrl);
        if (!zipResponse.ok) {
          throw new Error(`Failed to download zip: ${zipResponse.status}`);
        }

        const zipBlob = await zipResponse.blob();
        
        // Try to use JSZip if available (would need to be added as dependency)
        // For now, we'll try to handle base64 zip or return the blob URL
        if (zipUrl.startsWith('data:')) {
          // Base64 encoded zip - would need JSZip to extract
          console.warn('[HF] Base64 zip received - requires JSZip library for extraction');
          // Return the data URL as fallback
          return [zipUrl];
        }
        
        // Create a blob URL for the zip file
        const zipBlobUrl = URL.createObjectURL(zipBlob);
        console.log(`[HF] Zip file downloaded, blob URL: ${zipBlobUrl}`);
        
        // Note: To extract zip in browser, we'd need JSZip:
        // import JSZip from 'jszip';
        // const zip = await JSZip.loadAsync(zipBlob);
        // Then extract each file and convert to image URLs
        
        // For now, return the zip blob URL
        // In production, you'd want to either:
        // 1. Add JSZip dependency and extract here
        // 2. Use a server-side proxy to extract the zip
        return [zipBlobUrl];
      } catch (zipError) {
        console.error('[HF] Error downloading zip file:', zipError);
        // Fallback: return the zip URL as-is
        return [zipUrl];
      }
    }

    if (imageUrls.length > 0) {
      console.log(`[HF] Received ${imageUrls.length} image URL(s)`);
      return imageUrls;
    }

    console.warn('[HF] No images or zip file found in response');
    return null;
  } catch (error) {
    console.error('[HF] Error generating images:', error);
    return null;
  }
};

/**
 * Generates multiple images from a JSON input (batch generation)
 * Perfect for generating all images for a comment at once
 * 
 * @param {Object} jsonInput - JSON object with image generation parameters
 *   Format: { "concepts": ["concept1", "concept2", ...], "options": {...} }
 * @returns {Promise<Object|null>} - Object mapping concepts to image URLs, or null if failed
 */
export const generateBatchImagesFromJSON = async (jsonInput) => {
  if (!jsonInput || typeof jsonInput !== 'object') {
    console.warn('[HF Batch] Invalid JSON input');
    return null;
  }

  // Extract concepts/keywords from JSON
  const concepts = jsonInput.concepts || jsonInput.keywords || jsonInput.images || [];
  
  if (!Array.isArray(concepts) || concepts.length === 0) {
    console.warn('[HF Batch] No concepts found in JSON input');
    return null;
  }

  console.log(`[HF Batch] Generating ${concepts.length} images from JSON input`);

  // Call HF Space with the full JSON
  const imageUrls = await generateImagesWithHuggingFace(jsonInput);

  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  // Map concepts to image URLs
  // If we got a zip file, we can't map directly (would need extraction)
  // If we got individual URLs, map them to concepts
  const result = {};
  
  if (imageUrls.length === 1 && (imageUrls[0].endsWith('.zip') || imageUrls[0].includes('blob:') || imageUrls[0].includes('application/zip'))) {
    // Zip file - can't map individual images without extraction
    console.warn('[HF Batch] Received zip file - individual image mapping requires extraction');
    // Return zip URL mapped to all concepts (temporary solution)
    concepts.forEach(concept => {
      result[concept] = imageUrls[0];
    });
  } else {
    // Individual image URLs - map to concepts
    concepts.forEach((concept, index) => {
      result[concept] = imageUrls[index] || imageUrls[0]; // Use first image as fallback
    });
  }

  return result;
};

/**
 * Searches for copyright-free images using Hugging Face Spaces (priority), Freepik, Unsplash, and Pexels APIs
 * Prioritizes Hugging Face Spaces, then Freepik for vectors/icons, then Unsplash, then Pexels
 * 
 * @param {string} keyword - Search keyword
 * @param {Object} options - Search options
 * @param {string} options.type - 'vector', 'icon', or 'photo' (default: 'icon')
 * @param {number} options.perPage - Number of results to fetch (default: 5 for variety)
 * @param {number} options.resultIndex - Index of result to use (for variety)
 * @param {boolean} options.useHuggingFace - Whether to use HF Spaces (default: true if configured)
 * @returns {Promise<string|null>} - Image URL or null if not found
 */
export const searchCopyrightFreeImage = async (keyword, options = {}) => {
  if (!keyword || !keyword.trim()) {
    return null;
  }

  const { type = 'icon', perPage = 5, resultIndex = 0, useHuggingFace = true } = options;
  
  // Clean and improve keyword - remove generic terms, keep only the core concept
  let cleanKeyword = keyword.trim().toLowerCase();
  
  // Remove common suffixes and make it more searchable
  cleanKeyword = cleanKeyword
    .replace(/\s+(icon|vector|illustration|image|picture)$/i, '') // Remove redundant terms
    .trim();
  
  // Build a more specific search query
  let searchQuery = cleanKeyword;
  if (type === 'vector' || type === 'icon') {
    searchQuery = cleanKeyword;
  }

  try {
    // Try Hugging Face Spaces first (if configured)
    if (useHuggingFace && HF_SPACE_API_URL) {
      try {
        const hfImages = await generateImagesWithHuggingFace([cleanKeyword], { type, resultIndex });
        if (hfImages && hfImages.length > 0) {
          // Use the first image or the one at resultIndex
          const selectedImage = hfImages[resultIndex % hfImages.length] || hfImages[0];
          
          // If it's a zip URL, we need to handle it differently
          // For now, if it's a direct image URL, use it
          if (selectedImage && selectedImage.startsWith('http') && !selectedImage.endsWith('.zip')) {
            if (!usedImageUrls.has(selectedImage)) {
              usedImageUrls.add(selectedImage);
              console.log(`[HF] Using generated image for "${keyword}":`, selectedImage);
              return selectedImage;
            }
          }
        }
      } catch (hfError) {
        console.warn('[HF] Error with Hugging Face Spaces, falling back to other services:', hfError);
      }
    }

    // NOTE: Freepik API doesn't support CORS from browser
    // It requires a server-side proxy to work from client-side
    // We'll skip Freepik and use only CORS-enabled services (Unsplash, Pexels)
    console.log(`[ImageSearch] Skipping Freepik (CORS restriction), using Unsplash/Pexels for "${searchQuery}"`);

    // Try Unsplash second (requires API key)
    if (UNSPLASH_ACCESS_KEY) {
      // For Unsplash, add more specific terms for icons/vectors
      const unsplashQuery = type === 'icon' || type === 'vector' 
        ? `${cleanKeyword} icon illustration minimal`
        : cleanKeyword;
      
      const unsplashUrl = `${UNSPLASH_API_URL}?query=${encodeURIComponent(unsplashQuery)}&per_page=${perPage}&orientation=squarish`;
      const response = await fetch(unsplashUrl, {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          // Try multiple results to avoid duplicates
          for (let i = 0; i < Math.min(data.results.length, perPage); i++) {
            const idx = (resultIndex + i) % data.results.length;
            const result = data.results[idx];
            const imageUrl = result.urls?.regular || result.urls?.small || result.urls?.raw;
            
            if (imageUrl && !usedImageUrls.has(imageUrl)) {
              usedImageUrls.add(imageUrl);
              console.log(`[Unsplash] Found unique image #${idx + 1} for "${keyword}":`, imageUrl);
              return imageUrl;
            }
          }
          
          // Fallback to first result
          const imageUrl = data.results[0].urls?.regular || data.results[0].urls?.small || data.results[0].urls?.raw;
          if (imageUrl) {
            console.log(`[Unsplash] Using first result for "${keyword}":`, imageUrl);
            return imageUrl;
          }
        }
      }
    }

    // Fallback to Pexels (requires API key for better results)
    if (PEXELS_API_KEY) {
      try {
        const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(cleanKeyword)}&per_page=${perPage}&orientation=square`;
        const pexelsResponse = await fetch(pexelsUrl, {
          headers: {
            'Authorization': PEXELS_API_KEY
          }
        });

        if (pexelsResponse.ok) {
          const pexelsData = await pexelsResponse.json();
          if (pexelsData.photos && pexelsData.photos.length > 0) {
            // Try multiple results to avoid duplicates
            for (let i = 0; i < Math.min(pexelsData.photos.length, perPage); i++) {
              const idx = (resultIndex + i) % pexelsData.photos.length;
              const photo = pexelsData.photos[idx];
              const imageUrl = photo.src?.medium || photo.src?.small || photo.src?.large;
              
              if (imageUrl && !usedImageUrls.has(imageUrl)) {
                usedImageUrls.add(imageUrl);
                console.log(`[Pexels] Found unique image #${idx + 1} for "${keyword}":`, imageUrl);
                return imageUrl;
              }
            }
            
            // Fallback to first result
            const imageUrl = pexelsData.photos[0].src?.medium || pexelsData.photos[0].src?.small;
            if (imageUrl) {
              console.log(`[Pexels] Using first result for "${keyword}":`, imageUrl);
              return imageUrl;
            }
          }
        }
      } catch (pexelsError) {
        console.warn('[Pexels] API error:', pexelsError);
      }
    }

    // Final fallback: Use a placeholder service or return null
    console.warn(`No image found for keyword: "${keyword}"`);
    return null;
  } catch (error) {
    console.error('Error searching for image:', error);
    return null;
  }
};

/**
 * Extracts the main concept/idea from a paragraph using AI
 * Returns a relevant search term for finding images
 * 
 * @param {string} text - Paragraph text
 * @param {string} title - Paragraph title (optional)
 * @param {Set<string>} usedConcepts - Set of already used concepts to avoid duplicates
 * @returns {Promise<string|null>} - Extracted concept/keyword or null
 */
export const extractConceptFromParagraph = async (text, title = '', usedConcepts = new Set()) => {
  if (!text || !text.trim()) {
    return null;
  }

  const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
  const groqApiKeyBackup = import.meta.env.VITE_GROQ_API_KEY_1;
  const groqApiUrl = import.meta.env.VITE_GROQ_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
  const groqKeys = [groqApiKey, groqApiKeyBackup].filter((k) => k && k !== 'undefined');

  if (!groqKeys.length) {
    // Fallback to simple extraction if no API key
    return extractKeywordFromParagraph(text, title, usedConcepts);
  }

  const prompt = `Analizează următorul paragraf dintr-un comentariu literar și identifică ideea principală sau conceptul cheie care ar putea fi reprezentat vizual printr-o imagine/icon.

TITLU PARAGRAF: ${title || 'N/A'}
TEXT PARAGRAF: ${text.substring(0, 500)}

SARCINA TA:
1. Identifică ideea principală sau conceptul central al paragrafului
2. Gândește-te la ce tip de imagine/icon ar reprezenta cel mai bine acest concept
3. Returnează DOAR un cuvânt sau o expresie scurtă (maxim 2-3 cuvinte) în română sau engleză care să fie potrivită pentru căutarea unei imagini relevante
4. Prioritizează concepte concrete, vizuale (ex: "scriitor", "sat", "conflict", "dragoste", "natură", "oraș", "carte", "pen", "lampă", "mână scriind")
5. Evită termeni abstracti sau prea generici (ex: "literatură", "text", "paragraf", "idee")

Exemple bune: "scriitor", "sat românesc", "carte deschisă", "pen", "lampă veche", "mână scriind", "natură", "conflict", "dragoste", "familie", "munte", "râu"

Returnează DOAR cuvântul/expresia, fără explicații, fără markdown, fără ghilimele.`;

  for (const key of groqKeys) {
    try {
      const response = await fetch(groqApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant', // Faster model for simple extraction
          messages: [
            {
              role: 'system',
              content: 'Ești un asistent care extrage concepte vizuale din texte literare. Returnează DOAR cuvântul sau expresia scurtă, fără explicații, fără markdown.',
            },
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 20, // Short response
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const concept = data?.choices?.[0]?.message?.content?.trim();
        
        if (concept) {
          // Clean the concept - remove quotes, markdown, etc.
          const cleanConcept = concept
            .replace(/^["']|["']$/g, '') // Remove surrounding quotes
            .replace(/```[\w]*\n?|\n?```/g, '') // Remove markdown code blocks
            .trim()
            .toLowerCase();
          
          // Check if it's not already used
          if (cleanConcept && !usedConcepts.has(cleanConcept) && cleanConcept.length > 2) {
            console.log(`[AI Concept] Extracted concept: "${cleanConcept}" from paragraph "${title}"`);
            return cleanConcept;
          } else if (cleanConcept && cleanConcept.length > 2) {
            // Even if used, return it as fallback
            console.log(`[AI Concept] Using concept (already used): "${cleanConcept}"`);
            return cleanConcept;
          }
        }
      }
    } catch (error) {
      console.warn('[AI Concept] Error extracting concept:', error);
    }
  }

  // Fallback to simple keyword extraction
  return extractKeywordFromParagraph(text, title, usedConcepts);
};

/**
 * Extracts a relevant keyword from a paragraph text and title
 * Prioritizes proper nouns, literary concepts, and significant terms
 * (Fallback method when AI is not available)
 * 
 * @param {string} text - Paragraph text
 * @param {string} title - Paragraph title (optional)
 * @param {Set<string>} usedKeywords - Set of already used keywords to avoid duplicates
 * @returns {string|null} - Extracted keyword or null
 */
export const extractKeywordFromParagraph = (text, title = '', usedKeywords = new Set()) => {
  if (!text || !text.trim()) {
    return null;
  }

  // Combine title and text for better keyword extraction
  const combinedText = title ? `${title} ${text}` : text;

  // Remove common stop words and punctuation
  const stopWords = new Set([
    'și', 'sau', 'dar', 'pentru', 'că', 'care', 'ce', 'cum', 'când', 'unde',
    'de', 'din', 'la', 'pe', 'cu', 'în', 'prin', 'peste', 'sub', 'până',
    'a', 'al', 'ale', 'ai', 'au', 'am', 'ar', 'as', 'at', 'avea',
    'este', 'sunt', 'era', 'erau', 'fost', 'fi', 'fie', 'fiecare',
    'un', 'una', 'unul', 'unei', 'unui', 'unor',
    'o', 'acest', 'această', 'acești', 'aceste', 'acel', 'aceea', 'acei', 'acele',
    'acestui', 'acestei', 'acestor', 'acelui', 'acelora',
    'lui', 'ei', 'lor', 'meu', 'mea', 'mei', 'mele',
    'tău', 'ta', 'tăi', 'tale', 'său', 'sa', 'săi', 'sale',
    'nostru', 'noastră', 'noștri', 'noastre', 'vostru', 'voastră', 'voștri', 'voastre',
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'roman', 'romanul', 'romanele', 'romanului', 'romanelor',
    'poem', 'poemul', 'poemele', 'poemului', 'poemelor',
    'literar', 'literara', 'literare', 'literari', 'literatură', 'literatura',
    'scriitor', 'scriitorul', 'scriitorii', 'scriitorului', 'scriitorilor',
    'autor', 'autorul', 'autorii', 'autorului', 'autorilor'
  ]);

  // Common literary terms that might be too generic
  const genericTerms = new Set([
    'text', 'textul', 'texte', 'conținut', 'conținutul',
    'paragraf', 'paragraful', 'paragrafe', 'paragrafelor',
    'idee', 'ideea', 'idei', 'ideilor', 'concept', 'conceptul'
  ]);

  // Clean and split text
  const cleaned = combinedText
    .toLowerCase()
    .replace(/[^\p{L}\s]/gu, ' ') // Remove punctuation, keep letters
    .replace(/\s+/g, ' ')
    .trim();

  // Split into words
  const words = cleaned.split(' ').filter(word => word.length > 3);

  // Extract potential keywords with scoring
  const candidates = words
    .filter(word => !stopWords.has(word) && !genericTerms.has(word) && word.length >= 4)
    .map(word => {
      let score = 0;
      
      // Prioritize longer words
      score += word.length * 2;
      
      // Prioritize words that appear in title
      if (title && title.toLowerCase().includes(word)) {
        score += 50;
      }
      
      // Prioritize capitalized words (likely proper nouns) - check original text
      const originalWords = combinedText.split(/\s+/);
      const originalWord = originalWords.find(w => w.toLowerCase() === word);
      if (originalWord && originalWord[0] === originalWord[0].toUpperCase() && originalWord[0] !== originalWord[0].toLowerCase()) {
        score += 100; // Proper nouns get high priority
      }
      
      // Penalize already used keywords
      if (usedKeywords.has(word)) {
        score -= 200;
      }
      
      return { word, score };
    })
    .sort((a, b) => b.score - a.score); // Sort by score descending

  // Try to find a unique keyword
  for (const candidate of candidates) {
    if (candidate.score > 0 && !usedKeywords.has(candidate.word)) {
      return candidate.word;
    }
  }

  // Fallback: return the highest scoring word even if used
  if (candidates.length > 0 && candidates[0].score > 0) {
    return candidates[0].word;
  }

  // Final fallback: return the longest word overall
  if (words.length > 0) {
    const longestWord = words.sort((a, b) => b.length - a.length)[0];
    if (longestWord.length >= 4) {
      return longestWord;
    }
  }

  return null;
};

/**
 * Downloads an image from URL and uploads it to Cloudinary
 * This ensures the image is stored securely and can be transformed
 * 
 * @param {string} imageUrl - Source image URL
 * @param {string} keyword - Keyword for naming
 * @returns {Promise<string|null>} - Cloudinary URL or null
 */
export const downloadAndUploadImage = async (imageUrl, keyword = 'image') => {
  if (!imageUrl) {
    return null;
  }

  try {
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    const blob = await response.blob();
    
    // Create a File object from the blob
    const fileName = `${keyword.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.jpg`;
    const file = new File([blob], fileName, { type: blob.type || 'image/jpeg' });

    // Upload to Cloudinary using existing utility
    const { uploadImageToCloudinary } = await import('./cloudinary');
    const cloudinaryUrl = await uploadImageToCloudinary(file, 'comentarii-images');

    return cloudinaryUrl;
  } catch (error) {
    console.error('Error downloading/uploading image:', error);
    return null;
  }
};

