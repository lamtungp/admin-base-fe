'use client';

import { useState } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import SearchInput from '@src/components/Form/SearchInput';
import BuilderItems from '@src/components/Builder/BuilderItems';
import MainBuilder from '@src/components/Builder/MainBuilder';
import { DragDropContext, DragStart, DragUpdate, DropResult } from 'react-beautiful-dnd';
import IconComponent from '@src/components/Builder/IconComponent';
import TableItem from '@src/components/Builder/items/TableItem';

const tableData = {
  columns: ['username', 'email', 'phone', 'day of birth', 'state'],
  rows: [
    {
      username: 'Pham Tung Lam',
      email: 'Pham Tung Lam',
      phone: 'Pham Tung Lam',
      'day of birth': 'Pham Tung Lam',
      state: '',
    },
    {
      username: 'Pham Tung Lam',
      email: 'Pham Tung Lam',
      phone: 'Pham Tung Lam',
      'day of birth': 'Pham Tung Lam',
      state: '',
    },
    // {
    //   username: 'Pham Tung Lam',
    //   email: 'Pham Tung Lam',
    //   phone: 'Pham Tung Lam',
    //   'day of birth': 'Pham Tung Lam',
    //   state: 'Pham Tung Lam',
    // },
    // {
    //   username: 'Pham Tung Lam',
    //   email: 'Pham Tung Lam',
    //   phone: 'Pham Tung Lam',
    //   'day of birth': 'Pham Tung Lam',
    //   state: 'Pham Tung Lam',
    // },
    // {
    //   username: 'Pham Tung Lam',
    //   email: 'Pham Tung Lam',
    //   phone: 'Pham Tung Lam',
    //   'day of birth': 'Pham Tung Lam',
    //   state: 'Pham Tung Lam',
    // },
  ],
  pageSize: 1,
  totalRows: 5,
};

const ITEMS = [
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
  {
    id: uuid(),
    icon: <IconComponent title="Container" icon="/images/container.svg" />,
    content: <TableItem />,
  },
  {
    id: uuid(),
    icon: <IconComponent title="Table" icon="/images/Grid.svg" />,
    content: <TableItem />,
  },
  {
    id: uuid(),
    icon: <IconComponent title="Table" icon="/images/Grid.svg" />,
    content: <TableItem />,
  },
];

type Component = {
  id: string;
  icon: any;
  content: any;
};

export default function BuilderPage() {
  const [components, setComponents] = useState<Component[]>([]);
  const [textSearch, setTextSearch] = useState('');
  const [placeholderProps, setPlaceholderProps] = useState({});

  const onChange = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  }, 120);

  // a little function to help us with reordering the result
  const reorder = (list: any[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };
  /**
   * Moves an item from one list to another list.
   */
  const copy = (
    source: any,
    destination: any[],
    droppableSource: any,
    droppableDestination: any,
  ) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item: any = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuid() });
    return destClone;
  };

  const move = (source: any, destination: any, droppableSource: any, droppableDestination: any) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {} as any;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    setPlaceholderProps({});
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setComponents(reorder(components, source.index, destination.index));
    } else if (source.droppableId.includes('component')) {
      setComponents(copy(ITEMS, components, source, destination));
    } else {
      // setComponents(
      //   move(
      //     components[source.droppableId],
      //     components[destination.droppableId],
      //     source,
      //     destination,
      //   ),
      // );
    }
  };
  const getDndDom = (dndId: string, attribute = 'data-rbd-drag-handle-draggable-id') => {
    const domQuery = `[${attribute}='${dndId}']`;
    const draggedDOM = document.querySelector(domQuery);
    return draggedDOM;
  };

  const onDragUpdate = (event: DragUpdate) => {
    if (!event.destination) {
      return;
    }

    const isDragComponent = event.draggableId.includes('drag-component');
    const draggedDOM = isDragComponent
      ? getDndDom(event.destination.droppableId, 'data-rbd-droppable-id')
      : getDndDom(event.draggableId);
    if (!draggedDOM || !draggedDOM.parentNode) {
      return;
    }

    const parentNode = isDragComponent ? draggedDOM : draggedDOM.parentNode;
    const destIndex = event.destination.index;
    let clientHeight = draggedDOM.clientHeight;
    let clientWidth = draggedDOM.clientWidth;

    if (isDragComponent) {
      clientHeight = 68;
      clientWidth = parentNode.children[destIndex].clientWidth;
    }

    const destinationIndex = event.destination.index;
    const sourceIndex = event.source.index;

    const childrenArray = [...parentNode.children];
    let updatedArray = [...childrenArray];
    if (!isDragComponent) {
      const movedItem = childrenArray[sourceIndex];
      childrenArray.splice(sourceIndex, 1);
      updatedArray = [
        ...childrenArray.slice(0, destinationIndex),
        movedItem,
        ...childrenArray.slice(destinationIndex + 1),
      ];
    }

    const clientY =
      parseFloat(window.getComputedStyle(parentNode as Element).paddingTop) +
      (updatedArray as HTMLElement[]).slice(0, destinationIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(parentNode as Element).paddingLeft),
    });
  };

  const onDragStart = (event: DragStart) => {
    const draggedDOM = getDndDom(event.draggableId);
    if (!draggedDOM || !draggedDOM.parentNode) {
      return;
    }

    const { clientHeight, clientWidth, parentNode } = draggedDOM;
    const sourceIndex = event.source.index;

    const clientY =
      parseFloat(window.getComputedStyle(parentNode as Element).paddingTop) +
      ([...parentNode.children] as HTMLElement[]).slice(0, sourceIndex).reduce((total, curr) => {
        const style = window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(parentNode as Element).paddingLeft),
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
      <div className="flex min-h-full bg-gray-800 z-10">
        <div className="rounded-tl-md w-[calc(100%-340px)] min-h-full bg-gray-200 p-4">
          <MainBuilder components={components} placeholderProps={placeholderProps} />
        </div>
        <div className="w-[340px] min-h-full bg-gray-100 px-3 py-4">
          <div className="text-black">
            <SearchInput
              onChange={onChange}
              value={textSearch}
              placeholder="Search components..."
            />
            <BuilderItems />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
