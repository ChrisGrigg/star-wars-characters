// interface Species {
//   id: string
//   name: string
// }
export interface Character {
  id: string
  name: string
  gender: string
  height: number
  species: any // TODO: apply interface for this, 'any' is too vaguee
  homeworld: any // TODO: apply interface for this, 'any' is too vague
  filmConnection: any // TODO: apply interface for this, 'any' is too vague
  birthYear?: string
  eyeColor?: string
  skinColor?: string
  hairColor?: string
}
