import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dp9roufx3",
  api_key: "615162185557522",
  api_secret: "I7JVgk6NlJ4zfqGWg-c3tvIslp8",
  secure: true,
});

/**
 * Upload a file to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {Object} options - Upload options
 * @returns {Promise<Object>} - Upload result
 */
export async function uploadToCloudinary(fileBuffer, options = {}) {
  try {
    const {
      folder = "alshaer-portfolio",
      resourceType = "auto",
      transformation = {},
      publicId = null,
    } = options;

    const uploadOptions = {
      folder,
      resource_type: resourceType,
      transformation,
      ...(publicId && { public_id: publicId }),
    };

    // Convert buffer to base64 data URI
    const base64Data = `data:${options.mimeType || "application/octet-stream"};base64,${fileBuffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Data, uploadOptions);

    return {
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      resourceType: result.resource_type,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: error.message || "Upload failed",
    };
  }
}

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @param {string} resourceType - The resource type (image, video, raw)
 * @returns {Promise<Object>} - Deletion result
 */
export async function deleteFromCloudinary(publicId, resourceType = "image") {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return {
      success: result.result === "ok",
      result: result.result,
    };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return {
      success: false,
      error: error.message || "Delete failed",
    };
  }
}

/**
 * Generate optimized image transformations
 * @param {Object} options - Transformation options
 * @returns {Object} - Transformation object
 */
export function getImageTransformations(options = {}) {
  const {
    width = null,
    height = null,
    quality = "auto",
    format = "auto",
    crop = "fill",
    gravity = "auto",
  } = options;

  const transformations = {
    quality,
    fetch_format: format,
  };

  if (width || height) {
    transformations.width = width;
    transformations.height = height;
    transformations.crop = crop;
    transformations.gravity = gravity;
  }

  return transformations;
}

/**
 * Get optimized image URL with transformations
 * @param {string} publicId - The public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} - Optimized image URL
 */
export function getOptimizedImageUrl(publicId, options = {}) {
  const transformations = getImageTransformations(options);

  return cloudinary.url(publicId, {
    ...transformations,
    secure: true,
  });
}

/**
 * Upload profile photo with specific optimizations
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} userId - User ID for folder organization
 * @param {string} mimeType - File MIME type
 * @returns {Promise<Object>} - Upload result
 */
export async function uploadProfilePhoto(fileBuffer, userId, mimeType) {
  const transformations = getImageTransformations({
    width: 400,
    height: 400,
    quality: "auto:good",
    format: "auto",
    crop: "fill",
    gravity: "face",
  });

  return uploadToCloudinary(fileBuffer, {
    folder: "alshaer-portfolio/profiles",
    publicId: `profile_${userId}_${Date.now()}`,
    transformation: transformations,
    mimeType,
  });
}

/**
 * Upload project image with specific optimizations
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} projectId - Project ID for folder organization
 * @param {string} mimeType - File MIME type
 * @returns {Promise<Object>} - Upload result
 */
export async function uploadProjectImage(fileBuffer, projectId, mimeType) {
  const transformations = getImageTransformations({
    width: 1200,
    height: 800,
    quality: "auto:good",
    format: "auto",
    crop: "fill",
  });

  return uploadToCloudinary(fileBuffer, {
    folder: "alshaer-portfolio/projects",
    publicId: `project_${projectId}_${Date.now()}`,
    transformation: transformations,
    mimeType,
  });
}

/**
 * Upload general file (documents, etc.)
 * @param {Buffer} fileBuffer - The file buffer
 * @param {string} fileName - Original file name
 * @param {string} mimeType - File MIME type
 * @returns {Promise<Object>} - Upload result
 */
export async function uploadDocument(fileBuffer, fileName, mimeType) {
  const timestamp = Date.now();
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");

  return uploadToCloudinary(fileBuffer, {
    folder: "alshaer-portfolio/documents",
    publicId: `doc_${timestamp}_${cleanFileName}`,
    resourceType: "raw",
    mimeType,
  });
}

export default cloudinary;
