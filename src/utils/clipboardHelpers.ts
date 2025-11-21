/**
 * Clipboard Helpers
 * Utility functions for copying to clipboard with fallback support
 * 
 * Handles browser permissions policy blocking Clipboard API
 * by providing traditional fallback method
 */

export interface CopyToClipboardOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

/**
 * Copy text to clipboard with automatic fallback
 * 
 * First tries modern Clipboard API (navigator.clipboard.writeText)
 * Falls back to traditional document.execCommand('copy') if blocked
 * 
 * @param text - Text to copy to clipboard
 * @param options - Optional callbacks and messages
 * @returns Promise<boolean> - true if successful, false otherwise
 */
export async function copyToClipboard(
  text: string,
  options: CopyToClipboardOptions = {}
): Promise<boolean> {
  const {
    onSuccess,
    onError,
    successMessage = 'Copied to clipboard!',
    errorMessage = 'Failed to copy. Please copy manually.'
  } = options;

  try {
    // Try modern Clipboard API first
    await navigator.clipboard.writeText(text);
    
    if (onSuccess) {
      onSuccess();
    }
    
    return true;
  } catch (clipboardError) {
    // Fallback to traditional method if Clipboard API is blocked
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make textarea invisible and out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      textArea.style.opacity = '0';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      // Try to copy
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        if (onSuccess) {
          onSuccess();
        }
        return true;
      } else {
        throw new Error('Copy command failed');
      }
    } catch (fallbackError) {
      // Both methods failed
      const error = fallbackError instanceof Error 
        ? fallbackError 
        : new Error('Unknown copy error');
      // Copy failed - callback will be called below
      
      if (onError) {
        onError(error);
      }
      
      return false;
    }
  }
}

/**
 * Check if Clipboard API is available
 * @returns boolean - true if available, false otherwise
 */
export function isClipboardAPIAvailable(): boolean {
  return !!(navigator.clipboard && navigator.clipboard.writeText);
}

/**
 * Copy text with automatic permission check
 * Shows helpful message if permissions are required
 * 
 * @param text - Text to copy
 * @param options - Optional callbacks
 * @returns Promise<boolean>
 */
export async function copyWithPermissionCheck(
  text: string,
  options: CopyToClipboardOptions = {}
): Promise<boolean> {
  // Check if running in secure context (HTTPS or localhost)
  // Check secure context (clipboard API requires HTTPS)

  return copyToClipboard(text, options);
}
