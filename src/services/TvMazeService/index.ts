import { Episode, People, PeopleWithCast, Season, Serie } from 'models/index'
import TvMazeApiInstance from '../TvMazeApiInstance'
import TvMazeProvider from './provider'

class TvMazeService {
  static getSeriesList = async (page: number = 1): Promise<Serie[]> => TvMazeProvider.get(TvMazeApiInstance.getShowList(page))
  static getShowByName = async (showName: string): Promise<Serie[]> => TvMazeProvider.get(TvMazeApiInstance.getSearchByShow(showName))
  static getSeasonsBySerieId = async (serieId: number): Promise<Season[]> => TvMazeProvider.get(TvMazeApiInstance.getSeasons(serieId))
  static getEpisodesBySeasonId = async (seasonId: number): Promise<Episode[]> => TvMazeProvider.get(TvMazeApiInstance.getEpisodes(seasonId))
  static getPeopleList = async (page: number): Promise<People[]> => TvMazeProvider.get(TvMazeApiInstance.getPeople(page))
  static getPersonsByName = async (personName: string): Promise<Serie[]> => TvMazeProvider.get(TvMazeApiInstance.getSearchByPersonName(personName))
  static getCast = async (personId: number): Promise<PeopleWithCast> => TvMazeProvider.get(TvMazeApiInstance.getCast(personId))
  static getSerie = async (serieId: number): Promise<Serie> => TvMazeProvider.get(TvMazeApiInstance.getSerie(serieId))
}

export default TvMazeService