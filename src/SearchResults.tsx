import React from 'react';
import Tracklist from './Tracklist';
import { Song } from './types';

interface SearchResultProps {
    results: Song[];
    onAdd: (name: string) => void;
}

function SearchResults({ results, onAdd }: SearchResultProps) {

    return (
        <div className='w-1/3 bg-blue-900/60 py-10 px-8 rounded-md min-h-72'>
            <h1 className='text-left font-bold text-xl text-white mb-4'>Results</h1>
            <Tracklist 
                list={results} 
                onAdd={onAdd} 
                isRemoval={false}
            />
        </div>  
    );
}

export default SearchResults;