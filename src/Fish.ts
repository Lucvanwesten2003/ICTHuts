/// <reference path="./GameItem.ts" />

class Fish extends GameItem{
    private type: string;

    public constructor(name: string, xPos: number, yPos: number, speed: number, type: string, image: string){
        super(name,xPos,yPos,speed,image)
        this.name = name
        this._xPosition = xPos
        this._yPosition = yPos
        this._speed = speed
        this.type = type
        this._image = GameItem.loadNewImage(image)
        this.fishFactory()
    }

    
    get image(): HTMLImageElement{
        return this._image
    }
    
    set image(image: HTMLImageElement){
        this._image = image
    }

    /**
     * sets the image to the right type so the fish wont fall out of the air
     */
    public fishFactory() {
        if (this.type == "aliveFish") {
            this._xPosition = 0;
        } else {
            this._xPosition = 0;
        }
    }

    /**
     * moves the fish
     */
    public move(){
        if (this.type == "aliveFish" || 'deadFish') {
            this._xPosition += this.speed;
        } 
    };

    /**
     * 
     * @param ctx 
     * draws the fish
     */
    public draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this._image, this._xPosition, this._yPosition)
    }
}