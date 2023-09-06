'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import Tooltip from '../Basic/Tooltip';
import { CogIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';

const Droppable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Droppable), {
  ssr: false,
});

const Draggable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Draggable), {
  ssr: false,
});

type Component = {
  id: string;
  name: string;
  icon: any;
  content: any;
};

interface MainBuilderProps {
  components: Component[];
  placeholderProps: any;
  setComponents: any;
  onDelete: any;
  onDuplicate: any;
}

const MainBuilder = ({
  components,
  setComponents,
  placeholderProps,
  onDelete,
  onDuplicate,
}: MainBuilderProps) => {
  const ref = useRef(null);
  const [dragComponentId, setDragComponentId] = useState<string | null>(null);
  const [componentMouseOverId, setComponentMouseOverId] = useState<string | null>(null);
  const [isDraggableDisable, setIsDraggableDisable] = useState(false);

  const onClick = (e: any, itemId: string) => {
    setIsDraggableDisable(true);
    setDragComponentId(itemId);
    ref.current = e.target;
  };

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !(ref.current as any).contains(event.target)) {
        setDragComponentId(null);
        setIsDraggableDisable(false);
        setComponentMouseOverId(null);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <>
      <Droppable key={'main-builder'} droppableId={'main-builder'}>
        {(providedDrop, snapshotDrop) => (
          <div
            ref={providedDrop.innerRef}
            {...providedDrop.droppableProps}
            style={{ minHeight: `calc(100% - 24px)` }}
            className={`relative mt-8 rounded-md`}
          >
            {components.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
                isDragDisabled={isDraggableDisable}
              >
                {(provided, _snapshot) => (
                  <div
                    className="mb-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                    onClick={(e) => onClick(e, item.id)}
                  >
                    <div className="group/edit relative">
                      <div
                        className={`${
                          !isDraggableDisable
                            ? 'invisible'
                            : item.id === dragComponentId || item.id === componentMouseOverId
                            ? 'visible'
                            : 'invisible'
                        } group-hover/edit:visible absolute top-[-34px] pb-1`}
                      >
                        <div
                          className={`rounded-md bg-blue-400 flex justify-center align-middle px-2 gap-2`}
                        >
                          <div className="border-r border-gray-300 cursor-all-scroll flex justify-center items-center text-white py-[3px]">
                            <img src="/images/drag-dots.svg" className="w-6" />
                            <span className="text-[14px] capitalize mr-2 flex justify-center align-middle">
                              {item.name}
                            </span>
                          </div>

                          <Tooltip title="Customize" className="cursor-pointer">
                            <CogIcon className="text-gray-200 hover:text-gray-50 w-5" />
                          </Tooltip>
                          <Tooltip
                            title="Duplicate"
                            className="cursor-pointer"
                            onClick={() => setComponents(onDuplicate(components, index))}
                          >
                            <DocumentDuplicateIcon className="text-gray-200 hover:text-gray-50 w-4" />
                          </Tooltip>
                          <Tooltip
                            title="Delete"
                            className="cursor-pointer"
                            onClick={() => setComponents(onDelete(components, item.id))}
                          >
                            <TrashIcon className="text-gray-200 hover:text-gray-50 w-4" />
                          </Tooltip>
                        </div>
                      </div>

                      <div
                        className={`${
                          item.id === dragComponentId && isDraggableDisable
                            ? 'border-blue-400'
                            : 'border-transparent'
                        } border rounded-md hover:border hover:border-blue-400`}
                        onMouseLeave={() => setComponentMouseOverId(null)}
                        onMouseEnter={() => setComponentMouseOverId(item.id)}
                      >
                        <div
                          className={`${
                            item.id !== dragComponentId && item.id === componentMouseOverId
                              ? 'cursor-pointer [&>section]:hover:bg-sky-50 [&>section]:hover:opacity-85 [&>section>nav>ul>li]:pointer-events-none [&>section>nav>ul>ul>li]:pointer-events-none [&>section>div>table>tbody>tr:nth-child(odd)]:!bg-blue-50'
                              : ''
                          } [&>section]:rounded-md`}
                        >
                          {item.content}
                        </div>
                      </div>

                      {/* {snapshot.isDragging && (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                          >
                            {item.icon}
                          </div>
                        )} */}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            <div
              className="rounded-md"
              style={{
                display: snapshotDrop.draggingFromThisWith?.includes('drag-component')
                  ? 'none'
                  : 'initial',
              }}
            >
              {providedDrop.placeholder}
            </div>

            {!_.isEmpty(placeholderProps) && snapshotDrop.isDraggingOver && (
              <div
                className="bg-white p-2 border border-dashed border-blue-400 absolute"
                style={{
                  top: placeholderProps.clientY,
                  left: placeholderProps.clientX,
                  height: placeholderProps.clientHeight,
                  borderRadius: '8px',
                  width: '100%',
                }}
              />
            )}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default MainBuilder;
