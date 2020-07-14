
let canvas = document.getElementById('canvas');
canvas.width = 700;
canvas.height = 700;

let ctx = canvas.getContext('2d');
let resolution = 10;
let cols = canvas.width / resolution;
let rows = canvas.height / resolution;

// function createButtons(){
//     const div = document.getElementById('container');
//     //console.log(div);
   
//     let buttons = ['input','input', 'button'];
//     for(let i = 0; i < buttons.length; i++){
//         //console.log(buttons[i]);
//         let temp_elem = document.createElement(buttons[i]);
//         buttons[i] == 'input' ?  temp_elem.placeholder = 'input' :
//         buttons[i] == 'button' ? temp_elem.innerHTML = 'button' :
//         console.log(" no elements");


//         //console.log(temp_elem);
//         console.log(div);
//         div.appendChild(temp_elem);
//     }
    
   
// }


//createButtons();




// Since JS does not have a multidimentional array, I am creating an array in an array. 
function createMArray(){
    return new Array(cols).fill(0).map(()=> new Array(rows).fill(0).map(()=> Math.floor(Math.random() * 2)));
}

// assigning the array in the variable multy_array
let multy_array = createMArray();


//setting an interval for 100 ms to loop the given function "run".
setInterval(run, 100);

//run();


function run(){

    multy_array  = findNeighbours(multy_array);
    createGrid(multy_array);
    
}


// this function creates draws lines with the functions from the Canvas API.

function createGrid(multy_array){
    let curr_cell;
    for(let c = 0; c < multy_array.length; c++){
        for(let r = 0; r < multy_array[c].length; r++){

            curr_cell = multy_array[c][r];

            ctx.beginPath();
            ctx.rect(c * resolution, r * resolution, resolution, resolution);
            
            if(curr_cell){
                ctx.fillStyle = "black";
            }else{
                ctx.fillStyle = "white";
            }
            
            ctx.fill();
            ctx.stroke();
        }
    }
}

// this function creates  a copy of "multy_array" varriable, next, I itterate trough the multiarray and start to look for the neigbours with an additional for cicle.
// this is done by checking the elements starting from my current position -1 to 2;
function findNeighbours(multy_array){
    let copy = multy_array.map(arr => [...arr]);
    let curr_cell_neighbours;
    let curr_cell = [];
    let cell_x;
    let cell_y;
    for(let c = 0; c < multy_array.length; c++){
        for(let r = 0; r < multy_array[c].length; r++){
            curr_cell = multy_array[c][r];
            let neigbours = 0;

            //checking neighbours 
            
            for(let i = -1; i < 2; i++){
                for(let j = -1; j < 2; j++){
                    if(i === 0 && j === 0){
                        continue;
                    }
                    cell_x = c + i;
                    cell_y = r + j;

                    //Here I check for the edges, when the current cell is on the edge, it will get undefind if the check for the neigbours goes out of the array. 
                    if(cell_x >= 0 && cell_y >= 0 && cell_x < cols && cell_y < rows){
                        curr_cell_neighbours = multy_array[cell_x][cell_y];
                        
                        neigbours += curr_cell_neighbours;
                    }
                }
            }
            // The Rules of game of life 
            if(curr_cell === 1 && neigbours < 2){
                
                copy[c][r] = 0; 
               
            }else if(curr_cell === 1 && neigbours > 3){
               
                copy[c][r] = 0;
            }else if(curr_cell === 0 && neigbours === 3){
               
                copy[c][r] = 1;
            }
        }
        
    }

    return copy;
}