import { Draggable } from 'react-beautiful-dnd'
import Vacancy from './Vacancy'

const DraggableVacancy = ({ vacancy, index }) => {
  return (
    <Draggable draggableId={vacancy.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`DraggableVacancy ${
            snapshot.isDragging ? 'isDragging' : ''
          } draggingOver__${snapshot.draggingOver}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Vacancy vacancy={vacancy} />
        </div>
      )}
    </Draggable>
  )
}

export default DraggableVacancy
