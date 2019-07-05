// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    // Code reference: https://matthewcranford.com/arcade-game-walkthrough-part-5-adding-enemies/
    this.x = x;
    this.y = y + 55; // center y axis
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.boundary) {
      // Move the enemy forward 
      // Increment the x speed * dt
      this.x += this.speed * dt; 
    }else {
      // Reset the value of x to starting position
      this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//code reference: https://matthewcranford.com/arcade-game-walkthrough-part-3-creating-a-hero/

class Character {
  constructor() {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55; 
    this.x = this.startX; // starting position of X
    this.y = this.startY; // starting position of y
    this.victory = false;
    this.sprite = 'images/char-boy.png';
  }
  
  // Drawing our character on current x & y coordinates positions.
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  
  // code reference: https://matthewcranford.com/arcade-game-walkthrough-part-4-heros-first-steps/
  /**
  * update character x and y property according to input
  *
  * @param {string} keyInput - direction of travel
  */

  handleInput(keyInput) {
    switch (keyInput) {
      case 'left':
        if(this.x > 0){
        this.x -= this.step;
        }
        break;
      case 'up':
        if(this.y > this.jump) {
        this.y -= this.jump;
        }
        break;
      case 'right':
        if(this.x < this.step * 4) {
        this.x += this.step;
        }
        break; 
      case 'down':
        if(this.y < this.jump * 4) {
        this.y += this.jump;
        }
        break; 
    }
  }
  
  
  // code reference:https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/
  update() {
    // check for collisions 
    for(let enemy of allEnemies) {
      if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)) {
        this.reset();
      }
    }
    
    //check to see if the player has won
    if(this.y === 55) {
      this.victory = true; 
    }
  }
  
  reset() {
    // setting the x and y back to starting position
    this.y = this.startY;
    this.x = this.startX;
    console.log('game reset');
  }
}
    
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Character();
const enemyBug1 = new Enemy(-101, 0, 100);
const enemyBug2 = new Enemy(-101, 83, 125);
const enemyBug3 = new Enemy((-101*2.5), 83, 150);
const allEnemies = [];
allEnemies.push(enemyBug1, enemyBug2, enemyBug3);
console.log(allEnemies);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
