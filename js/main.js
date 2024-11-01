// Define preferred size of canvas
let columnCount = 10
let rowCount = 10

// Define sizes for canvas content
let cellWidth = 60;
let cellHeight = 60;
let buttonHeight = 40;

// Define global variables for grid and start/end-nodes
const isRunningAlgorithm = false;
const grid = [];
let startNode;
let goalNode;

// Define the open and closed sets for gridElements
const unvisitedGridElements = [];
const visitedGridElements = [];

// Import UI stuff
function initializeGrid() {
    // Reset the grid without overwriting it
    grid.length = 0;

    // populate a 2-dimensional grid with fresh GridElements
    for (let i = 0; i < rowCount; i++) {

        const row = [];
        for (let j = 0; j < columnCount; j++) {
            row.push(new GridElement(
                i, // x
                j, // y
            ));
        }

        grid.push(row);
    }
}

function renderCanvas() {
    const canvas = document.getElementById("canvas");
    canvas.width = columnCount * cellWidth;
    canvas.height = rowCount * cellHeight + buttonHeight; // Include button height to have extra space below the grid

    let ctx = canvas.getContext("2d");
    // Add a white background to the canvas
    ctx.globalCompositeOperation = 'destination-under'
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render first button
    let startButton = new Button(
        'Start',
        0,
    );

    let restartButton = new Button(
        'Restart',
        canvas.width / 2 // Half canvas width,
    );

    // Initially render the entire grid
    grid.forEach(row => row.forEach(cell => cell.render()));

    // The canvas can only have a single on-click handler
    // So we register it and have it either check for grid clicks and button clicks
    canvas.addEventListener('click', function(clickEvent) {
        // 1. Evaluate the restart button click
        if (restartButton.wasClicked(clickEvent)) {
            console.log('RESTART')
            location.reload();
            return;
        }

        // 2. Do not allow other clicks while algorithm is running
        if (isRunningAlgorithm) {
            console.log('STOP CLICK - isRunningAlgorithm')
            return;
        }

        // 3. Evaluate the restart button click
        if (startButton.wasClicked(clickEvent)) {
            runAlgorithm()

            return;
        }

        // 4. If no button was clicked, check each element in the grid for clicks
        for (const gridColumn of grid) {
            for (const gridRowCell of gridColumn) {
                if (gridRowCell.wasClicked(clickEvent)) {
                    // 4.1 If startNode not set, mark as startNode, then return
                    if (!startNode) {
                        startNode = gridRowCell;
                        startNode.setType(GRID_TYPE_START);
                        return;
                    // 4.2 If goalNode not set, mark as goalNode, then return
                    } else if (!goalNode && gridRowCell.type !== GRID_TYPE_START) {
                        goalNode = gridRowCell;
                        goalNode.setType(GRID_TYPE_GOAL);
                        return;
                    // 4.3, otherwise toggle as obstacle if not used as start or goalnode
                    } else {
                        // Do not allow overwriting start or goal nodes
                        if (gridRowCell.type === GRID_TYPE_START || gridRowCell.type === GRID_TYPE_GOAL) {
                            return;
                        }

                        // Toggle between empty and obstacle
                        if (gridRowCell.type === GRID_TYPE_OBSTACLE) {
                            gridRowCell.setType(GRID_TYPE_EMPTY)
                        } else {
                            gridRowCell.setType(GRID_TYPE_OBSTACLE); // Grå repræsenterer forhindring
                        }
                        return;
                    }
                }
            }
        }
    }, false);
}

// Define the core funtion for running an algorithm
function runAlgorithm() {
    if (!startNode || !goalNode) {
        alert("Please select a start and a goal node.");
        return;
    }

    unvisitedGridElements.push(startNode);
    visitedGridElements.length = 0; // Empty

    // Set the initial values
    startNode.g = 0;
    startNode.h = calculateEuclideanHeuristic(startNode, goalNode);
    startNode.f = startNode.g + startNode.h;

    // Call the recursive A Star calculator method
    iterateAStarAlgorithm()
}

function iterateAStarAlgorithm() {
    unvisitedGridElements.sort((a, b) => a.f - b.f);

    const currentNode = unvisitedGridElements.shift();

    if (currentNode.isSameAsNode(goalNode)) {
        walkAndHighlightRoute()
        return;
    }
    visitedGridElements.push(currentNode)

    const foundNeighbours = identifyPossibleNeighbours(currentNode, grid)

    for (const neighbour of foundNeighbours) {
        if (neighbour.type === GRID_TYPE_OBSTACLE || visitedGridElements.includes(neighbour)) {
            continue;
        }

        const isDiagonal = (currentNode.gridX !== neighbour.gridX) && (currentNode.gridY !== neighbour.gridY);
        const moveCost = isDiagonal ? 14 : 10; // Diagonal: 14, horisontal/vertikal: 10
        const tentativeG = Math.round(currentNode.g + moveCost);

        if (!unvisitedGridElements.includes(neighbour)) {
            unvisitedGridElements.push(neighbour);
        } else if (tentativeG >= neighbour.g) {
            continue;
        }

        neighbour.g = tentativeG;
        neighbour.h = calculateEuclideanHeuristic(neighbour, goalNode);
        neighbour.f = Math.round(neighbour.g + neighbour.h); // Sørg for, at f-værdien er et heltal

        neighbour.previous = currentNode;
        neighbour.type = GRID_TYPE_CHECKED;
        neighbour.render();
    }

    iterateAStarAlgorithm()
}

/**
 * Takes two GridElements and returns a Diagonal manhattan distance
 * Based on: https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html#diagonal-distance
 */
function calculateEuclideanHeuristic(currentNode, goalNode) {
    const dx = Math.abs(currentNode.gridX - goalNode.gridX);
    const dy = Math.abs(currentNode.gridY - goalNode.gridY);
    return Math.round(Math.sqrt(dx * dx + dy * dy) * 10); // Afrundet Euclidean distance til heltal
}


function walkAndHighlightRoute() {
    console.log('walker')
    // Walk back through the path and highlight it
    let currentNode = goalNode; // Start at the goal

    if (!currentNode.previous && !currentNode.isSameAsNode(startNode)) {
        alert("Could not find a path.");
        return;
    }

    // Keep walking until we hit the startNode
    while (currentNode) {
        console.log('while')
        // Stop if we have arrived at the start
        if (currentNode.isSameAsNode(startNode)) {
            break;
        }

        // Change the color to path, but preserve the goal node color.
        if (currentNode.isSameAsNode(goalNode)) {
            currentNode.type = GRID_TYPE_GOAL;
        } else {
            currentNode.type = GRID_TYPE_PATH;
        }

        currentNode.render(); // Trigger a render

        currentNode = currentNode.previous;
    }
}

// Call the initializing methods to start execution
initializeGrid();

// Start canvas animation, and call the renderCanvas method
requestAnimationFrame(renderCanvas)
