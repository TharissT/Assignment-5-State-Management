import { Link } from '@/components/controls/links/Link';

type LinkGroupProps = {
  links: Array<{ label: string; to: string }>;
};

export const LinkGroup = ({ links }: LinkGroupProps) => {
  return (
    <div className="flex gap-4 border-b border-zinc-800 pt-4 pb-2">
      {links.map((link) => (
        <Link key={link.to} to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};
