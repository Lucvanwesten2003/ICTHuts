class CanvasElements {
    constructor(name, xPos, yPos, image) {
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(image);
    }
    getName() {
        return this.name;
    }
    getXPos() {
        return this.xPos;
    }
    getYPos() {
        return this.yPos;
    }
    getImageWidth() {
        return this.image.width;
    }
    getImageHeight() {
        return this.image.height;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class CanvasElement extends CanvasElements {
    constructor(name, xPos, yPos, image) {
        super(name, xPos, yPos, image);
    }
}
class Portal {
    constructor(image) {
        this._image = this.loadNewImage(image);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    get image() {
        return this._image;
    }
}
class EndPortal extends Portal {
    constructor(image) {
        super(image);
        this._image = this.loadNewImage(image);
    }
}
class Game {
    constructor(canvasId) {
        this.loop = () => {
            this.draw();
            this.shop.kauloShop(this.hengel, this.player);
            if (this.shop._shop === false) {
                this.newLevel();
                this.score++;
                this.counter++;
                if (this.counter === 60) {
                    this.makeFish();
                    this.counter = 0;
                }
                this.move();
                this.draw();
                this.drawHengel(this.ctx);
                this.drawPortal(this.ctx);
                this.hengel.move(this.canvas);
                this.hengel.hengelCollidesWithFish(this.rockets, this.player, this.shop._double);
                this.player.move(this.canvas);
                if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F11)) {
                    location.reload();
                }
                if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F5)) {
                    window.location.href = 'https://lucvanwesten2003.github.io/ICTHuts/';
                }
            }
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.rockets = [];
        this.keyBoard = new KeyboardListener;
        this.shop = new Shop;
        console.log(this.rockets);
        this.player = new Player('Me', this.canvas.width / 2.25, this.canvas.height / 2 - 80, 5, "./assets/Images/mcboot.png");
        console.log(this.player);
        this.hengel = new Hengel(this.canvas.height / 2 - 60, 3, "./assets/Images/hook.png");
        this.netherPortal = new NetherPortal("./assets/Images/nether_portal.png");
        this.endPortal = new EndPortal("./assets/Images/end_portal.png");
        this.soundEffect("./assets/Sounds/Background_music.mp3", 0.5, 0.05);
        this.score = 0;
        this.level = 1;
        this.loop();
        this.counter = 0;
    }
    makeFish() {
        for (let index = 0; index < 1; index++) {
            let randomFish;
            if (this.shop._special === false) {
                randomFish = ['alive', 'dead', 'dead'];
            }
            if (this.shop._special === true) {
                randomFish = ['alive', 'dead', 'dead', 'dead', 'special'];
            }
            const randomElement = randomFish[Math.floor(Math.random() * randomFish.length)];
            if (randomElement === 'alive') {
                this.rockets.push(new Rocket('aliveFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50), Game.randomNumber(2, 5), "aliveFish", "./assets/Images/aliveFish.png"));
                console.log("alvieFish");
            }
            if (randomElement === 'dead') {
                this.rockets.push(new Rocket('deadFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50), Game.randomNumber(2, 5), "deadFish", "./assets/Images/deadFish.png"));
            }
            if (randomElement === 'special') {
                this.rockets.push(new Rocket('specialFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50), Game.randomNumber(2, 5), "SpecialFish", "./assets/Images/specialFish.png"));
            }
        }
    }
    move() {
        this.rockets.forEach((rocket) => {
            rocket.move();
        });
    }
    drawHengel(ctx) {
        ctx.drawImage(this.hengel.image, this.player.xPosition + this.player.image.width - 50, this.hengel.yPosition);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.player.xPosition + this.player.image.width, this.player.yPosition + 25);
        ctx.lineTo(this.player.xPosition + this.player.image.width - 10, this.hengel.yPosition + 10);
        ctx.stroke();
    }
    drawPortal(ctx) {
        if (this.shop._shop === false) {
            if (this.level === 1) {
                if (this.hengel._score >= 50) {
                    ctx.drawImage(this.netherPortal.image, this.canvas.width - this.netherPortal.image.width, this.player.yPosition - 100);
                    this.portalCollision();
                }
            }
            if (this.level === 2) {
                if (this.hengel._score >= 75) {
                    ctx.drawImage(this.endPortal.image, this.canvas.width - this.endPortal.image.width, this.player.yPosition - 120);
                    this.portalCollision();
                }
            }
        }
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.shop._shop === true) {
            this.shop._Prompts.forEach((element) => {
                element.draw(this.ctx);
            });
            this.writeTextToCanvas(this.ctx, `You have ${this.hengel._score} fish`, 40, this.canvas.width / 2, 40);
        }
        if (this.shop._shop === true) {
            this.shop._Powerups.forEach((element) => {
                element.draw(this.ctx);
            });
        }
        if (this.shop._shop === false && this.level < 3) {
            this.player.draw(this.ctx);
            this.writeTextToCanvas(this.ctx, `Score: ${this.hengel._score} / ${this.neededPoints}`, 40, this.canvas.width / 2, 40);
            if (this.rockets.length != 0) {
                this.rockets.forEach((rocket) => {
                    rocket.draw(this.ctx);
                });
            }
        }
        if (this.level === 3 && this.shop._shop === false) {
            this.player.draw(this.ctx);
            this.writeTextToCanvas(this.ctx, `Score: ${this.hengel._score}`, 40, this.canvas.width / 2, 40);
            if (this.rockets.length != 0) {
                this.rockets.forEach((rocket) => {
                    rocket.draw(this.ctx);
                });
            }
        }
    }
    newLevel() {
        if (this.level === 1) {
            this.neededPoints = 50;
            document.body.style.background = `url("./assets/Images/achtergrond_level_1.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover';
        }
        if (this.level === 2) {
            this.neededPoints = 75;
            document.body.style.background = `url("./assets/Images/achtergrond_level_2.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover';
        }
        if (this.level === 3) {
            document.body.style.background = `url("./assets/Images/achtergrond_level_3.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover';
        }
    }
    portalCollision() {
        if (this.player.xPosition >= this.canvas.width - this.netherPortal.image.width - this.player.image.width) {
            this.soundEffect("./assets/Sounds/Nether_portal.mp3", 0.5, 0.1);
            this.player.image = GameItem.loadNewImage('./assets/Images/mcboot2.png');
            this.level = 2;
            document.body.style.background = `url("./assets/Images/achtergrond_level_2.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover';
            this.player.xPosition = 0;
            this.hengel._score = 0;
            console.log("next level");
        }
        if (this.player.xPosition >= this.canvas.width - this.endPortal.image.width - this.player.image.width && this.level == 2) {
            this.soundEffect("./assets/Sounds/End_portal.mp3", 0.5, 0.3);
            this.level = 3;
            document.body.style.background = `url("./assets/Images/achtergrond_level_3.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover';
            this.player.xPosition = 0;
            this.hengel._score = 0;
            console.log("next level");
        }
    }
    soundEffect(url, time, volume) {
        let audio = new Audio(url);
        audio.currentTime = time;
        audio.volume = volume;
        audio.play();
    }
    writeTextToCanvas(ctx, text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "white") {
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
        this._speed = speed;
        this._image = GameItem.loadNewImage(image);
    }
    get xPosition() {
        return this._xPosition;
    }
    set xPosition(xPos) {
        this._xPosition = xPos;
    }
    get yPosition() {
        return this._yPosition;
    }
    set yPosition(yPos) {
        this._yPosition = yPos;
    }
    get image() {
        return this._image;
    }
    set image(img) {
        this._image = img;
    }
    get speed() {
        return this._speed;
    }
    set speed(speed) {
        this._speed = speed;
    }
    get _name() {
        return this.name;
    }
    static loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class Player extends GameItem {
    constructor(name, xPos, yPos, speed, image) {
        super(name, xPos, yPos, speed, image);
        this.name = name;
        this._xPosition = xPos;
        this._yPosition = yPos;
        this.speed = speed;
        this._image = GameItem.loadNewImage(image);
        this.keyBoardListener = new KeyboardListener();
    }
    get yPosition() {
        return this._yPosition;
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
class Hengel {
    constructor(yPos, speed, image) {
        this.checker = 0;
        this.maxY = yPos;
        this._yPosition = yPos;
        this.speed = speed;
        this.keyBoard = new KeyboardListener();
        this._image = this.loadNewImage(image);
        this.score = 0;
    }
    get yPosition() {
        return this._yPosition;
    }
    get image() {
        return this._image;
    }
    get _speed() {
        return this.speed;
    }
    set _speed(speed) {
        this.speed = speed;
    }
    move(canvas) {
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_UP) && this._yPosition > this.maxY) {
            this._yPosition -= this.speed;
        }
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_DOWN) && this._yPosition < canvas.height - 50) {
            this._yPosition += this.speed;
        }
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
    hengelCollidesWithFish(rockets, player, double) {
        rockets.forEach((rocket, index) => {
            if (rocket.yPosition <= this.maxY) {
                rockets.splice(index, 1);
            }
            if (rocket.xPosition < player.xPosition + player.image.width &&
                rocket.xPosition + rocket.image.width > player.xPosition + player.image.width &&
                rocket.yPosition < this._yPosition + this._image.height &&
                rocket.yPosition + rocket.image.height > this._yPosition) {
                if (this.checker === 0) {
                    rocket.speed = 0;
                    this.catchedFish = rocket;
                    this.checker++;
                    console.log("if activated");
                    this.player = player;
                }
            }
        });
        if (this.checker === 1) {
            this.updatePosition(this.catchedFish, this.player, double);
        }
    }
    updatePosition(rocket, player, double) {
        rocket.yPosition = this._yPosition;
        rocket.xPosition = player.xPosition + player.image.width - 50;
        console.log(rocket.yPosition);
        if (rocket.yPosition <= this.maxY && rocket._name == "aliveFish") {
            if (double === true) {
                this.score++;
                this.score++;
            }
            if (double === false) {
                this.score++;
            }
            this.checker = 0;
            this.soundEffect("./assets/Sounds/good_fish.mp3", 1.2, 0.3);
        }
        if (rocket.yPosition <= this.maxY && rocket._name == "deadFish") {
            this.checker = 0;
            this.soundEffect("./assets/Sounds/oof_sound.mp3", 0.5, 0.5);
        }
        if (rocket.yPosition <= this.maxY && rocket._name == "specialFish") {
            if (double === true) {
                this.score++;
                this.score++;
            }
            if (double === false) {
                this.score++;
            }
            this.checker = 0;
            this.soundEffect("./assets/Sounds/good_fish.mp3", 1, 0.3);
        }
    }
    soundEffect(url, time, volume) {
        let audio = new Audio(url);
        audio.currentTime = time;
        audio.volume = volume;
        audio.play();
    }
    get _score() {
        return this.score;
    }
    set _score(score) {
        this.score = score;
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
KeyboardListener.KEY_F11 = 122;
KeyboardListener.KEY_F5 = 116;
class NetherPortal extends Portal {
    constructor(image) {
        super(image);
        this._image = this.loadNewImage(image);
    }
}
class Rocket extends GameItem {
    constructor(name, xPos, yPos, speed, type, image) {
        super(name, xPos, yPos, speed, image);
        this.name = name;
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._speed = speed;
        this.type = type;
        this._image = GameItem.loadNewImage(image);
        this.rocketFactory();
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
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
class Shop {
    constructor() {
        this.mouseHandler = (event) => {
            let X = event.clientX / window.innerWidth;
            let Y = event.clientY / window.innerHeight;
            console.log(X);
            console.log(Y);
            if (X > 0 && X < 0.135 && Y > 0.138 && Y < 0.416) {
                this.shop = true;
                document.body.style.background = `url("./assets/Images/The Shop.png") no-repeat center center fixed`;
                document.body.style.backgroundSize = 'cover';
            }
            if (this.shop === true) {
                if (X > 0.829 && X < 0.964 && Y > 0.051 && Y < 0.312) {
                    console.log(this.hengel._score);
                    this.Prompts.splice(0, 1);
                    this.shop = false;
                }
                if (this.twoXPopup === false && this.specialfishPopup === false && X > 0.321 && X < 0.430 && Y > 0.644 && Y < 0.722 || this.speedPopup === true) {
                    this.Prompts.splice(0, 1);
                    this.Prompts.push(new CanvasElement("Potion prompt", 0, -200, "./assets/Images/SpeedPrompt.png"));
                    this.speedPopup = true;
                    if (X > 0.439 && X < 0.473 && Y > 0.368 && Y < 0.434 && this.speedPotion === false && this.hengel._score >= 10) {
                        this.hengel._score = this.hengel._score - 10;
                        this.speedPotion = true;
                        this.player.speed = this.player.speed * 2;
                        this.hengel._speed = this.hengel._speed * 2;
                        this.Powerups.push(new CanvasElement("Speed Power", 0, 0, "./assets/Images/SpeedPower.png"));
                        this.Prompts.splice(0, 1);
                        this.speedPopup = false;
                    }
                    if (X > 0.516 && X < 0.551 && Y > 0.370 && Y < 0.432) {
                        console.log("no");
                        this.Prompts.splice(0, 1);
                        this.speedPopup = false;
                    }
                }
                if (this.speedPopup === false && this.specialfishPopup === false && X > 0.445 && X < 0.552 && Y > 0.643 && Y < 724 || this.twoXPopup === true) {
                    this.Prompts.splice(0, 1);
                    this.Prompts.push(new CanvasElement("two X Prompt", 0, -200, "./assets/Images/DoublePrompt.png"));
                    this.twoXPopup = true;
                    if (X > 0.441 && X < 0.475 && Y > 0.371 && Y < 0.436 && this.double === false && this.hengel._score >= 15) {
                        this.hengel._score = this.hengel._score - 15;
                        this.double = true;
                        this.Powerups.push(new CanvasElement("Double Points Power", 0, 0, "./assets/Images/DoublePointsPower.png"));
                        this.Prompts.splice(0, 1);
                        this.twoXPopup = false;
                    }
                    if (X > 0.518 && X < 0.553 && Y > 0.371 && Y < 0.432) {
                        console.log("no");
                        this.Prompts.splice(0, 1);
                        this.twoXPopup = false;
                    }
                }
                if (this.speedPopup === false && this.twoXPopup === false && X > 0.574 && X < 0.681 && Y > 0.644 && Y < 0.721 || this.specialfishPopup === true) {
                    this.Prompts.splice(0, 1);
                    this.Prompts.push(new CanvasElement("Special Fish Prompt", 0, -200, "./assets/Images/SpecialPrompt.png"));
                    this.specialfishPopup = true;
                    if (X > 0.442 && X < 0.471 && Y > 0.362 && Y < 0.421 && this.special === false && this.hengel._score >= 2) {
                        this.hengel._score = this.hengel._score - 20;
                        this.special = true;
                        this.Powerups.push(new CanvasElement("Special Fish Power", 0, 0, "./assets/Images/SpecialFishPower.png"));
                        this.Prompts.splice(0, 1);
                        this.specialfishPopup = false;
                    }
                    if (X > 0.511 && X < 0.541 && Y > 0.360 && Y < 0.416) {
                        console.log("no");
                        this.Prompts.splice(0, 1);
                        this.specialfishPopup = false;
                    }
                }
            }
        };
        this.Prompts = [];
        this.Powerups = [];
        this.speedPopup = false;
        this.twoXPopup = false;
        this.specialfishPopup = false;
        this.shop = false;
        this.double = false;
        this.special = false;
        this.speedPotion = false;
        document.addEventListener("click", this.mouseHandler);
    }
    kauloShop(hengel, player) {
        this.hengel = hengel;
        this.player = player;
    }
    get _shop() {
        return this.shop;
    }
    get _special() {
        return this.special;
    }
    get _double() {
        return this.double;
    }
    get _Prompts() {
        return this.Prompts;
    }
    get _Powerups() {
        return this.Powerups;
    }
}
let init = () => {
    new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map