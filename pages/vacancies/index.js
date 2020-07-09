import { useState } from 'react'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import VacanciesGrid from 'components/Candidates/VacanciesGrid'
import VacancyColumn from 'components/Candidates/VacancyColumn'
import Navbar from 'components/Layout/Navbar'
import Wrapper from 'components/Layout/Wrapper'
import dndInitialData from 'lib/dndData'

resetServerContext()

const VacanciesPage = (props) => {
  const [dndData, setDndData] = useState(dndInitialData)

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const startColumn = dndData.columns[source.droppableId]
    const finishColumn = dndData.columns[destination.droppableId]

    if (startColumn === finishColumn) {
      const newItemIds = Array.from(startColumn.itemIds)
      newItemIds.splice(source.index, 1)
      newItemIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...startColumn,
        itemIds: newItemIds,
      }

      setDndData((prevState) => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          [newColumn.id]: newColumn,
        },
      }))
    } else {
      const startColumnItemIds = Array.from(startColumn.itemIds)
      startColumnItemIds.splice(source.index, 1)

      const newStartColumn = {
        ...startColumn,
        itemIds: startColumnItemIds,
      }

      const finishColumnItemIds = Array.from(finishColumn.itemIds)
      finishColumnItemIds.splice(destination.index, 0, draggableId)

      const newFinishColumn = {
        ...finishColumn,
        itemIds: finishColumnItemIds,
      }

      setDndData((prevState) => ({
        ...prevState,
        columns: {
          ...prevState.columns,
          [newStartColumn.id]: newStartColumn,
          [newFinishColumn.id]: newFinishColumn,
        },
      }))
    }
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <VacanciesGrid>
            {dndData.columnOrder.map((columnId) => {
              const column = dndData.columns[columnId]
              const items = column.itemIds.map(
                (itemId) => dndData.items[itemId]
              )

              return (
                <VacancyColumn key={column.id} column={column} items={items} />
              )
            })}
          </VacanciesGrid>
        </DragDropContext>
      </Wrapper>
    </>
  )
}

export default VacanciesPage
