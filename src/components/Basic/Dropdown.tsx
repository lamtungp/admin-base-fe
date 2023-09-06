import './index.scss';

interface DropdownProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
  title?: string;
  position?: string;
  open?: boolean;
}

const Dropdown = ({ children, title, position = '', className, onClick, open }: DropdownProps) => {
  const getPositionStyles = (position?: string) => {
    switch (position) {
      case 'bottom':
        return 'top-[130%] left-[50%] translate-x-[-50%] after:bottom-[100%] after:left-[50%] after:ml-[-5px]';

      default:
        return 'top-[130%] left-[50%] translate-x-[-50%] after:bottom-[100%] after:left-[50%] after:ml-[-5px]';
    }
  };

  return (
    <div className={`dropdown ${className}`} onClick={onClick}>
      {children}
      {open && <div className={`${getPositionStyles(position)} dropdown-content`}>{title}</div>}
    </div>
  );
};

export default Dropdown;
