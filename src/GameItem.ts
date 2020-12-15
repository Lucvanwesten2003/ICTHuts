abstract class GameItem{
    protected name: string
    protected _xPosition: number;
    protected _yPosition: number;
    protected speed: number;
    protected _image: HTMLImageElement;

    public constructor(name: string, xPos: number, yPos: number, speed: number, image: string){
        this.name = name
        this._xPosition = xPos
        this._yPosition = yPos
        this.speed = speed
        this._image = this.loadNewImage(image)
    }

    get xPosition(): number{
        return this._xPosition
    }

    get yPosition(): number{
        return this._yPosition
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