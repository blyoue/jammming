import './App.css';
import Playlist from './Playlist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import React, { useState } from 'react';
import { addPlaylist } from './token';

function App() {
  const [searchTerm, setSearchTerm] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [results, setResults] = useState([]);

  const handleAddTracks = (IdToAdd) => {
    const songToAdd = results.find(song => song.uri === IdToAdd);
    if (!playlist.includes(songToAdd)) {
      setPlaylist(prev => [...prev, songToAdd]);
    }
  }

  const handleRemove = (idToRemove) => {
    setPlaylist(prev => prev.filter((song) => song.uri !== idToRemove));
  };

  const handleSearch = (newresults) => {
    setResults(newresults);
  };

  const handleAddPlaylist = async (playlistName, tracks) => {
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
      <div className='flex justify-around mb-32 items-start'>
        <SearchResults onAdd={handleAddTracks} results={results} />
        <Playlist onRemove={handleRemove} playlist={playlist} onAddPlaylist={handleAddPlaylist} />
      </div>
    </div>
  );
}

export default App;
