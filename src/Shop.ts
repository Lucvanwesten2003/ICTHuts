class Shop {
    private Prompts: CanvasElements[];
    private Powerups: CanvasElements[];
    private double: boolean;
    private special: boolean;
    private speedPotion: boolean;
    private shop: boolean;
    private hengel: Hengel;
    private player: Player;

    public constructor() {
        this.Prompts = [];
        this.Powerups = [];
        this.shop = false;
        this.double = false;
        this.special = false;
        this.speedPotion = false;

        document.addEventListener("click", this.mouseHandler);
    }

    public updateShop(hengel: Hengel, player: Player) {
        this.hengel = hengel;
        this.player = player;
    }

    private mouseHandler = (event: MouseEvent) => {
        let X = event.clientX / window.innerWidth;
        let Y = event.clientY / window.innerHeight;

        if (X > 0 && X < 0.135 && Y > 0.138 && Y < 0.416) {
            this.shop = true;
            document.body.style.background = `url("./assets/Images/The Shop.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover'
        }
        if (this.shop === true) {
            if (X > 0.829 && X < 0.964 && Y > 0.051 && Y < 0.312) {
                this.Prompts.splice(0, 1);
                this.shop = false;
            }
            if (X > 0.321 && X < 0.430 && Y > 0.644 && Y < 0.722 && this.speedPotion === false && this.hengel._score >= 10) {
                this.hengel._score = this.hengel._score - 10;
                this.speedPotion = true;
                this.player.speed = this.player.speed * 2;
                this.hengel._speed = this.hengel._speed * 2;
                this.Powerups.push(
                    new CanvasElement(
                        "Speed Power",
                        0,
                        0,
                        "./assets/Images/SpeedPower.png",
                    )
                )
            }
        }
        if (X > 0.445 && X < 0.552 && Y > 0.643 && Y < 724 && this.double === false && this.hengel._score >= 15) {
            this.hengel._score = this.hengel._score - 15;
            this.double = true;
            this.Powerups.push(
                new CanvasElement(
                    "Double Points Power",
                    0,
                    0,
                    "./assets/Images/DoublePointsPower.png",
                )
            )
        }
        if (X > 0.574 && X < 0.681 && Y > 0.644 && Y < 0.721 && this.special === false && this.hengel._score >= 20) {
            this.hengel._score = this.hengel._score - 20;
            this.special = true;
            this.Powerups.push(
                new CanvasElement(
                    "Special Fish Power",
                    0,
                    0,
                    "./assets/Images/SpecialFishPower.png",
                )
            )
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

    get _speedPotion(): boolean {
        return this.speedPotion;
    }

    set _speedPotion(speedPotion: boolean) {
        this.speedPotion = speedPotion;
    }

    set _double(double: boolean) {
        this.double = double;
    }

    set _special(special: boolean) {
        this.special = special;
    }
}