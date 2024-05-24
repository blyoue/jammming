import React, { useState } from 'react';
import Tracklist from './Tracklist';
function Playlist({ playlist, onRemove, onAddPlaylist }) {
    const [playlistName, setPlaylistName] = useState("");
    const handleChange = (e) => {
        setPlaylistName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!playlistName || playlist.length === 0) {
            return;
        }
        onAddPlaylist(playlistName, playlist);
        setPlaylistName("");
    };

    return (
        <form className='w-1/3 bg-blue-900/60 py-10 px-8 rounded-md flex flex-col items-center min-h-72' id='playlist' onSubmit={handleSubmit}>
            <input 
                type='text'
                className='w-full bg-transparent border-b-2 font-bold focus:outline-none mb-4 placeholder:text-center sm:text-sm md:text-md lg:text-lg placeholder:text-stone-50/40 text-center' 
                placeholder='Enter A Playlist Name'
                value={playlistName}
                id='playlistname'
                onChange={handleChange} />
                <Tracklist 
                    list={playlist}
                    onRemove={onRemove}
                    isRemoval={true}
                />
            <div className='flex-grow'></div>
            <input type='submit' value="Save To Spotify" className='rounded-3xl bg-blue-900/80 hover:shadow-lg hover:border hover:border-white min-w-32 h-10 w-1/2 mt-10' id='submit'/>
        </form>  
    );
}

export default Playlist;