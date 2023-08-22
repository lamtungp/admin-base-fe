'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChangeEventHandler, useState } from 'react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

const SearchInput = ({ placeholder, value, onChange }: SearchInputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <MagnifyingGlassIcon className="w-5 text-gray-400" />
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full py-3 px-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-offset-0"
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        required
      />
    </div>
  );
};

export default SearchInput;
