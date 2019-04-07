var game = new Phaser.Game(
    768, 1024, Phaser.AUTO, '', {
        preload: preload,
        create: create,
        update: update
    }
);
var paddle1, ball_launched, ball_velocity, germ, background;

function preload() {
    game.load.image("paddle", "assets/player.png");
    game.load.image('ball', "assets/ball.png");
    game.load.image('germ', "assets/germ1.png");
    game.load.image('background', 'assets/background.png')

}

function create() {
    background = create_background(0, 0);
    ball_launched = false;
    ball_velocity = 650;
    paddle1 = create_paddle(game.world.centerX, game.world.height - 250);
    ball = create_ball(game.world.centerX, game.world.centerY);
    multiple_germs();


    console.log(paddle1);


    resize(ball, 50, 50);

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

function create_background(x, y) {
    var background = game.add.sprite(x, y, "background");
    // background.anchor.setTo(0.5, 0.5);
    resize(background, 768, 1024);

    return background;
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
    var germs = [];
    for (var i = 1; i < 6; i++) {
        for (var j = 1; j < 5; j++) {
            var germ = create_germ(80 * i, 80 * j);
            resize(germ, 80, 80);
            germs.push(germ);
            console.log("hello there");
        }

    }
    germs.x = 120;
    germs.y = 120;

    // console.log(germs.count());
    //  console.log(germs);
}

function resize(obj, x, y) {
    obj.width = x;
    obj.height = y;

    return obj;
}