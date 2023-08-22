'use client';

import {
  CircleStackIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import PagesPopover from '@src/components/Builder/PagesPopover';
import { useState } from 'react';

const BuilderSidebar = () => {
  const [open, setOpen] = useState(false);

  const onMouseEnter = () => {
    setOpen(true);
  };

  const onMouseLeave = () => {
    setOpen(false);
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed z-40 h-screen transition-transform -translate-x-full sm:translate-x-0 top-[48px]"
        aria-label="Sidebar"
      >
        <div className="h-full py-4 overflow-y-auto bg-gray-800">
          <ul className="space-y-3 font-medium">
            <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <div className="px-2 cursor-pointer">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:text-white hover:bg-gray-700"
                >
                  <DocumentTextIcon className="w-[20px]" />
                </a>
              </div>
              <PagesPopover open={open} />
            </li>
            <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
              <div className="px-2 cursor-pointer">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:text-white hover:bg-gray-700"
                >
                  <CircleStackIcon className="w-[20px]" />
                </a>
              </div>
              <PagesPopover open={open} />
            </li>
            <li>
              <div className="px-2 cursor-pointer">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-700"
                >
                  <Cog6ToothIcon className="w-[20px]" />
                </a>
              </div>
            </li>
            <li>
              <div className="px-2 cursor-pointer">
                <a
                  href="#"
                  className="flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-700"
                >
                  <KeyIcon className="w-[20px]" />
                </a>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default BuilderSidebar;
