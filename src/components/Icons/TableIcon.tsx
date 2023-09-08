import { JSX, SVGProps } from 'react';

export default function TableIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96">
      <path
        fill="currentColor"
        d="M80,14H16a6.0066,6.0066,0,0,0-6,6V80a1.9988,1.9988,0,0,0,2,2H84a1.9988,1.9988,0,0,0,2-2V20A6.0066,6.0066,0,0,0,80,14ZM38,62V50H58V62Zm20,4V78H38V66ZM82,46H62V34H82ZM38,34H58V46H38ZM34,46H14V34H34ZM14,50H34V62H14Zm48,0H82V62H62ZM14,66H34V78H14ZM62,78V66H82V78Z"
      />
    </svg>
  );
}
