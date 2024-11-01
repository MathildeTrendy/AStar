// Duplicated global
//let buttonHeight = 40;

function Button(
    text,
    rightAlignment,
) {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    const buttonTopMargin = canvas.height - buttonHeight;
    const halfCanvasWidth = canvas.width / 2;
    const quarterCanvasWidth = canvas.width / 4;

    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'black';
    ctx.rect(
        rightAlignment, // Align to the right of the first button
        buttonTopMargin, // Button placement form top of the canvas
        halfCanvasWidth, // Button width
        buttonHeight
    );
    ctx.stroke();

    // Set text
    ctx.fillStyle = 'black';
    ctx.textBaseline = "top";
    ctx.font = "10pt Arial";
    ctx.fillText(
        text,
        rightAlignment + quarterCanvasWidth - 50,
        buttonTopMargin + 15
    );

    this.x = rightAlignment;
    this.y = buttonTopMargin;

    /**
     * Receives a PointerEvent, and returns a boolean
     */
    this.wasClicked = (event) => {
        let mouseClickXPosition = event.offsetX;
        let mouseClickYPosition = event.offsetY;

        // Simply check if the buttons are clicked based on their x/y and width/height
        if (
            mouseClickXPosition >= this.x && mouseClickXPosition <= this.x + halfCanvasWidth &&
            mouseClickYPosition >= this.y && mouseClickYPosition <= this.y + buttonHeight
        ) {
            return true;
        }

        return false;
    }
}