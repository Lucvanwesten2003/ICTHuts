/// <reference path="./Player.ts" />


class Hengel{
    private keyBoard: KeyboardListener;
    private maxY: number;
    private _yPosition: number;
    private speed: number
    private _image: HTMLImageElement;
    private score: number;

    public constructor(yPos: number, speed: number, image: string){
        this.maxY = yPos
        this._yPosition = yPos
        this.speed = speed
        this.keyBoard = new KeyboardListener();
        this._image = this.loadNewImage(image)
        this.score = 0;
    }


    get yPosition(): number{
        return this._yPosition
    }

    get image(): HTMLImageElement{
        return this._image;
    }

    public move(canvas: HTMLCanvasElement){
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_UP) && this._yPosition > this.maxY){
            this._yPosition -= this.speed
        }
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_DOWN)&& this._yPosition < canvas.height - 50){
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
    public hengelCollidesWithFish(rockets: Rocket[], xPos: number) {
        rockets.forEach((rocket) => {
            if (rocket.xPosition < xPos + this._image.width &&
                rocket.xPosition + rocket.image.width > xPos &&
                rocket.yPosition < this._yPosition + this._image.height &&
                rocket.yPosition + rocket.image.height > this._yPosition) {
                console.log('pog')
                this.score += 1;
             }
        });
    }

    get _score(): number {
        return this.score;
    }
}