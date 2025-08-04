import clsx from "clsx";

export const RcsButton = ({
  label,
  id,
  className,
  onClick,
  isLoading,
  noBg,
}: {
  label: string;
  checked?: boolean;
  id?: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  noBg?: boolean;
}) => (
  <div className="relative">
    <div className="absolute left-0 right-0 top-0 bottom-0 bg-white m-[1px]"></div>
    <button
      className={clsx(
        "cursor-pointer transition-colors duration-300 flex items-baseline relative text-center text-sm font-courier-prime border-3 border-beige-accent px-1 rounded",
        !isLoading && !noBg && "bg-white hover:bg-beige-hover",
        isLoading && "loading-background",
        className
      )}
      onClick={onClick}
    >
      {label}
    </button>
  </div>
);
