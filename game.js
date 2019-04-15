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
var infoMessage;
var obstacles, obstacle;
var multiGerm = [];
var score = 0;
var timer = 0;
var timerSec = 60;
var info;
var showInfo = false;

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
    game.load.image('info1', 'assets/infos/info1.png');
    game.load.image('info2', 'assets/infos/info2.png');
    game.load.image('info3', 'assets/infos/info3.png');
    game.load.image('info4', 'assets/infos/info4.png');
    game.load.image('info5', 'assets/infos/info5.png');
    game.load.image('info6', 'assets/infos/info6.png');


}

function render() {
    //   game.debug.text('Time: ' + timerSec, 32, 64);
}

function updateSecond() {
    if(showInfo != true){
        timerSec--;
    }
}

function create() {

    createGame(); //actual gameplay
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

function create_infos(x, y, info) {

    info = game.add.sprite(x, y, info);
    resize(info, 800, 650);

    return info;
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
    multiGerm.push(multiple_germs(230 - 120, 150 + 160, 7));
    multiGerm.push(multiple_germs(230 - 150, 150 + 240, 6));
    createObstacles();
    resize(ball, 50, 50);
    launch_ball();

}

function createObstacles() {
    obstacles = [];
    obstacle = create_germ(0, 0);
    obstacles.push(obstacle);



    obstacle1 = create_germ(0, 220);
    resize(obstacle1, 120, 120);
    obstacles.push(obstacle1);

    obstacle1 = create_germ(100, 180);
    resize(obstacle1, 100, 100);
    obstacles.push(obstacle1);


    obstacle2 = create_germ(0, 320);
    resize(obstacle2, 100, 100);
    obstacles.push(obstacle2);

    obstacle3 = create_germ(0, 600);
    resize(obstacle3, 50, 600);
    obstacles.push(obstacle3);

    obstacle4 = create_germ(0, 900);
    resize(obstacle4, 200, 200);
    obstacles.push(obstacle4);

    obstacle4 = create_germ(250, 1000);
    resize(obstacle4, 120, 120);
    obstacles.push(obstacle4);

    obstacle4 = create_germ(500, 1000);
    resize(obstacle4, 500, 50);
    obstacles.push(obstacle4);

    obstacle4 = create_germ(1000, 1000);
    resize(obstacle4, 150, 150);
    obstacles.push(obstacle4);

    obstacle5 = create_germ(1000, 850);
    resize(obstacle5, 100, 100);
    obstacles.push(obstacle5);

    obstacle6 = create_germ(1000, 750);
    resize(obstacle6, 180, 180);
    obstacles.push(obstacle6);

    obstacle7 = create_germ(1000, 600);
    resize(obstacle7, 180, 180);
    obstacles.push(obstacle7);

    obstacle7 = create_germ(1000, 650);
    resize(obstacle7, 180, 180);
    obstacles.push(obstacle7);

    obstacle8 = create_germ(1000, 500);
    resize(obstacle8, 180, 180);
    obstacles.push(obstacle8);

    obstacle9 = create_germ(1000, 400);
    resize(obstacle9, 80, 80);
    obstacles.push(obstacle9);

    obstacle10 = create_germ(1000, 250);
    resize(obstacle10, 30, 300);
    obstacles.push(obstacle10);

    obstacle11 = create_germ(1000, 0);
    resize(obstacle11, 100, 100);
    obstacles.push(obstacle11);

    obstacle11 = create_germ(1000, 100);
    resize(obstacle11, 100, 100);
    obstacles.push(obstacle11);

    obstacle11 = create_germ(650, 0);
    resize(obstacle11, 100, 100);
    obstacles.push(obstacle11);

    obstacle11 = create_germ(200, 0);
    resize(obstacle11, 130, 130);
    obstacles.push(obstacle11);

    obstacle11 = create_germ(250, 0);
    resize(obstacle11, 100, 100);
    obstacles.push(obstacle11);

    obstacle11 = create_germ(0, 780);
    resize(obstacle11, 100, 100);
    obstacles.push(obstacle11);

    obstacle11 = create_germ(1000, 0);
    resize(obstacle11, 500, 50);
    obstacles.push(obstacle11);



    for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].alpha = 0;
    }

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


    if (game.input.x < 550 && game.input.x > 220) {
        control_paddle(paddle1, game.input.x);

    }

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
                    score++;
                    console.log(score);
                    if(score%4 == 0){
                       infoMessage =  create_infos(-30, 200, 'info' + (score/4));
                       infoMessage.alpha = 1; 
                       showInfo = true;
                       ball.x = game.world.centerX;
                       ball.y = game.world.centerY;
                       ball.body.velocity.setTo(0, 0);
                       ball_launched = false;
                    }
                   

                }

            });
        }
    }

    
    // console.log(showInfo);
        game.input.onTap.add(()=> {
            if(showInfo == true){
                infoMessage.kill();
                infoMessage.alpha = 0;
                launch_ball();
                showInfo = false;
                ball.body.velocity.x = -ball_velocity;
                ball.body.velocity.y = ball_velocity;
                ball_launched = true;

                if (score == 24) {
                    resetGame();
                }

            }
      
        } , infoMessage);
        
    


    for (var i = 0; i < obstacles.length; i++) {
        game.physics.arcade.collide(obstacles[i], ball, () => {});

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