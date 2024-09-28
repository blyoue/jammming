import React, { useState, useEffect } from 'react';
import { getSongs} from './token';
import { Song } from './types';



interface searchBarProps {
    onSearch: (results: Song[]) => void;
    searchTerm: string;
}


function SearchBar({ onSearch, searchTerm }: searchBarProps) {
    const [term, setTerm] = useState(searchTerm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTerm(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!term || term.length <= 0) {
            return;
        }
        const results = await getSongs(term);
        onSearch(results);
    };

    useEffect(() => {
        setTerm(searchTerm);
    }, [searchTerm]);


    return (
        <div className='w-full h-96 mb-24'>
            <div className='w-full h-14 bg-blue-900/80 flex justify-center items-center'>
                <h1 className='text-stone-50 text-3xl font-bold w-auto m-0 font-head'>Ja<span className='text-blue-400'>mmm</span>ing</h1>
            </div>
            <div className='w-full flex flex-col justify-center items-center mt-32'>
                <form onSubmit={handleSubmit} id='form'>
                    <input 
                        type='text' 
                        className='w-60 h-10 my-6 rounded placeholder:text-center text-black text-center' 
                        placeholder='Enter A Song Title'
                        onChange={handleChange}
                        value={term}
                        id='searchbox'
                    />
                    <br/>
                    <input type='submit' className='bg-blue-900/80 text-stone-50 rounded-3xl w-28 h-10 text-center hover:bg-blue-700/80 transition-all hover:shadow-xl' value='search' id='button'/>
                </form>                
            </div>
        </div>  
    );
}

export default SearchBar;