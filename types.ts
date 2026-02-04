
export interface Photo {
  id: string;
  url: string;
  timestamp: string;
  location?: string;
  isProRAW: boolean;
  isFavorite?: boolean;
  exif: ExifData;
  isDuplicate?: boolean;
  duplicateGroup?: string;
  duplicateConfidence?: number; // 0-100
  fileSize: string;
  fileSizeBytes: number;
  resolution: string;
  bitDepth?: number;
}

export interface ExifData {
  aperture: string;
  shutterSpeed: string;
  iso: number;
  focalLength: string;
  lens: string;
  camera: string;
}

export interface Settings {
  highVisibilityMode: boolean;
  proMode: boolean;
  dynamicTypeScale: number; // 1 to 5
  autoEnhanceProRAW: boolean;
  exportColorSpace: 'sRGB' | 'P3' | 'AdobeRGB';
}

export type ViewMode = 'library' | 'for-you' | 'albums' | 'search' | 'duplicates' | 'detail' | 'settings' | 'edit' | 'hidden' | 'recently-deleted';
