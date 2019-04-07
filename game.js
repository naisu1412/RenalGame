var game = new Phaser.Game(
    768, 1024, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    }
);
var paddle1, ball_launched, ball_velocity, germ;

function preload() {
    game.load.image("paddle", "assets/player.png");
    game.load.image('ball', "assets/ball.png");
    game.load.image('germ', "assets/germ1.png");

}

function create() {
    ball_launched = false;
    ball_velocity = 650;
    paddle1 = create_paddle(game.world.centerX, game.world.height - 50);
    ball = create_ball(game.world.centerX, game.world.centerY);




    console.log(paddle1);


    resize(paddle1, 400, 50);
    resize(ball, 50, 50);
    resize(germ, 80, 80);
    resize(germ1, 80, 80);
    //  game.input.onDown.add(launch_ball, this);
    launch_ball();

}

function update() {
    control_paddle(paddle1, game.input.x);
    game.physics.arcade.collide(paddle1, ball); //hitting the paddle1

    game.physics.arcade.collide(ball, germ, () => {
        console.log("hit");
    });

}


function create_paddle(x, y) {
    var paddle = game.add.sprite(x, y, "paddle");
    paddle.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(paddle);
    paddle.body.collideWorldBounds = true;
    paddle.body.immovable = true;

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

function create_germ(x, y) {
    var germ = game.add.sprite(x, y, "germ");
    germ.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(germ);
    germ.body.collideWorldBounds = true;
    germ.body.immovable = true;

    return germ;
}

function multiple_germs() {
    var germs;
    for (var i = 0; i < 5; i++) {

    }
}

function resize(obj, x, y) {
    obj.width = x;
    obj.height = y;
}