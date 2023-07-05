const clientId = '2ff10ad3446540d19075176c6a86402b';
const clientSecret = 'c91c413869104bd8b37e8e693d73c7f6';
const redirectUri = 'http://localhost:3000';

const spotifyLogin = () => {
  const authOptions = {
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  return fetch(authOptions.url, authOptions)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    }).then(data => {
        console.log(data);
        const token = data.access_token;
        return token;
    })
    .catch(function(error) {
      console.error('Error: ' + error);
    });
};

// function generateRandomString(length) {
//   let result = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//   const charactersLength = characters.length;
//   let counter = 0;
//   while (counter < length) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     counter += 1;
//   }
//   return result;
// }

const redirectToAuthorization = () => {
  const scope = 'user-read-private user-read-email playlist-modify-private';

  var url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(clientId);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirectUri);
  url += '&show_dialog=true';
  
  window.location.href = url;
};

const getTokenFromUrlFragment = () => {
  const hash = window.location.hash.substring(1);
  const urlParams = new URLSearchParams(hash);
  const accessToken = urlParams.get('access_token');

  return accessToken;
};

const authSpotifyLogin = () => {
  return new Promise((resolve, reject) => {
    redirectToAuthorization();
    const accessToken = getTokenFromUrlFragment();

    if (accessToken) {
      // Token retrieved successfully, you can use it as needed
      // Perform further actions with the access token
      resolve(accessToken);
    } else {
      // No access token found, handle the error condition
      console.error('Access Token not found');
      reject('Access Token not found');
    }
  });
};

const getUserId = (token) => {
  const url = 'https://api.spotify.com/v1/me';

  const authOptions = {
    method: 'GET',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  };

  return fetch(url, authOptions)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    }).then(data => {
      const userId = data.id;
      return userId;
    }).catch(error => {
      console.error('Error: ' + error);
    });
};


/**
 * Creates a playlist and returns it's id.
 * @param {The name for the playlist} playlistName 
 * @param {Access token for active session} token 
 * @param {Current user's ID} userId 
 * @returns {A playlist ID}
 */
const createPlayList = (playlistName, token, userId) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'name': playlistName,
      'description': 'This playlist was created with Jathn jammming web API',
      'public': false,
    }),
  }
  return fetch(url, authOptions).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response)
    }
  }).then(data => {
    return data.id;
  }).catch(error => {
    console.log('Error: ' + error);
  })
}

const addTracks = (trackURIs, playlistId, token) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackURIs}`;
  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({
      'uris': ['string'],
      'position': 0
    })
  }

  return fetch(url, authOptions).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error: ' + response.status)
    }
  }).then(data => {
    if (data.snapshot_id) {
      console.log('Tracks added, ok')
    }
  }).catch(error => {
    console.error('Error: ' + error);
  });
};

const editPlaylist = (playlistName, playlistDescription, playlistID, token) => {
    const authOptions = {
        method: 'PUT',
        url: `https://api.spotify.com/v1/playlists/${playlistID}`,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        data: {
            'name': playlistName,
            'description': playlistDescription,
            'public': false
        }
    };
    return fetch(

    )
}

const searchSongs = (title, token) => {
    const url = `https://api.spotify.com/v1/search?q=${title}&type=track&limit=10`;
    const authOptions = {
        method: 'GET',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        }
    };

    return fetch(url, authOptions).then(response => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Error: ' + response.status)
        }
    }).then(data => {
        const result = data.tracks.items;
        return result;
    })
}

export { spotifyLogin, searchSongs, authSpotifyLogin, getTokenFromUrlFragment, getUserId, createPlayList, addTracks };