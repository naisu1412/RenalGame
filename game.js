var game = new Phaser.Game(
    768, 1024, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

var startBg, logo, playButton, instruction;
var paddle1, ball_launched, ball_velocity, germ, background;
var multiGerm = [];
var score = 0;
var timer = 0;
var timerSec = 60;

function preload() {
    game.load.image("paddle", "assets/player.png");
    game.load.image('ball', "assets/ball.png");
    game.load.image('germ', "assets/germ1.png");
    game.load.image('germ2', "assets/germ2.png");
    game.load.image('background', 'assets/background.png');
    game.load.image('startBackground', 'assets/StartScreen/bg.png');
    game.load.image('logo', 'assets/StartScreen/logo.png');
    game.load.image('playButton', 'assets/StartScreen/play.png');
    game.load.image('instruction', 'assets/instruction.png');


}

function render() {
    //   game.debug.text('Time: ' + timerSec, 32, 64);
}

function updateSecond() {
    timerSec--;
}

function create() {

    createGame();
    game.paused = true;
    timer = game.time.create(false);
    timer.loop(1000, updateSecond, this);
    timer.start();
    timer = 0;
    timerSec = 60;
    startBg = createImg(0, 0, 'startBackground');
    logo = createImg(80, 300, 'logo');
    playButton = game.add.button(250, 600, 'playButton', showInstruction, this, 2, 1, 0);
    resize(startBg, 768, 1024);
    resize(logo, 600, 300);
    resize(playButton, 250, 150);

}

function createGame() {
    background = createImg(0, 0, 'background');
    resize(background, 768, 1024);
    ball_launched = false;
    ball_velocity = 650;
    score = 0;
    paddle1 = create_paddle(game.world.centerX, game.world.height - 250);
    ball = create_ball(game.world.centerX, game.world.centerY);
    multiGerm.push(multiple_germs(230, 150, 5));
    multiGerm.push(multiple_germs(230 - 40, 150 + 80, 6));
    multiGerm.push(multiple_germs(230 - 80, 150 + 160, 6));
    multiGerm.push(multiple_germs(230 - 150, 150 + 240, 6));
    resize(ball, 50, 50);
    launch_ball();

}

function showInstruction() {
    startBg.kill();
    logo.kill();
    playButton.kill();
    instruction = game.add.button(80, 80, 'instruction',
        () => {
            game.paused = false;
            instruction.kill();
        }, this, 2, 1, 0);


    resize(instruction, 600, 750);


}



function update() {



    control_paddle(paddle1, game.input.x);

    if (game.paused == true) {
        document.getElementById("timer").innerText = "";

    } else {
        document.getElementById("timer").innerText = "Timer: " + timerSec;
    }

    if (timerSec < 1) {
        resetGame();
    }

    game.physics.arcade.collide(paddle1, ball); //hitting the paddle1

    for (var i = 0; i < multiGerm.length; i++) {
        for (var j = 0; j < multiGerm[i].length; j++) {
            game.physics.arcade.collide(multiGerm[i][j], ball, function() {
                if (multiGerm[i][j].key == "germ2") {
                    multiGerm[i][j].loadTexture("germ");
                } else {
                    multiGerm[i][j].kill();
                    console.log("scored");
                    score++;

                }

            });
        }
    }

    if (score == 23) {

        resetGame();
    }


}


function create_paddle(x, y) {
    var paddle = game.add.sprite(x, y, "paddle");
    paddle.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    paddle.body.immovable = true;
    resize(paddle, 200, 30);


    return paddle;
}


function control_paddle(paddle, x) {
    paddle.x = x;

    if (paddle.x < paddle.width / 2) {
        paddle.x = paddle.width / 2;
    } else if (paddle.x > game.world.width - paddle.width / 2) {
        paddle.x = game.world.width - paddle.width / 2;
    }


}


function create_ball(x, y) {
    var ball = game.add.sprite(x, y, "ball");
    ball.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(ball);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.setTo(1, 1);


    return ball;
}


function launch_ball() {
    if (ball_launched) {
        ball.x = game.world.centerX;
        ball.y = game.world.centerY;
        ball.body.velocity.setTo(0, 0);
        ball_launched = false;
    } else {
        ball.body.velocity.x = -ball_velocity;
        ball.body.velocity.y = ball_velocity;
        ball_launched = true;
    }


}

function createImg(x, y, name) {
    var background = game.add.sprite(x, y, name);


    return background;
}

function create_germ(x, y) {
    var germ = game.add.sprite(x, y, "germ2");
    germ.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(germ);
    germ.body.collideWorldBounds = true;
    germ.body.immovable = true;

    return germ;
}

function multiple_germs(posx, posy, count) {

    var germs = [];
    for (var j = 1; j < count + 1; j++) {
        var germ = create_germ(posx + (80 * j), posy);
        resize(germ, 80, 80);
        germs.push(germ);
        // console.log("hello there");
    }

    return germs;
}

function resize(obj, x, y) {
    obj.width = x;
    obj.height = y;

    return obj;
}

function resetGame() {
    this.game.state.restart();

}