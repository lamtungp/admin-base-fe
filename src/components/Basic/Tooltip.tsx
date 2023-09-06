import './index.scss';

interface TooltipProps {
  children?: React.ReactNode;
  title?: string;
  position?: string;
}

const Tooltip = ({ children, title, position = '' }: TooltipProps) => {
  const getPositionStyles = (position: string) => {
    switch (position) {
      case 'bottom':
        return 'top-[150%] left-[50%] ml-[60px] after:bottom-[100%] after:left-[50%]';

      default:
        return 'top-[150%] left-[50%] ml-[60px] after:bottom-[100%] after:left-[50%]';
    }
  };

  return (
    <div className="relative inline-block">
      {children}
      <span
        className={`${getPositionStyles(
          position,
        )} tooltip-text hidden absolute w-[120px] bg-black text-white text-center rounded-md py-1 z-10`}
      >
        {title}
      </span>
    </div>
  );
};

export default Tooltip;
