abstract class GameItem{
    protected name: string
    protected _xPosition: number;
    protected _yPosition: number;
    protected _speed: number;
    protected _image: HTMLImageElement;

    public constructor(name: string, xPos: number, yPos: number, speed: number, image: string){
        this.name = name
        this._xPosition = xPos
        this._yPosition = yPos
        this._speed = speed
        this._image = GameItem.loadNewImage(image)
    }

    get xPosition(): number{
        return this._xPosition
    }

    set xPosition(xPos: number){
        this._xPosition = xPos
    }

    public get yPosition(): number{
        return this._yPosition
    }

    public set yPosition(yPos: number){
        this._yPosition = yPos;
    }

    public get image(): HTMLImageElement{
        return this._image;
    }

    public set image(img: HTMLImageElement){
        this._image = img
    }

    get speed(): number{
        return this._speed
    }

    set speed(speed: number){
        this._speed = speed;
    }

    get _name(): string{
        return this.name
    }

    

            /**
     * Loads an image so it doesn't flicker
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    static loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}