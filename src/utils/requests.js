/* eslint-disable import/prefer-default-export */
export const TheMovieDBBaseUri = 'https://api.themoviedb.org/3';

export const themoviedbAPIKey = process.env.REACT_APP_THE_MOVIEDB_API_KEY;

export const infosDir = [
  { endpoint: 'videos', key: 'videos' },
  { endpoint: 'recommendations', key: 'recommendations' },
  { endpoint: 'watch/providers', key: 'providers' },
  { endpoint: 'credits', key: 'credits' },
  { endpoint: 'reviews', key: 'reviews' }
];

export const TVSetArray = ['popular', 'on_the_air', 'top_rated'];
export const MovieSetArray = ['now_playing', 'top_rated', 'upcoming'];
