// Define
const GRID_TYPE_EMPTY = 'empty';
const GRID_TYPE_OBSTACLE = 'obstacle';
const GRID_TYPE_START = 'start';
const GRID_TYPE_GOAL = 'goal';

const GRID_TYPE_PATH = 'path';
const GRID_TYPE_CHECKED = 'checked';

function GridElement(
    x,
    y,
) {
    /* Define variables and properties */

    // X, y used for rendering purposes
    this.x = x * cellWidth;
    this.y = y * cellHeight;

    // x, y used for heuristics purposes
    this.gridX = x;
    this.gridY = y;

    this.type = GRID_TYPE_EMPTY;
    this.previous = null; // Used to keep track of the previous element;

    this.g = 0; // Movement cost from starting point
    this.h = 0; // Heuristic value, cost from current node to goal-node
    this.f = 0; // Total value - Combination of g and h

    /** Logic for rendering the grid element starts here **/

    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.globalCompositeOperation = 'destination-over'

    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'black';
    ctx.rect(
        x,
        y,
        cellWidth,
        cellHeight
    );
    ctx.stroke();

    this.setType = (type) => {
        this.type = type;
        this.render();
    }

    /**
     * Simple utility to check if we are looking at the goalnode
     */
    this.isSameAsNode = (otherNode) => {
        return otherNode.gridX === this.gridX && otherNode.gridY === this.gridY;
    }

    /**
     * Renders the grid element based on its status (start, goal, obstacle, empty)
     */
    this.render = () => {
        const canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        ctx.globalCompositeOperation = 'destination-under'

        ctx.fillStyle = colorFromType(this.type);
        ctx.fillRect(this.x, this.y, cellWidth, cellHeight);
        ctx.strokeRect(this.x, this.y, cellWidth, cellHeight);

        // Render text stuff
        // Don't render if the values are all 0
        if (this.g === 0 && this.f === 0 && this.h === 0) {
            return;
        }

        // Set font and color, if not empty, use white text
        ctx.font = "10pt Arial";
        ctx.fillStyle = 'white';
        if (this.type === GRID_TYPE_EMPTY) {
            ctx.fillStyle = 'black';
        }

        // Render g in top left
        ctx.fillText(
            this.g,
            this.x + 3,
            this.y + 2
        );

        // Render h in top right
        ctx.fillText(
            this.h,
            this.x + cellWidth - 17,
            this.y + 2
        );

        // Render f center
        ctx.fillText(
            this.f,
            this.x + (cellWidth / 2) - 5,
            this.y + (cellHeight / 2)
        );
    };

    /**
     * Receives a PointerEvent, and returns a boolean
     */
    this.wasClicked = (event) => {
        let mouseClickXPosition = event.offsetX;
        let mouseClickYPosition = event.offsetY;

        // Check if the grid element was clicked based on its x/y and width/height
        return (
            mouseClickXPosition >= this.x && mouseClickXPosition <= this.x + cellWidth &&
            mouseClickYPosition >= this.y && mouseClickYPosition <= this.y + cellHeight
        );
    }
}

function colorFromType(type) {
    const colorTypeMap = {
        [GRID_TYPE_EMPTY]: 'white',
        [GRID_TYPE_OBSTACLE]: 'darkgrey',
        [GRID_TYPE_GOAL]: 'green',
        [GRID_TYPE_START]: 'red',
        [GRID_TYPE_CHECKED]: 'lightblue',
        [GRID_TYPE_PATH]: 'blue',
    }

    return colorTypeMap[type];
}

function identifyPossibleNeighbours(node, gridElements) {
    // We need to look in all 8 directions
    // The cardinal ones: N, S, W, E
    // The diagonal ones: NW, NE, SE, SW

    const directionsToConsider = [
        { adjustX: 0, adjustY: -1 }, // North
        { adjustX: 0, adjustY: 1 }, // South
        { adjustX: -1, adjustY: 0 }, // West
        { adjustX: 1, adjustY: 0 }, // East
        { adjustX: -1, adjustY: 1 }, // NorthWest
        { adjustX: 1, adjustY: -1 }, // SouthWest
        { adjustX: -1, adjustY: -1 }, // NorthEast
        { adjustX: 1, adjustY: 1 }, // SouthEast
    ];
    
    // Check each direction
    const foundNeighbours = [];
    for (const possibleDirection of directionsToConsider) {
        const possibleXDirection = node.gridX + possibleDirection.adjustX;
        const possibleYDirection = node.gridY + possibleDirection.adjustY;

        // Ensure that the direction we are checking is within the grid, and not negative
        if (
            possibleXDirection >= 0 && possibleXDirection < columnCount
            && possibleYDirection >= 0 && possibleYDirection < rowCount
        ) {
            foundNeighbours.push(gridElements[possibleXDirection][possibleYDirection]);
        }
    }

    return foundNeighbours;
}