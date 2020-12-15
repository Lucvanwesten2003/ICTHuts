class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.score++;
            this.counter++;
            if (this.counter === 60) {
                this.makeFish();
                this.counter = 0;
            }
            this.draw();
            this.move();
            this.player.playerCollidesWithRocket(this.rockets);
            this.player.move(this.canvas);
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.rockets = [];
        console.log(this.rockets);
        this.player = new Player('Me', this.canvas.width / 2, this.canvas.height / 2 - 100, 5, "./assets/mcboot.png");
        console.log(this.player);
        this.score = 0;
        this.loop();
        this.counter = 0;
    }
    makeFish() {
        for (let index = 0; index < 1; index++) {
            let randomFish = ['alive', 'dead'];
            const randomElement = randomFish[Math.floor(Math.random() * randomFish.length)];
            if (randomElement === 'alive') {
                this.rockets.push(new Rocket('aliveFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(375, this.canvas.height - 50), Game.randomNumber(2, 5), "aliveFish", "./assets/aliveFish.png"));
                console.log("alvieFish");
            }
            else {
                this.rockets.push(new Rocket('deadFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(375, this.canvas.height - 50), Game.randomNumber(2, 5), "deadFish", "./assets/deadFish.png"));
            }
        }
    }
    move() {
        this.rockets.forEach((rocket) => {
            rocket.move();
        });
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);
        if (this.rockets.length != 0) {
            this.rockets.forEach((rocket) => {
                rocket.draw(this.ctx);
            });
            this.writeTextToCanvas(this.ctx, `Score is: ${this.score}`, 40, this.canvas.width / 2, 40);
        }
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }
    static randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
class GameItem {
    constructor(name, xPos, yPos, speed, image) {
        this.name = name;
        this._xPosition = xPos;
        this._yPosition = yPos;
        this.speed = speed;
        this._image = this.loadNewImage(image);
    }
    get xPosition() {
        return this._xPosition;
    }
    get yPosition() {
        return this._yPosition;
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_R = 82;
class Player extends GameItem {
    constructor(name, xPos, yPos, speed, image) {
        super(name, xPos, yPos, speed, image);
        this.name = name;
        this._xPosition = xPos;
        this._yPosition = yPos;
        this.speed = speed;
        this._image = this.loadNewImage(image);
        this.keyBoardListener = new KeyboardListener();
    }
    move(canvas) {
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT) && this._xPosition > 20) {
            this._xPosition -= this.speed;
        }
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT) && this._xPosition < canvas.width - 270) {
            this._xPosition += this.speed;
        }
    }
    playerCollidesWithRocket(rockets) {
        rockets.forEach((rocket) => {
            let testX;
            let testY;
            if (this._xPosition < rocket.xPosition) {
                testX = rocket.xPosition;
            }
            else if (this._xPosition > rocket.xPosition + rocket.image.width) {
                testX = rocket.xPosition + rocket.image.width;
            }
            if (this._yPosition < rocket.yPosition) {
                testY = rocket.yPosition;
            }
            else if (this._yPosition > rocket.yPosition + rocket.image.height) {
                testY = rocket.yPosition + rocket.image.height;
            }
            const distX = this._xPosition - testX;
            const distY = this._yPosition - testY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance <= this.radius) {
                console.log("Collides with Player");
                this.radius += 3;
            }
        });
    }
    draw(ctx) {
        ctx.drawImage(this._image, this._xPosition, this._yPosition);
    }
}
class Rocket extends GameItem {
    constructor(name, xPos, yPos, speed, type, image) {
        super(name, xPos, yPos, speed, image);
        this.name = name;
        this._xPosition = xPos;
        this._yPosition = yPos;
        this.speed = speed;
        this.type = type;
        this._image = this.loadNewImage(image);
        this.rocketFactory();
    }
    get image() {
        return this._image;
    }
    rocketFactory() {
        if (this.type == "aliveFish") {
            this._xPosition = 0;
        }
        else {
            this._xPosition = 0;
        }
    }
    move() {
        if (this.type == "aliveFish" || 'deadFish') {
            this._xPosition += this.speed;
        }
    }
    ;
    draw(ctx) {
        ctx.drawImage(this._image, this._xPosition, this._yPosition);
    }
}
let init = () => {
    new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map