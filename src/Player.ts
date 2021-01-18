class Player extends GameItem {
    private radius: number;
    private keyBoardListener: KeyboardListener;

    public constructor(name: string, xPos: number, yPos: number, speed: number, image: string) {
        super(name, xPos, yPos, speed, image)
        this.name = name
        this._xPosition = xPos
        this._yPosition = yPos
        this.speed = speed
        this._image = GameItem.loadNewImage(image)
        this.keyBoardListener = new KeyboardListener();
    }

    get yPosition(): number {
        return this._yPosition
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
    }

    /**
 * Method to determine if the hook is colliding with a fish
 */
    public playerCollidesWithRocket(fishes: Fish[]) {
        fishes.forEach((fishes) => {
            let testX: number;
            let testY: number;
            if (this._xPosition < fishes.xPosition) {
                testX = fishes.xPosition;
            } else if (this._xPosition > fishes.xPosition + fishes.image.width) {
                testX = fishes.xPosition + fishes.image.width;
            }

            if (this._yPosition < fishes.yPosition) {
                testY = fishes.yPosition;
            } else if (this._yPosition > fishes.yPosition + fishes.image.height) {
                testY = fishes.yPosition + fishes.image.height;
            }

            const distX = this._xPosition - testX;
            const distY = this._yPosition - testY;
            const distance = Math.sqrt(distX * distX + distY * distY);

            if (distance <= this.radius) {
                this.radius += 3;
            }
        });
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this._image, this._xPosition, this._yPosition)
    }
}
