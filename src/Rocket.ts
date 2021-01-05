class Rocket extends GameItem{
    private type: string;

    public constructor(name: string, xPos: number, yPos: number, speed: number, type: string, image: string){
        super(name,xPos,yPos,speed,image)
        this.name = name
        this._xPosition = xPos
        this._yPosition = yPos
        this._speed = speed
        this.type = type
        this._image = this.loadNewImage(image)
        this.rocketFactory()
    }

    
    get image(): HTMLImageElement{
        return this._image
    }
    
    set image(image: HTMLImageElement){
        this._image = image
    }

    /**
     * sets the image to the right type so horizontal or vertical
     */
    public rocketFactory() {
        if (this.type == "aliveFish") {
            this._xPosition = 0;
        } else {
            this._xPosition = 0;
            
        }
    }
    


    /**
     * moves the rocket
     */
    public move(){
        if (this.type == "aliveFish" || 'deadFish') {
            this._xPosition += this.speed;
        } 
    };


    //     /**
    //  * Method to determine of a rocket leaves the window
    //  */
    // public rocketOutOfCanvas(canvas: HTMLCanvasElement) {
    //         if (this.type == "aliveFish" || 'deadFish') {
    //             if (this._xPosition + this.image.width >= canvas.width) {
    //                 this._xPosition = 0;
    //                 this._yPosition = Game.randomNumber(375, canvas.height - 50);
    //             }
    //         } else {
    //             if (this._yPosition + this.image.height >= canvas.height) {
    //                 this._yPosition = 0;
    //                 this._xPosition = Game.randomNumber(0, canvas.height);
    //             }
    //         }
    //     };


    /**
     * 
     * @param ctx 
     * draws the rocket
     */
    public draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this._image, this._xPosition, this._yPosition)
    }

}