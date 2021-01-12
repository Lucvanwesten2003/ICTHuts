class Game {
    private rockets: Rocket[];
    private player: Player;
    private canvas: HTMLCanvasElement;
    private score: number;
    private ctx: CanvasRenderingContext2D;
    private counter: number;
    private keyBoard: KeyboardListener;
    private hengel: Hengel;
    private catchedFish: Rocket;
    private netherPortal: Portal;
    private endPortal: Portal;
    private level: number;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.rockets = [];
        this.keyBoard = new KeyboardListener

        console.log(this.rockets);

        this.player = new Player('Me',
            this.canvas.width / 2.25,
            this.canvas.height / 2 - 80,
            5,
            "./assets/Images/mcboot.png");
        console.log(this.player);

        this.hengel = new Hengel(this.canvas.height / 2 - 60, 3, "./assets/Images/hook.png")

        this.netherPortal = new NetherPortal("./assets/Images/nether_portal.png");

        this.endPortal = new EndPortal("./assets/Images/end_portal.png");

        this.soundEffect("./assets/Sounds/Background_music.mp3", 0.5, 0.3);

        this.score = 0;
        this.level = 0;
        this.loop();
        this.counter = 0;
    }
    /**
     * Method for the Game Loop
     */
    public loop = () => {
        this.newLevel();
        this.score++;
        this.counter++;
        if (this.counter === 60) {
            this.makeFish()
            this.counter = 0;
        }
        console.log(this.level)
        this.draw();
        this.move();
        this.drawHengel(this.ctx)
        this.drawPortal(this.ctx)
        this.hengel.move(this.canvas)
        this.hengel.hengelCollidesWithFish(this.rockets, this.player);
        this.player.move(this.canvas);
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F11)) {
            location.reload()
        }
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F5)) {
            window.location.href = 'https://lucvanwesten2003.github.io/ICTHuts/';
        }
        requestAnimationFrame(this.loop);
    };

    private makeFish() {
        for (let index = 0; index < 1; index++) {
            let randomFish = ['alive', 'dead']
            const randomElement = randomFish[Math.floor(Math.random() * randomFish.length)];
            if (randomElement === 'alive') {
                this.rockets.push(new Rocket('aliveFish',
                    Game.randomNumber(0, this.canvas.width - 200),
                    Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50),
                    Game.randomNumber(2, 5), "aliveFish", "./assets/Images/aliveFish.png"));
                console.log("alvieFish");
            } else {
                this.rockets.push(new Rocket('deadFish',
                    Game.randomNumber(0, this.canvas.width - 200),
                    Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50),
                    Game.randomNumber(2, 5), "deadFish", "./assets/Images/deadFish.png"));
            }
        }
    }

    /**
     * Method to move the rockets
     */
    public move() {
        this.rockets.forEach((rocket) => {
            rocket.move()
        });
    }

    /**
* 
* @param ctx 
* draws the rocket
*/
    public drawHengel(ctx: CanvasRenderingContext2D) {
        //ctx.drawImage(this.hengel._catchedFish.image, this.hengel._catchedFish.xPosition, this.hengel._catchedFish.yPosition)
        ctx.drawImage(this.hengel.image, this.player.xPosition + this.player.image.width - 50, this.hengel.yPosition)
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.player.xPosition + this.player.image.width, this.player.yPosition + 25)
        ctx.lineTo(this.player.xPosition + this.player.image.width - 10, this.hengel.yPosition + 10)
        ctx.stroke()
    }

    public drawPortal(ctx: CanvasRenderingContext2D) {
        if (this.level == 1) {
            if (this.hengel._score > 2) {
                ctx.drawImage(this.netherPortal.image, this.canvas.width - this.netherPortal.image.width, this.player.yPosition - 100)
                this.portalCollision();
            }
        }
        if (this.level == 2) {
            if (this.hengel._score > 7) {
                ctx.drawImage(this.endPortal.image, this.canvas.width - this.endPortal.image.width, this.player.yPosition - 120)
                this.portalCollision();
            }
        }
    }


    /**
     * Draws all the necessary elements to the canvas
     */
    public draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw(this.ctx);

        // when there are elements in the rocket array
        if (this.rockets.length != 0) {
            // clear the canvas

            // draw each rocket
            this.rockets.forEach((rocket) => {
                rocket.draw(this.ctx)
            });

            //write the current score
            this.writeTextToCanvas(
                this.ctx,
                `Score is: ${this.hengel._score}`,
                40,
                this.canvas.width / 2,
                40,
            );
        }
    }

    private newLevel() {
        if (this.hengel._score < 3) {
            this.level = 1;
            document.body.style.background = `url("./assets/Images/achtergrond_level_1.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover'
        }
    }

    private portalCollision() {
        if (this.player.xPosition >= this.canvas.width - this.netherPortal.image.width - this.player.image.width) {
            this.soundEffect("./assets/Sounds/Nether_portal.mp3", 0.5, 0.1);
            this.player.image = GameItem.loadNewImage('./assets/Images/mcboot2.png');
            this.level = 2;
            document.body.style.background = `url("./assets/Images/achtergrond_level_2.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover'
            this.player.xPosition = 0;
            console.log("next level");
        }
        if (this.player.xPosition >= this.canvas.width - this.endPortal.image.width - this.player.image.width && this.level == 2) {
            this.soundEffect("./assets/Sounds/End_portal.mp3", 0.5, 0.3);
            this.level = 3;
            document.body.style.background = `url("./assets/Images/achtergrond_level_3.png") no-repeat center center fixed`;
            document.body.style.backgroundSize = 'cover'
            this.player.xPosition = 0;
            console.log("next level");
        }
    } 

    private soundEffect(url: string, time: number, volume: number) { 
        let audio = new Audio(url);
        audio.currentTime = time;
        audio.volume = volume;
        audio.play();
    } 

    /**
     * Writes text to the canvas
     * @param {string} text - Text to write
     * @param {number} fontSize - Font size in pixels
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} alignment - Where to align the text
     * @param {string} color - The color of the text
     */
    public writeTextToCanvas(
        ctx: CanvasRenderingContext2D,
        text: string,
        fontSize: number = 20,
        xCoordinate: number,
        yCoordinate: number,
        alignment: CanvasTextAlign = "center",
        color: string = "white"
    ) {
        ctx.font = `${fontSize}px Minecraft`;
        ctx.fillStyle = color;
        ctx.textAlign = alignment;
        ctx.fillText(text, xCoordinate, yCoordinate);
    }

    /**
     * Renders a random number between min and max
     * @param {number} min - minimum number
     * @param {number} max - maximum number
     */
    public static randomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }
}
