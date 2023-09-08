'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import _ from 'lodash';
import Tooltip from '../Basic/Tooltip';
import { Bars3Icon, CogIcon, DocumentDuplicateIcon, TrashIcon } from '@heroicons/react/24/outline';
import { handleTrimClassName } from '@src/utils';
import { useAppSelector } from '@src/redux/hooks';
import { PlaceholderPropsType } from '@src/redux/builder/builder.slice';

const Droppable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Droppable), {
  ssr: false,
});

const Draggable = dynamic(() => import('@hello-pangea/dnd').then((mod) => mod.Draggable), {
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
  placeholderProps?: any;
  setComponents: any;
  onDelete: any;
  onDuplicate: any;
}

const MainBuilder = ({ components, setComponents, onDelete, onDuplicate }: MainBuilderProps) => {
  const ref = useRef(null);
  const placeholderProps = useAppSelector((root) => root.builder.placeholderProps);

  const [placeholderDrop, setPlaceholderDrop] = useState<PlaceholderPropsType>({});
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

  useEffect(() => {
    setPlaceholderDrop(placeholderProps);
  }, [placeholderProps]);

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
                        } group-hover/edit:visible absolute top-[-32px] pb-1`}
                      >
                        <div
                          className={`rounded-md bg-blue-400 flex justify-center align-middle px-2 gap-2`}
                        >
                          <div className="border-r border-gray-300 cursor-all-scroll flex justify-center items-center text-white py-[4px]">
                            <Bars3Icon className="w-4 mr-1" />
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
                          className={handleTrimClassName(
                            `${
                              item.id !== dragComponentId && item.id === componentMouseOverId
                                ? 'cursor-pointer [&>section]:hover:bg-sky-50 [&>section]:hover:opacity-85 [&>section>nav>ul>li]:pointer-events-none [&>section>nav>ul>ul>li]:pointer-events-none [&>section>div>table>tbody>tr:nth-child(odd)]:!bg-blue-50'
                                : ''
                            } [&>section]:rounded-md`,
                          )}
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
              className="rounded-md w-full"
              style={{
                display: snapshotDrop.draggingFromThisWith?.includes('drag-component')
                  ? 'none'
                  : 'block',
              }}
            >
              {providedDrop.placeholder}
            </div>

            {!_.isEmpty(placeholderDrop) && snapshotDrop.isDraggingOver && (
              <div
                className="bg-white p-2 border border-dashed border-blue-400 absolute"
                style={{
                  top: placeholderDrop.clientY,
                  left: placeholderDrop.clientX,
                  height: placeholderDrop.clientHeight,
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
