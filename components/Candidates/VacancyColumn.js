import { Droppable } from 'react-beautiful-dnd'
import DraggableVacancy from './DraggableVacancy'

const VacancyColumn = ({ column, items }) => {
  return (
    <div className="VacancyColumn">
      <div className="VacancyColumn__info">
        {column.title} <span>{items.length}</span>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`VacancyColumn__list ${
              snapshot.isDraggingOver ? 'isDraggingOver' : ''
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map((item, index) => (
              <DraggableVacancy
                key={`${item.userId}_${item.fullName}`}
                vacancy={item}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default VacancyColumn
