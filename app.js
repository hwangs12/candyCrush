document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
    let score = 0

    const candyImages = [
        "url('images/yellow-candy.png')",
        "url('images/red-candy.png')",
        "url('images/purple-candy.png')",
        "url('images/orange-candy.png')",
        "url('images/green-candy.png')",
        "url('images/blue-candy.png')"
    ]



    //Create Board
    function createBoard() {
        for (let i=0; i<64; i++) {
            //create grid block for each image and randomly distribute images to each block
            const square = document.createElement('div')
            square.setAttribute('draggable', true)
            square.setAttribute('id', i)
            let random = Math.floor(Math.random() * candyImages.length)
            square.style.backgroundImage = candyImages[random]
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    //Drag the candies
    let imageBeingDragged
    let imageBeingReplaced
    let imageIdBeingDragged
    let imageIdBeingReplaced





    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))



    function dragStart() {
        imageBeingDragged = this.style.backgroundImage
        imageIdBeingDragged = parseInt(this.id)
        console.log(imageBeingDragged)
        console.log(this.id, 'dragstart')
    }
    function dragOver(e) {
        e.preventDefault()
        console.log(this.id, 'dragover')
    }
    function dragEnter(e) {
        e.preventDefault()
        console.log(this.id, 'dragenter')
    }
    function dragLeave() {
        console.log(this.id, 'dragleave')
    }
    function dragDrop(e) {
        console.log(this.id, 'drop')
        imageBeingReplaced = this.style.backgroundImage
        imageIdBeingReplaced = parseInt(this.id)
        this.style.backgroundImage = imageBeingDragged
        squares[imageIdBeingDragged].style.backgroundImage = imageBeingReplaced  
    }
    function dragEnd() {
        let validMoves = [imageIdBeingDragged - 1, imageIdBeingDragged - width, imageIdBeingDragged + 1, imageIdBeingDragged + width]
        let validMove = validMoves.includes(imageIdBeingReplaced)

        if (imageIdBeingReplaced && validMove) {
            imageIdBeingReplaced = null
        } else if (imageIdBeingReplaced && !validMove) {
            squares[imageIdBeingReplaced].style.backgroundImage = imageBeingReplaced
            squares[imageIdBeingDragged].style.backgroundImage = imageBeingDragged
        } else squares[imageIdBeingDragged].style.backgroundImage = imageBeingDragged
        console.log(this.id, 'dragend')
    }


    //drop candies once some have been cleared
    function moveDown() {
        for (i = 0; i < 55; i++) {
            if (squares[i + width].style.backgroundImage === '') {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                squares[i].style.backgroundImage = ''
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstROw = firstRow.includes(i)
                if (isFirstROw && squares[i].style.backgroundImage === '') {
                    let randomImage = Math.floor(Math.random() * candyImages.length)
                    squares[i].style.backgroundImage = candyImages[randomImage]
                }
            }
        }
    }


    // Checking for matches
    function checkRowForFour() {
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i+1, i+2, i+3]
            let decidedImage = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfFour.every(index => squares[index].style.backgroundImage === decidedImage && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                rowOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    function checkColumnForFour() {
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i+width, i+width*2, i+width*3]
            let decidedImage = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfFour.every(index => squares[index].style.backgroundImage === decidedImage && !isBlank)) {
                score += 4
                scoreDisplay.innerHTML = score
                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    
    // check for row of three

    function checkRowForThree() {
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i+1, i+2]
            let decidedImage = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]

            if (notValid.includes(i)) continue

            if (rowOfThree.every(index => squares[index].style.backgroundImage === decidedImage && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

    function checkColumnForThree() {
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i+width, i+width*2]
            let decidedImage = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            if (columnOfThree.every(index => squares[index].style.backgroundImage === decidedImage && !isBlank)) {
                score += 3
                scoreDisplay.innerHTML = score
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }

     window.setInterval(function(){
        moveDown()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
    }, 100)



    
})