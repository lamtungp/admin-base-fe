'use client';

import { useRef, useState } from 'react';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { DragDropContext, DragStart, DragUpdate, DropResult } from '@hello-pangea/dnd';

import SearchInput from '@src/components/Form/SearchInput';
import BuilderItems from '@src/components/Builder/BuilderItems';
import MainBuilder from '@src/components/Builder/MainBuilder';
import { generateListItems } from '@src/components/Builder/items/listItems';
import { useAppDispatch } from '@src/redux/hooks';
import { setPlaceholderProps } from '@src/redux/builder/builder.slice';

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
      phone: 'Pham Tung Lam',
      'day of birth': 'Pham Tung Lam',
      state: 'Pham Tung Lam',
    },
  ],
  pageSize: 1,
  totalRows: 5,
};

type Component = {
  id: string;
  name: string;
  icon: any;
  content: any;
};

export default function BuilderPage() {
  const dispatch = useAppDispatch();

  const [components, setComponents] = useState<Component[]>([]);
  const [textSearch, setTextSearch] = useState('');

  const listItems = generateListItems({ tableData });
  const orderItems = [] as any;
  listItems.map((list) => orderItems.push(...list.items));

  const onChange = _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setTextSearch(e.target.value);
  }, 120);

  /**
   * A little function to help us with reordering the result
   */
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
    source: Component[],
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

  const handleDuplicate = (source: Component[], index: number) => {
    const sourceClone = Array.from(source);
    const newComponent = { ...sourceClone[index], id: uuid() };
    const result = [...sourceClone.slice(0, index), newComponent, ...sourceClone.slice(index)];
    return result;
  };

  const handleDelete = (source: Component[], droppableSourceId: string) => {
    const sourceClone = Array.from(source);
    const result = sourceClone.filter((component: Component) => component.id !== droppableSourceId);
    return result;
  };

  const getDndDom = (dndId: string, attribute = 'data-rfd-drag-handle-draggable-id') => {
    const domQuery = `[${attribute}='${dndId}']`;
    const draggedDOM = document.querySelector(domQuery);
    return draggedDOM;
  };

  const onDragEnd = (result: DropResult) => {
    dispatch(setPlaceholderProps({}));
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      setComponents(reorder(components, source.index, destination.index));
    } else if (source.droppableId.includes('component')) {
      setComponents(copy(orderItems, components, source, destination));
    }
  };

  const onDragUpdate = (event: DragUpdate) => {
    if (!event.destination) {
      return;
    }

    const isDragComponent = event.draggableId.includes('drag-component');
    const draggedDOM = isDragComponent
      ? getDndDom(event.destination.droppableId, 'data-rfd-droppable-id')
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

    const newPlaceholderProps = {
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(parentNode as Element).paddingLeft),
    };

    dispatch(setPlaceholderProps(newPlaceholderProps));
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

    const newPlaceholderProps = {
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(window.getComputedStyle(parentNode as Element).paddingLeft),
    };

    dispatch(setPlaceholderProps(newPlaceholderProps));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
      <div className="flex min-h-full bg-gray-800 z-10">
        <div className="rounded-tl-md w-[calc(100%-340px)] min-h-full bg-gray-200 p-4">
          <MainBuilder
            components={components}
            setComponents={setComponents}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        </div>
        <div className="w-[340px] min-h-full bg-gray-100 px-3 py-4">
          <div className="text-black">
            <SearchInput
              onChange={onChange}
              value={textSearch}
              placeholder="Search components..."
            />
            <BuilderItems listItems={listItems} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
