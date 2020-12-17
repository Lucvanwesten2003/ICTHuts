
class Player extends GameItem{
    private radius: number;
    private keyBoardListener: KeyboardListener;

    public constructor(name: string, xPos: number, yPos: number, speed: number, image: string){
        super(name,xPos,yPos,speed,image)
        this.name = name
        this._xPosition = xPos
        this._yPosition = yPos
        this.speed = speed
        this._image = this.loadNewImage(image)
        this.keyBoardListener = new KeyboardListener();
    }

    /**
     * moves the player if key is pressed
     */
    public move(canvas: HTMLCanvasElement) {
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_LEFT) && this._xPosition > 20) {
            this._xPosition -= this.speed;
        } 
        if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_RIGHT) && this._xPosition < canvas.width - 270) {
            this._xPosition += this.speed;
    }
        // if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_UP)) {
        //     //this._yPosition -= this.speed;
        // }
        // if (this.keyBoardListener.isKeyDown(KeyboardListener.KEY_DOWN)) {
        //     //this._yPosition += this.speed;
        // }
    }

    
    public draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this._image, this._xPosition, this._yPosition)
    } 

    get yPos(): number {
        return this.yPos;
    }  
}
