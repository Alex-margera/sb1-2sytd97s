export async function optimizeImage(imageUrl: string, targetSize: number = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate dimensions maintaining aspect ratio
      let width = img.width;
      let height = img.height;
      const aspectRatio = width / height;

      if (width > height) {
        width = targetSize;
        height = targetSize / aspectRatio;
      } else {
        height = targetSize;
        width = targetSize * aspectRatio;
      }

      canvas.width = width;
      canvas.height = height;

      // Enable image smoothing for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw and optimize image
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to WebP with quality adjustment
      const optimizedImage = canvas.toDataURL('image/webp', 0.9);
      resolve(optimizedImage);
    };

    img.onerror = () => {
      reject(new Error(`Failed to load image: ${imageUrl}`));
    };

    img.src = imageUrl;
  });
}