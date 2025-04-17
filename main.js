import Titre from './titre.js'
import Game from './game.js'
import Menu from "./menu.js"
import End from "./end.js"

const titre_scene = new Titre();
const game_scene = new Game();
const menu_scene = new Menu();
const end_scene = new End();

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
game.scene.add("end_scene", end_scene);

game.scene.start('titre_scene');
