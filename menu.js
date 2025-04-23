var bg;
var play;
var menu;

class Menu extends Phaser.Scene {
    constructor(){
        super({key : 'menu_scene'})
    }

    init(data){

    }
    
    preload(){
    this.load.image('menu', 'assets/images/MENU.png');
    this.load.image("menu_button", "assets/images/MENU_button.png");
    this.load.image("play_button", "assets/images/PLAY.png");
    }
    
    create(data){
    bg = this.add.image(0, 0, 'menu');
    bg.setOrigin(0,0);
    play = this.add.image(350, 425, 'play_button');
    play.setOrigin(0,0);
    play.setScale(1.5);
    menu = this.add.image(350, 325, 'menu_button');
    menu.setOrigin(0,0);
    menu.setAlpha(1);
    menu.setScale(1.5);

    }
    
    update(time, delta){

    }
    
}
  
export default Menu