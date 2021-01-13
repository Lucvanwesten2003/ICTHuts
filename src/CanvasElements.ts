abstract class CanvasElements {
    protected name: string;
    protected xPos: number;
    protected yPos: number;
    protected image: HTMLImageElement;

    constructor(
        name: string,
        xPos: number,
        yPos: number,
        image: string,
    ) {
        this.name = name;
        this.xPos = xPos;
        this.yPos = yPos;
        this.image = this.loadNewImage(image);
    }

    /**
     * Get name
     * @returns {string} - name
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Get x-position
     * @returns {number} - xPos
     */
    public getXPos(): number {
        return this.xPos;
    }

    /**
     * Return y-position
     * @returns {number} - yPos
     */
    public getYPos(): number {
        return this.yPos;
    }

    /**
     * Returns the width of the image
     * @returns {number} - image width
     */
    public getImageWidth(): number {
        return this.image.width;
    }

    /**
     * Returns the height of the image
     * @returns {number} - image height
     */
    public getImageHeight(): number {
        return this.image.height;
    }

    /**
     * Draw the fruit to the given canvas
     * @param {CanvasRenderingContext2D} ctx - context
     */
    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.xPos, this.yPos);
    }

    /**
     * Loads an image so it doesn't flicker
     * @param {HTMLImageElement} source
     * @return HTMLImageElement - returns an image
     */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}