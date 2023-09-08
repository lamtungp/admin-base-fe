import { handleTrimClassName } from '@src/utils';

interface DividerProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  className?: string;
}

const Divider = ({ className = '', ...props }: DividerProps) => {
  return (
    <div {...props} className={handleTrimClassName(`${className} h-[1px] bg-[#dddddd] my-3`)} />
  );
};

export default Divider;
