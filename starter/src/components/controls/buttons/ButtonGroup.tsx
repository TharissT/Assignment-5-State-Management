type Option = { label: string; value: string };

type ButtonGroupProps = {
  value: string;
  options: Option[];
  onClick: (value: string) => void;
};

export const ButtonGroup = ({ value, options, onClick }: ButtonGroupProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onClick(opt.value)}
          className={`cursor-pointer rounded px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
            value === opt.value
              ? 'bg-white text-black'
              : 'border border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};
