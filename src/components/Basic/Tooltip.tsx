import { handleTrimClassName } from '@src/utils';
import './index.scss';

interface TooltipProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  position?: string;
}

const Tooltip = ({
  children,
  title,
  position = '',
  className,
  onClick,
  ...props
}: TooltipProps) => {
  const getPositionStyles = (position?: string) => {
    switch (position) {
      case 'bottom':
        return 'top-[130%] left-[50%] translate-x-[-50%] after:bottom-[100%] after:left-[50%] after:ml-[-5px]';

      default:
        return 'top-[130%] left-[50%] translate-x-[-50%] after:bottom-[100%] after:left-[50%] after:ml-[-5px]';
    }
  };

  return (
    <div {...props} className={handleTrimClassName(`tooltip ${className}`)} onClick={onClick}>
      {children}
      <div className={`${getPositionStyles(position)} tooltip-text`}>{title}</div>
    </div>
  );
};

export default Tooltip;
