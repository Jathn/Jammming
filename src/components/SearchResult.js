import React from 'react';
import Tracklist from './Tracklist';
import './SearchResult.css';

const SearchResult = (props) => {
  return (
    <div>
        <h1>Results:</h1>
        <Tracklist tracks={props.searchList} mode='add' handleTrackButtonClick={props.handleTrackButtonClick} /> {/* Render the Tracklist component */}
    </div>
  )
};

export default SearchResult;
