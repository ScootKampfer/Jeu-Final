var bg;
var keyP;

class Truction extends Phaser.Scene {
    constructor(){
        super({key : 'truction_scene'});
    }

    init(data){

    }
    
    preload(){
    this.load.image('truction', 'assets/images/truction.png');
    }
    
    create(data) {
        bg = this.add.image(0, 0, 'truction');
        bg.setOrigin(0, 0);

        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }
    
    update(time, delta){

        if (keyP.isDown) {
            this.scene.switch("game_scene");
        }

    }
    
}
  
export default Truction