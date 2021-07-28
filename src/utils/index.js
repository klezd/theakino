export const ImageBaseUri = 'http://image.tmdb.org/t/p';
export const PeopleTMDBUri = 'https://www.themoviedb.org/person/';


export const getYoutubeVideoEmbed = (key) => `https://www.youtube.com/embed/${key}`

export const addDefaultSrc = (e) => {
  e.target.src = `${process.env.PUBLIC_URL}/broken-avatar.png`;
};
