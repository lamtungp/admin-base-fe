interface TooltipProps {
  children?: React.ReactNode;
  title?: string;
}

const Tooltip = ({ children, title }: TooltipProps) => {
  return (
    <div className="relative inline-block">
      {children}
      <span className="hidden absolute">{title}</span>
    </div>
  );
};

export default Tooltip;
