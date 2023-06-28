const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0 , 0 , canvas.width , canvas.height);

const gravity = 0.98;

class sprite {
    
    constructor({position , velocity , color , offset}) {
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.color = color;
        this.attackBox = {
            position : {
                x : this.position.x,
                y : this.position.y
            },
            offset,
            width : 100,
            height : 50
        }
        this.isAttacking;
    }
    
    draw() {
        //Players
        c.fillStyle = this.color;
        c.fillRect(this.position.x , this.position.y , this.width , this.height);

        //Attack box
        if (this.isAttacking){
        c.fillStyle = 'white';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height );
    }
    }
    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;
        
        if ( this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else
        this.velocity.y += gravity;
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}


const player1 = new sprite ({
    position : {
        x : 0,
        y : 0
    },
    velocity : {
        x : 0,
        y : 0
    },
    color : 'green',
    offset : {
        x : 0,
        y : 0
    }
})


const player2 = new sprite ({
    position : {
        x : 500,
        y : 200
    },
    velocity : {
        x : 0,
        y : 0
    },
    color : 'Red',
    offset : {
        x : -50,
        y : 0
    }
})

const keys = {
    a : {
        pressed : false
    },
    d : {
        pressed : false
    },
    w : {
        pressed : false
    },
    ArrowRight : {
        pressed : false
    },
    ArrowLeft : {
        pressed : false
    },
    ArrowUp : {
        pressed : false
    }

}

let lastKey;

function collision (rec1, rec2) {
    return (rec1.attackBox.position.x + rec1.attackBox.width >= rec2.position.x &&
        rec1.attackBox.position.x <= rec2.position.x + rec2.width &&
        rec1.attackBox.position.y + rec1.attackBox.height >= rec2.position.y &&
        rec1.attackBox.position.y <= rec2.position.y + rec2.height)
}

function animate () {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0 , 0 , canvas.width , canvas.height);
    player1.update();
    player2.update();

    player1.velocity.x = 0;
    player2.velocity.x = 0;

    if( keys.d.pressed && player1.lastKey === 'd')
        player1.velocity.x = 5;
    else if ( keys.a.pressed && player1.lastKey === 'a')
        player1.velocity.x = -5;

    if( keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight')
        player2.velocity.x = 5;
    else if ( keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft')
        player2.velocity.x = -5;

    //Detecting collision
    if (collision(player1, player2) && player1.isAttacking){
            console.log("P1 attacks");
            player1.isAttacking = false;
        }

    if (collision(player2, player1) && player2.isAttacking){
            console.log("P2 attacks");
            player2.isAttacking = false;
        }
}

animate();

window.addEventListener( 'keydown' , (event) => {
    switch (event.key){
        case 'd' : 
        keys.d.pressed = true;
        player1.lastKey = 'd';
        break;
        case 'a' : 
        keys.a.pressed = true;
        player1.lastKey = 'a';
        break;
        case 'w' :
        player1.velocity.y = -20;
        break;
        case 'f' : 
        player1.attack();
        break;

        
        case 'ArrowRight' : 
        keys.ArrowRight.pressed = true;
        player2.lastKey = 'ArrowRight';
        break;
        case 'ArrowLeft' : 
        keys.ArrowLeft.pressed = true;
        player2.lastKey = 'ArrowLeft';
        break;
        case 'ArrowUp' :
        player2.velocity.y = -20;
        break;
        case '0' : 
        player2.attack();
        break;
    }
    console.log(event.key);
})

window.addEventListener( 'keyup' , (event) => {
    switch (event.key){
        case 'd' : 
        keys.d.pressed = false;
        break;
        case 'a' : 
        keys.a.pressed = false;
        break;
        case 'w' :
        keys.w.pressed = false;
        break;

        case 'ArrowRight' : 
        keys.ArrowRight.pressed = false;
        break;
        case 'ArrowLeft' : 
        keys.ArrowLeft.pressed = false;
        break;
        case 'ArrowUp' :
        keys.ArrowUp.pressed = false;
        break;
    }
})

