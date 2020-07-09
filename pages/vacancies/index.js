/* eslint-disable no-nested-ternary */

import { useState, useEffect } from 'react'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import VacanciesGrid from 'components/Candidates/VacanciesGrid'
import VacancyColumn from 'components/Candidates/VacancyColumn'
import Navbar from 'components/Layout/Navbar'
import Wrapper from 'components/Layout/Wrapper'
import dndInitialData from 'lib/dndData'

import { ReactQueryDevtools } from 'react-query-devtools'

resetServerContext()

const VacanciesPage = (props) => {
  const fetchUsers = async (key, nextPage = 1) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/users?page=${nextPage}&per_page=100`
    )
    return data
  }

  const {
    isLoading,
    error,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery('users', fetchUsers, {
    getFetchMore: (lastGroup) => lastGroup.nextPage,
    onSuccess: (response) => {
      console.log('response')
      console.log(response)
    },
  })

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
        {isLoading ? (
          <h3>Cargando candidatos...</h3>
        ) : error ? (
          <h3>Error: {error.message}</h3>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            {/* <VacanciesGrid>
              {dndData.columnOrder.map((columnId) => {
                const column = dndData.columns[columnId]
                const items = column.itemIds.map(
                  (itemId) => dndData.items[itemId]
                )

                return (
                  <VacancyColumn
                    key={column.id}
                    column={column}
                    items={items}
                  />
                )
              })}
            </VacanciesGrid> */}
            <h1>My grid component goes here</h1>
          </DragDropContext>
        )}
      </Wrapper>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

export default VacanciesPage
