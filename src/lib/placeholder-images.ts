import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

const imageMap = new Map(placeholderImages.map(img => [img.id, img]));

export const getPlaceholderImage = (category: string): ImagePlaceholder => {
  const categoryId = category.toLowerCase().split(' ')[0];
  return imageMap.get(categoryId) || imageMap.get('default')!;
};
