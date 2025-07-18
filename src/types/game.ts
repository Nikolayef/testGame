export interface Game {
  gameID: string;
  gameName: string;
  gameTypeID: string;
  platform: string;
}

export interface GameApiResponse {
  result: Game[];
}

export interface GameFilters {
  search: string;
  gameTypeID: string;
}
