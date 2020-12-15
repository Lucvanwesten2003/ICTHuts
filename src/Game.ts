class Game {
    private rockets: Rocket[];
    private player: Player;
    private canvas: HTMLCanvasElement;
    private score: number;
    private ctx: CanvasRenderingContext2D;
    private counter: number;

    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext("2d");
        this.rockets = [];

        console.log(this.rockets);

        this.player = new Player('Me', 
        this.canvas.width / 2, 
        this.canvas.height / 2 - 80,
        5,
        "./assets/mcboot.png");
        console.log(this.player);

        this.score = 0;
        this.loop();
        this.counter = 0;
    }
    /**
     * Method for the Game Loop
     */
    public loop = () => {
        this.score++;
        this.counter++;
        if(this.counter === 60 ){
            this.makeFish()
            this.counter = 0;
        }
        this.draw();
        this.move();
        this.player.playerCollidesWithRocket(this.rockets);
        this.player.move(this.canvas);



        requestAnimationFrame(this.loop);
    };

    private makeFish() {
        for (let index = 0; index < 1; index++) {
            let randomFish = ['alive','dead']
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
                `Score is: ${this.score}`,
                40,
                this.canvas.width / 2,
                40
            );
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
 }
