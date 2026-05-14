import clsx from 'clsx';

interface GoldDividerProps {
  className?: string;
  width?: 'small' | 'medium' | 'full';
}

export function GoldDivider({ className, width = 'small' }: GoldDividerProps) {
  const widthClass = {
    small: 'w-12',
    medium: 'w-24',
    full: 'w-full',
  }[width];

  return (
    <div
      className={clsx(
        'h-1 bg-gold rounded-full',
        widthClass,
        className
      )}
    />
  );
}
