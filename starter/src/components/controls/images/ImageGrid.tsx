import type { ImageCell } from '@/core/types';
import type { ReactNode } from 'react';

type ImageGridProps = {
  images: ImageCell[];
  onClick?: (image: ImageCell) => void;
  children?: (image: ImageCell) => ReactNode;
};

export const ImageGrid = ({ images, onClick, children }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {images.map((image) => (
        <div
          key={`${image.id}-${image.season ?? ''}`}
          className={`group relative overflow-hidden rounded border border-zinc-800 bg-zinc-900 transition-all duration-300 ${
            onClick ? 'cursor-pointer hover:scale-[1.03] hover:border-red-600/60 hover:shadow-[0_0_20px_rgba(229,9,20,0.2)]' : ''
          }`}
          onClick={() => onClick?.(image)}
        >
          {children?.(image)}
          <img
            src={image.imageUrl}
            alt={image.primaryText ?? ''}
            className="h-64 w-full object-cover transition-all duration-300 group-hover:brightness-75"
          />
          {(image.primaryText || image.secondaryText) && (
            <div className="p-2">
              {image.primaryText && <p className="truncate text-xs font-bold text-white">{image.primaryText}</p>}
              {image.secondaryText && <p className="truncate text-xs text-red-400">{image.secondaryText}</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
