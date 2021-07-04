var X_SIZE = 25; //размер игрового поля по Х
var Y_SIZE = 25; //размер игрового поля по Y
var score = 0; // счет игрока
var snake = []; // змейка
//var startGame = false; //игра не запущена
var snakeSpeed = 200;// скорость перемещения змейки
var direction = 'x+';//направление движения змейки
var snakeMove; //таймер перемещения змейки

function createCellField() {
    //Создаем раздел для вывода очков игрока
    var scoreP = document.getElementById('scoreP');
    scoreP.innerText = score;

    //Создаем поле, по которому будет перемещаться змейка
    var cellField = document.getElementById('cellField');
    var table = document.createElement('table');

    for (i = 0; i <= X_SIZE; i++) {
        var tr = document.createElement('tr');
        for (j = 0; j <= Y_SIZE; j++) {
            var td = document.createElement('td');
            td.setAttribute('class', 'cell ' + i + ';' + j);
            tr.append(td);
        }
        table.append(tr);
    }
    cellField.appendChild(table);
}

function init() {
    createCellField();
    paintSnake();

    document.getElementById('startGame').addEventListener('click', function () {
        var buttonClick = document.getElementById('startGame');
        buttonClick.style.background = 'green';
        buttonClick.style.color = 'black';
        var timerFood = setTimeout(createFood, 5000);
        var timerProblem = setInterval(createProblem, 10000);
        snakeMove = setInterval(move, snakeSpeed);
    });

    document.getElementById('stopGame').addEventListener('click', stopGame);

    document.addEventListener('keydown', changeDirection);
}



function changeDirection(event) {
    if (event.keyCode == 37) { direction = 'y-'; }
    if (event.keyCode == 39) { direction = 'y+'; }
    if (event.keyCode == 38) { direction = 'x-'; }
    if (event.keyCode == 40) { direction = 'x+'; }
}


function paintSnake() {

    var startCoordSnake_x = Math.floor(Math.random() * X_SIZE);
    var startCoordSnake_y = Math.floor(Math.random() * Y_SIZE);

    console.log(startCoordSnake_x);
    console.log(startCoordSnake_y);

    if (startCoordSnake_x == 0) {
        startCoordSnake_x = startCoordSnake_x + 1;
    }

    var snakeHead = document.getElementsByClassName('cell ' + startCoordSnake_x + ';' + startCoordSnake_y)[0];
    console.log(snakeHead);


    var snakeHv = document.getElementsByClassName('cell ' + (startCoordSnake_x - 1) + ';' + startCoordSnake_y)[0];
    console.log(snakeHv);


    snakeHead.setAttribute('class', snakeHead.getAttribute('class') + ' snake');

    snakeHv.setAttribute('class', snakeHv.getAttribute('class') + ' snake');


    snake.push(snakeHv);
    snake.push(snakeHead);


}

function move() {


    var newUnitHead;
    var snakeHead = snake[snake.length - 1];
    console.log(snakeHead);

    var snakeHeadClasses = snakeHead.getAttribute('class').split(' ');
    var snakeMoveCoords = snakeHeadClasses[1].split(';');
    var snakeHead_x = parseInt(snakeMoveCoords[0]);
    var snakeHead_y = parseInt(snakeMoveCoords[1]);


    if (direction == 'x+') {
        //передвигаем голову
        newUnitHead = document.getElementsByClassName('cell ' + (snakeHead_x + 1) + ';' + snakeHead_y)[0];
        if (newUnitHead == undefined) {
            newUnitHead = document.getElementsByClassName('cell ' + '0' + ';' + snakeHead_y)[0];
        }
    }

    if (direction == 'x-') {
        //передвигаем голову
        newUnitHead = document.getElementsByClassName('cell ' + (snakeHead_x - 1) + ';' + snakeHead_y)[0];
        if (newUnitHead == undefined) {
            newUnitHead = document.getElementsByClassName('cell ' + X_SIZE + ';' + snakeHead_y)[0];
        }
    }

    if (direction == 'y+') {
        //передвигаем голову
        newUnitHead = document.getElementsByClassName('cell ' + snakeHead_x + ';' + (snakeHead_y + 1))[0];
        if (newUnitHead == undefined) {
            newUnitHead = document.getElementsByClassName('cell ' + snakeHead_x + ';' + '0')[0];
        }
    }

    if (direction == 'y-') {
        //передвигаем голову
        newUnitHead = document.getElementsByClassName('cell ' + snakeHead_x + ';' + (snakeHead_y - 1))[0];
        if (newUnitHead == undefined) {
            newUnitHead = document.getElementsByClassName('cell ' + snakeHead_x + ';' + Y_SIZE)[0];
        }
    }



    var newUnitHeadClass = newUnitHead.getAttribute('class').split(' ');

    if (newUnitHeadClass.includes('food')) {
        score++;
        var scoreChange = document.getElementById('scoreP');
        scoreChange.innerHTML = score;
        createFood();
    }

    else {
        var removeHv = snake.splice(0, 1)[0];
        var removeHvClasses = removeHv.getAttribute('class').split(' ');
        removeHv.setAttribute('class', 'cell ' + removeHvClasses[1]);
    }

    if (newUnitHeadClass.includes('problem')) {
        stopGame();
    }


    newUnitHead.setAttribute('class', newUnitHead.getAttribute('class') + ' snake');
    snake.push(newUnitHead);

}

function createFood() {
    do {
        var foodX = Math.floor(Math.random() * X_SIZE);
        var foodY = Math.floor(Math.random() * Y_SIZE);
        //console.log(foodX + ' ' + foodY);
        var food = document.getElementsByClassName('cell ' + foodX + ';' + foodY)[0];
        //console.log(food);
        var foodClass = food.getAttribute('class');
        foodMas = foodClass.split(' ');
    }

    while (foodMas[1] === 'snake' || foodMas[1] === 'problem')

    food.setAttribute('class', food.getAttribute('class') + ' food');
}

function createProblem() {
    do {
        var problemX = Math.floor(Math.random() * X_SIZE);
        var problemY = Math.floor(Math.random() * Y_SIZE);
        //console.log(problemX + ' ' + problemY);

        var problem = document.getElementsByClassName('cell ' + problemX + ';' + problemY)[0];
        //console.log(problem);
        var problemClass = problem.getAttribute('class');
        var problemMas = problemClass.split(' ');
        //console.log(problemMas);
    }
    while (problemMas[1] === 'food' || problemMas[1] === 'snake')
    problem.setAttribute('class', problem.getAttribute('class') + ' problem');
}

function stopGame() {
    clearInterval(snakeMove);
    alert('Вы проиграли. Ваш счет ' + score);
    location.reload();
}

window.onload = init;