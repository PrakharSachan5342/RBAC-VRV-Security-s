interface LinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function Link({ href, children, active, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      className={`text-sm font-medium ${
        active ? 'text-white' : 'text-gray-300 hover:text-white'
      } ${className}`}
    >
      {children}
    </a>
  );
}