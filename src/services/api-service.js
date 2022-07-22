const KEY = '3ccf9d8b-c469-40b7-8786-43ea7f76b868';
const BASE_URL = 'https://api.thedogapi.com/v1/';

export const getAllBreeds = async () => {
    const res = await fetch(`${BASE_URL}breeds?page=1limit=200&api_key=${KEY}`);
    const data = await res.json();
    return data;
};

export const getBreedForVoting = async () => {
    const res = await fetch(`${BASE_URL}images/search`);
    const data = await res.json();
    return data;
};
export const getFilteredGallery = async (limit, type) => {
    const res = await fetch(
        `${BASE_URL}images/search?format=all&limit=${limit}&mime_types=${type}`
    );
    const data = await res.json();
    return data;
};
