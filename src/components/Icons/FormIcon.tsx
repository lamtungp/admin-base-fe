import { JSX, SVGProps } from 'react';

export default function FormIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
      <g fill="currentColor">
        <path d="M4,9H14a2,2,0,0,0,2-2V4a2,2,0,0,0-2-2H4A2,2,0,0,0,2,4V7A2,2,0,0,0,4,9ZM4,4H14V7H4Z" />
        <path d="M28,10H4a2,2,0,0,0-2,2v7a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V12A2,2,0,0,0,28,10ZM4,19V12H28v7Z" />
        <path d="M28,2H19a2,2,0,0,0-2,2V7a2,2,0,0,0,2,2h9a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2ZM19,7V4h9V7Z" />
        <path d="M26.5,23h-6a3.5,3.5,0,0,0,0,7h6a3.5,3.5,0,0,0,0-7Zm0,5h-6a1.5,1.5,0,0,1,0-3h6a1.5,1.5,0,0,1,0,3Z" />
      </g>
    </svg>
  );
}
