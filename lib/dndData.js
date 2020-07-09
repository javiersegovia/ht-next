import { userBuilder } from './builder'

const initialData = {
  items: {
    'item-1': { ...userBuilder({ id: 'item-1' }) },
    'item-2': { ...userBuilder({ id: 'item-2' }) },
    'item-3': { ...userBuilder({ id: 'item-3' }) },
    'item-4': { ...userBuilder({ id: 'item-4' }) },
    'item-5': { ...userBuilder({ id: 'item-5' }) },
    'item-6': { ...userBuilder({ id: 'item-6' }) },
    'item-7': { ...userBuilder({ id: 'item-7' }) },
    'item-8': { ...userBuilder({ id: 'item-8' }) },
  },
  columns: {
    'column-applied': {
      id: 'column-applied',
      title: 'Aplicantes',
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'],
    },
    'column-selected': {
      id: 'column-selected',
      title: 'Seleccionados',
      itemIds: ['item-6', 'item-7', 'item-8'],
    },
    'column-test': {
      id: 'column-test',
      title: 'Pruebas',
      itemIds: [],
    },
    'column-interview': {
      id: 'column-interview',
      title: 'Entrevistas',
      itemIds: [],
    },
    'column-deleted': {
      id: 'column-deleted',
      title: 'Descartados',
      itemIds: [],
    },
  },
  columnOrder: [
    'column-applied',
    'column-selected',
    'column-test',
    'column-interview',
    'column-deleted',
  ],
}

export default initialData
