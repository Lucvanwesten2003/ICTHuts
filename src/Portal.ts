abstract class Portal {
    protected _image: HTMLImageElement;

    public constructor(image: string){
        this._image = this.loadNewImage(image)
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

    get image(): HTMLImageElement{
        return this._image;
    }
}