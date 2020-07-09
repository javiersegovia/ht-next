import faker from 'faker'

const randomCalification = () => {
  const n1 = Math.floor(Math.random() * 5) + 1

  return `${n1}/5`
}

const stateOptions = [
  'applied',
  'preselected',
  'test',
  'interview',
  'validation',
]

const randomState =
  stateOptions[Math.floor(Math.random() * stateOptions.length)]

export const userBuilder = (overrides) => ({
  id: faker.random.uuid(),
  fullName: `${faker.name.firstName()} ${faker.name.lastName()}`,
  location: faker.address.city(),
  calification: `Calificación ${randomCalification()}`,
  profilePercentage: Math.floor(Math.random() * 80) + 20,
  affinityPercentage: Math.floor(Math.random() * 99) + 1,
  currentState: randomState,
  ...overrides,
})
