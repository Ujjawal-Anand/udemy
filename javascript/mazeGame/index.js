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
const width = 800;
const height = 800;
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width,
        height
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

World.add(
    world,
    MouseConstraint.create(engine, {
        mouse: Mouse.create(render.Canvas)
    })
);

// walls
const walls = [ Bodies.rectangle(width/2, 0, width, 20, {isStatic: true}),
                Bodies.rectangle(width, height/2, 20, height, {isStatic: true}),
                Bodies.rectangle(width/2, height, width, 20, {isStatic: true}),
                Bodies.rectangle(0, height/2, 20, height, {isStatic: true})  ]

const shape = Bodies.rectangle(100, 200, 100, 50, {
    isStatic: false
});

World.add(world, walls);
World.add(world, shape);