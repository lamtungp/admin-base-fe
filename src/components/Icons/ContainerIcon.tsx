import { JSX, SVGProps } from 'react';

export default function ContainerIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <g>
        <path
          fill="#fff"
          stroke="currentColor"
          stroke-width="6"
          stroke-miterlimit="10"
          stroke-dasharray="9.9367,4.9683"
          d="M95.333,85   c0,5.523-4.477,10-10,10h-70c-5.523,0-10-4.477-10-10V15c0-5.523,4.477-10,10-10h70c5.523,0,10,4.477,10,10V85z"
        />
      </g>
    </svg>
  );
}
