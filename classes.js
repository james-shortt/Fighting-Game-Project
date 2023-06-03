class Sprite {                                               
    constructor({position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }}) {             
        this.position = position                                     
        this.width = 50
        this.height = 150
        this.image = new Image ()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    draw() {
        c.drawImage (
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height, 
            this.position.x - this.offset.x, 
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) *  this.scale,
            this.image.height * this.scale
            
        )
    }
    
    moveFrames () {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {

            if (this.framesCurrent < this.framesMax - 1) {
            this.framesCurrent++
            } else {
            this.framesCurrent = 0
            }
        }
    }

    update() {  
        this.draw()
        this.moveFrames()
    }

}

class Player extends Sprite {                                                                                    // Creating game characters (also known as sprites) and their functions //
    constructor({
        position, 
        velocity, 
        color = 'green',  
        imageSrc, 
        scale = 1, 
        framesMax = 1,
        offset = { x: 0, y: 0 }, 
        players,
        hitReg = { offset:{}, width: undefined, height: undefined },
    }) {                                                                    // Ensures each different sprite can have a differing start position //
        super({
            position,                                                      // Enables positional placing of sprites //
            imageSrc,
            scale,
            framesMax,
            offset
        })
                                                                
        this.velocity = velocity                                                                         // Velocity is determining how gravity works for the sprites (making them fall when in the air etc) //
        this.width = 50
        this.height = 150
        this.lastKey                                                       // Putting lastKey with the Sprite setup allows specific instances of lastKey to be used for both players // 
        this.hitReg = {                                                    // hitReg is setting the area for where the sprites will 'attack' and whether it will register as a hit or not //
            position: {
                x: this.position.x,
                y: this.position.y
            },                                                            // Sets position of attack to always follow sprites movement //
            offset: hitReg.offset,
            width: hitReg.width,
            height: hitReg.height                              
        }
        this.color = color
        this.hitAttack
        this.health = 100                                                // Indicates health will always start at 100% //
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5 
        this.players = players
        this.dead

        for (const player in this.players) {
            this.players[player].image = new Image ()
            this.players[player].image.src = this.players[player].imageSrc
        }
    }                                                                  

    update() {
        this.draw()
        if (!this.dead)
        this.moveFrames()
        this.hitReg.position.x = this.position.x + this.hitReg.offset.x     // These positioning functions ensure the hit reg is on the correct side of the player they correspond to //
        this.hitReg.position.y = this.position.y + this.hitReg.offset.y

        //c.fillRect(
            //this.hitReg.position.x, 
            //this.hitReg.position.y, 
            //this.hitReg.width, 
            //this.hitReg.height
            //)

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y                                  // Adds sprites updated animation positions to the screen //
    
        if (this.position.y + this.height + this.velocity.y 
            >= canvas.height - 47) {           // Also part of gravity functions //  // This function keeps the sprites from falling off the screen (the - 47px makes them stop falling at the 'ground of the background')//
            this.velocity.y = 0                                                     // by setting their velocity to 0 once the sprite hits the bottom //
            this.position.y = 379
        }   else this.velocity.y += gravity
    }

    attack() {                                    // Attack is setting the rules for how a player attacks. When they attack, the attack will commence (true) //
        this.switchPlayer('attack1')
        this.hitAttack = true                                               
    }

    takeHit(){
        this.switchPlayer('takeHit')
        this.health -= 5

        if (this.health <= 0) {
            this.switchPlayer('death')
        }   else this.switchPlayer('takeHit')
    }

    switchPlayer(player) {

        if ( this.image === this.players.death.image ) { 
            if (this.framesCurrent === this.players.death.framesMax - 1) this.dead = true
          return}

        if (
            this.image === this.players.attack1.image && 
            this.framesCurrent < this.players.attack1.framesMax -1
        ) 
            return

        if (
            this.image === this.players.takeHit.image && 
            this.framesCurrent < this.players.takeHit.framesMax -1
        ) 
            return

        switch (player) {
            case 'idle':
                if (this.image !== this.players.idle.image) {
                  this.image = this.players.idle.image
                  this.framesMax = this.players.idle.framesMax
                  this.framesCurrent = 0 
                }
                break
            case 'run':
                if (this.image !== this.players.run.image) {
                  this.image = this.players.run.image
                  this.framesMax = this.players.run.framesMax
                  this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.players.jump.image) {
                  this.image = this.players.jump.image
                  this.framesMax = this.players.jump.framesMax
                  this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.players.fall.image) {
                  this.image = this.players.fall.image
                  this.framesMax = this.players.fall.framesMax
                  this.framesCurrent = 0
                }
                break
            case 'attack1':
                if (this.image !== this.players.attack1.image) {
                  this.image = this.players.attack1.image
                  this.framesMax = this.players.attack1.framesMax
                  this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.players.takeHit.image) {
                  this.image = this.players.takeHit.image
                  this.framesMax = this.players.takeHit.framesMax
                  this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.players.death.image) {
                  this.image = this.players.death.image
                  this.framesMax = this.players.death.framesMax
                  this.framesCurrent = 0
                }
                break
        }
    }
}
