import { Song, SpotifyTrack } from "./types";

const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;

const redirectUri = encodeURIComponent('https://jammming-roan.vercel.app/');
// const redirectUri = 'http://localhost:3000/';
const scopes = encodeURIComponent('playlist-modify-public playlist-modify-private user-read-email user-read-private');
let token: string;
const getToken = async () => {
    if (token) {
        console.log("Token already available:", token);
        return token;
    } 
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
        token = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);
        window.setTimeout(() => token = '', expiresIn * 1000);
        window.history.pushState('Access Token', '', decodeURIComponent(redirectUri)); // This clears the parameters, allowing us to grab a new access token when it expires.
        console.log("Token obtained:", token);
        return token;
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=${scopes}&redirect_uri=${redirectUri}`;
        window.location.assign(accessUrl);
    }
}


const getSongs = async (searchTerm: string) => {
    const apiUrl = 'https://api.spotify.com/v1/search';
    const term = searchTerm.replace(' ', '+');
    const query = `?q=${term}&type=track&limit=10`
    const urlToFetch = apiUrl+query
    const token = await getToken();
    console.log("fetching with token: \n" + token);
    const options = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    try {
        console.log(`////fetching ${urlToFetch} with query '${searchTerm}'`);
        const response = await fetch(urlToFetch, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const results = jsonResponse.tracks.items.map((item: SpotifyTrack) =>
                ({
                    title: item.name,
                    artist: item.artists.map(artist => artist.name),
                    uri: item.uri,
                    album: item.album.name,
                }) 
            );
            console.log(results);
            return results
        } else {
            throw new Error('Unable to fetch the data from the server');
        }
    } catch (error) {console.log(error);}
}

const getUserId = async () => {
    const userEndpoint = 'https://api.spotify.com/v1/me';
    const token = await getToken();
    const options = {
        method: "GET",  
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    console.log("getting userid with token:" + token)
    try {
        const response = await fetch(userEndpoint, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("user_id: "+jsonResponse.id);
            return jsonResponse.id;
        }
    } catch (error) {console.log(error);}
};
const createPlaylist = async (name: string) => {
    const userId = await getUserId();
    const addPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const token = await getToken();
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: 'New playlist description',
            public: false
        })
    };
    try {
        console.log("adding playlist...");
        const response = await fetch(addPlaylistEndpoint, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("playlist id: "+jsonResponse.id);
            return jsonResponse.id;
        } else {
            throw new Error('Unable to create playlist');
        }
    } catch (error) {console.log(error);}
}

const addPlaylist = async (playlistName: string, tracks: Song[]) => {
    const playlistId = await createPlaylist(playlistName);
    const endPoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const token = await getToken();
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: tracks.map(track => track.uri)
        })
    };
    try {
        const response = await fetch(endPoint, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log('successfully added the playlist. playlist snapshot: ' + jsonResponse);
            return jsonResponse;
        }
    } catch (error) {console.log(error);}

};
export { createPlaylist, getSongs, getUserId, addPlaylist  };