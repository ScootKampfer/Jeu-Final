var bg;
var keySpace;

class Menu extends Phaser.Scene {
    constructor(){
        super({key : 'menu_scene'})
    }

    init(data){

    }
    
    preload(){
    this.load.image('menu', 'assets/images/MENU.png');
    }
    
    create(data){
    bg = this.add.image(0, 0, 'menu');
    bg.setOrigin(0,0);

    // Ajout de la barre d'espacement
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(time, delta){
        if(keySpace.isDown){
        this.scene.switch('game_scene');
        } 
    }
    
}
  
export default Menu