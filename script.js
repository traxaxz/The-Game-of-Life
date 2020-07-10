/*
        RULES:

    --Any live cell with fewer than two live neighbours dies, as if by underpopulation.
-   --Any live cell with two or three live neighbours lives on to the next generation.
    --Any live cell with more than three live neighbours dies, as if by overpopulation.
    --Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

*/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

const resolution = 5;
canvas.width = 1350;
canvas.height = 500;

const cols = canvas.width / resolution;
const rows = canvas.height / resolution;

const black = 'black';
const white = 'white';

// Setting intverval of 200 ms to call the function makeGrid

 setInterval(makeGrid, 200);



// Since JS does not support multy arrays, I made an array with params inside that  will generate an int of 0 and 1 on a random principle.

function makeGrid(){

    let grid =  new Array(cols).fill(0)
    .map(()=> new Array(rows).fill(0)
    .map(() => Math.floor(Math.random()*2)));

    drawOrganisms(grid);
}


//  Here I am iterating thru the Grid array and I am filling all the elements with color
function drawOrganisms(grid){
    console.log(grid);

    for(let c = 0; c < grid.length; c++){
        for(let r = 0; r < grid.length; r++){
            
            let cell = grid[c][r];

            ctx.beginPath();
            ctx.rect(c * resolution, r * resolution, resolution, resolution);
            if(cell == 1){
                ctx.fillStyle = black;
            }else{
                ctx.fillStyle = white;
            }
            ctx.fill();
        }
    }
    
    getNeighbours(grid);

}

// Here I iterate thru the returned grid and making acopy of the array with the Map function
// then I check the the neighbours with a third and fourth (for cicle).  

function getNeighbours(grid){
    let arr_neighbour = grid.map(arr => [...arr]);
    let number_of_neigbours = 0;
    let neighbour;
    for(let c = 0; c < grid.length; c++){
        for(let r = 0; r < grid.length; r++){
            let cell = grid[c][r];
            for(var x = -1; x < 2; x++){
                for(y = -1; y < 2; y++){
                    if(x === 0 && y === 0) continue;
                    if(c + x >= 0 && r + y >=0 && c + x < cols && r + y < rows){
                        neighbour = grid[c + x][r + y];
                        number_of_neigbours += neighbour;
                    }
                }
            }
            //console.log(cell);
            if(cell === 1 && number_of_neigbours < 2){
                arr_neighbour[c][r] = 0;

            }else if(cell === 1 && number_of_neigbours > 3){
                arr_neighbour[c][r] = 0;
            }else if(cell == 0 && number_of_neigbours === 3){
                arr_neighbour[c][r] = 1;
            }
        }
    }
} 