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
class Fish extends GameItem {
    constructor(name, xPos, yPos, speed, type, image) {
        super(name, xPos, yPos, speed, image);
        this.name = name;
        this._xPosition = xPos;
        this._yPosition = yPos;
        this._speed = speed;
        this.type = type;
        this._image = GameItem.loadNewImage(image);
        this.fishFactory();
    }
    get image() {
        return this._image;
    }
    set image(image) {
        this._image = image;
    }
    fishFactory() {
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
class Game {
    constructor(canvasId) {
        this.loop = () => {
            console.log(this.hengel._quizChecker);
            this.draw();
            this.shop.updateShop(this.hengel, this.player);
            if (this.shop._shop === false) {
                if (this.hengel._quizChecker == 1) {
                    this.imgRandom();
                }
                if (this.startCounter === true) {
                    this.delayCounter++;
                }
                if (this.delayCounter > 200) {
                    this.hengel._quizChecker = 0;
                    this.delayCounter = 0;
                    this.startCounter = false;
                }
                if (this.hengel._quizChecker == 0) {
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
                    this.hengel.hengelCollidesWithFish(this.fish, this.player, this.shop._double);
                    this.player.move(this.canvas);
                    if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F11)) {
                        location.reload();
                    }
                    if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F5)) {
                        window.location.href = 'https://lucvanwesten2003.github.io/ICTHuts/';
                    }
                }
            }
            requestAnimationFrame(this.loop);
        };
        this.quizButtons = (event) => {
            let width = event.clientX / window.innerWidth;
            let length = event.clientY / window.innerHeight;
            if (this.shop._shop === false) {
                if (width > 0.13645833333333332 && width < 0.444 && length > 0.5046296296296297 && length < 0.639) {
                    this.answerA();
                }
                if (width > 0.5359375 && width < 0.8723958333333334 && length > 0.5037037037037037 && length < 0.6351851851851852) {
                    this.answerB();
                }
                if (width > 0.13697916666666668 && width < 0.4734375 && length > 0.6898148148148148 && length < 0.8212962962962963) {
                    this.answerC();
                }
                if (width > 0.5354166666666667 && width < 0.8713541666666667 && length > 0.6916666666666667 && length < 0.8203703703703704) {
                    this.answerD();
                }
            }
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.fish = [];
        this.keyBoard = new KeyboardListener;
        this.shop = new Shop;
        document.addEventListener("click", this.quizButtons);
        this.quizArray = [
            "quiz1.png", "quiz2.png", "quiz3.png", "quiz4.png", "quiz5.png", "quiz6.png", "quiz7.png", "quiz8.png", "quiz9.png", "quiz10.png", "quiz11.png", "quiz12.png",
            "quiz7.png", "quiz13.png", "quiz14.png", "quiz15.png", "quiz16.png", "Phishing1.png", "Phishing2.png", "Phishing3.png", "Phishing4.png"
        ];
        this.player = new Player('Me', this.canvas.width / 2.25, this.canvas.height / 2 - 80, 5, "./assets/Images/mcboot.png");
        this.hengel = new Hengel(this.canvas.height / 2 - 60, 3, "./assets/Images/hook.png");
        this.netherPortal = new NetherPortal("./assets/Images/nether_portal.png");
        this.endPortal = new EndPortal("./assets/Images/end_portal.png");
        this.soundEffect("./assets/Sounds/Background_music.mp3", 0.5, 0.05);
        this.score = 0;
        this.level = 1;
        this.loop();
        this.counter = 0;
        this.delayCounter = 0;
        this.startCounter = false;
    }
    updateQuiz(hengel, score) {
        this.hengel = hengel;
        this.hengel._score = score;
    }
    delayCount() {
        this.startCounter = true;
    }
    imgRandom() {
        if (this.hengel._quizChecker == 1) {
            for (var i = 0; i < 1; i++) {
                let randomImg = this.quizArray[Math.floor(Math.random() * this.quizArray.length)];
                this.selectedImg = "./assets/Images/" + randomImg;
                document.body.style.backgroundImage = "URL(" + this.selectedImg + ")";
                document.body.style.backgroundSize = 'cover';
            }
            this.quizButtons;
            this.hengel._quizChecker++;
        }
    }
    answerA() {
        if (this.selectedImg == "./assets/Images/quiz8.png" || this.selectedImg == "./assets/Images/quiz12.png" || this.selectedImg == "./assets/Images/quiz17.png"
            || this.selectedImg == "./assets/Images/Phishing2.png") {
            document.body.style.backgroundImage = "url('./assets/Images/CorrectQuestion.png')";
            console.log("correct");
            this.delayCount();
        }
        else {
            document.body.style.backgroundImage = "url('./assets/Images/WrongQuestion.png')";
            if (this.hengel._score >= 5) {
                this.hengel._score = this.hengel._score - 5;
            }
            this.delayCount();
        }
    }
    answerB() {
        if (this.selectedImg == "./assets/Images/quiz7.png" || this.selectedImg == "./assets/Images/quiz13.png" || this.selectedImg == "./assets/Images/quiz15.png"
            || this.selectedImg == "./assets/Images/quiz16.png" || this.selectedImg == "./assets/Images/Phishing4.png") {
            document.body.style.backgroundImage = "url('./assets/Images/CorrectQuestion.png')";
            console.log("correct");
            this.delayCount();
        }
        else {
            document.body.style.backgroundImage = "url('./assets/Images/WrongQuestion.png')";
            if (this.hengel._score >= 5) {
                this.hengel._score = this.hengel._score - 5;
            }
            this.delayCount();
        }
    }
    answerC() {
        if (this.selectedImg == "./assets/Images/quiz1.png" || this.selectedImg == "./assets/Images/quiz2.png" || this.selectedImg == "./assets/Images/quiz3.png"
            || this.selectedImg == "./assets/Images/quiz9.png" || this.selectedImg == "./assets/Images/quiz11.png" || this.selectedImg == "./assets/Images/quiz14.png"
            || this.selectedImg == "./assets/Images/quiz14.png") {
            document.body.style.backgroundImage = "url('./assets/Images/CorrectQuestion.png')";
            console.log("correct");
            this.delayCount();
        }
        else {
            document.body.style.backgroundImage = "url('./assets/Images/WrongQuestion.png')";
            if (this.hengel._score >= 5) {
                this.hengel._score = this.hengel._score - 5;
            }
            this.delayCount();
        }
    }
    answerD() {
        if (this.selectedImg == "./assets/Images/quiz4.png" || this.selectedImg == "./assets/Images/quiz5.png" || this.selectedImg == "./assets/Images/quiz6.png"
            || this.selectedImg == "./assets/Images/quiz10.png" || this.selectedImg == "./assets/Images/Phishing3.png") {
            document.body.style.backgroundImage = "url('./assets/Images/CorrectQuestion.png')";
            console.log("correct");
            this.delayCount();
        }
        else {
            document.body.style.backgroundImage = "url('./assets/Images/WrongQuestion.png')";
            if (this.hengel._score >= 5) {
                this.hengel._score = this.hengel._score - 5;
            }
            this.delayCount();
        }
    }
    makeFish() {
        for (let index = 0; index < 1; index++) {
            let randomFish;
            if (this.shop._special === false) {
                randomFish = ['alive', 'dead', 'dead'];
            }
            if (this.shop._special === true) {
                randomFish = ['alive', 'alive', 'dead', 'dead', 'dead', 'special'];
            }
            const randomElement = randomFish[Math.floor(Math.random() * randomFish.length)];
            if (randomElement === 'alive') {
                this.fish.push(new Fish('aliveFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50), Game.randomNumber(2, 5), "aliveFish", "./assets/Images/aliveFish.png"));
            }
            if (randomElement === 'dead') {
                this.fish.push(new Fish('deadFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50), Game.randomNumber(2, 5), "deadFish", "./assets/Images/deadFish.png"));
            }
            if (randomElement === 'special') {
                this.fish.push(new Fish('specialFish', Game.randomNumber(0, this.canvas.width - 200), Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50), Game.randomNumber(2, 5), "SpecialFish", "./assets/Images/specialFish.png"));
            }
        }
    }
    move() {
        this.fish.forEach((fish) => {
            fish.move();
        });
    }
    drawHengel(ctx) {
        ctx.drawImage(this.hengel.image, this.player.xPosition + this.player.image.width - 50, this.hengel.yPosition);
        ctx.strokeStyle = 'grey';
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
        if (this.hengel._quizChecker == 0) {
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
                if (this.fish.length != 0) {
                    this.fish.forEach((fish) => {
                        fish.draw(this.ctx);
                    });
                }
            }
            if (this.level === 3 && this.shop._shop === false) {
                this.player.draw(this.ctx);
                this.writeTextToCanvas(this.ctx, `Score: ${this.hengel._score}`, 40, this.canvas.width / 2, 40);
                if (this.fish.length != 0) {
                    this.fish.forEach((fish) => {
                        fish.draw(this.ctx);
                    });
                }
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
            this.resetPowerUps();
        }
        if (this.player.xPosition >= this.canvas.width - this.endPortal.image.width - this.player.image.width && this.level == 2) {
            this.soundEffect("./assets/Sounds/End_portal.mp3", 0.5, 0.3);
            this.player.image = GameItem.loadNewImage('./assets/Images/mcboot3.png');
            this.level = 3;
            document.body.style.background = `url("./assets/Images/achtergrond_level_3.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover';
            this.player.xPosition = 0;
            this.hengel._score = 0;
            this.resetPowerUps();
        }
    }
    resetPowerUps() {
        this.shop._Powerups.splice(0, 3);
        if (this.shop._speedPotion === true) {
            this.shop._speedPotion = false;
            this.player.speed = this.player.speed / 2;
            this.hengel._speed = this.hengel._speed / 2;
        }
        if (this.shop._double === true) {
            this.shop._double = false;
        }
        if (this.shop._special === true) {
            this.shop._special = false;
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
    playerCollidesWithRocket(fishes) {
        fishes.forEach((fishes) => {
            let testX;
            let testY;
            if (this._xPosition < fishes.xPosition) {
                testX = fishes.xPosition;
            }
            else if (this._xPosition > fishes.xPosition + fishes.image.width) {
                testX = fishes.xPosition + fishes.image.width;
            }
            if (this._yPosition < fishes.yPosition) {
                testY = fishes.yPosition;
            }
            else if (this._yPosition > fishes.yPosition + fishes.image.height) {
                testY = fishes.yPosition + fishes.image.height;
            }
            const distX = this._xPosition - testX;
            const distY = this._yPosition - testY;
            const distance = Math.sqrt(distX * distX + distY * distY);
            if (distance <= this.radius) {
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
        this.quizChecker = 0;
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
    hengelCollidesWithFish(fishes, player, double) {
        fishes.forEach((fish, index) => {
            if (fish.yPosition <= this.maxY) {
                fishes.splice(index, 1);
            }
            if (fish.xPosition < player.xPosition + player.image.width &&
                fish.xPosition + fish.image.width > player.xPosition + player.image.width &&
                fish.yPosition < this._yPosition + this._image.height &&
                fish.yPosition + fish.image.height > this._yPosition) {
                if (this.checker === 0) {
                    fish.speed = 0;
                    this.catchedFish = fish;
                    this.checker++;
                    this.player = player;
                }
            }
        });
        if (this.checker === 1) {
            this.updatePosition(this.catchedFish, this.player, double);
        }
    }
    updatePosition(fishes, player, double) {
        fishes.yPosition = this._yPosition;
        fishes.xPosition = player.xPosition + player.image.width - 50;
        if (fishes.yPosition <= this.maxY && fishes._name == "aliveFish") {
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
        if (fishes.yPosition <= this.maxY && fishes._name == "deadFish") {
            this.checker = 0;
            this.soundEffect("./assets/Sounds/oof_sound.mp3", 0.5, 0.5);
            this.quizChecker = 1;
        }
        if (fishes.yPosition <= this.maxY && fishes._name == "specialFish") {
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
    get _quizChecker() {
        return this.quizChecker;
    }
    set _quizChecker(quizChecker) {
        this.quizChecker = quizChecker;
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
class Shop {
    constructor() {
        this.mouseHandler = (event) => {
            let X = event.clientX / window.innerWidth;
            let Y = event.clientY / window.innerHeight;
            if (X > 0 && X < 0.135 && Y > 0.138 && Y < 0.416) {
                this.shop = true;
                document.body.style.background = `url("./assets/Images/The Shop.png") no-repeat center center fixed`;
                document.body.style.backgroundSize = 'cover';
            }
            if (this.shop === true) {
                if (X > 0.829 && X < 0.964 && Y > 0.051 && Y < 0.312) {
                    this.Prompts.splice(0, 1);
                    this.shop = false;
                }
                if (X > 0.321 && X < 0.430 && Y > 0.644 && Y < 0.722 && this.speedPotion === false && this.hengel._score >= 10) {
                    this.hengel._score = this.hengel._score - 10;
                    this.speedPotion = true;
                    this.player.speed = this.player.speed * 2;
                    this.hengel._speed = this.hengel._speed * 2;
                    this.Powerups.push(new CanvasElement("Speed Power", 0, 0, "./assets/Images/SpeedPower.png"));
                }
            }
            if (X > 0.445 && X < 0.552 && Y > 0.643 && Y < 724 && this.double === false && this.hengel._score >= 15) {
                this.hengel._score = this.hengel._score - 15;
                this.double = true;
                this.Powerups.push(new CanvasElement("Double Points Power", 0, 0, "./assets/Images/DoublePointsPower.png"));
            }
            if (X > 0.574 && X < 0.681 && Y > 0.644 && Y < 0.721 && this.special === false && this.hengel._score >= 20) {
                this.hengel._score = this.hengel._score - 20;
                this.special = true;
                this.Powerups.push(new CanvasElement("Special Fish Power", 0, 0, "./assets/Images/SpecialFishPower.png"));
            }
        };
        this.Prompts = [];
        this.Powerups = [];
        this.shop = false;
        this.double = false;
        this.special = false;
        this.speedPotion = false;
        document.addEventListener("click", this.mouseHandler);
    }
    updateShop(hengel, player) {
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
    get _speedPotion() {
        return this.speedPotion;
    }
    set _speedPotion(speedPotion) {
        this.speedPotion = speedPotion;
    }
    set _double(double) {
        this.double = double;
    }
    set _special(special) {
        this.special = special;
    }
}
let init = () => {
    new Game(document.getElementById("canvas"));
};
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map