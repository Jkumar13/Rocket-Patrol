// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this); // add to existing, displayList and updateList
        this.isFiring = false; // track rocket's firing status
        this.moveSpeed = 2; // pixels per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // left/right movement
        if (game.input.mousePointer.x < this.x && this.x >= borderUISize + this.width) {
            this.x = game.input.mousePointer.x;
        }
        else if (game.input.mousePointer.x > this.x && this.x <= game.config.width - borderUISize - this.width) {
            this.x = game.input.mousePointer.x;
        }

        // fire button
        if (mouse.isDown && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play(); // play sfx
        }
        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}