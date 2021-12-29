const board_border = 'black';
const board_background = "lightgrey";
const snake_col = 'lightgreen';
const snake_border = 'darkgreen';

const left_key = 'ArrowLeft';
const right_key = 'ArrowRight';
const up_key = 'ArrowUp';
const down_key = 'ArrowDown';


let snake = [
    {x: 200, y: 200},
    {x: 190, y: 200},
    {x: 180, y: 200},
    {x: 170, y: 200},
    {x: 160, y: 200}
]

let dx=0;
let dy=0;

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");
// Start game
main();

// main function called repeatedly to keep the game running
function main() 
{  
   setTimeout(function onTick() 
   {    
     clearCanvas(); 
     drawSnake();   
    
     moveSnake();  
     
     // Call main again
     main();
   }, 100)
}

// draw a border around the canvas
function clearCanvas() {
    //  Select the colour to fill the drawing
    snakeboard_ctx.fillStyle = board_background;
    //  Select the colour for the border of the canvas
    snakeboard_ctx.strokestyle = board_border;
    // Draw a "filled" rectangle to cover the entire canvas
    snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
    // Draw a "border" around the entire canvas
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

function moveSnake() // function movement 
{  
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function changeDirection(e)
{
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

