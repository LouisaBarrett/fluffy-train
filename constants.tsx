
import { Photo } from './types';

export const COLORS = {
  primary: '#007AFF', // iOS System Blue
  destructive: '#FF3B30', // iOS System Red
  background: '#FFFFFF',
  surface: '#F2F2F7',
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
  }
];
