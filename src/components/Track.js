import React from 'react';
import './Track.css';

// Track component
const Track = (props) => {
    const handleClick = () => {
        props.handleButtonClick(props.track);
    }
    return (
        <div id={props.key} className='Track' style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <ul className='content'>
                <li>{props.name}</li> {/* Render the track name */}
                <li>{props.artist.length > 10 ? props.artist.slice(0, 10) + '...' : props.artist} | {props.album.length > 10 ? props.album.slice(0, 10) + '...' : props.album} </li> {/* Render the artist & album name */}
            </ul>
            <button onClick={handleClick}>{props.action==='add' ? '+': '-'}</button>
        </div>
    );
};

export default Track;
