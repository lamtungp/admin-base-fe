'use client';

import { useState } from 'react';
import {
  BellIcon,
  CheckIcon,
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { usePathname, useRouter } from 'next/navigation';

import Dropdown from '@src/components/Basic/Dropdown';
import DeleteIcon from '@src/components/Icons/DeleteIcon';
import DuplicateIcon from '@src/components/Icons/DuplicateIcon';
import Divider from '@src/components/Basic/Divider';

const BuilderHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [openEditPageName, setOpenEditPageName] = useState(false);
  const [openEditPage, setOpenEditPage] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    pathname !== '/builder' && (
      <nav className="bg-gray-800 w-full fixed z-20">
        <div className="absolute top-[20%] left-[50%] translate-x-[-50%]">
          <div className="flex justify-center items-center text-white text-sm">
            {!openEditPageName && (
              <>
                <button
                  onClick={() => setOpenEditPageName(true)}
                  className="hover:bg-gray-700 rounded-md mr-2 px-2 py-1.5 flex justify-center items-center"
                >
                  <p className="mr-2">Customer</p>
                  <PencilIcon className="w-3" />
                </button>

                <Dropdown
                  open={openEditPage}
                  setOpen={setOpenEditPage}
                  anchorEl={
                    <button
                      className="flex h-full border-transparent p-[2px] mr-2 text-white bg-gray-600 hover:bg-gray-500 rounded"
                      type="button"
                      onClick={() => setOpenEditPage(!openEditPage)}
                    >
                      <EllipsisHorizontalIcon className="w-4" />
                    </button>
                  }
                >
                  <ul className="text-gray-500">
                    <li className="p-2 hover:bg-gray-200 cursor-pointer flex items-center">
                      <DuplicateIcon className="w-5 mr-2" />
                      <span className="text-[13px]">Duplicate page</span>
                    </li>
                    <li className="p-2 hover:bg-gray-200 cursor-pointer flex items-center text-red-500">
                      <DeleteIcon className="w-5 mr-2" />
                      <span className="text-[14px]">Delete page</span>
                    </li>
                  </ul>
                </Dropdown>
              </>
            )}

            {openEditPageName && (
              <div className="flex items-center py-1.5 px-3 bg-gray-700 rounded-md">
                <input
                  className="appearance-none block w-full bg-transparent focus:outline-none text-xs"
                  type="text"
                />
                <button
                  className="flex-shrink-0 border-transparent p-[2px] mr-2 text-white bg-gray-600  hover:bg-gray-500 rounded"
                  type="button"
                  onClick={() => setOpenEditPageName(false)}
                >
                  <XMarkIcon className="w-4" />
                </button>
                <button
                  className="flex-shrink-0 bg-blue-400 p-[2px] hover:bg-blue-500 text-white rounded"
                  type="button"
                  onClick={() => setOpenEditPageName(false)}
                >
                  <CheckIcon className="w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="flex h-14 items-center">
            <div className="flex h-full justify-center py-2 px-[6.5px]">
              <button className="flex h-full">
                <img
                  className="h-full rounded"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Default avatar"
                />
              </button>
              <div className="flex items-center justify-center h-full sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-1 h-full">
                    <a
                      href="#"
                      className="flex items-center text-gray-300 h-full px-3 py-1.5 hover:bg-gray-700 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 h-full px-3 py-1.5 hover:bg-gray-700 rounded-md text-sm font-medium"
                    >
                      Team
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 h-full px-3 py-1.5 hover:bg-gray-700 rounded-md text-sm font-medium"
                    >
                      Projects
                    </a>
                    <a
                      href="#"
                      className="flex items-center text-gray-300 h-full px-3 py-1.5 hover:bg-gray-700 rounded-md text-sm font-medium"
                    >
                      Calendar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center pr-2 sm:static sm:inset-auto sm:mx-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <BellIcon className="w-6" />
            </button>

            <div className="relative flex justify-center items-center ml-3 p-[4px] pr-0">
              <Dropdown
                className="[&>.dropdown-content]:bg-gray-700"
                open={openUserMenu}
                setOpen={setOpenUserMenu}
                position="bottom-right"
                anchorEl={
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:outline-none"
                    id="user-menu-button"
                    onClick={() => setOpenUserMenu(!openUserMenu)}
                  >
                    <img
                      className="w-9 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                }
              >
                <div className="flex px-2 py-1 items-center">
                  <img
                    className="w-9 h-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <div className="ml-2">
                    <p className="text-white text-[14px]">Lam</p>
                    <p className="text-gray-400 text-xs">tunglamldk@gmail.com</p>
                  </div>
                </div>
                <Divider className="!bg-gray-500" />
                <a
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-0"
                  onClick={() => router.push('/')}
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-1"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex={-1}
                  id="user-menu-item-2"
                >
                  Sign out
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
    )
  );
};

export default BuilderHeader;
