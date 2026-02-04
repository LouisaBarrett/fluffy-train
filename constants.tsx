
import React from 'react';
import { Photo } from './types';

export const COLORS = {
  primary: '#007AFF', // iOS System Blue
  destructive: '#FF3B30', // iOS System Red
  background: '#FFFFFF',
  surface: '#F2F2F7',
};

export const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=1200';

// Fixed: Added React import to resolve React.SyntheticEvent namespace
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = FALLBACK_IMAGE;
};

export const MOCK_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Today, 2:45 PM',
    location: 'Central Park, NY',
    isProRAW: true,
    fileSize: '42.5 MB',
    fileSizeBytes: 44564480,
    resolution: '8064 x 6048',
    bitDepth: 14,
    exif: {
      aperture: 'f/1.78',
      shutterSpeed: '1/250s',
      iso: 100,
      focalLength: '24mm',
      lens: 'Main Camera — 24mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Yesterday, 10:15 AM',
    location: 'Brooklyn, NY',
    isProRAW: false,
    fileSize: '3.2 MB',
    fileSizeBytes: 3355443,
    resolution: '4032 x 3024',
    exif: {
      aperture: 'f/2.2',
      shutterSpeed: '1/500s',
      iso: 50,
      focalLength: '13mm',
      lens: 'Ultra Wide — 13mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Oct 12, 2025',
    isProRAW: false,
    isDuplicate: true,
    duplicateGroup: 'group1',
    duplicateConfidence: 100,
    fileSize: '4.1 MB',
    fileSizeBytes: 4299161,
    resolution: '4032 x 3024',
    exif: {
      aperture: 'f/2.8',
      shutterSpeed: '1/125s',
      iso: 200,
      focalLength: '77mm',
      lens: 'Telephoto — 77mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=85&w=1200', 
    timestamp: 'Oct 12, 2025',
    isProRAW: false,
    isDuplicate: true,
    duplicateGroup: 'group1',
    duplicateConfidence: 100,
    fileSize: '4.1 MB',
    fileSizeBytes: 4299161,
    resolution: '4032 x 3024',
    exif: {
      aperture: 'f/2.8',
      shutterSpeed: '1/125s',
      iso: 200,
      focalLength: '77mm',
      lens: 'Telephoto — 77mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Oct 10, 2025',
    isProRAW: true,
    fileSize: '38.2 MB',
    fileSizeBytes: 40055603,
    resolution: '8064 x 6048',
    bitDepth: 12,
    exif: {
      aperture: 'f/1.78',
      shutterSpeed: '1/1000s',
      iso: 80,
      focalLength: '24mm',
      lens: 'Main Camera — 24mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Oct 8, 2025',
    location: 'Yosemite, CA',
    isProRAW: true,
    fileSize: '45.1 MB',
    fileSizeBytes: 47290777,
    resolution: '8064 x 6048',
    bitDepth: 14,
    exif: {
      aperture: 'f/1.78',
      shutterSpeed: '1/800s',
      iso: 125,
      focalLength: '24mm',
      lens: 'Main Camera — 24mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Oct 5, 2025',
    location: 'Acadia Park, ME',
    isProRAW: false,
    fileSize: '5.2 MB',
    fileSizeBytes: 5452595,
    resolution: '4032 x 3024',
    exif: {
      aperture: 'f/2.2',
      shutterSpeed: '1/2000s',
      iso: 40,
      focalLength: '13mm',
      lens: 'Ultra Wide — 13mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1500622345453-7373efb62b9c?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Oct 4, 2025',
    location: 'Reykjavik, Iceland',
    isProRAW: true,
    fileSize: '39.8 MB',
    fileSizeBytes: 41733324,
    resolution: '8064 x 6048',
    bitDepth: 12,
    exif: {
      aperture: 'f/1.78',
      shutterSpeed: '1/1250s',
      iso: 64,
      focalLength: '24mm',
      lens: 'Main Camera — 24mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '9',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Oct 2, 2025',
    location: 'Shinjuku, Tokyo',
    isProRAW: false,
    fileSize: '4.7 MB',
    fileSizeBytes: 4928307,
    resolution: '4032 x 3024',
    exif: {
      aperture: 'f/2.8',
      shutterSpeed: '1/60s',
      iso: 400,
      focalLength: '77mm',
      lens: 'Telephoto — 77mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '10',
    url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Sep 28, 2025',
    location: 'Le Marais, Paris',
    isProRAW: false,
    fileSize: '3.9 MB',
    fileSizeBytes: 4089446,
    resolution: '4032 x 3024',
    exif: {
      aperture: 'f/1.78',
      shutterSpeed: '1/400s',
      iso: 100,
      focalLength: '24mm',
      lens: 'Main Camera — 24mm',
      camera: 'iPhone 16 Pro'
    }
  },
  {
    id: '11',
    url: 'https://images.unsplash.com/photo-1518173946687-a4c8a9b746f5?auto=format&fit=crop&q=85&w=1200',
    timestamp: 'Sep 25, 2025',
    location: 'The Thames, London',
    isProRAW: true,
    fileSize: '41.2 MB',
    fileSizeBytes: 43201331,
    resolution: '8064 x 6048',
    bitDepth: 14,
    exif: {
      aperture: 'f/1.78',
      shutterSpeed: '1/500s',
      iso: 160,
      focalLength: '24mm',
      lens: 'Main Camera — 24mm',
      camera: 'iPhone 16 Pro'
    }
  }
];
