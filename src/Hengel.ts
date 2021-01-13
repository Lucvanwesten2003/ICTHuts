/// <reference path="./Player.ts" />


class Hengel {
    private keyBoard: KeyboardListener;
    private maxY: number;
    private _yPosition: number;
    private speed: number
    private _image: HTMLImageElement;
    private score: number;
    private catchedFish: Rocket;
    private checker: number = 0;
    private player: Player;
    private game: Game;

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

    public move(canvas: HTMLCanvasElement) {
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_UP) && this._yPosition > this.maxY) {
            this._yPosition -= this.speed
        }
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_DOWN) && this._yPosition < canvas.height - 50) {
            this._yPosition += this.speed
        }
    }

    /**
* Loads an image so it doesn't flicker
* @param {HTMLImageElement} source
* @return HTMLImageElement - returns an image
*/
    protected loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }

    /**
* Method to determine of the player is colliding with a rocket
*/
    public hengelCollidesWithFish(rockets: Rocket[], player: Player, double: boolean) {
        // console.log(this.maxY)
        rockets.forEach((rocket, index) => {
            if (rocket.yPosition <= this.maxY) {
                rockets.splice(index, 1)
            }
            if (rocket.xPosition < player.xPosition + player.image.width &&
                rocket.xPosition + rocket.image.width > player.xPosition + player.image.width &&
                rocket.yPosition < this._yPosition + this._image.height &&
                rocket.yPosition + rocket.image.height > this._yPosition) {
                if (this.checker === 0) {
                    rocket.speed = 0
                    this.catchedFish = rocket
                    this.checker++
                    console.log("if activated")
                    this.player = player
                }
            }
        })
        if (this.checker === 1) {
            this.updatePosition(this.catchedFish, this.player, double);
        }
    }

    private updatePosition(rocket: Rocket, player: Player, double: boolean) {
        rocket.yPosition = this._yPosition;
        rocket.xPosition = player.xPosition + player.image.width - 50;
        console.log(rocket.yPosition)
        if (rocket.yPosition <= this.maxY && rocket._name == "aliveFish") {
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
        if (rocket.yPosition <= this.maxY && rocket._name == "deadFish") {
            this.checker = 0;
            this.soundEffect("./assets/Sounds/oof_sound.mp3", 0.5, 0.5);
        }
        if (rocket.yPosition <= this.maxY && rocket._name == "specialFish") {
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

}