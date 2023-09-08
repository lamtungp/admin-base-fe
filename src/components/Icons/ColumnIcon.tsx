import { JSX, SVGProps } from 'react';

export default function ColumnIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      <g fill="#ffffff" stroke="currentColor" strokeWidth="4">
        <path d="M39.3 6H8.7A2.7 2.7 0 0 0 6 8.7v30.6A2.7 2.7 0 0 0 8.7 42h30.6a2.7 2.7 0 0 0 2.7-2.7V8.7A2.7 2.7 0 0 0 39.3 6Z" />
        <path strokeLinecap="round" d="M24 6v36" />
      </g>
    </svg>
  );
}
