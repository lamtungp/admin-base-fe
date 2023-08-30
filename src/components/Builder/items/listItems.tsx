import { v4 as uuid } from 'uuid';
import IconComponent from '../IconComponent';
import TableItem from './TableItem';

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

export const listItems = [
  {
    category: 'Most Used',
    items: [
      {
        id: uuid(),
        icon: <IconComponent title="Table" icon="/images/table.svg" />,
        content: <TableItem {...tableData} title="Users" />,
      },
      {
        id: uuid(),
        icon: <IconComponent title="Form" icon="/images/form.svg" />,
        content: <TableItem />,
      },
    ],
  },
  {
    category: 'Layout',
    items: [
      {
        id: uuid(),
        icon: <IconComponent title="Container" icon="/images/container.svg" />,
        content: <TableItem />,
      },
      {
        id: uuid(),
        icon: <IconComponent title="Columns" icon="/images/columns.svg" />,
        content: <TableItem />,
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
