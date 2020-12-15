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

        /**
     * Method to determine of the player is colliding with a rocket
     */
    public playerCollidesWithRocket(rockets: Rocket[]) {
        rockets.forEach((rocket) => {
            let testX: number;
            let testY: number;
            if (this._xPosition < rocket.xPosition) {
                testX = rocket.xPosition;
            } else if (this._xPosition > rocket.xPosition + rocket.image.width) {
                testX = rocket.xPosition + rocket.image.width;
            }

            if (this._yPosition < rocket.yPosition) {
                testY = rocket.yPosition;
            } else if (this._yPosition > rocket.yPosition + rocket.image.height) {
                testY = rocket.yPosition + rocket.image.height;
            }

            const distX = this._xPosition - testX;
            const distY = this._yPosition - testY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance <= this.radius) {
                console.log("Collides with Player");
                this.radius += 3;
            }
        });
    }

    
    public draw(ctx: CanvasRenderingContext2D){
        ctx.drawImage(this._image, this._xPosition, this._yPosition)
    }
    


}
