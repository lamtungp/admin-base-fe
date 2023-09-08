import { v4 as uuid } from 'uuid';
import IconComponent from './IconComponent';
import TableItem from './TableItem';
import TableIcon from '@src/components/Icons/TableIcon';
import FormIcon from '@src/components/Icons/FormIcon';
import ContainerIcon from '@src/components/Icons/ContainerIcon';
import ColumnIcon from '@src/components/Icons/ColumnIcon';

const tableData = {
  columns: ['username', 'email', 'phone', 'day of birth', 'state'],
  rows: [
    {
      username: 'Pham Tung Lam',
      email: 'Pham Tung Lam',
      phone: 'Pham Tung Lam',
      'day of birth': 'Pham Tung Lam',
      state: 'Pham Tung Lam',
    },
    {
      username: 'Pham Tung Lam',
      email: 'Pham Tung Lam',
    },
    {
      username: 'Pham Tung Lam',
      a: 'Pham Tung Lam',
    },
    {
      username: 'Pham Tung Lam',
    },
    {
      username: 'Pham Tung Lam',
    },
  ],
  pageSize: 1,
  totalRows: 5,
};

type ItemData = {
  tableData?: any;
};

export const generateListItems = ({ tableData = { title: 'Users' } }: ItemData) => [
  {
    category: 'Most Used',
    items: [
      {
        id: uuid(),
        icon: <IconComponent title="Table" icon={<TableIcon className="w-9 text-sky-500" />} />,
        content: <TableItem {...tableData} />,
        name: 'table',
      },
      {
        id: uuid(),
        icon: <IconComponent title="Form" icon={<FormIcon className="w-9 text-sky-500" />} />,
        content: <TableItem {...tableData} />,
        name: 'table',
      },
    ],
  },
  {
    category: 'Layout',
    items: [
      {
        id: uuid(),
        icon: (
          <IconComponent title="Container" icon={<ContainerIcon className="w-9 text-sky-500" />} />
        ),
        content: <TableItem {...tableData} />,
        name: 'table',
      },
      {
        id: uuid(),
        icon: <IconComponent title="Columns" icon={<ColumnIcon className="w-9 text-sky-500" />} />,
        content: <TableItem {...tableData} />,
        name: 'table',
      },
    ],
  },
  // {
  //   category: 'Basic',
  //   items: [
  //   ],
  // },
  // {
  //   category: 'Chart',
  //   items: [
  //   ],
  // },
];
