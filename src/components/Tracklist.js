import React from 'react';
import Track from './Track';
import './Tracklist.css';

// Tracklist component
const Tracklist = (props) => {
    let tracks = props.tracks; // Array of track objects received as props
    let tracklist = tracks.map((track) => (
        <Track
            key={track.id} // Add a unique key prop for each track
            name={track.name} // Pass the track name as a prop to Track component
            artist={track.artists[0].name} // Pass the artist name as a prop to Track component
            album={track.album.name} // Pass the album name as a prop to Track component
            action={props.mode==='add' ? 'add' : 'remove'}
            handleButtonClick={props.handleTrackButtonClick}
            track={track}
        />
    ));
    const saveButton = props.mode==='remove' ? <button onClick={props.onSave}>Save to spotify!</button> : null;
    return (
        <div className='TrackList'>
            {tracklist} {/* Render the list of Track components */}
            {saveButton}
        </div>
    );
};

export default Tracklist;