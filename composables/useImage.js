import { computed } from 'vue'

// Normalizes Google Drive related image URLs for safe <img> embedding
export const useImage = () => {
  const extractGoogleDriveFileId = (urlOrId) => {
    if (!urlOrId) return null;
    // If it's just an ID, return as is
    if (typeof urlOrId === 'string' && !urlOrId.startsWith('http')) {
      return urlOrId;
    }
    const patterns = [
      /\/(?:file\/)?d\/([a-zA-Z0-9-_]+)/, // /file/d/<id> or /d/<id>
      /[?&]id=([a-zA-Z0-9-_]+)/
    ];
    for (const pattern of patterns) {
      const match = String(urlOrId).match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const buildCdnUrl = (fileId, size = 200) => {
    if (!fileId) return '';
    return `https://lh3.googleusercontent.com/d/${fileId}=s${size}-c`;
  };

  const buildEmbedUsercontentUrl = (fileId, resourceKey) => {
    if (!fileId) return '';
    const rk = resourceKey ? `&resourcekey=${resourceKey}` : '';
    return `https://drive.usercontent.google.com/uc?id=${fileId}&export=view${rk}`;
  };

  const buildUcViewUrl = (fileId, resourceKey) => {
    if (!fileId) return '';
    const rk = resourceKey ? `&resourcekey=${resourceKey}` : '';
    return `https://drive.google.com/uc?export=view&id=${fileId}${rk}`;
  };

  const getImageSrc = (urlOrId, size = 200, resourceKey = null) => {
    if (!urlOrId) return '';
    // If already a googleusercontent CDN link, respect it
    if (String(urlOrId).includes('lh3.googleusercontent.com')) {
      return urlOrId;
    }
    // If it's a Drive link or raw ID, convert
    const fileId = extractGoogleDriveFileId(urlOrId);
    if (fileId) {
      return buildCdnUrl(fileId, size) || buildEmbedUsercontentUrl(fileId, resourceKey) || buildUcViewUrl(fileId, resourceKey) || '';
    }
    // Otherwise return as-is (external URL or app-hosted)
    return urlOrId;
  };

  const fromUploadResponse = (response, size = 512) => {
    if (!response) return '';
    return (
      response.publicCdnUrl ||
      response.publicEmbedUrl ||
      response.publicEmbedUrlAlt ||
      buildCdnUrl(response.id, size) ||
      ''
    );
  };

  return {
    extractGoogleDriveFileId,
    buildCdnUrl,
    buildEmbedUsercontentUrl,
    buildUcViewUrl,
    getImageSrc,
    fromUploadResponse
  };
};

import nothumb from "@/assets/images/nothumb.png"

export default (name, type) => {
  return name ? `${import.meta.env.VITE_API_URL}/image/${type}/${name}` : nothumb
}