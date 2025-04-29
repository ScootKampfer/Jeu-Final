var bg;
var platforms;
var platforms2;

var player;
var player2;
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
var keyVirugule;

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
    player = this.physics.add.sprite(700, 400, 'red_robot');
    player.setScale(0.3);
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, platforms2);
   
    // Création de l'ennemi et descollisions applicables
    player2 = this.physics.add.sprite(100, 400, 'slime');
    player2.setSize(20,16, true);
    player2.setOffset(2,8);
    player2.setScale(3);
    player2.setBounce(0.1);
    player2.setCollideWorldBounds(true);
    this.physics.add.collider(player2, platforms);
    this.physics.add.collider(player2, platforms2);
    
    //Création score
    score1Text = this.add.text(16, 16, 'moneyP1: 100', { fontSize: '32px', fill: '#000' });
    score2Text = this.add.text(500, 16, "moneyP2: 100", { fontSize: "32px", fill: "#000"});
    lifeText = this.add.text(16, 50, 'lifeP1: 10', { fontSize: '32px', fill: '#000' });
    life2Text = this.add.text(500, 50, "lifeP2: 10", { fontSize: "32px", fill: "#000"});

    
    this.physics.add.overlap(player2, pewpewsGroup1, damagePlayer2, null, this);
    function damagePlayer2 (player2, pewpewsGroup1)
    {
        pewpewsGroup1.disableBody(true, true);
        life2 = life2 - 1;
        life2Text.setText('life: ' + life2);
    }

    
    this.physics.add.overlap(player, pewpewsGroup2, damagePlayer, null, this);
    function damagePlayer (player, pewpewsGroup2)
    {
        pewpewsGroup2.disableBody(true, true);
        life = life - 1;
        lifeText.setText('life: ' + life);
    }

    this.physics.add.overlap(player, pewpewsGroup1, collectpewpew1, null, this);
    function collectpewpew1 (player, pewpewsGroup1)
    {
        pewpewsGroup1.disableBody(true, true);
        score1 += 10;
        score1Text.setText('moneyP1: ' + score1);
    }

    this.physics.add.overlap(player2, pewpewsGroup2, collectpewpew2, null, this);
    function collectpewpew2 (player2, pewpewsGroup2)
    {
        pewpewsGroup2.disableBody(true, true);
        score2 += 10;
        score2Text.setText('moneyP2: ' + score2);
    }

    // Gestion des collisions entre player2 et player
    this.physics.add.collider(player, player2, function(){
        life2 = life2 - 1;
        life = life - 1;
        lifeText.setText('life: ' + life);
        life2Text.setText('life: ' + life2);
        player.x = 700;
        player.y = 400;
        player2.x = 100;
        player2.y = 400;

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
    keyVirugule = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
   


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

        if(score1 < 0 ||  life <= 0){
            this.scene.switch('end2_scene');
            pewpewsGroup1.children.each(function (item){
                item.destroy();
            })
            pewpewsGroup2.children.each(function (item){
                item.destroy();
            })
        }
        if( score2 < 0 || life2 <= 0){
            this.scene.switch('end1_scene');
            pewpewsGroup1.children.each(function (item){
                item.destroy();
            })
            pewpewsGroup2.children.each(function (item){
                item.destroy();
            })
        }
        player2.anims.play('idle_slime', true);

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
                    player2.setVelocityX(-560);
                }
                else if (keyD.isDown)
                {
                    player2.setVelocityX(560);
                }
                else
                {
                    player2.setVelocityX(0);
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
            
            
            if (keyW.isDown && player2.body.touching.down)
                {
                    player2.setVelocityY(-500);  
                }
            if(keyW.isDown)
                {
                player2.anims.play('idle_slime', true);
                }    
            if(player2.body.touching.down)
                {
                player2.anims.play('idle_slime', true);  
                }   


    
        if(keySpace.isDown){
            if (firePewpew2 == false){
                
                firePewpew2 = true;
                pewpew2 = this.physics.add.sprite(player2.x+30, player2.y-30, 'fruit2');
                pewpewsGroup2.add(pewpew2);
    
                pewpew2.setVelocityY(-300); // Vitesse de la bullet
                pewpew2.setVelocityX(300); // Vitesse de la bullet
                pewpew2.setBounce(0.9); // à randomiser
                pewpew2.setScale(1);
                pewpew2.setCollideWorldBounds(true);
                this.physics.add.collider(pewpew2, platforms);
    
                this.sound.play('pew');
                score2 -= 10;
                score2Text.setText('moneyP2: ' + score2);
                
            }
        }
        
        if (keySpace.isUp){
            firePewpew2 = false;
        }

            if(keyVirugule.isDown){
                if (firePewpew == false){
                    
                    firePewpew = true;
                    pewpew = this.physics.add.sprite(player.x-30, player.y-30, 'fruit');
                    pewpewsGroup1.add(pewpew);
        
                    pewpew.setVelocityY(-300); // Vitesse de la bullet
                    pewpew.setVelocityX(-300); // Vitesse de la bullet
                    pewpew.setBounce(0.9); // à randomiser
                    pewpew.setScale(1);
                    pewpew.setCollideWorldBounds(true);
                    this.physics.add.collider(pewpew, platforms);
        
                    this.sound.play('pew');
                    score1 -= 10;
                    score1Text.setText('money: ' + score1);
                    
                } 
        } 
        if(keyVirugule.isUp){
            firePewpew = false;
        }

        if (player2.x > 775) {
            player2.setVelocityX(-500);
        }

        if (player2.x < 25) {
            player2.setVelocityX(500);
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
