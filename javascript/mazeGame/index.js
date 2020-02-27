// World: Object that contains all of the different 'things' in our matter app
// Engine: Reads the current state of the world from world object then calculates 
//         changes in position of all the different shapes
// Runner: Gets the engine and world to work together. Runs about 60 times/second
// Render: Whenever the engine processes an update, Render will take a look at all
//          the different shapes and show them on screen
// Body: A shape that we are displaying. Can be a circle, rectangle, oval etc
const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;

const cells = 10;
const width = 800;
const height = 800;
const unitLength = width/cells


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
const grid = Array(cells).fill(null).map(() => Array(cells).fill(false));
const verticals = Array(cells).fill(null).map(() => Array(cells-1).fill(false));
const horizontals = Array(cells-1).fill(null).map(() => Array(cells).fill(false));

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
        if(nextRow < 0 || nextRow >= cells || nextColumn < 0 || nextColumn >= cells) {
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

// maze creation

// vertical maze block
verticals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open) {
            return;
        }
        const verticalMaze = Bodies.rectangle(
            columnIndex * unitLength + unitLength,
            rowIndex * unitLength + unitLength/2,
            10,
            unitLength,
            {
                label: 'wall',
                isStatic: true
            }
        );
        World.add(world, verticalMaze);
    });
});

// horizontal maze block
horizontals.forEach((row, rowIndex) => {
    row.forEach((open, columnIndex) => {
        if(open) {
            return;
        }
        const horizontalMaze = Bodies.rectangle(
            columnIndex * unitLength + unitLength/2,
            rowIndex * unitLength + unitLength,
            unitLength,
            10,
            {   label: 'wall',
                isStatic: true
            }
        );
        World.add(world, horizontalMaze);
    });
});

// ball
const ball = Bodies.circle(
                    unitLength/2, 
                    unitLength/2, 
                    unitLength/3,
                    {
                        label: 'ball'
                    });
World.add(world, ball);

// goal
const goal = Bodies.rectangle(
                width-unitLength/4, 
                height-unitLength/4, 
                unitLength/2, 
                unitLength/2,
                {
                    label: 'goal',
                    isStatic: true
                } );
World.add(world, goal);

document.addEventListener('keydown', event => {
    const { x, y} = ball.velocity;
    if(event.keyCode === 87) {
        Body.setVelocity(ball, {x, y: y-5}); // move up

    }
    if(event.keyCode === 68) {
        Body.setVelocity(ball, {x: x+5, y}); // move right
    }
    if(event.keyCode === 83) {
        Body.setVelocity(ball, {x, y: y+5 }); // move down

    } 
    if(event.keyCode === 65) {
        Body.setVelocity(ball, {x: x-5, y}); // move left
    }
});

Events.on(engine, 'collisionStart', event => {
    event.pairs.forEach(collision => {
        const labels =['ball', 'goal'];

        if(
            labels.includes(collision.bodyA.label) &&
            labels.includes(collision.bodyB.label)
        ) {
            world.gravity.y = 1;
            world.bodies.forEach(body => {
                if(body.label === 'wall') {
                    Body.setStatic(body, false);
                }
            });
        }
    });
});