function boxCollision ({box1, box2}) {                                      // hitReg collision checks (checking if there has been a collision between players to determine a hit or not) //
    return (
        box1.hitReg.position.x + box1.hitReg.width >= box2.position.x       // Similar code to the below hitReg but instead works as //
        && box1.hitReg.position.x <= box2.position.x + box2.width &&        // function that checks for collision between two game sprites or //
        box1.hitReg.position.y + box1.hitReg.height >= box2.position.y      // collision boxes based on their positions and dimensions. //  
        && box1.hitReg.position.y <= box2.position.y + box2.height 
    )
}

function winner ({playerOne, playerTwo, timeId}) {
    clearTimeout (timeId)
    document.querySelector('#displayResult').style.display = 'flex'
    if (playerOne.health === playerTwo.health){
        document.querySelector('#displayResult').innerHTML = 'Tie'
     }  else if (playerOne.health > playerTwo.health) {
        document.querySelector('#displayResult').innerHTML = 'Player 1 Wins'
     }  else if (playerTwo.health > playerOne.health) {
        document.querySelector('#displayResult').innerHTML = 'Player 2 Wins'
     }
}

let time = 60
let timeId
function decreaseTime() {
    if (time > 0) {
        timeId = setTimeout(decreaseTime, 1000)
        time--
        document.querySelector('#time').innerHTML = time
    }

    if (time === 0) {
        winner ({playerOne, playerTwo, timeId})
    }
}
