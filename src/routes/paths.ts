export const APP_BASE_PATH = '/movieinfo';

export const AppPaths = {
  home: `${APP_BASE_PATH}/home`,
  movieDetailsRoute: `${APP_BASE_PATH}/movie/:id`,
  searchRoute: `${APP_BASE_PATH}/search/:query/:page`,
  movieDetails: (id: number | string) => `${APP_BASE_PATH}/movie/${id}`,
  search: (query: string) => `${APP_BASE_PATH}/search/${encodeURIComponent(query)}/1`,
};
