/// <reference path="./Portal.ts" />

class EndPortal extends Portal {

    public constructor(image: string){
        super(image)
        this._image = this.loadNewImage(image)
    }
}