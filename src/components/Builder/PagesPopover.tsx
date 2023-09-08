interface PagesPopoverProps {
  open?: boolean;
}

const PagesPopover = ({ open }: PagesPopoverProps) => {
  return (
    <div
      className={`absolute top-[-56px] h-full ${
        open ? 'opacity-100' : 'invisible opacity-0'
      } z-30 left-[52px] z-1000 inline-block text-sm text-gray-500 transition-opacity duration-300 bg-gray-700 shadow-sm w-80`}
    >
      <div className="p-3">
        <div className="flex">
          <div>
            <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
              <a href="#" className="hover:underline">
                Flowbite
              </a>
            </p>
            <p className="mb-3 text-sm font-normal">Tech company</p>
            <p className="mb-4 text-sm">
              Open-source library of Tailwind CSS components and Figma design system.
            </p>
            <ul className="text-sm">
              <li className="flex items-center mb-2">
                <span className="mr-2 font-semibold text-gray-400"></span>
                <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">
                  https://flowbite.com/
                </a>
              </li>
              <li className="flex items-start mb-2">
                <span className="mr-2 font-semibold text-gray-400">
                  <svg
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                  </svg>
                </span>
                <span className="-mt-1">
                  4,567,346 people like this including 5 of your friends
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesPopover;
