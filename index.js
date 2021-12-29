const snakeboard = document.getElementById("snakeboard");
const snakeboard_ctx = snakeboard.getContext("2d");



const board_border = 'black';
const board_background = "black";
const snake_col = 'lightgreen';
const snake_border = 'darkgreen';

const left_key = 'ArrowLeft';
const right_key = 'ArrowRight';
const up_key = 'ArrowUp';
const down_key = 'ArrowDown';

const left_Wall = 0; 
const right_Wall = snakeboard.width;
const top_Wall = 0;
const bottom_Wall = snakeboard.height;

let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]
let changing_direction = false;
let food_x;
let food_y;
let dx=0;
let dy=10;

let score = 0;

// Start game
main();
genFood();
// main function called repeatedly to keep the game running
function main() 
{  
    if (gameDone()){
        alert('Game Over!')
        window.location.reload();
    } 
    changing_direction = false;
    setTimeout(function onTick() 
   {        
     clearCanvas(); 
     drawFood();
     moveSnake();  
     drawSnake();  
     eatFood();
     drawScore();
     
     // Call main again
     main();
   }, 100)
}


// draw a border around the canvas
function clearCanvas() {
    snakeboard_ctx.fillStyle = board_background;
    snakeboard_ctx.strokestyle = board_border;
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
    // Draw each part
    snake.forEach(drawSnakePart)
}

// Draw one snake part
function drawSnakePart(snakePart) {

    // Set the colour of the snake part
    snakeboard_ctx.fillStyle = snake_col;
    // Set the border colour of the snake part
    snakeboard_ctx.strokestyle = snake_border;
    // Draw a "filled" rectangle to represent the snake part at the coordinates
    // the part is located
    snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    // Draw a border around the snake part
    snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawFood()
{
    snakeboard_ctx.fillStyle = 'brown';
    snakeboard_ctx.strokestyle = 'darkbrown';
    snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
    snakeboard_ctx.strokeRect(food_x,food_y, 10, 10) 
}

function moveSnake() // function movement 
{  
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    const snake_ate = snake[0].x === food_x && snake[0].y === food_y;

    snake.pop();
}

function changeDirection(e) 
{
    if (changing_direction) return;
    changing_direction = true;
    const keypressed = e.key;

    const up = dy === -10; 
    const down = dy === 10;
    const right = dx === 10
    const left = dx === -10;
    
    if (keypressed === left_key && !right)
    {
        dx = -10;
        dy = 0;
    }
    if (keypressed === right_key && !left)
    {
        dx = 10;
        dy = 0;
    }
    if (keypressed === up_key && !down)
    {
        dx = 0;
        dy = -10;
    }
    if (keypressed === down_key && !up)
    {
        dx = 0;
        dy = 10;
    }
}
document.addEventListener("keydown", changeDirection) 

function gameDone() // end game limits
{
    for (let i=4; i < snake.length; i++)
    {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
    }
    const hit_left_wall = snake[0].x < left_Wall
    const hit_top_wall = snake[0].y < top_Wall
    const hit_right_wall = snake[0].x > right_Wall - 10 
    const hit_bottom_wall = snake[0].y > bottom_Wall - 10
    return hit_left_wall || hit_top_wall || hit_right_wall || hit_bottom_wall

 
}

function genFood()
{
    food_x = Math.round((Math.random()*(snakeboard.width-20))/10)*10;
    food_y = Math.round((Math.random()*(snakeboard.height-20))/10)*10;

}

function eatFood()
{
    for (let i=4; i < snake.length; i++) {
        
        if (snake[0].x === food_x && snake[0].y === food_y ) 
        {
            genFood()
            scoreIncrease()
            grow()
        }

    }
}

function scoreIncrease()
{ 
    score += 1;
    console.log(score)
    

}

function grow()
{ 
 snake.push(`{x: 100, y: 200}`)
}

function drawScore(){
    document.getElementById('scoreboard').innerHTML = `score = ${score}` 
}

console.log(food_x,food_y)