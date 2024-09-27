import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import React, { useState } from 'react';
import { addPlaylist } from './token';

interface Song {
  title: string;
  artist: string[];
  uri: string;
  album: string;
}

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [results, setResults] = useState<Song[]>([]);

  const handleAddTracks = (IdToAdd: string) => {
    const songToAdd = results.find((song: Song) => song.uri === IdToAdd);
    if (songToAdd && !playlist.includes(songToAdd)) {
      setPlaylist(prev => [...prev, songToAdd]);
    }
  }

  const handleRemove = (idToRemove: string) => {
    setPlaylist(prev => prev.filter((song) => song.uri !== idToRemove));
  };

  const handleSearch = (newresults: Song[]) => {
    setResults(newresults);
  };

  const handleAddPlaylist = async (playlistName: string, tracks: Song[]) => {
    const response = await addPlaylist(playlistName, tracks);
    if ('snapshot_id' in response) {
      alert('Playlist Saved!')
    }
    setPlaylist([]);
    setResults([]);
    setSearchTerm("");
  }

  return (
    <div className="App bg-blue-200 background overflow-y-auto">
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />
      <div className='flex justify-around mb-32 mx-32 items-start'>
        <SearchResults onAdd={handleAddTracks} results={results} />
        <Playlist onRemove={handleRemove} playlist={playlist} onAddPlaylist={handleAddPlaylist} />
      </div>
    </div>
  );
}

export default App;
