var bg;
var keyP;

class Credits extends Phaser.Scene {
    constructor(){
        super({key : 'credits_scene'})
    }

    init(data){

    }
    
    preload(){
    this.load.image('credits', 'assets/images/CREDITS.png');
    }
    
    create(data) {
        bg = this.add.image(0, 0, 'credits');
        bg.setOrigin(0, 0);

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }
    
    update(time, delta){

        if (keyP.isDown) {
            this.scene.switch("game_scene");
        }

    }
    
}
  
export default Credits