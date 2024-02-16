import { Colors } from "./javascripts/classes";

$(document).ready(async function() {
  let sid = await getSID();
  let metadata = await getMetadata();

  // Set font options using metadata.
  metadata.fonts.forEach((font) => {
    $('#font').append($('<option>', {
      value: font.family, 
      text: font.family,
      id: font.family
    }));
    $(`option[value='${font.family}']`).css("font-family", `'${font.family}', ${font.category}`);
    $('head').append(`<link href="${font.url}" rel="stylesheet">`);
  });

  // Set level options using metadata.
  metadata.levels.forEach((level) => {
    $('#level').append($('<option>', {
      value: level.name, 
      text: level.name
    }));
  });

  // Set default values using metadata.
  $('#word').val(metadata.defaults.colors.wordColor);
  $('#guess').val(metadata.defaults.colors.guessColor);
  $('#fore').val(metadata.defaults.colors.foreColor);
  $('#font').val(metadata.defaults.font.family);
  $('#level').val(metadata.defaults.level.name);
});

async function getSID() {
  return fetch('/api/v1/sid')
    .then(response => {
      if (!response.ok) {
        console.log('Failed to get SID');
      }
      return response.json();
    })
    .then(data => {
      return data.sid;
    })
    .catch(error => {
      console.error('Error fetching /api/v1/sid: ', error);
    });
}

async function getMetadata() {
  return fetch('/api/v1/meta')
    .then(response => {
      if (!response.ok) {
        console.log('Failed to get Metadata!');
      }
      return response.json();
    })
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.error('Error fetching /api/v1/meta: ', error);
    });
}

async function getAllGames() {
  const sessionID = await getSID();
  return fetch(`/api/v1/${sessionID}/games`)
    .then(response => {
      if (!response.ok) {
        console.log(`Failed to get games for session ${sessionID}!`);
      }
      return response.json();
    })
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.error('Error fetching /api/v1/:sid/games: ', error);
    });
}

async function createGame() {
  // Get game config.
  const sessionID = await getSID();
  const level = document.getElementById('level').value;
  const font = document.getElementById('font').value;
  
  // Color data:
  const wordColor = document.getElementById('word').value;
  const guessColor = document.getElementById('guess').value;
  const foreColor = document.getElementById('fore').value;
  const colorObj = new Colors(guessColor, foreColor, wordColor);

  return fetch (`/api/v1/${sessionID}/games?level=${level}`, {
    method: 'POST',
    headers: {
      'X-font' : font
    },
    body: JSON.stringify(colorObj)
  })
    .then(response => {
      if (!response.ok) {
        console.log(`Failed to create a game for session '${sessionID}'.`);
      }
      return response.json();
    })
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.error(`Error fetching /api/v1/:sessionID/games: `, error);
    })
}

async function getGame(gameID) {
  const sessionID = await getSID();

  return fetch(`/api/v1/${sessionID}/games/${gameID}`)
    .then(response => {
      if (!response.ok) {
        console.log(`Failed to get game '${gameID}' for session '${sessionID}'.`);
      }
      return response.json();
    })
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.error('Error fetching /api/v1/:sessionID/games/:gameId: ', error);
    });
} 

async function makeGuess(gameID, letter) {
  const sessionID = await getSID();

  return fetch(`/api/v1/${sessionID}/games/${gameID}/guesses?guess=${letter}`, {
    method: 'POST'
  })
    .then(response => {
      if (!response.ok) {
        console.log(`Failed to make a guess in game '${gameID}' for '${sessionID}'.`);
      }
      return response.json();
    })
    .then(data => {
      return JSON.parse(data);
    })
    .catch(error => {
      console.error(`Error fetching /api/v1/sessionID/games/gameID: `, error);
    });
}