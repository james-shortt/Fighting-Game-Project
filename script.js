    // PAGE SETUP START //

    const canvas = document.querySelector('canvas')     // Makes sure game screen is always present //
    const c = canvas.getContext('2d')                   // When prompted, file knows game is being outputted in 2D //
    
    canvas.width = 1024                                 // Setting the width and height of game screen // 
    canvas.height = 576
    
    c.fillRect(0, 0, canvas.width, canvas.height)       // Makes game screen visible against full desktop screen // 
    
        // PAGE SETUP END //
    
        // GRAVITY VELOCITY SETUP //
    
        const gravity = 0.5                             // This sets the gravity in tandem with the velocity with a max speed of 0.2 //
                                                        // Makes gravity work similar to real gravity where velocity will increase the longer the sprite is falling //
        // GRAVITY VELOCITY SETUP // 
    
        // SPRITE SETUP START //
    
    const background = new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: './assets/BG.png'
    })
    
    
    const playerOne = new Player({                      // Creating the first playable sprite called 'playerOne' and setting its starting values //
        position: {                                  // Sets the starting posistion of the sprite
         x: 150,
         y: 0
        },
        velocity: {                                  // Ensures the starting velocity (movement) of the sprite is zero //
         x: 0,
         y: 0
        },
        offset: {
         x: 0,
         y: 0
        },
        imageSrc: './assets/blueKnight/Idle.png',
        scale: 1.8,
        framesMax: 10,
        offset: {
            x: 215,                                         // Sprites usually have extra empty space around them to account for their other animations //
            y: 7.5                                          // Offsetting them makes the player sprites still stand where they should be // 
        },
        players: {
          idle: {
            imageSrc: './assets/blueKnight/Idle.png',
            framesMax: 10  
          },
          run: {
            imageSrc: './assets/blueKnight/Run.png',
            framesMax: 6
          },
          jump: {
            imageSrc: './assets/blueKnight/Jump.png',
            framesMax: 2
          },
          fall: {
            imageSrc: './assets/blueKnight/Fall.png',
            framesMax: 2
          },
          attack1: {
            imageSrc: './assets/blueKnight/Attack1.png',
            framesMax: 4
          },
          takeHit: {
            imageSrc: './assets/blueKnight/Hit.png',
            framesMax: 3
          },
          death: {
            imageSrc: './assets/blueKnight/Death.png',
            framesMax: 9
          }     
        },
        hitReg: {
          offset: {
            x: -70,
            y: 85
          },
          width: 78,
          height: 50
        }
    })
    
    const playerTwo = new Player({                      // Same code constant used for setting player values but instead for playerTwo //
        position: {                                 
         x: 800,
         y: 0
        },
        velocity: {                                  
         x: 0,
         y: 0
        },
        offset: {
            x: -50,
            y: 0
        },
        imageSrc: './assets/redKnight/Idle.png',
        scale: 1.8,
        framesMax: 11,
        offset: {
            x: 215,                                         // Sprites usually have extra empty space around them to account for their other animations //
            y: 0.6                                           // Offsetting them makes the player sprites still stand where they should be // 
        },
        players: {
          idle: {
            imageSrc: './assets/redKnight/Idle.png',
            framesMax: 11  
          },
          run: {
            imageSrc: './assets/redKnight/Run.png',
            framesMax: 8
          },
          jump: {
            imageSrc: './assets/redKnight/Jump.png',
            framesMax: 4
          },
          fall: {
            imageSrc: './assets/redKnight/Fall.png',
            framesMax: 4
          },
          attack1: {
            imageSrc: './assets/redKnight/Attack.png',
            framesMax: 6
          },
          takeHit: {
            imageSrc: './assets/redKnight/Hit.png',
            framesMax: 4
          },
          death: {
            imageSrc: './assets/redKnight/Death.png',
            framesMax: 9
          }         
        },
        hitReg: {
          offset: {
            x: -195,
            y: 85
          },
          width: 80,
          height: 50
        },
    })
    
    console.log(playerOne)                                 // Various console logs may be found throughout code - they are simply a method to ensure portions of code are working, by running the code and then checking the console for the selected code chunk //
    
        // SPRITE SETUP END //
    
        // ANIMATION SETUP START //
    
        const keys = {                                    // Adds a constant for key presses that allows specific rulings to be applied to key presses //
            a: {                                          // for more fluid and smooth movement of sprites. Further coding of movement properties is found //
                pressed: false                            // in the Animation section // 
            },
            d: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            }
        }
    
    decreaseTime()
    
    
    function animate() {
      window.requestAnimationFrame(animate)
      c.fillStyle = 'black'
      c.fillRect(0, 0, canvas.width, canvas.height)
      background.update()
    
      if (playerOne.velocity.x === 0) {
        playerOne.switchPlayer('idle')
      } else {
        playerOne.switchPlayer('run')
      }
    
      if (playerOne.velocity.y < 0) {
        playerOne.switchPlayer('jump')
      } else if (playerOne.velocity.y > 0) {
        playerOne.switchPlayer('fall')
      }
    
      if (playerOne.attacking) {
        playerOne.switchPlayer('attack1')
      }
    
      playerOne.update();
      playerTwo.update();                                  // These update functions both draw the sprites and also set their velocities to update each time the animation loop ticks over //
        
        
        if (keys.a.pressed && playerOne.lastKey === 'a') {         // playerOne movement animation //
          playerOne.velocity.x = -4
        playerOne.switchPlayer('run')
        } else if (keys.d.pressed && playerOne.lastKey === 'd') {  // Determines the direction in which the sprite will move once the key is pressed as well as the sprites movement velocity // 
          playerOne.velocity.x = 4
        playerOne.switchPlayer('run') 
        } else {
          playerOne.switchPlayer('idle')
        }

    
        if (keys.ArrowLeft.pressed && playerTwo.lastKey === 'ArrowLeft') {         // playerTwo movement animation
          playerTwo.velocity.x = -4
          playerTwo.switchPlayer('run')
        } else if (keys.ArrowRight.pressed && playerTwo.lastKey === 'ArrowRight') {  // Same as above but for playerTwo 
          playerTwo.velocity.x = 4
          playerTwo.switchPlayer('run')
        } else {
          playerTwo.switchPlayer('idle')
        }

        if (playerTwo.velocity.y < 0) {
          playerTwo.switchPlayer('jump')
        } else if (playerTwo.velocity.y > 0) {
          playerTwo.switchPlayer('fall')
        }
    
            
        if (
            boxCollision({
               box1: playerOne,
               box2: playerTwo 
            }) &&
            playerOne.hitAttack &&
            playerOne.framesCurrent === 3                                                              // For when the sprites are in the air, to make sure if //
            ) {                                                                             // one is above the other they are not still colliding. //
            playerTwo.takeHit()  
            playerOne.hitAttack = false                                                     // Returns players hit to false after they do an attack //

            document.querySelector('#playerTwoHealth').style.width = playerTwo.health + '%' // % makes sure the numbers are added/subtracted from total percentage //
    
            console.log ('playerOne hit')               // Makes sure they only register one hit per attack //
          }

        if (playerOne.hitAttack && playerOne.framesCurrent === 3) {
          playerOne.hitAttack = false
        }
    
        if (
            boxCollision({
               box1: playerTwo,
               box2: playerOne 
            }) &&
            playerTwo.hitAttack &&
            playerTwo.framesCurrent === 2                          
            ) {   
            playerOne.takeHit()                                          
            playerTwo.hitAttack = false

            document.querySelector('#playerOneHealth').style.width = playerOne.health + '%'
            
            console.log ('playerTwo hit')                           
        }

        if (playerTwo.hitAttack && playerTwo.framesCurrent === 2) {
          playerOne.hitAttack = false
        }
    
        if (playerTwo.health <= 0 || playerOne.health <= 0) {                         // If statement for if either players health reaches zero before the time runs out // 
            winner ({playerOne, playerTwo, timeId})
    
        }
    
    }
    
    animate()                                           // Closes the loop to make it repeat // 
    
        // ANIMATION SETUP END //
    
        // PLAYER MOVEMENT SETUP START //               // Setting up player movement involves creating event listeners which detect certain inputs (like presses or clicks) //
                                                        // and then performs an action based on the input instructions //
    
window.addEventListener('keydown', (event) => {     // Detects when player presses a key //
  if (!playerOne.dead) {  
  
      switch (event.key) {
         case 'd':
          keys.d.pressed = true
          playerOne.lastKey = 'd'
           playerOne.velocity.x = 4
           playerOne.switchPlayer('run')
          break
        case 'a':
          keys.a.pressed = true
           playerOne.lastKey = 'a'
           playerOne.velocity.x = -4
          playerOne.switchPlayer('run')
           break
        case 'w':
          playerOne.velocity.y = -12              // Sets jump movement // 
         break                                   // As we have set the gravity in the update portion of the Sprite Setup, the sprite //
        case 's':                                // will automatically fall back down //
         playerOne.attack()                      // playerOne attack using S // 
         break                                                     
      }
  } 
    if (!playerTwo.dead) {  
    
      switch (event.key) {
        case 'ArrowRight':
         keys.ArrowRight.pressed = true                    
         playerTwo.lastKey = 'ArrowRight'
         break
        case 'ArrowLeft':
          keys.ArrowLeft.pressed = true          // These cases are the exact same as the above but instead correspond to playerTwo's movement //                 
         playerTwo.lastKey = 'ArrowLeft'
         break
        case 'ArrowUp':
         playerTwo.velocity.y = -12               
         break 
        case 'ArrowDown':
         playerTwo.attack()               
         break
      } 
    }                                             
})   
    
    window.addEventListener('keyup', (event) => {
        switch (event.key) {
          case 'd':
            keys.d.pressed = false;
            if (!keys.a.pressed) {
              playerOne.velocity.x = 0;
              playerOne.image = playerOne.players.idle.image;
              playerOne.framesMax = playerOne.players.idle.framesMax;
            }
            break;
          case 'a':
            keys.a.pressed = false;
            if (!keys.d.pressed) {
              playerOne.velocity.x = 0;
              playerOne.image = playerOne.players.idle.image;
              playerOne.framesMax = playerOne.players.idle.framesMax;
            }
            break;
        }
        
        switch (event.key) {
          case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            if (!keys.ArrowLeft.pressed) {
              playerTwo.velocity.x = 0;
            }
            break;
          case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            if (!keys.ArrowRight.pressed) {
              playerTwo.velocity.x = 0;
            }
            break;
          case 'ArrowDown':
            playerTwo.hitattack = false;
            break;
          case 's':
            playerOne.hitattack = false;
            break;
        }
      });
    
        // PLAYER MOVEMENT SETUP END // 
    
