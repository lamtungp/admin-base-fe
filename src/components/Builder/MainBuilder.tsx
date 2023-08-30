'use client';

import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Droppable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Droppable), {
  ssr: false,
});

const Draggable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Draggable), {
  ssr: false,
});

type Component = {
  id: string;
  icon: any;
  content: any;
};

interface MainBuilderProps {
  components: { [x: string | number]: Component[] };
}

const MainBuilder = ({ components }: MainBuilderProps) => {
  const [isDraggableDisable, setIsDraggableDisable] = useState(false);
  const [isMouseEnter, setIsMouseEnter] = useState(false);

  const onClick = () => {
    setIsDraggableDisable(true);
  };
  const ref = useRef(null);

  return (
    <>
      {Object.keys(components).map((componentId: string) => {
        return (
          <Droppable key={componentId} droppableId={componentId}>
            {(providedDrop, snapshotDrop) => (
              <div
                ref={providedDrop.innerRef}
                {...providedDrop.droppableProps}
                style={{
                  borderRadius: '8px',
                  minHeight: '140px',
                }}
                className={`${
                  snapshotDrop.isDraggingOver ? 'bg-blue-300' : ''
                } border border-transparent ${
                  components[componentId].length ? 'hover:border hover:border-blue-400' : ''
                }`}
              >
                {components[componentId].map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                    isDragDisabled={isDraggableDisable}
                  >
                    {(provided, _snapshot) => (
                      <React.Fragment>
                        {isMouseEnter && <div></div>}
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            minHeight: '100px',
                          }}
                          className="hover:bg-blue-400 rounded-md"
                          onClick={onClick}
                          onMouseLeave={() => setIsMouseEnter(false)}
                          onMouseEnter={() => setIsMouseEnter(true)}
                        >
                          <div
                            className={`${
                              !isDraggableDisable && isMouseEnter
                                ? '[&>section]:hover:bg-sky-50 [&>section]:hover:opacity-85 [&>section>nav>ul>li]:pointer-events-none [&>section>nav>ul>ul>li]:pointer-events-none [&>section>div>table>tbody>tr:nth-child(odd)]:!bg-blue-50'
                                : ''
                            } [&>section]:rounded-md`}
                          >
                            {item.content}
                          </div>
                        </div>
                      </React.Fragment>
                    )}
                  </Draggable>
                ))}
                <div className="rounded-md" style={{ display: 'none' }}>
                  {providedDrop.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        );
      })}
    </>
  );
};

export default MainBuilder;
