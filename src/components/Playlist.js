import React, {useState} from 'react';
import Tracklist from './Tracklist';
import './Playlist.css'

const Playlist = (props) => {
    const [name, setName] = useState('My Playlist');
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const [edit, setEdit] = useState(false);
    const handleEditButtonClick = () => {
        if (edit===false) {
            setEdit(true);
        } else {
            setEdit(false);
            {props.onNameUpdateClick(name)};
        }
    }

    const editButton =  <button onClick={handleEditButtonClick} className='PlaylistButt'>{edit === false ? 'edit' : 'done'}</button> 
    const nameComponent = edit===false ? <h1>{name}</h1> : <input id='nameInput' placeholder={name} onChange={handleNameChange}></input>

    return (
    <div className='Playlist'>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            {nameComponent}{editButton}
        </div>
        <Tracklist tracks={props.playlist} mode='remove' handleTrackButtonClick={props.handleTrackButtonClick} onSave={props.onSave} /> {/* Render the Tracklist component */}
    </div>
    )
};

export default Playlist;