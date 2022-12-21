import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, switchMap, take, tap } from "rxjs";
import { Character } from "./character.model";

interface CharacterData {
  id: string;
  name: string;
  films: string[];
  shortFilms: string[];
  tvShows: string[];
  parkAttractions: string[];
  videoGames: string[];
  allies: string[];
  enemies: string[];
  imageUrl: string;
}
@Injectable({
  providedIn: "root",
})
export class CharactersService {
  private _characters = new BehaviorSubject<Character[]>([]);

  get characters() {
    return this._characters.asObservable();
  }
  constructor(private http: HttpClient) {}

  fetchCharacters() {
    return this.http
      .get<{ [key: string]: CharacterData }>(
        "https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters.json"
      )
      .pipe(
        map((resData) => {
          const characters: any[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              characters.push(
                new Character(
                  key,
                  resData[key].name,
                  resData[key].films,
                  resData[key].shortFilms,
                  resData[key].tvShows,
                  resData[key].videoGames,
                  resData[key].parkAttractions,
                  resData[key].allies,
                  resData[key].enemies,
                  resData[key].imageUrl
                )
              );
            }
          }

          return characters;
        }),
        tap((characters) => {
          this._characters.next(characters);
        })
      );
  }

  getCharacter(id: string) {
    return this.http
      .get<CharacterData>(
        `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters/${id}.json`
      )
      .pipe(
        map((characterData: any) => {
          return new Character(
            id,
            characterData.name,
            characterData.films,
            characterData.shortFilms,
            characterData.tvShows,
            characterData.videoGames,
            characterData.parkAttractions,
            characterData.allies,
            characterData.enemies,
            characterData.imageUrl
          );
        })
      );
  }

  addCharacter(
    name: string,
    films: string[],
    shortFilms: string[],
    tvShows: string[],
    videoGames: string[],
    parkAttractions: string[],
    allies: string[],
    enemies: string[],
    imageUrl: string
  ) {
    let generatedId: string;
    let newCharacter: Character;
    newCharacter = new Character(
      Math.random().toString(),
      name,
      films,
      shortFilms,
      tvShows,
      videoGames,
      parkAttractions,
      allies,
      enemies,
      imageUrl
    );

    return this.http
      .post<{ name: string }>(
        "https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters.json",
        { ...newCharacter, id: null }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.characters;
        }),
        take(1),
        tap((characters) => {
          this._characters.next(characters.concat(newCharacter));
        })
      );
  }
}
