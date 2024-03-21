let currentGameId = '';

/**
 * Initialize all webelements and set values with metadata. 
 */
$(document).ready(async function() {
    // let metadata = await getMetadata();
  
    // // Set font options using metadata.
    // metadata.fonts.forEach((font) => {
    //   $('#font').append($('<option>', {
    //     value: font.rule,
    //     id: font.family,
    //     text: font.family
    //   }));
    //   $('head').append(`<link href="${font.url}" rel="stylesheet">`);
    // });
  
    // // Set level options using metadata.
    // metadata.levels.forEach((level) => {
    //   $('#level').append($('<option>', {
    //     value: level.name, 
    //     text: level.name
    //   }));
    // });
  
    // // Set default values using metadata.
    // $('#word').val(metadata.defaults.colors.wordColor);
    // $('#guess').val(metadata.defaults.colors.guessColor);
    // $('#fore').val(metadata.defaults.colors.foreColor);
    // $('#font').val(metadata.defaults.font.family);
    // $('#level').val(metadata.defaults.level.name);
    
    // // Add an event listner to change font of select element, based on value.
    // document.querySelector('#font').addEventListener("change", function() {
    //   console.log(this.value);
    //   if (this.value == "noto-serif-regular") {
    //     this.className = 'form-select-sm noto-serif-regular';
    //   }
    //   else if (this.value == "roboto-regular") {
    //     this.className = 'form-select-sm roboto-regular';
    //   }
    //   else if (this.value == "protest-riot-regular") {
    //      this.className = 'form-select-sm protest-riot-regular';
    //   }
    // });

    /**
   * Add event listner to the new game button so a 
   * game is created when clicked.
   */
  // document.querySelector("#newGameBtn").addEventListener("click", async function() {
  //   let game = await createGame();
  //   currentGameId = game.id;
  //   $('#menu').slideUp('slow');
  //   $('#guesser').slideDown('slow');
  //   updateGuessView(game);
  // });

  // /**
  //  * Add event listner to guess button so a guess is added to a 
  //  * game object when submitted.
  //  */
  // document.querySelector('#guessBtn').addEventListener("click", async function() {
  //   let guess = $('#guessInput').val().toUpperCase();
  //   if (guess !== "") {
  //     let gameState = await makeGuess(currentGameId, guess);
  //     if (gameState.msg) {
  //       alert(gameState.msg);
  //     }
  //     else {
  //       updateGuessView(gameState);
  //     }
  //     $('#guessInput').val('');
  //   }
  // });

  //   /**
  //  * Add an event listner to the close button so the guessing view
  //  * closes when clicked.
  //  */
  //   document.querySelector("#closeBtn").addEventListener("click", function() {
  //     $('#guesser').slideUp('fast');
  //     $('#menu').slideDown('fast');
  //     showGuessUI();
  //     updateView();
  //   });

  //   // Initialize the main view.
  //   await updateView();
  // });
  
  // /**
  //  * Creates a colored block-word.
  //  * @param {string} word The work to make into a block-word.
  //  * @param {string} fontRule The CSS rule to apply to the word.
  //  * @param {string} wordColor A string representation of the hex color to use on the word.
  //  * @param {string} blockColor A string representation of the hex color to use on the color block.
  //  * @returns The HTML containing a colored block-word.
  //  */
  // function generateBlockWord(word, fontRule, wordColor, blockColor) {
  //   let phrase = "";
  //   word.split("").forEach((letter) => {
  //     phrase = phrase.concat(`<p class="phrase ${fontRule}" style="background-color: ${wordColor}; color: ${blockColor}">${letter.toUpperCase()}</p>`);
  //   });
  //   return phrase;
  // }

  // /**
  //  * Adds a guess to a Game object.
  //  * @param {Game} game A game object to add a guess to.
  //  */
  // function updateGuessView(game) {
  //   // Remove any images that are being displayed.
  //   if ($('#imageContainer').hasClass('winImage')) {
  //     $('#imageContainer').removeClass('winImage');
  //   }
  //   else if ($('#imageContainer').hasClass('loseImage')) {
  //     $('#imageContainer').removeClass('loseImage');
  //   }

  //   // Block-up the game's view to see progress.
  //   let phrase = generateBlockWord(game.view, game.font, game.colors.wordColor, game.colors.foreColor);
  //   $('#displayView').html(phrase);

  //   // Block-up the game's guesses to see progress.
  //   phrase = generateBlockWord(game.guesses, game.font, game.colors.guessColor, game.colors.foreColor);
  //   $('#displayGuesses').html(phrase);
  //   $('#guessesRemaining').text(`${game.remaining} guesses remaining.`);
  
  //   // If the game has ended, show the appropriate image.
  //   if (game.status === 'victory') { 
  //     hideGuessUI();
  //     $('#imageContainer').addClass('winImage');
  //   }
  //   else if (game.status === 'loss') {
  //     hideGuessUI();
  //     $('#imageContainer').addClass('loseImage');
  //   }
  // }

  // /**
  //  * Hide the guessing view UI elements.
  //  */
  // function hideGuessUI() {
  //   $('#guessesRemaining').css('visibility', 'hidden');
  //   $('#guessInput').css('visibility', 'hidden');
  //   $('#guessBtn').css('visibility', 'hidden');
  // }

  // /**
  //  * Show the guessing view UI elements.
  //  */
  // function showGuessUI() {
  //   $('#guessesRemaining').css('visibility', 'visible');
  //   $('#guessInput').css('visibility', 'visible');
  //   $('#guessBtn').css('visibility', 'visible');
  // }

  // /**
  //  * Opens a specified game to the guessing view.
  //  * @param {string} id A game ID.
  //  */
  // async function openGame(id) {
  //   // Get the game obj.
  //   let game = await getGame(id);
  //   currentGameId = id;

  //   // Swap views and update the guess view.
  //   $('#menu').slideUp('slow');
  //   $('#guesser').slideDown('slow');
  //   updateGuessView(game);
  // }

  // /**
  //  * Updates the main view.
  //  */
  // async function updateView() {
  //   // Clear and populate the game history.
  //   let historyHTML = "";
  //   let allGames = await getAllGames();
  //   if (!allGames.msg) {
  //     // Get the HTML to display historical games.
  //     allGames.forEach((game) => {
  //       let html = historicalGameHTML(game);
  //       historyHTML = historyHTML.concat(html);
  //     });
  //   }
  //   // Display historical games.
  //   $('#history').html(historyHTML);
  // }

  // /**
  //  * Gets HTML for historical game data to display on the main page.
  //  * @param {Game} game A historical game obj.
  //  * @returns HTML that displays the historical game data.
  //  */
  // function historicalGameHTML(game) {
  //   // Get data to view and create the block-words.
  //   const level = game.level.name;
  //   const remaining = game.remaining;
  //   const answer = game.target;
  //   const status = game.status;
  //   let phrase = generateBlockWord(game.view, game.font, game.colors.wordColor, game.colors.foreColor);

  //   // Add all data to the HTML and return.
  //   return `<div class="row my-3" onclick="openGame(${game.id});">
  //   <div class="col-1">
  //       ${level}
  //   </div>
  //   <div class="col-6 d-inline-flex">
  //       ${phrase}
  //   </div>
  //   <div class="col-2">
  //       ${remaining}
  //   </div>
  //   <div class="col-2" ${status === "unfinished" ? "style=\"visibility: hidden;\"" : ""}>
  //       ${answer}
  //   </div>
  //   <div class="col-1">
  //       ${status}
  //   </div>
  //   </div>\n`;
  // }
  
  /**
   * Gets the sessionID of the current session.
   * @returns The sessionID of the current session.
   */
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
  
  /**
   * Gets the metadate for the web app.
   * @returns The metadate of the web app.
   */
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
  
  /**
   * Gets all the Game objects associated with the current sessionID.
   * @returns A collection of Game objects.
   */
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
  
  /**
   * Creates a Game object that will be associated with the current sessionID.
   * @returns A new Game object.
   */
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
  
    // Use a POST call to create the Game on the backend.
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
  
  /**
   * Gets a Game object that is associated with the specified gameID.
   * @param {string} gameID The gameID of the desired game.
   * @returns A Game object
   */
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
  
  /**
   * Adds a guess to the specified game and gets the updated game instance.
   * @param {string} gameID The gameID to add a guess to.
   * @param {string} letter The letter that was guessed.
   * @returns A Game object of the updated game.
   */
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