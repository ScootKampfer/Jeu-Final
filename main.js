import Titre from './titre.js'
import Game from './game.js'
import Menu from "./menu.js"
import End1 from "./endp1.js"
import End2 from "./endp2.js"
import Credits from "./credits.js"

const titre_scene = new Titre();
const game_scene = new Game();
const menu_scene = new Menu();
const end1_scene = new End1();
const end2_scene = new End2();
const credits_scene = new Credits();

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true
        }
    },
};

var game = new Phaser.Game(config);

game.scene.add('titre_scene', titre_scene);
game.scene.add('game_scene', game_scene);
game.scene.add("menu_scene", menu_scene);
game.scene.add("end1_scene", end1_scene);
game.scene.add("end2_scene", end2_scene);
game.scene.add("credits_scene", credits_scene);

game.scene.start('titre_scene');
