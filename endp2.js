var bg;
var intialtime;
var finaltime;
var timedelta;

class End2 extends Phaser.Scene {
    constructor(){
        super({key : 'end2_scene'})
    }

    init(data){

    }
    
    preload(){
    this.load.image('bg', 'assets/images/game_overp2.png');
    }
    
    create(data){
    bg = this.add.image(0, 0, 'bg');
    bg.setOrigin(0,0);
    intialtime = this.time.now;

    }
    
    update(time, delta){
        finaltime = this.time.now;
        timedelta = finaltime - intialtime;
        if (timedelta >= 5000) {
            location.reload();
        }
    }

}
  
export default End2