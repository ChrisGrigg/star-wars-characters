import { NotFoundError, resolver } from "blitz"

import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { Character } from "./character"

// with more time this could be centralised
// as an 'apolloclient.ts file to avoid DRY
const client = new ApolloClient({
  uri: process.env.APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
})

function formatSpecies(charactersFormatted: Character[]) {
  // remove everything but species object from character array
  const species = charactersFormatted.map((character) => {
    return character.species
  })
  // remove null items
  const onlySpecies = species.filter((item, index) => {
    return item
  })
  // remove duplicates
  const filteredSpecies = onlySpecies.filter((item, index) => {
    return onlySpecies.indexOf(item) === index
  })
  // sort in alphabetical order
  const orderedSpecies = filteredSpecies.sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (b.name > a.name) {
      return -1
    }
    return 0
  })
  return orderedSpecies
}

export default resolver.pipe(resolver.authorize(), async () => {
  let characters: any
  let charactersFormatted: Character[]
  let data: any

  const query = gql`
    {
      allPeople {
        edges {
          node {
            id
            name
            gender
            height
            species {
              id
              name
            }
            homeworld {
              id
              name
            }
            filmConnection {
              edges {
                node {
                  id
                  title
                }
              }
            }
            birthYear
            eyeColor
            skinColor
            hairColor
          }
        }
      }
    }
  `

  try {
    data = await client.query({ query })
  } catch (e) {
    console.error(e)
  }

  characters = data.data.allPeople.edges

  charactersFormatted = characters.map((character) => {
    return character.node
  })

  // get species in correct format for filtering data
  const orderedSpecies = formatSpecies(charactersFormatted)

  if (!data) throw new NotFoundError()

  return { characters: charactersFormatted, species: orderedSpecies }
})
