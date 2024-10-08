import React from 'react';



interface trackProps {
    key: number;
    uri: string;
    album: string;
    title: string ;
    artists: string[];
    isRemoval: boolean;
    onAdd?: (id: string) => void;
    onRemove?: (id: string) => void;
}

function Track(props: trackProps) {
    return (
        <div className='w-full h-auto rounded-sm flex justify-between items-center py-3 border-b-2'>
            <div className='flex flex-col items-start'>
                <h2 className='font-bold text-md text-stone-50 text-left'>{props.title}</h2>
                <p className='text-stone-50/50 text-left'>{props.artists.join(', ')} | {props.album}</p>
            </div>
            <input 
                type="button"   
                className='text-2xl text-stone-50 hover:border hover:rounded'
                value={props.isRemoval? "-" : "+"}
                onClick={() => props.isRemoval? props.onRemove?.(props.uri) : props.onAdd?.(props.uri)}
            />
        </div>      
    );
}

export default Track;