import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10 max-w-6xl mx-auto px-4 md:px-6",
        "auto-rows-[minmax(300px,auto)] md:auto-rows-[minmax(350px,auto)]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-3xl md:rounded-[2.5rem] group/bento hover:shadow-2xl transition-all duration-300",
        "p-6 md:p-8 lg:p-10 flex flex-col justify-between space-y-4 md:space-y-6",
        "bg-white dark:bg-black/40 border border-black/[0.05] dark:border-white/[0.08]",
        "hover:border-black/[0.1] dark:hover:border-white/[0.15]",
        "shadow-lg dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-300 flex-1 flex flex-col justify-end">
        {icon}
        <div className="font-black text-neutral-800 dark:text-neutral-100 mb-2 mt-3 uppercase tracking-tighter text-lg md:text-xl lg:text-2xl leading-tight">
          {title}
        </div>
        <div className="font-medium text-neutral-600 dark:text-neutral-400 text-sm md:text-base leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
};
