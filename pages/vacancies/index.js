/* eslint-disable no-nested-ternary */

import { useState, useEffect, useRef } from 'react'
import { DragDropContext, resetServerContext } from 'react-beautiful-dnd'
import axios from 'axios'
import { useQueryCache, useInfiniteQuery } from 'react-query'
import VacanciesGrid from 'components/Candidates/VacanciesGrid'
import VacancyColumn from 'components/Candidates/VacancyColumn'
import Navbar from 'components/Layout/Navbar'
import Wrapper from 'components/Layout/Wrapper'
import dndInitialData from 'lib/dndData'
import { ReactQueryDevtools } from 'react-query-devtools'

import useIntersectionObserver from '../../hooks/useIntersectionObserver'

const usersEndpoint = 'http://localhost:3000/api/users'

resetServerContext()

const VacanciesPage = () => {
  const [dndData, setDndData] = useState(dndInitialData)

  const fetchUsers = async (key, nextPage = 1) => {
    const { data } = await axios.get(
      `${usersEndpoint}?page=${nextPage}&per_page=40`
    )
    return data
  }

  const {
    isLoading,
    error,
    isFetching,
    fetchMore,
    canFetchMore,
  } = useInfiniteQuery('users', fetchUsers, {
    refetchOnWindowFocus: false,
    getFetchMore: (lastGroup) => lastGroup.nextPage,
    refetchOnMount: false,
    enabled: false,
    cacheTime: 60 * 60 * 1000,
    staleTime: 60 * 60 * 1000,
    onSuccess: (response) => {
      if (!response) return

      let users = []

      const lastItem = response[response.length - 1]

      if (!Object.keys(dndData.items).length && response?.length > 1) {
        const allUsers = response
          .filter((x) => x)
          .map((queryResponse) => queryResponse.users)
          .flat()

        users = allUsers
      } else {
        users = lastItem.users
      }

      if (users.length) {
        const newItems = {}

        users.forEach((user) => {
          newItems[`${user.userId}_${user.fullName}`] = user
        })

        const newColumns = {}

        Object.values(dndData.columns).forEach((column) => {
          const newItemIds = Object.values(newItems)
            .filter((user) => user.currentState === column.id)
            .map((u) => `${u.userId}_${u.fullName}`)

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

  const fetchMoreIfYouCan = () => {
    if (canFetchMore) {
      fetchMore()
    }
  }

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: fetchMoreIfYouCan,
    dependencies: [canFetchMore],
  })

  const onDragEnd = async (result) => {
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

      const currentUser = dndData.items[draggableId]

      await axios.put(usersEndpoint, {
        id: currentUser.userId,
        currentState: destination.droppableId,
      })

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
  const queryCache = useQueryCache()

  useEffect(() => {
    const queryData = queryCache.getQueryData('users')
    const hasData = queryData?.filter((x) => x) || false

    if (!hasData) {
      fetchMore()
    }
  }, [dndData.items.length])

  return (
    <>
      <Navbar />
      <Wrapper>
        {isLoading ? (
          <div className="LoadingGif__wrapper">
            <div className="LoadingGif" />
          </div>
        ) : error ? (
          <h3>Error: {error.message}</h3>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <VacanciesGrid isFetching={isFetching}>
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
            <div ref={loadMoreButtonRef} />
          </DragDropContext>
        )}
      </Wrapper>
      <ReactQueryDevtools initialIsOpen />
    </>
  )
}

export default VacanciesPage
