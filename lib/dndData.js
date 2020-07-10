const initialData = {
  items: {},
  columns: {
    applied: {
      id: 'applied',
      title: 'Aplicantes',
      itemIds: [],
    },
    preselected: {
      id: 'preselected',
      title: 'Seleccionados',
      itemIds: [],
    },
    test: {
      id: 'test',
      title: 'Pruebas',
      itemIds: [],
    },
    interview: {
      id: 'interview',
      title: 'Entrevistas',
      itemIds: [],
    },
    deleted: {
      id: 'deleted',
      title: 'Descartados',
      itemIds: [],
    },
  },
  columnOrder: ['applied', 'preselected', 'test', 'interview', 'deleted'],
}

export default initialData
