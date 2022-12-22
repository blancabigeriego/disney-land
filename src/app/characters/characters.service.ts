import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, map, of, switchMap, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
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
  userId: string;
}
@Injectable({
  providedIn: "root",
})
export class CharactersService {
  private _characters = new BehaviorSubject<Character[]>([]);
  private _userCharacters = new BehaviorSubject<Character[]>([]);

  get characters() {
    return this._characters.asObservable();
  }

  get userCharacters() {
    return this._userCharacters.asObservable();
  }
  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchCharacters() {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<{ [key: string]: CharacterData }>(
          `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters.json?auth=${token}`
        );
      }),
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
                resData[key].imageUrl,
                resData[key].userId
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
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http.get<CharacterData>(
          `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters/${id}.json?auth=${token}`
        );
      }),
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
          characterData.imageUrl,
          characterData.userId
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
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error("no user id found");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
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
          imageUrl,
          fetchedUserId
        );

        return this.http
          .post<{ name: string }>(
            `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters.json?auth=${token}`,
            { ...newCharacter, id: null }
          )
          .pipe(
            switchMap((resData) => {
              generatedId = resData.name;
              return this.characters;
            }),
            take(1),
            tap((characters) => {
              newCharacter.id = generatedId;
              this._characters.next(characters.concat(newCharacter));
            })
          );
      })
    );
  }

  updateCharacter(
    characterId: string,
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
    let updatedCharacters: Character[];
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error("No user id found");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.characters.pipe(
          take(1),
          switchMap((characters) => {
            if (!characters || characters.length <= 0) {
              return this.fetchCharacters();
            } else {
              return of(characters);
            }
          }),
          switchMap((characters) => {
            const updatedCharacterIndex = characters.findIndex(
              (ch) => ch.id === characterId
            );
            const updatedCharacters = [...characters];
            const oldCharacter = updatedCharacters[updatedCharacterIndex];
            updatedCharacters[updatedCharacterIndex] = new Character(
              oldCharacter.id,
              name,
              films,
              shortFilms,
              tvShows,
              videoGames,
              parkAttractions,
              allies,
              enemies,
              imageUrl,
              fetchedUserId
            );
            console.log({
              ...updatedCharacters[updatedCharacterIndex],
              id: null,
            });
            return this.http.put(
              `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters/${characterId}.json?auth=${token}`,
              { ...updatedCharacters[updatedCharacterIndex], id: null }
            );
          }),
          tap(() => {
            this._characters.next(updatedCharacters);
          })
        );
      })
    );
  }

  deleteCharacter(characterId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap((token) => {
        return this.http
          .delete(
            `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters/${characterId}.json?auth=${token}`
          )
          .pipe(
            switchMap(() => {
              return this.characters;
            }),
            take(1),
            tap((characters) => {
              this._characters.next(
                characters.filter((ch) => ch.id !== characterId)
              );
            })
          );
      })
    );
  }

  fetchUserCharacters() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap((userId) => {
        if (!userId) {
          throw new Error("User not found");
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http
          .get<{ [key: string]: CharacterData }>(
            `https://disneyland-33519-default-rtdb.europe-west1.firebasedatabase.app/characters.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
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
                      resData[key].imageUrl,
                      resData[key].userId
                    )
                  );
                }
              }

              return characters;
            }),
            tap((characters) => {
              this._userCharacters.next(characters);
            })
          );
      })
    );
  }
}
