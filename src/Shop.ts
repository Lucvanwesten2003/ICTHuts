class Shop {
    private Prompts: CanvasElements[];
    private Powerups: CanvasElements[];
    private speedPopup: boolean;
    private twoXPopup: boolean;
    private specialfishPopup: boolean;
    private double: boolean;
    private special: boolean;
    private speedPotion: boolean;
    private shop: boolean;
    private hengel: Hengel;
    private player: Player;

    public constructor() {
        this.Prompts = [];
        this.Powerups = [];
        this.speedPopup = false;
        this.twoXPopup = false;
        this.specialfishPopup = false;
        this.shop = false;
        this.double = false;
        this.special = false;
        this.speedPotion = false;

        document.addEventListener("click", this.mouseHandler);
    }

    public kauloShop(hengel: Hengel, player: Player) {
        this.hengel = hengel;
        this.player = player;
    }

    private mouseHandler = (event: MouseEvent) => {
        let X = event.clientX / window.innerWidth;
        let Y = event.clientY / window.innerHeight;

        console.log(X);
        console.log(Y);
        
        if(X > 0 && X < 0.135 && Y > 0.138 && Y < 0.416){
            this.shop = true;
            document.body.style.background = `url("./assets/Images/The Shop.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover'
        }
        if (this.shop === true){
            if(X > 0.829 && X < 0.964 && Y > 0.051 && Y < 0.312){
                console.log(this.hengel._score)
                this.Prompts.splice(0, 1);
                this.shop = false;
            }
            if(this.twoXPopup === false && this.specialfishPopup === false && X > 0.321 && X < 0.430 && Y > 0.644 && Y < 0.722 || this.speedPopup === true){
                this.Prompts.splice(0, 1);
                this.Prompts.push(
                    new CanvasElement(
                        "Potion prompt",
                        0,
                        -200,
                        "./assets/Images/SpeedPrompt.png"
                    )
                );
                this.speedPopup = true;
                if(X > 0.439 && X < 0.473 && Y > 0.368 && Y < 0.434 && this.speedPotion === false && this.hengel._score >= 10){
                    this.hengel._score = this.hengel._score - 10;
                    this.speedPotion = true;
                    this.player.speed = this.player.speed * 2;
                    this.hengel._speed = this.hengel._speed * 2;
                    this.Powerups.push(
                        new CanvasElement(
                            "Speed Power",
                            0,
                            0,
                            "./assets/Images/SpeedPower.png"
                        )
                    )
                    this.Prompts.splice(0, 1);
                    this.speedPopup = false;
                } 
                if(X > 0.516 && X < 0.551 && Y > 0.370 && Y < 0.432){
                    console.log("no");
                    this.Prompts.splice(0, 1);
                    this.speedPopup = false;
                }
            } 
            if(this.speedPopup === false && this.specialfishPopup === false && X > 0.445 && X < 0.552 && Y > 0.643 && Y < 724 || this.twoXPopup === true){
                this.Prompts.splice(0, 1);
                this.Prompts.push(
                    new CanvasElement(
                        "two X Prompt",
                        0,
                        -200,
                        "./assets/Images/DoublePrompt.png"
                    )
                )
                this.twoXPopup = true;
                if(X > 0.441 && X < 0.475 && Y > 0.371 && Y < 0.436 && this.double === false && this.hengel._score >= 15){
                    this.hengel._score = this.hengel._score - 15;
                    this.double = true;
                    this.Powerups.push(
                        new CanvasElement(
                            "Double Points Power",
                            0,
                            0,
                            "./assets/Images/DoublePointsPower.png"
                        )
                    )
                    this.Prompts.splice(0, 1);
                    this.twoXPopup = false;
                } 
                if(X > 0.518 && X < 0.553 && Y > 0.371 && Y < 0.432){
                    console.log("no");
                    this.Prompts.splice(0, 1);
                    this.twoXPopup = false;
                } 
            } 
            if(this.speedPopup === false && this.twoXPopup === false && X > 0.574 && X < 0.681 && Y > 0.644 && Y < 0.721 || this.specialfishPopup === true){
                this.Prompts.splice(0, 1);
                this.Prompts.push(
                    new CanvasElement(
                        "Special Fish Prompt",
                        0,
                        -200,
                        "./assets/Images/SpecialPrompt.png"
                    )
                )
                this.specialfishPopup = true;
                if(X > 0.442 && X < 0.471 && Y > 0.362 && Y < 0.421 && this.special === false && this.hengel._score >= 20){
                    this.hengel._score = this.hengel._score - 20;
                    this.special = true;
                    this.Powerups.push(
                        new CanvasElement(
                            "Special Fish Power",
                            0,
                            0,
                            "./assets/Images/SpecialFishPower.png"
                        )
                    )
                    this.Prompts.splice(0, 1);
                    this.specialfishPopup = false;
                } 
                if(X > 0.511 && X < 0.541 && Y > 0.360 && Y < 0.416){
                    console.log("no");
                    this.Prompts.splice(0, 1);
                    this.specialfishPopup = false;
                }
            } 
        }
    }

    get _shop(): boolean {
        return this.shop;
    }

    get _special(): boolean {
        return this.special;
    }

    get _double(): boolean {
        return this.double;
    }

    get _Prompts(): CanvasElements[] {
        return this.Prompts;
    }

    get _Powerups(): CanvasElements[] {
        return this.Powerups;
    }
}