let currentGameId = '';

$(document).ready(async function() {
    let metadata = await getMetadata();
  
    // Set font options using metadata.
    metadata.fonts.forEach((font) => {
      $('#font').append($('<option>', {
        value: font.family, 
        text: font.family,
        id: font.family
      }));
      $(`option[value='${font.family}']`).addClass(font.rule);
      // $(`option[value='${font.family}']`).css("font-family", `'${font.family}', ${font.category}`);
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

    await updateView();
  });

  async function guessBtnClick() {
    let guess = $('#guessInput').val().toUpperCase();
    if (guess !== "") {
      let gameState = await makeGuess(currentGameId, guess);
      updateGuessView(gameState);
      $('#guessInput').val('');
    }
  }

  $('guessForm').submit(async function() {
    // event.preventDefault();
    let guess = $('#guessInput').val().toUpperCase();
    if (guess !== "") {
      let gameState = await makeGuess(currentGameId, guess);
      updateGuessView(gameState);
      $('#guessInput').val('');
    }
  });
  
  async function newGameBtnClick() {
    let game = await createGame();
    currentGameId = game.id;
    $('#menu').slideUp('slow');
    $('#guesser').slideDown('slow');
    updateGuessView(game);
  }

  function updateGuessView(game) {
    if ($('#imageContainer').hasClass('winImage')) {
      $('#imageContainer').removeClass('winImage');
    }
    else if ($('#imageContainer').hasClass('loseImage')) {
      $('#imageContainer').removeClass('loseImage');
    }
      let phrase = "";
      game.view.split("").forEach((letter) => {
        phrase = phrase.concat(`<p class="phrase ${game.font.rule}" style="background-color: ${game.colors.wordColor}; color: ${game.colors.foreColor}">${letter.toUpperCase()}</p>`);
      });
      $('#displayView').html(phrase);
  
      phrase = "";
      game.guesses.split("").forEach((letter) => {
        phrase = phrase.concat(`<p class="phrase ${game.font.rule}" style="background-color: ${game.colors.guessColor}; color: ${game.colors.foreColor}">${letter.toUpperCase()}</p>`);
      });
      $('#displayGuesses').html(phrase);
      $('#guessesRemaining').text(`${game.remaining} guesses remaining.`);
  
    if (game.status === 'victory') { 
      $('#guessesRemaining').css('visibility', 'hidden');
      $('#guessInput').css('visibility', 'hidden');
      $('#guessBtn').css('visibility', 'hidden');
      $('#imageContainer').addClass('winImage');
    }
    else if (game.status === 'loss') {
      $('#guessesRemaining').css('visibility', 'hidden');
      $('#guessInput').css('visibility', 'hidden');
      $('#guessBtn').css('visibility', 'hidden');
      $('#imageContainer').addClass('loseImage');
    }
  }

  function hideGuessUI() {
    $('#guessesRemaining').css('visibility', 'hidden');
    $('#guessInput').css('visibility', 'hidden');
    $('#guessBtn').css('visibility', 'hidden');
  }

  function showGuessUI() {
    $('#guessesRemaining').css('visibility', 'visible');
    $('#guessInput').css('visibility', 'visible');
    $('#guessBtn').css('visibility', 'visible');
  }
  
  function closeGuesser() {
    let x = 0;
    $('#guesser').slideUp('fast');
    $('#menu').slideDown('fast');
    showGuessUI();
    updateView();
  };

  async function openGame(id) {
    let game = await getGame(id);
    currentGameId = id;
    $('#menu').slideUp('slow');
    $('#guesser').slideDown('slow');
    updateGuessView(game);
  }

  async function updateView() {
    // Populate game history.
    let historyHTML = "";
    let allGames = await getAllGames();
    if (!allGames.msg) {
      allGames.forEach((game) => {
        let html = historicalGameHTML(game);
        historyHTML = historyHTML.concat(html);
      });
    }
    $('#history').html(historyHTML);
  }

  function historicalGameHTML(game) {
    const level = game.level.name;
    const remaining = game.remaining;
    const answer = game.target;
    const status = game.status;
    let phrase = "";
    game.view.split("").forEach((letter) => {
      phrase = phrase.concat(`<p class="phrase ${game.font.rule}" style="background-color: ${game.colors.wordColor}; color: ${game.colors.foreColor}">${letter.toUpperCase()}</p>`);
    });

    return `<div class="row my-3" onclick="openGame(${game.id});">
    <div class="col-1">
        ${level}
    </div>
    <div class="col-6 d-inline-flex">
        ${phrase}
    </div>
    <div class="col-2">
        ${remaining}
    </div>
    <div class="col-2" ${status === "unfinished" ? "style=\"visibility: hidden;\"" : ""}>
        ${answer}
    </div>
    <div class="col-1">
        ${status}
    </div>
    </div>\n`;
  }
  
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
    let games = await fetch(`/api/v1/${sessionID}/games`)
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
      return games;
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
    const colorObj = {
      guessColor: guessColor,
      foreColor: foreColor,
      wordColor: wordColor
    };
  
    let game = await fetch (`/api/v1/${sessionID}/games?level=${level}`, {
      method: 'POST',
      headers: {
        'X-font' : font, 
        'Content-Type' : 'application/json'
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
      return game;
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