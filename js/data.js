// import {beginRequest, endRequest, showError} from './notifications.js';
import API from './api.js';

const endpoints = {
    MOVIES: 'data/movies',
    MOVIE_BY_ID: 'data/movies/'
};

const api = new API(
    '8E7E7E83-5F56-7CFA-FFAD-24ADD6139500',
    '8C5E996E-D3CD-4463-B7C7-33E2421F0E97'
);

export const login = api.login.bind(api);
export const register = api.register.bind(api);
export const logout = api.logout.bind(api);

// get all movies
export async function getAll() {
    return api.get(endpoints.MOVIES);
}
// export async function getAll() {
//     if (!search) {
//         return api.get(endpoints.MOVIES);
//     } else {
//         return api.get(endpoints.MOVIES + `?where=${escape(`title LIKE '%${search}%'`)}`);
//     }
    
// }

// create movie
export async function createMovie(movie) {
    return api.post(endpoints.MOVIES, movie);
}

// get movie by ID
export async function getMovieById(id) {
    return api.get(endpoints.MOVIE_BY_ID + id);
}

// edit movie (id)
export async function editMovie(id, movie){
    return api.put(endpoints.MOVIE_BY_ID + id, movie);
}

// delete movie (id)
export async function deleteMovie(id) {
    return api.delete(endpoints.MOVIE_BY_ID + id);
}

// like (id)
export async function likeMovie(id) {
    // retrieve original object
    const movie = await getMovieById(id);

    // modify object + place update/edit request
    return editMovie(id, { likes: movie.likes + 1 });
}

export function checkResult(result) {
    if (result.hasOwnProperty('errorData')) {
        const error = new Error();
        Object.assign(error, result);
        throw error;
    }
}