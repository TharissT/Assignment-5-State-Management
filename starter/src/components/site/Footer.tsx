import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-8 py-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 md:flex-row md:justify-between">
        <span className="text-sm font-black tracking-widest text-red-600 italic">TMDB Explorer</span>
        <p className="text-xs text-zinc-600">Built with React, Vite, Tailwind and React Router</p>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-white"
          >
            <FaGithub size={18} /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-blue-400"
          >
            <FaLinkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};
