var bg;
var keyC;
var keyP;
var keyM;

class Menu extends Phaser.Scene {
    constructor(){
        super({key : 'menu_scene'})
    }

    init(data){

    }
    
    preload(){
    this.load.image('menu', 'assets/images/MENU.png');
    }
    
    create(data) {
        bg = this.add.image(0, 0, 'menu');
        bg.setOrigin(0, 0);

        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }
    
    update(time, delta){

        if (keyC.isDown) {
            this.scene.switch("credits_scene");
        }

        if (keyP.isDown) {
            this.scene.switch("game_scene");
        }
        if (keyM.isDown) {
            this.scene.switch("truction_scene");

        }


    }
    
}
  
export default Menu