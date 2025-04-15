var bg;
var platforms;

var player;
var ennemy;
var ennemyGroup;
var pewpewsGroup1;
var pewpew;

var cursors;
var keySpace;
var keyA;
var keyD;
var keyW;

var firePewpew = false;

var score = 100;
var scoreText;

class Game extends Phaser.Scene {    
    constructor(){
        super({key : 'game_scene'})
    }

    init(data){
    
    }
    
    preload(){
        this.load.image('sky', 'assets/images/sky.png');
        this.load.spritesheet('knight', 'assets/images/knight.png', { frameWidth: 32, frameHeight: 28 });
        this.load.spritesheet('slime', 'assets/images/slime_green.png', { frameWidth: 24, frameHeight: 24.4});
    
        this.load.spritesheet('floor', 'assets/images/platforms.png', { frameWidth: 14, frameHeight: 16})
        
        this.load.spritesheet('fruit', 'assets/images/coin.png', { frameWidth: 16, frameHeight: 16});
    
        this.load.audio('pew', 'assets/sounds/power_up.wav');
    }
    
    create(data){
    //Création de l'arrière-plan
    bg = this.add.image(0, 0, 'sky');
    bg.setOrigin(0,0);

    //Création des plateformes au sol
    platforms = this.physics.add.staticGroup(
        {
        key: 'floor',
        frame: 4,
        repeat: 10,
        setXY: { x: 50, y: 600, stepX: 75 }
        }
    );
    
    platforms.children.iterate(function (child) {
        child.setScale(5);
        child.refreshBody();
    });

   //Création des groupes pour projectiles et ennemies
    pewpewsGroup1 = this.physics.add.group();
    ennemyGroup = this.physics.add.group();

    // Création du joueur et des collisions applicables
    player = this.physics.add.sprite(100, 400, 'knight');
    player.setScale(5);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
   
    // Création de l'ennemi et des collisions applicables
    ennemy = this.physics.add.sprite(700, 400, 'slime');
    ennemy.setSize(20,16, true);
    ennemy.setOffset(2,8);
    ennemy.setScale(5);
    ennemy.setBounce(0.8);
    ennemy.setCollideWorldBounds(true);
    this.physics.add.collider(ennemy, platforms);
    ennemyGroup.add(ennemy);
    
    //Création score
    scoreText = this.add.text(16, 16, 'money: 100', { fontSize: '32px', fill: '#000' });

// Gestion des collisions entre ennemy et pewpew
    this.physics.add.collider(pewpewsGroup1, ennemyGroup, function(pewpewCollide, ennemyCollide){
        pewpewCollide.destroy();
        ennemyCollide.destroy();

       
        scoreText.setText('money: ' + score);

        ennemy = this.physics.add.sprite(700, 400, 'slime');
        ennemy.setScale(5);
        ennemy.setBounce(0.8);
        ennemy.setCollideWorldBounds(true);
        this.physics.add.collider(ennemy, platforms);
        ennemyGroup.add(ennemy);
    }.bind(this)); 

    // Gestion des collisions entre ennemy et player
    this.physics.add.collider(player, ennemyGroup, function(){
        this.scene.restart();
    }.bind(this)); 

    //Création des animations - knight et slime ...
    this.anims.create({
        key: 'idle_knight',
        frames: this.anims.generateFrameNumbers('knight', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,

    });

    this.anims.create({
        key: 'jump_knight',
        frames: this.anims.generateFrameNumbers('knight', { start: 48, end: 55 }),
        frameRate: 10,
        repeat: 0
    });
 
    this.anims.create({
        key: 'idle_slime',
        frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
        yoyo : true,
    });

    // Ajout des flèches du clavier
    cursors = this.input.keyboard.createCursorKeys();

    // Ajout de la barre d'espacement
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
   


    }
    
    update(time, delta){
        if(score <0){
            this.scene.switch('titre_scene');
            score = 100;
            scoreText.setText('money: ' + score);
            pewpewsGroup1.children.each(function (item){
                item.destroy();
            })

        }
        ennemy.anims.play('idle_slime', true);

        if (cursors.left.isDown)
            {
                player.setVelocityX(-560);
            }
            else if (cursors.right.isDown)
            {
                player.setVelocityX(560);
            }
            else
            {
                player.setVelocityX(0);
            }
    
            if (keyA.isDown)
                {
                    ennemy.setVelocityX(-560);
                }
                else if (keyD.isDown)
                {
                    ennemy.setVelocityX(560);
                }
                else
                {
                    ennemy.setVelocityX(0);
                }
    
        if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-300);  
            }
        if(cursors.up.isDown)
            {
            player.anims.play('jump_knight', true);
            }    
        if(player.body.touching.down)
            {
            player.anims.play('idle_knight', true);  
            } 
            
            
            if (keyW.isDown && ennemy.body.touching.down)
                {
                    ennemy.setVelocityY(-300);  
                }
            if(keyW.isDown)
                {
                ennemy.anims.play('idle_slime', true);
                }    
            if(ennemy.body.touching.down)
                {
                ennemy.anims.play('idle_slime', true);  
                }   


    
        if(keySpace.isDown){
            if (firePewpew == false){
                
                firePewpew = true;
                pewpew = this.physics.add.sprite(player.x, player.y, 'fruit');
                pewpewsGroup1.add(pewpew);
    
                pewpew.setVelocityY(-300); // Vitesse de la bullet
                pewpew.setVelocityX(300); // Vitesse de la bullet
                pewpew.setBounce(0.9); // à randomiser
                pewpew.setScale(3);
                pewpew.setCollideWorldBounds(true);
                this.physics.add.collider(pewpew, platforms);
    
                this.sound.play('pew');
                score -= 10;
                scoreText.setText('money: ' + score);
                
            } 
        } 
        if(keySpace.isUp){
            firePewpew = false;
        }

        if (ennemy.x > 760) {
            ennemy.setVelocityX(-500);
        }

        if (ennemy.x < 40) {
            ennemy.setVelocityX(500);
        }
    
        pewpewsGroup1.children.each(function (item){
            
            if (item.y > 525){
         item.setVelocityX(0);
            item.setVelocityY(0);
               
            }
        })
        
    }
    
}

export default Game
