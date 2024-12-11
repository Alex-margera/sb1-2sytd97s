import placeholderImage from '/assets/images/placeholder/placeholder.png';

export async function preloadImage(src: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    
    img.onload = () => resolve(src);
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`);
      resolve(placeholderImage);
    };
    
    img.src = src;
  });
}