class Sprite {
    
    constructor({position, imageSrc, scale = 1,maxFrames = 1, offset = {x : 0, y : 0}}) {
        this.position = position;
        this.width = 50;
        this.height = 150;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.maxFrames = maxFrames;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.holdFrames = 5;
        this.offset = offset;
    }
    
    draw() {
        c.drawImage(this.image,this.currentFrame * (this.image.width / this.maxFrames), 0, this.image.width / this.maxFrames, this.image.height, this.position.x - this.offset.x, this.position.y - this.offset.y, (this.image.width / this.maxFrames) * this.scale, this.image.height * this.scale);
    }

    animateFrames() {
        this.elapsedFrames++;

    if (this.elapsedFrames % this.holdFrames === 0) {
      if (this.currentFrame < this.maxFrames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
}


class fighter extends Sprite{
    
    constructor({position , velocity , color , imageSrc, scale = 1,maxFrames = 1, offset = {x : 0, y : 0}, sprites, attackBox = { offset: {}, width: undefined, height: undefined },characterBox = { offset: {}, width: undefined, height: undefined }}) {
        super({
            position,
            imageSrc,
            scale,
            maxFrames,
            offset
        });
        
        this.position = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: {
              x: this.position.x,
              y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
          }
        this.characterBox = {
            position: {
              x: this.position.x,
              y: this.position.y
            },
            offset: characterBox.offset,
            width: characterBox.width,
            height: characterBox.height
          }
        this.color = color;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.holdFrames = 5;
        
        this.isAttacking;
        this.health = 100;
        this.sprites = sprites;
        this.dead = false;

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc;
          }
          console.log(this.sprites)
    }

    
    
    update() {
        this.draw();
        if (!this.dead) this.animateFrames();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        c.fillStyle = 'transparent';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

        // c.fillStyle = 'black';
        c.fillRect(this.characterBox.position.x, this.characterBox.position.y, this.characterBox.width, this.characterBox.height);


        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

        this.characterBox.position.x = this.position.x + this.characterBox.offset.x;
        this.characterBox.position.y = this.position.y + this.characterBox.offset.y;
        
        if ( this.position.y + this.height + this.velocity.y >= canvas.height - 110){
            this.velocity.y = 0;
        }
        else
        this.velocity.y += gravity;

        if ( this.position.x + this.width + this.velocity.x <= 0  ){
            this.velocity.x = 0;
        }
        if (time === 60)
        this.switchSprite('idle');
        // else
        // this.velocity.y += gravity;
    }

    switchSprite(sprite) {
        if (this.image === this.sprites.attack.image && this.currentFrame < this.sprites.attack.maxFrames-1) return

        if (this.image === this.sprites.hurt.image && this.currentFrame < this.sprites.hurt.maxFrames-1) return

        if (this.image === this.sprites.death.image){
            if(this.currentFrame === this.sprites.death.maxFrames-1) {
                this.dead = true;
            }
        return
        }

        switch (sprite) {
            case 'idle':
                this.maxFrames = this.sprites.idle.maxFrames;
              if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image;
                this.currentFrame = 0;
            }
              break;
            case 'walk':
                this.maxFrames = this.sprites.walk.maxFrames;
              if (this.image !== this.sprites.walk.image) {
                this.image = this.sprites.walk.image;
                this.currentFrame = 0;
            }
              break;
            case 'jump':
                this.maxFrames = this.sprites.jump.maxFrames;
              if (this.image !== this.sprites.jump.image) {
                this.image = this.sprites.jump.image;
                this.currentFrame = 0;
            }
              break;
            case 'fall':
                this.maxFrames = this.sprites.fall.maxFrames;
              if (this.image !== this.sprites.fall.image) {
                this.image = this.sprites.fall.image;
                this.currentFrame = 0;
            }
              break;
            case 'attack':
                this.maxFrames = this.sprites.attack.maxFrames;
              if (this.image !== this.sprites.attack.image) {
                this.image = this.sprites.attack.image;
                this.currentFrame = 0;
            }
              break;
            case 'hurt':
                this.maxFrames = this.sprites.hurt.maxFrames;
              if (this.image !== this.sprites.hurt.image) {
                this.image = this.sprites.hurt.image;
                this.currentFrame = 0;
            }
              break;
            case 'death':
                this.maxFrames = this.sprites.death.maxFrames;
              if (this.image !== this.sprites.death.image) {
                this.image = this.sprites.death.image;
                this.currentFrame = 0;
            }
              break;
      
          }
    }
    attack() {
        this.switchSprite('attack');
        if (time > 0)
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }

    takeHit() {
        this.health -= 5;
      
        if(this.health <= 0)
        {
            console.log('lmao ded! XD');
            this.switchSprite('death');
        }
        else{
            this.switchSprite('hurt');
        }
      
    }
}