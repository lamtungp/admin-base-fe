import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface TableItemProps {
  title?: string;
  columns?: any[];
  rows?: any[];
  totalRows?: number;
  pageSize?: number;
  currentPage?: number;
}

const TableItem = ({
  title,
  columns,
  rows,
  totalRows = 0,
  pageSize = 1,
  currentPage = 1,
}: TableItemProps) => {
  const totalPages =
    totalRows % pageSize === 0 ? totalRows / pageSize : Math.round(totalRows / pageSize) + 1;
  const totalPagesArray = [...Array(totalPages).keys()];

  return (
    <section className="bg-white py-4 px-5">
      <h1 className="mb-4 text-lg capitalize">{title}</h1>
      <div className="overflow-x-auto border rounded-lg">
        <table className="table-auto border-collapse w-full min-w-[600px]">
          <thead>
            <tr className="h-10 [&>th:first-child]:border-l-0 [&>th:last-child]:border-r-0 [&>th]:border-t-0">
              <th className="w-[14px]" />
              {columns?.map((col, index) => (
                <th key={index} className="text-left text-[#9fa9ba] uppercase text-xs p-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&>tr:nth-child(odd)]:bg-[#f8fafc]">
            {rows?.map((row, index) => (
              <tr className="h-16" key={index}>
                <td></td>
                {Object.keys(row).map((key, index) => (
                  <td key={index} className="p-2 text-[#768191] text-[14px]">
                    {row[key] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="pagination" className="mt-2 flex justify-between">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-2 h-8 ml-0 mr-1 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 bg-transparent"
            >
              <ChevronLeftIcon className="w-3.5" />
            </a>
          </li>

          <ul className="flex items-center justify-center">
            {totalPagesArray.map((pageNumber, index) => (
              <li
                key={pageNumber}
                className={`${
                  currentPage === index + 1
                    ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                } flex items-center justify-center rounded-md mx-[0.5px] px-3 h-8 leading-tight cursor-pointer border bg-transparent`}
              >
                {index + 1}
              </li>
            ))}
          </ul>

          <li>
            <a
              href="#"
              className="flex items-center justify-center px-2 ml-1 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 bg-transparent"
            >
              <ChevronRightIcon className="w-3.5" />
            </a>
          </li>
        </ul>
        <div className="flex items-center justify-center gap-2">
          <span className="text-[#9fa9ba] text-xs">{pageSize} items</span>
          <ChevronDownIcon className="w-4" />
        </div>
      </nav>
    </section>
  );
};

export default TableItem;
