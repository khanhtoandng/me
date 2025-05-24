"use client";

/**
 * Client-side cookie utilities
 */

/**
 * Get a cookie by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }
  
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

/**
 * Set a cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  } = {}
): void {
  if (typeof document === 'undefined') {
    return;
  }
  
  const { path = '/', maxAge, secure, sameSite = 'lax' } = options;
  
  let cookie = `${name}=${value}; path=${path}`;
  
  if (maxAge !== undefined) {
    cookie += `; max-age=${maxAge}`;
  }
  
  if (secure) {
    cookie += '; secure';
  }
  
  if (sameSite) {
    cookie += `; samesite=${sameSite}`;
  }
  
  document.cookie = cookie;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path = '/'): void {
  if (typeof document === 'undefined') {
    return;
  }
  
  document.cookie = `${name}=; path=${path}; max-age=0`;
}

/**
 * Get all cookies as an object
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === 'undefined') {
    return {};
  }
  
  const cookies: Record<string, string> = {};
  const cookieStr = document.cookie;
  
  if (cookieStr) {
    const cookiePairs = cookieStr.split(';');
    for (const cookiePair of cookiePairs) {
      const [name, value] = cookiePair.trim().split('=');
      if (name && value) {
        cookies[name] = value;
      }
    }
  }
  
  return cookies;
}

/**
 * Debug function to check cookies (silent version)
 */
export function debugCookies(): Record<string, string> {
  if (typeof document === 'undefined') {
    return {};
  }
  
  return getAllCookies();
}
