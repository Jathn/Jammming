import React, {useState} from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    // const [criteria, setCriteria] = useState('title');
    const [term, setTerm] = useState('');
    const handleTermChange = (event) => {
        setTerm(event.target.value)
    }
    const makeSearch = () => {
        console.log(`Searching spotify for song: ${term}`)
        props.onSearch(term);
        setTerm('');
    } 
    return(
        <div className='SearchBar'>
            <input onChange={handleTermChange} value={term}></input>
            <button onClick={makeSearch}>search</button>
        </div>
    );
};

export default SearchBar;