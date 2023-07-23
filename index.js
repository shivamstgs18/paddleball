var ball_x, ball_y, ball_dx, ball_dy, ball_radius;

var paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;

var num_rows = 4,
  num_cols = 4,
  brick_width = 50,
  brick_height = 20,
  brickpadding = 30,
  brick_ofset_left = 50,
  brick_ofset_top = 50;

var score = 0;

var bricks = [];

var lives = 3;

function setup() {
  createCanvas(400, 400);

  for (var c = 0; c < num_cols; c++) {
    bricks[c] = [];

    for (var r = 0; r < num_rows; r++) {
      bricks[c][r] = { x: 0, y: 0, hidden: 0 };
    }
  }

  ball_radius = 12.5;
  ball_x = 300;
  ball_y = 300;
  ball_dx = 3;
  ball_dy = 3;

  paddle_width = 90;
  paddle_height = 15;
  paddle_x = width - paddle_width;

  paddle_y = height - paddle_height;

  paddle_dx = 4;

  fill("black");
}

function createBricks() {
  for (var c = 0; c < num_cols; c++) {
    for (var r = 0; r < num_rows; r++) {
      if (!bricks[c][r].hidden) {
        const brickX = brick_ofset_left + c * (brick_width + brickpadding);

        const brickY = brick_ofset_top + r * (brick_height + brickpadding);

        bricks[c][r].x = brickX;

        bricks[c][r].y = brickY;

        fill("purple");

        rect(bricks[c][r].x, bricks[c][r].y, brick_width, brick_height);
      }
    }
  }
}

function draw() {
  clear();

  background("rgb(0, 0, 139)");

  createBricks();
  circle(ball_x, ball_y, ball_radius * 2);
  rect(paddle_x, paddle_y, paddle_width, paddle_height);

 
  if (ball_x + ball_radius >= width) ball_dx = -ball_dx;
  //   left wall
  else if (ball_x <= ball_radius) ball_dx = -ball_dx;
  //   bottom wall
  else if (ball_y + ball_radius >= height) {
    ball_dy = -abs(ball_dy);
    ball_dx = abs(ball_dx);
    ball_x = width / 2;
    ball_y = width - (ball_radius + paddle_height);
    paddle_x = width / 2 - paddle_width / 2;
    lives--;
    if (lives == 0) {
      ball_dx = 0;
      ball_dy = 0;
      paddle_dx = 0;
    }
  }
  //bottom_wall_touch++;

  //   top wall
  else if (ball_y <= ball_radius) ball_dy = -ball_dy;
  //   paddle hit
  else if (
    ball_x + ball_radius >= paddle_x &&
    ball_x - ball_radius <= paddle_x + paddle_width &&
    ball_y + ball_radius >= paddle_y &&
    ball_y - ball_radius <= paddle_y + paddle_height
  )
    ball_dy = -ball_dy;
  if (keyIsDown(LEFT_ARROW)) {
    if (paddle_x >= paddle_dx) {
      paddle_x = paddle_x - paddle_dx;
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if (paddle_x + paddle_width + paddle_dx <= width) {
      paddle_x = paddle_x + paddle_dx;
    }
  }

  ball_x = ball_x + ball_dx;
  ball_y = ball_y + ball_dy;

  for (var c = 0; c < num_cols; c++) {
    for (var r = 0; r < num_rows; r++) {
      if (bricks[c][r].hidden == 0) {
        let brick_x = bricks[c][r].x;

        let brick_y = bricks[c][r].y;

        if (
          ball_x + ball_radius >= brick_x &&
          ball_x - ball_radius <= brick_x + brick_width &&
          ball_y - ball_radius <= brick_y + brick_height &&
          ball_y - ball_radius + abs(ball_dy) >= brick_y + brick_height
        ) {
          ball_dy = -ball_dy;
          bricks[c][r].hidden = 1;
          score++;
        } else if (
          ball_x + ball_radius >= brick_x &&
          ball_x - ball_radius <= brick_x + brick_width &&
          ball_y + ball_radius - abs(ball_dy) <= brick_y &&
          ball_y + ball_radius >= brick_y
        ) {
          ball_dy = -ball_dy;
          bricks[c][r].hidden = 1;
          score++;
        } else if (
          ball_x + ball_radius >= brick_x &&
          ball_x + ball_radius - abs(ball_dx) <= brick_x + brick_width &&
          ball_y - ball_radius <= brick_y + brick_height &&
          ball_y + ball_radius >= brick_y
        ) {
          ball_dx = -ball_dx;

          bricks[c][r].hidden = 1;

          score++;
        } else if (
          ball_x - ball_radius <= brick_x + brick_width &&
          ball_x - ball_radius + abs(ball_dx) >= brick_x + brick_width &&
          ball_y - ball_radius <= brick_y + brick_height &&
          ball_y + ball_radius >= brick_y
        ) {
          ball_dx = -ball_dx;

          bricks[c][r].hidden = 1;

          score++;
        }
      }
    }
  }

  textSize(24);

  let s = "Score: " + score;
  let l = "Lives: " + lives;
  fill("black");
  text(s, 290, 25);
  text(l, 10, 25);
  fill("black");
}