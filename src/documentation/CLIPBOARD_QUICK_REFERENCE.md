# Clipboard Utility - Quick Reference

## 📋 Import

```typescript
import { copyToClipboard } from '../utils/clipboardHelpers';
```

---

## 🚀 Basic Usage

### Simple Copy

```typescript
await copyToClipboard('Hello World');
```

### With Toast

```typescript
import { toast } from '../ui/simple-toast';

await copyToClipboard(shareUrl, {
  onSuccess: () => toast.success('Copied!'),
  onError: () => toast.error('Failed to copy')
});
```

---

## 📚 API

### `copyToClipboard(text, options)`

```typescript
interface CopyToClipboardOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

copyToClipboard(text: string, options?: CopyToClipboardOptions): Promise<boolean>
```

### `isClipboardAPIAvailable()`

```typescript
if (isClipboardAPIAvailable()) {
  // Modern clipboard available
}
```

---

## ✨ Features

- ✅ **Modern Clipboard API** (preferred)
- ✅ **Automatic fallback** to `execCommand`
- ✅ **Works in restricted contexts** (iframes, permissions policy)
- ✅ **Error handling** with callbacks
- ✅ **TypeScript** support

---

## 🎯 Real-World Examples

### ROI Calculator Share

```typescript
const handleCopyUrl = async () => {
  await copyToClipboard(shareUrl, {
    onSuccess: () => toast.success('Link berhasil disalin!'),
    onError: () => toast.error('Gagal menyalin link')
  });
};
```

### Copy Device ID

```typescript
const handleCopyDeviceId = async (deviceId: string) => {
  const success = await copyToClipboard(deviceId, {
    onSuccess: () => toast.success('Device ID copied!'),
    onError: (error) => {
      console.error('Copy failed:', error);
      toast.error('Please copy manually');
    }
  });
  
  if (success) {
    // Track analytics
    analytics.track('device_id_copied');
  }
};
```

### Copy API Key

```typescript
<Button onClick={() => copyToClipboard(apiKey, {
  onSuccess: () => toast.success('API Key copied to clipboard'),
  onError: () => toast.error('Failed to copy API Key')
})}>
  <Copy className="w-4 h-4 mr-2" />
  Copy API Key
</Button>
```

---

## 🔧 How It Works

```
User clicks copy
    ↓
Try Clipboard API (navigator.clipboard.writeText)
    ↓ (if blocked)
Fallback to execCommand('copy')
    ↓
Call onSuccess or onError
    ↓
Return boolean result
```

---

## 🌐 Browser Support

| Method | Chrome | Firefox | Safari | Edge |
|--------|--------|---------|--------|------|
| Clipboard API | ✅ 66+ | ✅ 63+ | ✅ 13.1+ | ✅ 79+ |
| execCommand | ✅ All | ✅ All | ✅ All | ✅ All |

**Result:** Works on all modern browsers! 🎉

---

## 💡 Tips

### 1. Always use async/await

```typescript
// ✅ Good
await copyToClipboard(text);

// ❌ Bad
copyToClipboard(text); // Promise not handled
```

### 2. Provide user feedback

```typescript
// ✅ Good - User knows what happened
await copyToClipboard(text, {
  onSuccess: () => toast.success('Copied!'),
  onError: () => toast.error('Failed')
});

// ❌ Bad - Silent failure
await copyToClipboard(text);
```

### 3. Handle errors gracefully

```typescript
// ✅ Good - Show manual copy option
await copyToClipboard(text, {
  onError: () => {
    toast.error('Failed to copy. Please copy manually from input field.');
  }
});
```

---

## 🚫 Common Mistakes

### ❌ Don't use without error handling

```typescript
// Bad - No feedback if it fails
navigator.clipboard.writeText(text);
```

### ❌ Don't forget async

```typescript
// Bad - Promise not awaited
const handleCopy = () => {
  copyToClipboard(text); // ⚠️ Promise ignored
};

// Good
const handleCopy = async () => {
  await copyToClipboard(text);
};
```

### ❌ Don't block with try-catch without fallback

```typescript
// Bad - No fallback
try {
  await navigator.clipboard.writeText(text);
} catch (error) {
  // Now what? User can't copy!
}

// Good - Automatic fallback
await copyToClipboard(text, {
  onError: () => showManualCopyDialog()
});
```

---

## 📍 Where It's Used

Currently implemented in:

- ✅ **ROI Calculator** - Share calculation URL
- ✅ **ROIShareDialog** - Copy share link
- ✅ **Footer** - Copy contact information (email, phone, address)

Can be used in:

- 📋 Device ID copy buttons
- 🔑 API key copy buttons
- 🔗 Share link buttons
- 📄 Code snippet copy buttons
- 📊 Export data copy buttons

---

## 🎨 UI Pattern

```tsx
import { Copy } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { copyToClipboard } from '../utils/clipboardHelpers';
import { toast } from '../ui/simple-toast';

function ShareUrlInput({ url }: { url: string }) {
  const handleCopy = async () => {
    await copyToClipboard(url, {
      onSuccess: () => toast.success('Link copied!'),
      onError: () => toast.error('Failed to copy')
    });
  };

  return (
    <div className="flex gap-2">
      <Input
        value={url}
        readOnly
        className="flex-1"
      />
      <Button
        size="icon"
        variant="outline"
        onClick={handleCopy}
        aria-label="Copy link"
      >
        <Copy className="w-4 h-4" />
      </Button>
    </div>
  );
}
```

---

## 🔗 Related

- [CLIPBOARD_API_FIX.md](./CLIPBOARD_API_FIX.md) - Full documentation
- [Guidelines.md](./Guidelines.md) - Design system
- [ROI_CALCULATOR_MODULAR_COMPLETE.md](./ROI_CALCULATOR_MODULAR_COMPLETE.md) - ROI Calculator

---

**Last Updated:** November 18, 2025  
**Version:** 1.0  
**Status:** ✅ Production Ready
