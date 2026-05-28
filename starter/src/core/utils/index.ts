import { BASE_PRICE, IMAGE_BASE_URL, IMAGE_PLACEHOLDER, MIN_PRICE, ORIGINAL_IMAGE_BASE_URL, PRICE_DROP_PER_YEAR } from '@/core/constants';

export const getImageUrl = (fileName: string | null | undefined): string => {
  return fileName ? `${IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER;
};

export const getBackdropUrl = (fileName: string | null | undefined): string => {
  return fileName ? `${ORIGINAL_IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER;
};

export const calculatePrice = (dateStr: string | null | undefined): number => {
  if (!dateStr) {
    return BASE_PRICE;
  }

  const year = new Date(dateStr).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  const price = BASE_PRICE - age * PRICE_DROP_PER_YEAR;

  return Math.max(parseFloat(price.toFixed(2)), MIN_PRICE);
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};
