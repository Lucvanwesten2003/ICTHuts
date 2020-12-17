/// <reference path="./Player.ts" />


class Hengel{
    private keyBoard: KeyboardListener;
    private maxY: number;
    private _yPosition: number;
    private speed: number
    private _image: HTMLImageElement;

    public constructor(yPos: number, speed: number, image: string){
        this.maxY = yPos
        this._yPosition = yPos
        this.speed = speed
        this.keyBoard = new KeyboardListener();
        this._image = this.loadNewImage(image)
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
  
}