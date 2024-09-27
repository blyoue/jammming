import React, { useState } from 'react';
import Tracklist from './Tracklist';
import { Song } from './types';

interface PlaylistProps {
    playlist: Song[];
    onRemove: (id: string) => void;
    onAddPlaylist: (name: string, tracks: Song[]) => void;
  }


function Playlist({ playlist, onRemove, onAddPlaylist }: PlaylistProps) {
    const [playlistName, setPlaylistName] = useState<string>("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            <input type='submit' value="Save To Spotify" className='rounded-3xl bg-blue-900/80 hover:shadow-lg hover:bg-blue-700/80 min-w-32 h-10 w-1/2 mt-10 transition-all   ' id='submit'/>
        </form>  
    );
}

export default Playlist;