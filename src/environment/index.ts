export const Environment = {
    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://api.themoviedb.org/3',
    API_KEY: import.meta.env.VITE_API_KEY || '',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500/',
    WATCH_REGION: import.meta.env.VITE_WATCH_REGION || 'US',
};
