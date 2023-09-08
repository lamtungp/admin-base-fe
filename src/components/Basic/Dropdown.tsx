import { handleTrimClassName } from '@src/utils';
import './index.scss';
import { useEffect, useRef, useState } from 'react';

interface DropdownProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: React.ReactNode;
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  open?: boolean;
  setOpen?: any;
  anchorEl?: any;
}

const Dropdown = ({
  children,
  position = 'bottom-left',
  className = '',
  onClick,
  open,
  setOpen,
  anchorEl,
  ...props
}: DropdownProps) => {
  const ref = useRef(null);
  const [isInViewport, setIsInViewport] = useState(true);

  const getPositionStyles = (position?: string) => {
    switch (position) {
      case 'top-left':
        return 'top-1';

      case 'top-right':
        return 'top-1 right-0';

      case 'bottom-left':
        return 'top-[100%]';

      case 'bottom-right':
        return 'right-0 top-[100%]';

      default:
        return 'top-[100%]';
    }
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  // useEffect(() => {
  //   // Client-side-only code
  //   const viewportWidth = (window && window.innerWidth) || document.documentElement.clientWidth;
  //   const viewportHeight = (window && window.innerHeight) || document.documentElement.clientHeight;
  //   const box = document.querySelector('.dropdown-content');
  //   const rect = box && box.getBoundingClientRect();
  //   const inViewport =
  //     rect &&
  //     rect.top >= 0 &&
  //     rect.left >= 0 &&
  //     rect.bottom <= viewportWidth &&
  //     rect.right <= viewportHeight;
  //   setIsInViewport(Boolean(inViewport));
  //   console.log(inViewport);
  // }, [open]);

  return (
    <div
      {...props}
      ref={ref}
      className={handleTrimClassName(`${className} align-middle`)}
      onClick={onClick}
    >
      <div className="dropdown align-middle">{anchorEl}</div>

      {open && (
        <div className={handleTrimClassName(`${getPositionStyles(position)} dropdown-content`)}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
