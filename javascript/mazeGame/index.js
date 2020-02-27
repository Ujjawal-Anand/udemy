// World: Object that contains all of the different 'things' in our matter app
// Engine: Reads the current state of the world from world object then calculates 
//         changes in position of all the different shapes
// Runner: Gets the engine and world to work together. Runs about 60 times/second
// Render: Whenever the engine processes an update, Render will take a look at all
//          the different shapes and show them on screen
// Body: A shape that we are displaying. Can be a circle, rectangle, oval etc
const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } = Matter;

const engine = Engine.create();
const { world } = engine;

const cell = 3;
const width = 800;
const height = 800;


const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        wireframes: false,
        width,
        height
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

//  World.add(
    // world,
    // MouseConstraint.create(engine, {
        // mouse: Mouse.create(render.Canvas)
    // })
// );

// walls
const walls = [ Bodies.rectangle(width/2, 0, width, 20, {isStatic: true}),
                Bodies.rectangle(width, height/2, 20, height, {isStatic: true}),
                Bodies.rectangle(width/2, height, width, 20, {isStatic: true}),
                Bodies.rectangle(0, height/2, 20, height, {isStatic: true})  ]

World.add(world, walls);


// maze generation

// shuffle the cells
const shuffle = (arr) => {
    let counter = arr.length;
    while(counter > 0) {
        const index = Math.floor(Math.random()* arr.length);
        counter--;
        const temp = arr[index];
        arr[index] = arr[counter];
        arr[counter] = temp;
    }
    return arr;
}

// Grids

// const grid = [];
// for(let i = 0; i <3; i++) {
    // grid.push([]);
    // for(let j = 0; j < 3; j++) {
        // grid[i].push(false);
    // }
// }
const grid = Array(cell).fill(null).map(() => Array(cell).fill(false));
const verticals = Array(cell).fill(null).map(() => Array(cell-1).fill(false));
const horizontals = Array(cell-1).fill(null).map(() => Array(cell).fill(false));

const stepThroughCells = (currentRow, currentColumn) => {
    // if cell is visited then return
    if(grid[currentRow][currentColumn]) {
        return;
    }

    // mark the cell being visited
    grid[currentRow][currentColumn] = true;

    // assemble the randomly-ordered list of neighbouring cells
    neighbours = shuffle([ [currentRow-1, currentColumn, 'up'],
                    [currentRow, currentColumn+1, 'right'],
                    [currentRow+1, currentColumn, 'down'],
                    [currentRow, currentColumn-1, 'left']
                ] );
    
    // for each neighbor 
    for(let neighbor of neighbours) {
        const [nextRow, nextColumn, direction] = neighbor;

        // check that neighbor is out of bound
        if(nextRow < 0 || nextRow >= cell || nextColumn < 0 || nextColumn >= cell) {
            continue;
        }

        // check whether if we have already visited that cell
        if(grid[nextRow][nextColumn]) {
            continue;
        }

        // check whether it's horizontal or vertical grid being visited
        // and mark it
        if(direction==='up') {
            horizontals[currentRow-1][currentColumn] = true;  // to move up, a horizontal grid will be crossed
        } else if(direction==='down') {
            horizontals[currentRow][currentColumn] = true;
        } else if(direction==='left') {
            verticals[currentRow][currentColumn-1] = true;
        } else if(direction==='right') {
            verticals[currentRow][currentColumn] = true;
        }

        // continue to next cell
        stepThroughCells(nextRow, nextColumn);
    }

}

stepThroughCells(2,2);
