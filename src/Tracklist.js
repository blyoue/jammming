import React from 'react';
import Track from './Track';


function Tracklist(props) {
    if (!Array.isArray(props.list)) {
        return null;
    }
    return (
        <div className='w-full'>
            {props.list.map((song, index) => (
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