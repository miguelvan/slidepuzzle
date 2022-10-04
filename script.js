// this is the size of the gameContainer
let rows = 3;
let columns = 3;

// this is the names of the tile we will swap every now and then 
let dragTile;

// let targetTile; this is the black tile
let targetTile;

// this is the array of the image we are going to use
const imgOrder = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];

//number of max move 
let moveLimit = 50;
const moveShow = document.getElementById('movesLeft');

const backgroundOfGame = document.querySelector('.gameBackground')

// load the game function
window.onload = function () {
    startGame();
}

function startGame() {
    moveShow.textContent = moveLimit.toString();

    let shuffledOrder = shuffle(imgOrder.length);

    for (rowCount = 0; rowCount < rows; rowCount++) {
        for (columnCount = 0; columnCount < columns; columnCount++) {
            // create an image element
            let tile = document.createElement('img');
            const tileLocation = tile.classList
            // this is to set the id of the tile 
            tile.id = rowCount.toString() + '-' + columnCount.toString();
            // this is to change the tile image source
            tile.src = 'assets/' + shuffledOrder.shift() + '.webp';

            // This will set the tile to move from one place to another
            tile.addEventListener('dragstart', dragStart); //this is to click an image
            tile.addEventListener('dragover', dragOver);  // this moves over the image clicked
            tile.addEventListener('dragenter', dragEnter); // dragging image to another one
            tile.addEventListener('dragLeave', dragLeave); // this is where you drag leaving the drag enter move
            tile.addEventListener('drop', dragDrop); // this is to drop the image that you have dragged
            tile.addEventListener('dragend', dragEnd); // this will swap the two tiles


            // this will insert the tiles to the gameContainer
            document.querySelector('.gameContainer').append(tile);
        }
    }

}



// functions for the Events that was set above

// dragStart
function dragStart() {
    dragTile = this; //this refers to the tile being dragged
}
// dragOver
function dragOver(e) {
    e.preventDefault();
}
// dragEnter
function dragEnter(e) {
    e.preventDefault();
}
// dragLeave
function dragLeave(e) {
    e.preventDefault();
}
// dragDrop
function dragDrop() {
    targetTile = this; // this will make the image of the tile turn to the image being dropped
}

// dragEnd to swap the images of the tile
function dragEnd() {

    // this is to set the blank tile and make it the only place to move the tile
    if (!targetTile.src.includes('8.webp')) {
        return;
    }

    // to limit the drag and drop to just adjacent  tiles 
    let dragTileCoordinate = dragTile.id.split('-');
    let rowCount = parseInt(dragTileCoordinate[0]);
    let columnCount = parseInt(dragTileCoordinate[1]);

    let targetTileCoordinate = targetTile.id.split('-');
    let rowCount2 = parseInt(targetTileCoordinate[0])
    let columnCount2 = parseInt(targetTileCoordinate[1]);

    //check adjacency
    let moveLeft = rowCount == rowCount2 && columnCount2 == columnCount - 1;
    let moveRight = rowCount == rowCount2 && columnCount2 == columnCount + 1;

    let moveUp = columnCount == columnCount2 && rowCount2 == rowCount - 1;
    let moveDown = columnCount == columnCount2 && rowCount2 == rowCount + 1;

    // only allow if the movement is on left,right,up or down
    let tileAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (tileAdjacent) {
        let dragImage = dragTile.src;
        let targetImage = targetTile.src;
        //  this is where the swapping of the images happens
        dragTile.src = targetImage;
        targetTile.src = dragImage;

        moveLimit -= 1;
    }

    //MOVE LIMIT
    moveShow.textContent = moveLimit.toString();
    //lose consition
    if (moveLimit == 0) {
        alert('TALO KA NA BOI')
        reboot();
    }

    // this will show the array of the current locations of images

    console.log(getImage())
    console.log(imgOrder)

    // winning conditon. if the array of the image's src and imgOrder is equal, an alert will show
    if (JSON.stringify(getImage()) == JSON.stringify(imgOrder)) {
        alert('SOLVED NA BOI');
    }



}


// this is to shuffle the tiles

function shuffle(arr) {
    let shuffleArrange = parseInt(Math.random() * (arr + 1))

    if (shuffleArrange == 0) {
        return ['0', '4', '1', '2', '6', '5', '3', '7', '8'];
    }

    else if (shuffleArrange == 1) {
        return ['3', '1', '6', '4', '2', '0', '7', '5', '8'];
    }

    else if (shuffleArrange == 2) {
        return ['1', '4', '6', '0', '3', '7', '5', '2', '8'];
    }

    else if (shuffleArrange == 3) {
        return ['4', '0', '6', '2', '3', '7', '1', '5', '8'];
    }

    else if (shuffleArrange == 4) {
        return ['0', '2', '1', '4', '5', '6', '3', '7', '8'];
    }

    else if (shuffleArrange == 5) {
        return ['2', '5', '4', '0', '7', '1', '3', '6', '8'];
    }

    else if (shuffleArrange == 6) {
        return ['5', '7', '6', '2', '4', '1', '0', '3', '8'];
    }

    else if (shuffleArrange == 7) {
        return ['7', '4', '0', '6', '1', '3', '2', '5', '8'];
    }
    else if (shuffleArrange == 8) {
        return ['6', '1', '2', '7', '5', '4', '3', '0', '8'];
    }
    else if (shuffleArrange == 9) {
        return ['1', '0', '2', '7', '4', '3', '5', '6', '8'];
    }
}



//  get the SRC of the image
function getImage() {
    let imgSource = new Array;
    let imgId;
    imgId = document.querySelectorAll('img');

    for (let count = 0; count < 9; count++) {

        imgSource.push(`${imgId[count].src}`.charAt(29));
    }

    return imgSource;
    console.log(imgSource)
}




// start the game 
function startToggle () {
    // instructions button
    const startGameBtn = document.getElementById('startImage');
    if (startGameBtn.style.display === "none") {
        startGameBtn.style.display = "block";
    } else {
        startGameBtn.style.display = "none";
    }
}

function instructionToggle () {
    // instructions button
    const instructionBtn = document.getElementById('showInstruction');
    if (instructionBtn.style.display === "block") {
        instructionBtn.style.display = "none";
    } else {
        instructionBtn.style.display = "block";
    }
}

function guideImageToggle () {
    // GUIDE IMAGE button
    const guideImgBtn = document.getElementById('imageGuide');
    if (guideImgBtn.style.display === "block") {
        guideImgBtn.style.display = "none";
    } else {
        guideImgBtn.style.display = "block";
    }
}



// restart 
const reset = document.getElementById('restartBtn')
reset.addEventListener('click', (e) => {
    reboot();
});

function reboot() {
    let okReset = confirm('ULIT KA NANAMAN?');
    if (okReset) {
        setTimeout('location.reload(true);',100);
    }
}

