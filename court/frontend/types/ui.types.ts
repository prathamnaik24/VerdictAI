// Frontend UI type definitions
export interface ButtonProps {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick?: () => void;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}
