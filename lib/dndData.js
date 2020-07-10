import { userBuilder } from './builder'

const initialData = {
  items: {
    // 'item-1': { ...userBuilder({ id: 'item-1' }) },
    // 'item-2': { ...userBuilder({ id: 'item-2' }) },
    // 'item-3': { ...userBuilder({ id: 'item-3' }) },
    // 'item-4': { ...userBuilder({ id: 'item-4' }) },
    // 'item-5': { ...userBuilder({ id: 'item-5' }) },
    // 'item-6': { ...userBuilder({ id: 'item-6' }) },
    // 'item-7': { ...userBuilder({ id: 'item-7' }) },
    // 'item-8': { ...userBuilder({ id: 'item-8' }) },
  },
  columns: {
    applied: {
      id: 'applied',
      title: 'Aplicantes',
      itemIds: [],
      // itemIds: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5'],
    },
    preselected: {
      id: 'preselected',
      title: 'Seleccionados',
      itemIds: [],
      // itemIds: ['item-6', 'item-7', 'item-8'],
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
