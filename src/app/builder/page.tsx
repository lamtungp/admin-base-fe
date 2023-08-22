'use client';

import { useState } from 'react';
import _ from 'lodash';
import SearchInput from '@src/components/Form/SearchInput';

export default function BuilderPage() {
  const [textSearch, setTextSearch] = useState('');

  const onChange = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  }, 120);

  return (
    <div className="h-screen flex flex-row items-center justify-between ml-[52px] pt-[48px] bg-gray-800">
      <div className="rounded-tl-md w-full h-full bg-gray-200 p-1">
        <p className="text-black">Test</p>
      </div>
      <div className="w-96 h-full bg-gray-100 px-3 py-4">
        <div className="text-black">
          <SearchInput onChange={onChange} value={textSearch} placeholder="Search components..." />
        </div>
      </div>
    </div>
  );
}
