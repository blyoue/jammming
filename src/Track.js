import React from 'react';


function Track(props) {
    return (
        <div className='w-full h-auto rounded-sm flex justify-between items-center py-3 border-b-2'>
            <div className='flex flex-col items-start'>
                <h2 className='font-bold text-md text-left'>{props.title}</h2>
                <p className='text-stone-50/50 text-left'>{props.artists.join(', ')} | {props.album}</p>
            </div>
            <input 
                type="button" 
                className='text-2xl hover:border hover:rounded'
                value={props.isRemoval? "-" : "+"}
                onClick={props.isRemoval? () => props.onRemove(props.uri) : () => props.onAdd(props.uri)}
            />
        </div>      
    );
}

export default Track;