/* eslint-disable jsx-a11y/no-onchange */
import React from "react"

const CharacterCard = ({ character }) => {
  return (
    <div>
      <h1>You chose: {character.name}</h1>
      <p>Gender: {character.gender}</p>
      <p>Height: {character.height}</p>
      <p>Species: {character.species && character.species.name}</p>
      <p>Homeworld: {character.homeworld && character.homeworld.name}</p>
      <p>Birth Year: {character.birthYear}</p>
      <p>Eye Color: {character.eyeColor}</p>
      <p>Skin Color: {character.skinColor}</p>
      <p>Hair Color: {character.hairColor}</p>
      <p className="font-bold">Films they’ve appeared in:</p>
      <ul>
        {character.filmConnection.edges.map((film) => (
          <li key={film.node.id} className="ml-3">
            <span>{film.node.title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CharacterCard
