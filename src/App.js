import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';
import Playlist from './components/Playlist';
import Login from './components/Login';
import { searchSongs, authSpotifyLogin, getTokenFromUrlFragment, getUserId, createPlayList, addTracks } from './utils/spotify';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const authLogin = () => {
    const accessToken = getTokenFromUrlFragment();
  
    if (accessToken) {
      setToken('Bearer ' + accessToken);
      console.log('Successful authentication, token:', token);
      console.log('getting User Id...')
      getUserId('Bearer ' + accessToken).then(userId => {
        setUserId(userId);
        setLoggedIn(true);
        if(userId) {
          console.log('Successful, User ID:', userId);
        } else {
          console.error('Unable to get user.')
        }
      }).catch(error => {
        console.error(error);
      });
    } else {
      authSpotifyLogin();
    }
  };
  useEffect(() => {
    if (loggedIn && token) {
      console.log(`Login Successfull!\nToken: ${token}\nLoading site...`)
      }
    }, [loggedIn, token])
  const [tracksURI, setTracksURI] = useState([]);
  useEffect(() => {
    console.log(tracksURI);
    setPlayTracks([])
  }, [tracksURI]);
  const [playTracks, setPlayTracks] = useState([]);
  const addPlayTrack = (track) => {
    setPlayTracks((prev) => [...prev, track]);
  }
  const removePlayTrack = (track) => {
    setPlayTracks(prev => [...prev.filter(current => current!==track)])
  }
  const [searchTracks, setSearchTracks] = useState([]);
  const addSearchTrack = (track) => {
    setSearchTracks((prev) => [...prev, track]);
  }
  const removeSearchTrack = (track) => {
    setSearchTracks(prev => [...prev.filter(current => current!==track)])
  }
  const addToPlayList = (track) => {
    removeSearchTrack(track);
    addPlayTrack(track)
  }
  const removeFromPlayList = (track) => {
    addSearchTrack(track);
    removePlayTrack(track);
  }

  const makeSearch = (title) => {
    searchSongs(title, token).then(response => {
      const result = response;
      setSearchTracks([]);
      result.forEach(track => {
        addSearchTrack(track);
      })
    })
  }
  useEffect(() => {
    console.log(tracksURI);
    setPlayTracks([])
  }, [tracksURI]);
  
  const logURIs = () => {
    const updatedTracksURI = playTracks.map(track => track.uri);
    setTracksURI(updatedTracksURI);
  };

  const [PLName, setPLName] = useState('');
  const updatePLName = (name) => {
    setPLName(name);
  }

  const saveToSpotify = () => {
    logURIs();
    console.log(token);
    createPlayList(PLName, token, userId).then(response => {
      const playlistId = response;
      console.log(playlistId + 'created')
      addTracks(tracksURI, playlistId, token);
    });

  }
  if (loggedIn) {
    return(
      <div>
        <div className="SiteHead" id='SiteHead' >
          <h1>Hello there {userId}!</h1> {/* Heading */}
          <p>To create a playlist, begin by searching for a song in the searchbar!</p>
          <p>After that just add the songs, and when you are ready, save it to spotify to</p>
          <p>have it ready whenever you might need it!</p>
          <SearchBar onSearch={makeSearch} />
        </div>
        <div className="SiteAPI" id='SiteAPI' style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
          <SearchResult searchList={searchTracks} handleTrackButtonClick={addToPlayList} />
          <Playlist onNameUpdateClick={updatePLName} playlist={playTracks} handleTrackButtonClick={removeFromPlayList} onSave={saveToSpotify} />
        </div>
      </div>
    ); 
  } else {
    return (
      <Login showLoggedIn={token===null ? false : true} onLoginClick={authLogin} name={userId} />
    )
  }
}

export default App;
