document.addEventListener("DOMContentLoaded", function() {
    // Configuração do canvas e do contexto
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext("2d");

    // Configuração do dinossauro e do obstáculo
    var dino = {
        x: 50,
        y: canvas.height - 40,
        width: 40,
        height: 40,
        speed: 5,
        jumping: false,
        jumpHeight: 100
    };

    var obstacle = {
        x: canvas.width * 0.7, // 70% da largura do canvas
        y: canvas.height - 40,
        width: 20,
        height: 40,
        speed: 5 // 5 pixels por frame
    };

    var gravity = 3; // 3 pixels por frame
    var score = 0;
    var gameStarted = false;
    var gameInterval;

    function drawDino() {
        ctx.fillStyle = "#666";
        ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    }

    function drawObstacle() {
        ctx.fillStyle = "#333";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function jump() {
        if (!dino.jumping) {
            dino.jumping = true;
            var jumpInterval = setInterval(function() {
                if (dino.y <= canvas.height - 40 - dino.jumpHeight) {
                    clearInterval(jumpInterval);
                    fall();
                } else {
                    dino.y -= dino.speed * 3;
                }
            }, 20);
        }
    }

    function fall() {
        var fallInterval = setInterval(function() {
            if (dino.y >= canvas.height - 40) {
                dino.y = canvas.height - 40;
                dino.jumping = false;
                clearInterval(fallInterval);
            } else {
                dino.y += gravity;
            }
        }, 20);
    }

    function moveObstacle() {
        if (obstacle.x <= 0) {
            obstacle.x = canvas.width;
            score++;
            document.getElementById("score").innerText = score;
        } else {
            obstacle.x -= obstacle.speed;
        }
    }

    function checkCollision() {
        if (dino.x + dino.width >= obstacle.x && dino.x <= obstacle.x + obstacle.width &&
            dino.y + dino.height >= obstacle.y) {
            endGame();
        }
    }

    function endGame() {
        clearInterval(gameInterval);
        document.getElementById("game-over").style.display = "block";
        window.addEventListener("keydown", function(event) {
            if (event.key === " ") {
                restartGame();
            }
        });
    }

    function restartGame() {
        obstacle.x = canvas.width * 0.7;
        dino.y = canvas.height - 40;
        score = 0;
        document.getElementById("score").innerText = score;
        document.getElementById("game-over").style.display = "none";
        gameLoop();
    }

    function gameLoop() {
        clearCanvas();
        drawDino();
        drawObstacle();
        moveObstacle();
        checkCollision();
    }

    function startGame() {
        if (!gameStarted) {
            gameStarted = true;
            gameInterval = setInterval(gameLoop, 20);
            window.addEventListener("keydown", function(event) {
                if (event.key === " ") {
                    jump();
                }
            });
        }
    }

    // Inicia o jogo com a tecla espaço
    window.addEventListener("keydown", function(event) {
        if (event.key === " ") {
            if (document.activeElement.tagName.toLowerCase() !== 'textarea') {
                event.preventDefault();
                startGame();
            }
        }
    });

    // Inicializa o jogo
    drawDino();
    drawObstacle();

    // Configuração do carrossel
    const swiper = new Swiper('.swiper', {
        loop: true, 
        autoplay: {
            delay: 5000, 
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true, 
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        slidesPerView: 'auto', 
        spaceBetween: 20, 
    });
});
