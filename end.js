var bg;
var keySpace;

class End extends Phaser.Scene {
    constructor(){
        super({key : 'end_scene'})
    }

    init(data){

    }
    
    preload(){
    this.load.image('title', 'assets/images/TITRE.png');
    }
    
    create(data){
    bg = this.add.image(0, 0, 'title');
    bg.setOrigin(0,0);

    // Ajout de la barre d'espacement
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(time, delta){

    }

}
  
export default Titre