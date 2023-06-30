const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.98;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "/Images/Background.jpg",
});

const bushes = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "/Images/bushes.png",
});

const player1 = new fighter({
  position: {
    x: 250,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "green",
  imageSrc: "/Images/Player1/Player1-Idle.png",
  scale: 0.25,
//   maxFrames: 12,
  offset: {
    x: 140,
    y: 0,
  },
  sprites: {
    idle: {
      imageSrc: "/Images/Player1/Player1-Idle.png",
      maxFrames: 12
    },
    walk: {
      imageSrc: "/Images/Player1/Player1-walk2.png",
      maxFrames: 12
    },
    jump: {
      imageSrc: "/Images/Player1/Player1-jump.png",
      maxFrames:3
    },
    fall: {
      imageSrc: "/Images/Player1/Player1-fall.png",
      maxFrames: 6
    },
    attack: {
      imageSrc: "/Images/Player1/Player1-attack.png",
      maxFrames: 6
    },
    hurt: {
      imageSrc: "/Images/Player1/Player1-hurt.png",
      maxFrames: 4
    },
    death: {
      imageSrc: "/Images/Player1/Player1-death.png",
      maxFrames: 15
    }
  },
  attackBox : {
    offset: {
        x : -105,
        y : 0
    },
    width : 80,
    height : 75
  },
  characterBox : {
    position: {
      x: 0,
      y: 0
    },
    offset: {
        x: -80,
        y: 25   
    },
    width: 80,
    height: 80
  }
});

const player2 = new fighter({
  position: {
    x: 750,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "Red",
  imageSrc: "/Images/Player2/Player2-Idle.png",
  scale: 0.25,
  maxFrames: 12,
  offset: {
    x: 0,
    y: 0,
  },
  sprites: {
    idle: {
      imageSrc: "/Images/Player2/Player2-Idle.png",
      maxFrames: 12
    },
    walk: {
      imageSrc: "/Images/Player2/Player2-walk.png",
      maxFrames: 12
    },
    jump: {
      imageSrc: "/Images/Player2/Player2-jump.png",
      maxFrames:3
    },
    fall: {
      imageSrc: "/Images/Player2/Player2-fall.png",
      maxFrames: 6
    },
    attack: {
      imageSrc: "/Images/Player2/Player2-attack.png",
      maxFrames: 6
    },
    hurt: {
      imageSrc: "/Images/Player2/Player2-hurt.png",
      maxFrames: 4
    },
    death: {
      imageSrc: "/Images/Player2/Player2-death.png",
      maxFrames: 15
    }
  },
  attackBox : {
    offset: {
        x : 75,
        y : 0
    },
    width : 80,
    height : 75
  },
  characterBox : {
    position: {
      x: 0,
      y: 0
    },
    offset: {
        x: 40,
        y: 25
    },
    width: 80,
    height: 80
  }
});

const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
  ArrowUp: {
    pressed: false,
  },
};

let lastKey;

function collision(rec1, rec2) {
  return (
    rec1.attackBox.position.x + rec1.attackBox.width >= rec2.position.x &&
    rec1.attackBox.position.x <= rec2.position.x + rec2.width &&
    rec1.attackBox.position.y + rec1.attackBox.height >= rec2.position.y &&
    rec1.attackBox.position.y <= rec2.position.y + rec2.height
  );
}

function declareWinner(player1, player2) {
  document.querySelector(".result").style.display = "flex";
  if (player1.health > player2.health)
    document.querySelector(".result").innerHTML = "Player 1 Wins!";
  else if (player1.health < player2.health)
    document.querySelector(".result").innerHTML = "Player 2 Wins!";
  else document.querySelector(".result").innerHTML = "Tie!";
}

var time = 60;
function timer() {
  if (time > 0) {
    setTimeout(timer, 1000);
    time--;
    document.querySelector(".timer").innerHTML = time;
  }

  if (time === 0) {
    declareWinner(player1, player2);
  }
}

timer();

function animate() {

  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  player1.update();
  player2.update();
  bushes.update();

  player1.velocity.x = 0;
  player2.velocity.x = 0;

  if (keys.d.pressed && player1.lastKey === "d") {
      if(player1.characterBox.position.x + player1.characterBox.width < canvas.width)
      player1.velocity.x = 5;
      player1.switchSprite("walk");
    } 
    else if (keys.a.pressed && player1.lastKey === "a") {
      if(player1.characterBox.position.x > 0)
    player1.velocity.x = -5;
    player1.switchSprite("walk");
  } 
  else {
    player1.switchSprite("idle");
  }

  if (player1.velocity.y < 0) {
    player1.switchSprite("jump");
  }
  else if (player1.velocity.y > 0) {
    player1.switchSprite("fall");
  }

  if (keys.ArrowRight.pressed && player2.lastKey === "ArrowRight"){
    if(player2.characterBox.position.x + player2.characterBox.width < canvas.width)
    player2.velocity.x = 5;
    player2.switchSprite("walk");
  }
  else if (keys.ArrowLeft.pressed && player2.lastKey === "ArrowLeft"){
    if(player2.characterBox.position.x > 0)
    player2.velocity.x = -5;
    player2.switchSprite("walk");
  }
  else {
    player2.switchSprite("idle");
  }

  if (player2.velocity.y < 0) {
    player2.switchSprite("jump");
  }
  else if (player2.velocity.y > 0) {
    player2.switchSprite("fall");
  }


  //Detecting collision of player1
  if (collision(player1, player2) && player1.isAttacking &&player1.currentFrame === 1) {
    console.log("P1 attacks");
    player2.takeHit();
    // player2.switchSprite('hurt');
    // player2.health -= 5;
    player1.isAttacking = false;
    // document.querySelector(".p2-health").style.width = player2.health + "%";
    if(time > 0){
    gsap.to('.p2-health', {
        width: player2.health + '%'
    }) }
  }
//When player1 misses
  if (player1.isAttacking && player1.currentFrame === 1) {
    player1.isAttacking = false
  }

//Detecting collision of player2
  if (collision(player2, player1) && player2.isAttacking && player2.currentFrame === 1) {
    console.log("P2 attacks");
    player1.takeHit();
    player2.isAttacking = false;
    // document.querySelector(".p1-health").style.width = player1.health + "%";
    if(time > 0){
    gsap.to('.p1-health', {
        width: player1.health + '%'
    }) }
  }
  //When player2 misses
  if (player2.isAttacking && player2.currentFrame === 1) {
    player2.isAttacking = false
  }

  //When health is zero before time
  if (player1.health <= 0 || player2.health <= 0) {
    declareWinner(player1, player2);
    time = 0;
  }

//   Upper boundary
  if(player1.characterBox.position.y <= 0){
    player1.velocity.y = 0;
    player1.velocity.y = gravity;
    }

  if(player2.characterBox.position.y <= 0){
    player2.velocity.y = 0;
    player2.velocity.y = gravity;
    }
    
}

animate();

window.addEventListener("keydown", (event) => {


    if (!player1.dead){
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      player1.lastKey = "d";
      break;
    case "a":
      keys.a.pressed = true;
      player1.lastKey = "a";
      break;
    case "w":
        if(player1.characterBox.position.y > 0)
      player1.velocity.y = -20;
    //   player1.switchSprite("jump");
      break;
    case "f":
      player1.attack();
      
      break;
  }
}
    if (!player2.dead){
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      player2.lastKey = "ArrowRight";
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      player2.lastKey = "ArrowLeft";
      break;
    case "ArrowUp":
        if(player2.characterBox.position.y > 0)
      player2.velocity.y = -20;
      break;
    case "/":
      player2.attack();
      break;
  }
}
    
  console.log(event.key);
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "w":
      keys.w.pressed = false;
      break;

    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
  }
  
});

const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', () => {
  location.reload();

  // time = 60;
  //   console.log('Restarted!');
  //   player1.position ={
  //     x: 250,
  //     y: 100,
  //   }
  //   player2.position = {
  //     x: 750,
  //     y: 100,
  //   }
  //   document.querySelector(".p1-health").style.width = 100 + "%";
  //   document.querySelector(".p2-health").style.width = 100 + "%";
  //   this.health=100;
  //   this.switchSprite('idle');
  //   this.dead = false;
  //   if ( document.querySelector(".result").style.display = "flex"){
  //   document.querySelector(".result").style.display = "none";
  //   console.log('flex');

})
