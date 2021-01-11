/// <reference path="./Portal.ts" />

class NetherPortal extends Portal {
    
    public constructor(image: string){
        super(image)
        this._image = this.loadNewImage(image)
    }
}