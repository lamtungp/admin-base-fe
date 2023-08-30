import React, { CSSProperties } from 'react';
import dynamic from 'next/dynamic';
import { listItems } from './items/listItems';

const Droppable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Droppable), {
  ssr: false,
});

const Draggable = dynamic(() => import('react-beautiful-dnd').then((mod) => mod.Draggable), {
  ssr: false,
});

const BuilderItems = () => {
  const transitionStyles: CSSProperties = {
    transition: `all 0.25s ease`,
  };

  return (
    <>
      {listItems.map((list, index) => (
        <div key={index}>
          <h4 className="my-2">{list.category}</h4>
          <div className="grid grid-cols-3 gap-2">
            {list.items.map((item, index) => (
              <Droppable
                droppableId={`component-${item.id}`}
                key={`component-${item.id}`}
                isDropDisabled
              >
                {(providedDrop, _snapshotDrop) => (
                  <div {...providedDrop.droppableProps} ref={providedDrop.innerRef}>
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <React.Fragment>
                          <div
                            key={item.id}
                            className={`p-1 border-2 border-transparent bg-white rounded-md hover:border-2 hover:border-blue-400 hover:pointer-events-auto ${
                              snapshot.isDragging ? 'border-2 border-blue-400' : ''
                            }`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={
                              snapshot.isDropAnimating
                                ? { ...provided.draggableProps.style, ...transitionStyles }
                                : { ...provided.draggableProps.style }
                            }
                          >
                            {item.icon}
                          </div>
                          {snapshot.isDragging && (
                            <div className="p-1 border-2 border-transparent bg-white rounded-md hover:border-2 hover:border-blue-400 hover:pointer-events-auto clone">
                              {item.icon}
                            </div>
                          )}
                        </React.Fragment>
                      )}
                    </Draggable>
                    <div style={{ display: 'none' }}>{providedDrop.placeholder}</div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default BuilderItems;
