/// <reference path="./Player.ts" />

class Hengel {
    private keyBoard: KeyboardListener;
    private maxY: number;
    private _yPosition: number;
    private speed: number
    private _image: HTMLImageElement;
    private score: number;
    private catchedFish: Fish;
    private checker: number = 0;
    private player: Player;
    private quizChecker: number = 0;
    

    public constructor(yPos: number, speed: number, image: string) {
        this.maxY = yPos
        this._yPosition = yPos
        this.speed = speed
        this.keyBoard = new KeyboardListener();
        this._image = this.loadNewImage(image)
        this.score = 0;
    }


    get yPosition(): number {
        return this._yPosition
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    get _speed(): number {
        return this.speed
    }
    
    set _speed(speed : number){
        this.speed = speed;
    }

    public move(canvas: HTMLCanvasElement) {
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_UP) && this._yPosition > this.maxY) {
            this._yPosition -= this.speed;
        }
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_DOWN) && this._yPosition < canvas.height - 50) {
            this._yPosition += this.speed;
        }
    }

    /**
* Loads an image so it doesn't flicker
* @param {HTMLImageElement} source
* @return HTMLImageElement - returns an image
*/
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    /**
* Method to determine of the hook is colliding with a fish
*/
    public hengelCollidesWithFish(fishes: Fish[], player: Player, double: boolean) {
        fishes.forEach((fish, index) => {
            if (fish.yPosition <= this.maxY) {
                fishes.splice(index, 1)
            }
            if (fish.xPosition < player.xPosition + player.image.width &&
                fish.xPosition + fish.image.width > player.xPosition + player.image.width &&
                fish.yPosition < this._yPosition + this._image.height &&
                fish.yPosition + fish.image.height > this._yPosition) {
                if (this.checker === 0) {
                    fish.speed = 0
                    this.catchedFish = fish
                    this.checker++
                    this.player = player
                }
            }
        })
        if (this.checker === 1) {
            this.updatePosition(this.catchedFish, this.player, double);
        }
    }

    private updatePosition(fishes: Fish, player: Player, double: boolean) {
        fishes.yPosition = this._yPosition;
        fishes.xPosition = player.xPosition + player.image.width - 50;
       
        if (fishes.yPosition <= this.maxY && fishes._name == "aliveFish") {
            if (double === true){
                this.score++
                this.score++
            } 
            if (double === false){
                this.score++
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
            if (double === true){
                this.score++
                this.score++
            } 
            if (double === false){
                this.score++
            }
            this.checker = 0;
            this.soundEffect("./assets/Sounds/good_fish.mp3", 1, 0.3);
        }
    } 

    private soundEffect(url: string, time: number, volume: number) { 
        let audio = new Audio(url);
        audio.currentTime = time;
        audio.volume = volume;
        audio.play();
    } 

    get _score(): number {
        return this.score;
    }

    set _score(score: number){
        this.score = score;
    }

    get _quizChecker(): number {
        return this.quizChecker;
    }

    set _quizChecker(quizChecker: number) {
        this.quizChecker = quizChecker;
    }

}