class Game {
    private rockets: Rocket[];
    private player: Player;
    private canvas: HTMLCanvasElement;
    private score: number;
    private ctx: CanvasRenderingContext2D;
    private counter: number;
    private keyBoard: KeyboardListener;
    private hengel: Hengel;

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
            "./assets/mcboot.png");
        console.log(this.player);

        this.hengel = new Hengel(this.canvas.height / 2 - 60, 3, "./assets/hook.png")

        this.score = 0;
        this.loop();
        this.counter = 0;
    }
    /**
     * Method for the Game Loop
     */
    public loop = () => {
        this.newLevel();
        this.counter++;
        if (this.counter === 60) {
            this.makeFish()
            this.counter = 0;
        }
        this.draw();
        this.move();
        this.drawHengel(this.ctx)
        this.hengel.move(this.canvas)
        this.hengel.hengelCollidesWithFish(this.rockets, this.player.xPosition);
        this.player.move(this.canvas);
        if (this.keyBoard.isKeyDown(KeyboardListener.KEY_F11)) {
            location.reload()
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
                    Game.randomNumber(2, 5), "aliveFish", "./assets/aliveFish.png"));
                console.log("alvieFish");
            } else {
                this.rockets.push(new Rocket('deadFish',
                    Game.randomNumber(0, this.canvas.width - 200),
                    Game.randomNumber(this.player.yPosition + 200, this.canvas.height - 50),
                    Game.randomNumber(2, 5), "deadFish", "./assets/deadFish.png"));
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
        ctx.drawImage(this.hengel.image, this.player.xPosition + this.player.image.width - 50, this.hengel.yPosition)
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.player.xPosition + this.player.image.width, this.player.yPosition + 25)
        ctx.lineTo(this.player.xPosition + this.player.image.width - 10, this.hengel.yPosition + 10)
        ctx.stroke()
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
                40
            );
        }
    }

    private newLevel() {
        if(this.hengel._score < 5) {
            document.body.style.background = `url("./assets/achtergrond_level_1.png") no-repeat center center fixed`;
        }
        else if(this.hengel._score> 10 && this.hengel._score < 15) {
            document.body.style.background = `url("./assets/achtergrond_level_2.png") no-repeat center center fixed`;
        }
        else if(this.hengel._score> 15) {
            document.body.style.background = `url("./assets/achtergrond_level_3.png") no-repeat center center fixed`;
        }
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
        color: string = "red"
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

    public getScore(): number {
        console.log(this.score);
        return this.score;
    }
}
