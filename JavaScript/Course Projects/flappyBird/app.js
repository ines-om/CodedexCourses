let config = {
    renderer: Phaser.AUTO,
    width: 1525,
    height: 675,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  
  let game = new Phaser.Game(config);
  
  
  function preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('road', 'assets/road.png');
    this.load.image('column', 'assets/column.png');
    this.load.spritesheet('bird', 'assets/bird.png', { frameWidth: 80, frameHeight: 96 });
  }
  
  let isGameStarted = false;
  let bird; 
  let hasLanded = false;
  let hasBumped = false;
  let cursors;

  let messageToPlayer;

  function create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);

    cursors = this.input.keyboard.createCursorKeys();

    bird = this.physics.add.sprite(0, 50, 'bird').setScale(2);
    bird.setBounce(0.2);
    bird.setCollideWorldBounds(true);

    const roads = this.physics.add.staticGroup();

    const topColumns = this.physics.add.staticGroup({
        key: 'column',
        repeat: 1,
        setXY: { x: 200, y: 0, stepX: 400 }
      });
      
    const bottomColumns = this.physics.add.staticGroup({
        key: 'column',
        repeat: 1,
        setXY: { x: 450, y: 600, stepX: 500 },
      });

      
    const road = roads.create(200, 700, 'road').setScale(2.85).refreshBody();

    messageToPlayer = this.add.text(50, 50, `Instructions: Press space bar to start`, {
        fontFamily: '"Pixelify Sans", sans-serif',
        fontSize: "20px",
        color: "purple",
        backgroundColor: "pink",
        border: 'solid 10px'
    });
        
        messageToPlayer.setPosition(20, 20);

    this.physics.add.collider(bird, road);
    this.physics.add.overlap(bird, road, () => hasLanded = true, null, this);

    this.physics.add.collider(bird, road);

    this.physics.add.overlap(bird, topColumns, ()=>hasBumped=true,null, this);
    this.physics.add.overlap(bird, bottomColumns, ()=>hasBumped=true,null, this);

    this.physics.add.collider(bird, topColumns);
    this.physics.add.collider(bird, bottomColumns);
  }
  
  function update() {

    bird.body.velocity.x = 50;

    if (!isGameStarted) {
        bird.setVelocityY(-160);
    }
    if (cursors.space.isDown && !isGameStarted) {
        isGameStarted = true;
    }

    if (cursors.space.isDown && !isGameStarted) {
        isGameStarted = true;
        messageToPlayer.text = 'Instructions: Press the "^" button to stay upright\nAnd don\'t hit the columns or ground';
    }

    if (cursors.up.isDown) {
      bird.setVelocityY(-160);
    }
    if (cursors.up.isDown && !hasLanded) {
        bird.setVelocityY(-160);
    }

    if (!hasLanded || !hasBumped) {
        bird.body.velocity.x = 50;
   }
      
    if (hasLanded || hasBumped || !isGameStarted) {
        bird.body.velocity.x = 0;
    }

    if (hasLanded || hasBumped) {
        messageToPlayer.text = `Oh no! You crashed!`;
    }

    if (bird.x > 1050) {
        bird.setVelocityY(40);
        messageToPlayer.text = `Congrats! You won!`;
      } 
}

  
