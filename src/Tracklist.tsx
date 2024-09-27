import React from 'react';
import Track from './Track';
import { Song } from './types';

interface tracklistProps {
    list: Song[]
    isRemoval: boolean;
    onAdd?: (id: string) => void;
    onRemove?: (id: string) => void;
}

function Tracklist(props: tracklistProps) {
    if (!Array.isArray(props.list)) {
        return null;
    }
    return (
        <div className='w-full'>
            {props.list.map((song: Song, index: number) => (
                <Track 
                    key={index}
                    uri={song.uri} 
                    album={song.album}
                    title={song.title}
                    artists={song.artist}
                    isRemoval={props.isRemoval}
                    onAdd={props.onAdd}
                    onRemove={props.onRemove}
                />
            ))}
        </div>  
    );
}

export default Tracklist;