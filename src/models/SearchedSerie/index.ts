import People from "../People"
import Serie from "../Serie"

export interface SearchedSerie {
  score: number
  show: Serie
}

export interface SearchedPerson {
  score: number
  person: People
}

export interface SearchByShowResponse {
  series: SearchedSerie[]
  searchedValue: string
}

export interface SearchByNameResponse {
  persons: SearchedPerson[]
  searchedValue: string
}