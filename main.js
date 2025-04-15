
import Titre from './titre.js'
import Game from './game.js'


const titre_scene = new Titre();
const game_scene = new Game();

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

game.scene.start('titre_scene');
