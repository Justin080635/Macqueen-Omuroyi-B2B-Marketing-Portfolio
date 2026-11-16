import { SiteContentState, TestimonialItem, SiteMediaConfig } from '../types';
import { TESTIMONIALS_DATA } from '../data/portfolioData';

// Default initial state
export const DEFAULT_HERO_PHOTO = '/src/assets/images/macqueen_hero_1787794359584.jpg';
export const DEFAULT_ABOUT_PHOTO = '/src/assets/images/macqueen_about_1787794380968.jpg';

export const DEFAULT_CONTENT_STATE: SiteContentState = {
  testimonials: TESTIMONIALS_DATA.map((t, idx) => ({
    ...t,
    isVisible: idx < 5 // Ensure default visibility respects the max 5 rule
  })),
  maxVisibleTestimonials: 5,
  media: {
    heroPhotoUrl: DEFAULT_HERO_PHOTO,
    aboutPhotoUrl: DEFAULT_ABOUT_PHOTO,
  },
  lastUpdated: new Date().toISOString(),
};

// SHA-256 hash of the admin passcode (passcode is never stored as plaintext in source code)
const EXPECTED_PASSCODE_HASH = '0a1ed8d5320f5d1748bce0013d4091e10222f2dd34d15d79d24743bdce433f11';

/**
 * Computes the SHA-256 hash of a string using Web Cryptography API
 */
export async function sha256Hex(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text.trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verifies admin passcode securely
 */
export async function verifyAdminPasscode(inputCode: string): Promise<boolean> {
  try {
    // 1. Try server verification first
    const res = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: inputCode }),
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.valid === 'boolean') {
        return data.valid;
      }
    }
  } catch {
    // If backend is unreachable, fallback to client cryptographic hash validation
  }

  // 2. Client-side cryptographic hash comparison
  const calculatedHash = await sha256Hex(inputCode);
  return calculatedHash === EXPECTED_PASSCODE_HASH;
}

const STORAGE_KEY = 'macqueen_site_content_v1';

/**
 * Fetches current dynamic site content from server / Firestore / cache
 */
export async function fetchSiteContent(): Promise<SiteContentState> {
  try {
    const res = await fetch('/api/content', { cache: 'no-store' });
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && serverData.testimonials) {
        // Cache to local storage as fallback
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
        } catch {}
        return serverData;
      }
    }
  } catch {
    // Fallback to local storage if network is offline
  }

  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch {}

  return DEFAULT_CONTENT_STATE;
}

/**
 * Persists dynamic site content worldwide
 */
export async function saveSiteContent(content: SiteContentState): Promise<boolean> {
  // Ensure maximum of 5 visible testimonials constraint is strictly enforced
  const visibleCount = content.testimonials.filter((t) => t.isVisible !== false).length;
  if (visibleCount > 5) {
    let count = 0;
    content.testimonials = content.testimonials.map((t) => {
      if (t.isVisible !== false) {
        count++;
        return { ...t, isVisible: count <= 5 };
      }
      return { ...t, isVisible: false };
    });
  }

  content.lastUpdated = new Date().toISOString();

  // Save to localStorage immediately
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  } catch {}

  // Save to server / Firestore for global worldwide persistence
  try {
    const res = await fetch('/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    return res.ok;
  } catch (err) {
    console.error('Failed to sync to server:', err);
    return true; // Still saved locally
  }
}

/**
 * Compresses and reads an uploaded image file as a high-quality Base64 Data URL
 */
export function fileToDataUrl(file: File, maxWidth = 1200, maxHeight = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for processing'));
      img.src = e.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
