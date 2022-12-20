export class Character {
  constructor(
    public id: string,
    public name: string,
    public films: string[],
    public shortFilms: string[],
    public tvShows: string[],
    public videoGames: string[],
    public parkAttractions: string[],
    public allies: string[],
    public enemies: string[],
    public imageUrl: string
  ) {}
}
