import clsx from "clsx";
import { Checkbox } from "radix-ui";
import checkmark from "~/assets/ui/checkmark.png";

export const RcsCheckbox = ({
  label,
  checked = true,
  id,
  className,
  onChange,
}: {
  label: string;
  checked?: boolean;
  id?: string;
  className?: string;
  onChange?: (checked: boolean) => void;
}) => (
  <form>
    <div className={clsx("flex items-center relative", className)}>
      <label
        className="pr-[15px] text-[15px] leading-none font-courier-prime cursor-pointer"
        htmlFor={id}
      >
        {label}
      </label>
      <Checkbox.Root
        className="cursor-pointer transition-all duration-300 flex size-[25px] appearance-none items-center justify-center rounded border-3 border-beige-accent bg-white hover:bg-beige-hover relative"
        checked={checked}
        id={id}
        onCheckedChange={onChange}
      >
        <Checkbox.Indicator className="absolute -left-1 -top-3 w-9 h-7 transform rotate-12 pointer-events-none">
          <img
            src={checkmark}
            alt="checkmark"
            className="pointer-events-none"
          />
        </Checkbox.Indicator>
      </Checkbox.Root>
    </div>
  </form>
);
