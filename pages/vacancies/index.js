/* eslint-disable no-nested-ternary */

import { useState, useRef } from 'react'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import VacanciesGrid from 'components/Candidates/VacanciesGrid'
import VacancyColumn from 'components/Candidates/VacancyColumn'
import Navbar from 'components/Layout/Navbar'
import Wrapper from 'components/Layout/Wrapper'
import dndInitialData from 'lib/dndData'
import { ReactQueryDevtools } from 'react-query-devtools'

import useIntersectionObserver from '../../hooks/useIntersectionObserver'

resetServerContext()

const VacanciesPage = (props) => {
  const fetchUsers = async (key, nextPage = 1) => {
    const { data } = await axios.get(
      `http://localhost:3000/api/users?page=${nextPage}&per_page=40`
    )
    return data
  }

  const [dndData, setDndData] = useState(dndInitialData)
  const [currentPage, setCurrentPage] = useState(1)

  const {
    isLoading,
    error,
    data,
    isFetching,
    isFetchingMore,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
    getFetchMore: (lastGroup) => lastGroup.nextPage,
    onSuccess: (response) => {
      const lastItem = response[response.length - 1]
      const { users = [] } = lastItem

      console.log('response onSuccess')
      console.log(lastItem)

      if (users.length) {
        const newItems = {}

        users.forEach((user) => {
          newItems[user.id] = user
        })

        const newColumns = {}

        Object.values(dndData.columns).forEach((column) => {
          const newItemIds = Object.values(newItems)
            .filter((user) => user.currentState === column.id)
            .map((u) => u.id)

          newColumns[column.id] = {
            ...column,
            itemIds: [...new Set(column.itemIds.concat(newItemIds))],
          }
        })

        setDndData((previousState) => ({
          ...previousState,
          items: {
            ...previousState.items,
            ...newItems,
          },
          columns: {
            ...previousState.columns,
            ...newColumns,
          },
        }))
      }
    },
  })

  const loadMoreButtonRef = useRef()

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMore,
  })

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
            <VacanciesGrid>
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
            </VacanciesGrid>
            <div>
              <button
                type="button"
                ref={loadMoreButtonRef}
                onClick={() => fetchMore()}
                disabled={!canFetchMore || isFetchingMore}
              >
                {isFetchingMore
                  ? 'Loading more...'
                  : canFetchMore
                  ? 'Load More'
                  : 'Nothing more to load'}
              </button>
            </div>
            <div>
              {isFetching && !isFetchingMore ? 'Background Updating...' : null}
            </div>
          </DragDropContext>
        )}
      </Wrapper>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

export default VacanciesPage
