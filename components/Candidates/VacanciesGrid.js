import React from 'react'

function VacanciesGrid({ children, isFetching }) {
  return (
    <div className={`VacanciesGrid ${isFetching ? 'isFetching' : ''}`}>
      {children}
    </div>
  )
}

export default VacanciesGrid
