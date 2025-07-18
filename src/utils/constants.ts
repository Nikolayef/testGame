

export const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? '/api' // Для Vercel
    : 'https://thingproxy.freeboard.io/fetch/https://belparyaj.com';

export const GAME_IMAGE_BASE_URL =
  'https://bsw-dk1.pragmaticplay.net/game_pic/square/200';
export const PARTNER_NAME = 'belparyaj';
export const GAMES_PER_PAGE = 40;
