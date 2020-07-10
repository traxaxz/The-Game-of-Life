/*
        RULES:

    --Any live cell with fewer than two live neighbours dies, as if by underpopulation.
-   --Any live cell with two or three live neighbours lives on to the next generation.
    --Any live cell with more than three live neighbours dies, as if by overpopulation.
    --Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const resolution = 10;
canvas.width = 500;
canvas.height = 500;

const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

const black = 'black';
const white = 'white';


function makeGrid(){

    let grid =  new Array(cols).fill(0)
    .map(()=> new Array(rows).fill(0)
    .map(() => Math.floor(Math.random()*2)));

    drawOrganisms(grid);
}



function drawOrganisms(grid){
    console.log(grid);

    for(let c = 0; c < grid.length; c++){
        for(let r = 0; r < grid.length; r++){
            
            let cell = grid[c][r];

            ctx.beginPath();
            ctx.rect(c * resolution, r * resolution, resolution, resolution);
            if(cell){
                ctx.fillStyle = black;
            }else{
                ctx.fillStyle = white;
            }
            ctx.fill();
        }
    }

}
makeGrid();