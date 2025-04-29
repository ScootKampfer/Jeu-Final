var bg;
var platforms;
var platforms2;

var player;
var ennemy;
var pewpewsGroup1;
var pewpewsGroup2;
var pewpew2;
var pewpew;

var life = 10;
var life2 = 10;
var lifeText;
var life2Text

var cursors;
var keySpace;
var keyA;
var keyD;
var keyW;
var keyH;

var firePewpew = false;
var firePewpew2 = false;

var score1 = 100;
var score2 = 100;
var score1Text;
var score2Text;

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
        this.load.image("fruit2", "assets/images/fruit.png");
        this.load.audio('pew', 'assets/sounds/power_up.wav');
        this.load.spritesheet("tiles", "assets/images/tilemap_packed.png", {frameWidth: 18, frameHeight: 18});
        this.load.spritesheet("red_robot", "assets/images/red_robot3.png", {frameWidth: 180, frameHeight: 150});
    }
    
    create(data){
    //Création de l'arrière-plan
    bg = this.add.image(0, 0, 'sky');
    bg.setOrigin(0,0);

    //Création des plateformes au sol
    platforms = this.physics.add.staticGroup(
        {
        key: 'tiles',
        frame: 2,
        repeat: 17,
        setXY: { x: 0, y: 575, stepX: 50 }
        }
    );
    
    platforms.children.iterate(function (child) {
        child.setScale(3);
        child.refreshBody();
    });

    platforms2 = this.physics.add.staticGroup(
        {
        key: 'tiles',
        frame: 2,
        repeat: 4,
        setXY: { x: 100, y: 350, stepX: 50 }
        }
    );
    
    platforms2.children.iterate(function (child) {
        child.setScale(3);
        child.refreshBody();
    });

   //Création des groupes pour projectiles et ennemies
    pewpewsGroup1 = this.physics.add.group();
    pewpewsGroup2 = this.physics.add.group();

    // Création du joueur et des collisions applicables
    player = this.physics.add.sprite(100, 400, 'red_robot');
    player.setScale(0.3);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, platforms2);
   
    // Création de l'ennemi et descollisions applicables
    ennemy = this.physics.add.sprite(700, 400, 'slime');
    ennemy.setSize(20,16, true);
    ennemy.setOffset(2,8);
    ennemy.setScale(3);
    ennemy.setBounce(0.1);
    ennemy.setCollideWorldBounds(true);
    this.physics.add.collider(ennemy, platforms);
    this.physics.add.collider(ennemy, platforms2);
    
    //Création score
    score1Text = this.add.text(16, 16, 'moneyP1: 100', { fontSize: '32px', fill: '#000' });
    score2Text = this.add.text(500, 16, "moneyP2: 100", { fontSize: "32px", fill: "#000"});
    lifeText = this.add.text(16, 50, 'lifeP1: 10', { fontSize: '32px', fill: '#000' });
    life2Text = this.add.text(500, 50, "lifeP2: 10", { fontSize: "32px", fill: "#000"});

// Gestion des collisions entre ennemy et pewpew
    this.physics.add.collider(pewpewsGroup1, ennemy, function(pewpewCollide, ennemyCollide){
        pewpew.destroy();
        score1 += 10;
        life2 = life2 - 1;
        score1Text.setText('money: ' + score1);
        life2Text.setText("life: " + life2);
    }.bind(this)); 

    this.physics.add.collider(pewpewsGroup2, player, function(pewpew2Collide, playerCollide){
        pewpew2.destroy();
        score2 += 10;
        life = life - 1;
        score2Text.setText('money: ' + score2);
        lifeText.setText("life: " + life);

    }.bind(this)); 

    this.physics.add.overlap(player, pewpewsGroup1, collectpewpew1, null, this);
    function collectpewpew1 (player, pewpewsGroup1)
    {
        pewpewsGroup1.disableBody(true, true);
        score1 += 10;
        score1Text.setText('money: ' + score1);
    }

    this.physics.add.overlap(player, pewpewsGroup2, collectpewpew2, null, this);
    function collectpewpew2 (player, pewpewsGroup2)
    {
        pewpewsGroup2.disableBody(true, true);
        score2 += 10;
        score2Text.setText('money: ' + score2);
    }

    // Gestion des collisions entre ennemy et player
    this.physics.add.collider(player, ennemy, function(){
        this.scene.restart();
    }.bind(this)); 

    //Création des animations - knight et slime ...
    this.anims.create({
        key: 'idle_robot',
        frames: this.anims.generateFrameNumbers('red_robot', { start: 0, end: 1 }),
        frameRate: 2,
        repeat: -1,

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
    keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);


    }
    
    update(time, delta){

        if (score1 > 100) {
            pewpewsGroup1.children.each(function (item){
                item.destroy();
            })
            score1 = 100;
            score1Text.setText('money: ' + score1);
        }

        if (score2 > 100) {
            pewpewsGroup2.children.each(function (item){
                item.destroy();
            })
            score2 = 100;
            score2Text.setText('money: ' + score2);
        }

        if(score1 <= 0 ||  life <= 0){
            this.scene.switch('end1_scene');
            pewpewsGroup1.children.each(function (item){
                item.destroy();
            })
            pewpewsGroup2.children.each(function (item){
                item.destroy();
            })
        }
        if( score2 <= 0 || life2 <= 0){
            this.scene.switch('end2_scene');
            pewpewsGroup1.children.each(function (item){
                item.destroy();
            })
            pewpewsGroup2.children.each(function (item){
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
                player.setVelocityY(-500);  
            }
        if(cursors.up.isDown)
            {
                //animation saut manquant
            }    
        if(player.body.touching.down)
            {
            player.anims.play('idle_robot', true);  
            } 
            
            
            if (keyW.isDown && ennemy.body.touching.down)
                {
                    ennemy.setVelocityY(-500);  
                }
            if(keyW.isDown)
                {
                ennemy.anims.play('idle_slime', true);
                }    
            if(ennemy.body.touching.down)
                {
                ennemy.anims.play('idle_slime', true);  
                }   


    
        if(keyH.isDown){
            if (firePewpew2 == false){
                
                firePewpew2 = true;
                pewpew2 = this.physics.add.sprite(ennemy.x, ennemy.y, 'fruit2');
                pewpewsGroup2.add(pewpew2);
    
                pewpew2.setVelocityY(-300); // Vitesse de la bullet
                pewpew2.setVelocityX(-300); // Vitesse de la bullet
                pewpew2.setBounce(0.9); // à randomiser
                pewpew2.setScale(1);
                pewpew2.setCollideWorldBounds(true);
                this.physics.add.collider(pewpew2, platforms);
    
                this.sound.play('pew');
                score2 -= 10;
                score2Text.setText('moneyP2: ' + score2);
                
            }
        }
        
        if (keyH.isUp){
            firePewpew2 = false;
        }

            if(keySpace.isDown){
                if (firePewpew == false){
                    
                    firePewpew = true;
                    pewpew = this.physics.add.sprite(player.x+50, player.y-50, 'fruit');
                    pewpewsGroup1.add(pewpew);
        
                    pewpew.setVelocityY(-300); // Vitesse de la bullet
                    pewpew.setVelocityX(300); // Vitesse de la bullet
                    pewpew.setBounce(0.9); // à randomiser
                    pewpew.setScale(1);
                    pewpew.setCollideWorldBounds(true);
                    this.physics.add.collider(pewpew, platforms);
        
                    this.sound.play('pew');
                    score1 -= 10;
                    score1Text.setText('money: ' + score1);
                    
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
            
            if (item.y > 530){
         item.setVelocityX(0);
            item.setVelocityY(0);
               
            }
        })

        pewpewsGroup2.children.each(function (item){
            
            if (item.y > 525){
         item.setVelocityX(0);
            item.setVelocityY(0);
               
            }
        })
        
    }
    
}

export default Game
