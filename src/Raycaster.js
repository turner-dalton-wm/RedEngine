function Camera(position) {
    this.position = position || new Vector(1, 1);
    this.direction = new Vector(-1, 0);
    this.plane = new Vector(0, .9);

    this.speed = .05;

    this.getX = function() {
        return this.position.x;
    };
    this.getY = function() {
        return this.position.y;
    };
}

function World() {
    this.map = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];

    this.get = function(x, y) {
        var width = this.map[0].length;
        var height = this.map.length;
        if(x < 0 || x >= width || y < 0 || y >= height) return 1;
        return this.map[y][x];
    };
}

function Raycaster(engine, camera, world) {
    this.engine = engine;
    this.camera = camera;
    this.world = world;
    this.color = new Color(255, 0, 0);

    this.update = function() {
        var speed = this.camera.speed;
        var posX = this.camera.position.x;
        var posY = this.camera.position.y;
        var dirX = this.camera.direction.x;
        var dirY = this.camera.direction.y;
        var plnX = this.camera.plane.x;
        var plnY = this.camera.plane.y;
        if(engine.key("W")) {
            if(this.world.get(Math.floor(posX + dirX * speed), Math.floor(posY)) == 0) this.camera.position.x += dirX * speed;
            if(this.world.get(Math.floor(posX), Math.floor(posY + dirY * speed)) == 0) this.camera.position.y += dirY * speed;
        }
        if(engine.key("S")) {
            if(this.world.get(Math.floor(posX - dirX * speed), Math.floor(posY)) == 0) this.camera.position.x -= dirX * speed;
            if(this.world.get(Math.floor(posX), Math.floor(posY - dirY * speed)) == 0) this.camera.position.y -= dirY * speed;
        }
        if(engine.key("A")) {
            if(this.world.get(Math.floor(posX - plnX * speed), Math.floor(posY)) == 0) this.camera.position.x -= plnX * (speed / 1);
            if(this.world.get(Math.floor(posX), Math.floor(posY - plnY * speed)) == 0) this.camera.position.y -= plnY * (speed / 1);
        }
        if(engine.key("D")) {
            if(this.world.get(Math.floor(posX + plnX * speed), Math.floor(posY)) == 0) this.camera.position.x += plnX * (speed / 1);
            if(this.world.get(Math.floor(posX), Math.floor(posY + plnY * speed)) == 0) this.camera.position.y += plnY * (speed / 1);
        }
    };

    this.render = function(context, entities) {
        var posX = this.camera.position.x;
        var posY = this.camera.position.y;
        var dirX = this.camera.direction.x;
        var dirY = this.camera.direction.y;
        var plnX = this.camera.plane.x;
        var plnY = this.camera.plane.y;
        var width = this.engine.canvas.width;
        var height = this.engine.canvas.height;

        var buffer = new Array(width);

        for(var x = 0; x < width; x++) {
            var cameraX = 2 * x / width - 1;
            var rdx = dirX + plnX * cameraX;
            var rdy = dirY + plnY * cameraX;
            var mapX = Math.floor(posX);
            var mapY = Math.floor(posY);
            var deltaX = Math.sqrt(1 + (rdy * rdy) / (rdx * rdx));
            var deltaY = Math.sqrt(1 + (rdx * rdx) / (rdy * rdy));

            var stepX, stepY, sideX, sideY;
            if(rdx < 0) {
                stepX = -1;
                sideX = (posX - mapX) * deltaX;
            }
            else {
                stepX = 1;
                sideX = (mapX + 1 - posX) * deltaX;
            }
            if(rdy < 0) {
                stepY = -1;
                sideY = (posY - mapY) * deltaY;
            }
            else {
                stepY = 1;
                sideY = (mapY + 1 - posY) * deltaY;
            }

            var side;
            var exit = false;
            while(!exit) {
                if(sideX < sideY) {
                    sideX += deltaX;
                    mapX += stepX;
                    side = 0;
                }
                else {
                    sideY += deltaY;
                    mapY += stepY;
                    side = 1;
                }
                if(this.world.get(mapX, mapY) > 0) exit = true;
            }

            var distance;
            if(side == 0) {
                distance = Math.abs((mapX - posX + (1 - stepX) / 2) / rdx);
            }
            else {
                distance = Math.abs((mapY - posY + (1 - stepY) / 2) / rdy);
            }

            buffer[x] = distance;

            var lineHeight = Math.floor(Math.abs(height / distance));
            var start = Math.floor(-lineHeight / 2 + height / 2);
            var end = Math.floor(lineHeight / 2 + height / 2);

            var intensity = Math.min(1 / distance * 1, 1);
            var color = this.color.darken(intensity);
            context.fillStyle = color.getHex();
            context.fillRect(x, Math.max(start, 0), 1, end - start);

            context.fillStyle = "#333333";
            context.fillRect(x, end, 1, height - end);

            /*var resolution = 2;
            for(var y = end; y < height; y += resolution) {
                var percent = (y - end) / (height - end);
                context.fillStyle = color.blend(this.color, percent).getHex();
                context.fillRect(x, y, 1, resolution);
            }*/


        }
        /*context.fillStyle = "blue";
        for(var j = 0; j < entities.length; j++) {
            var entity = entities[j];
            var spriteX = entity.position.x - posX;
            var spriteY = entity.position.y - posY;
            var invDet = 1 / (plnX * dirY - dirX * plnY);
            var transformX = (spriteX * dirY - dirX * spriteY) * invDet;
            var transformY = (-plnY * spriteX + spriteY * plnX) * invDet;

            var screenX = Math.floor((width / 2) * (1 + transformX / transformY));
            var spriteHeight = Math.floor(Math.abs(height / transformY));
            var startY = -spriteHeight / 2 + height / 2;
            if(startY < 0) startY = 0;
            var endY = spriteHeight / 2 + height / 2;
            if(endY >= height) endY = height - 1;

            var spriteWidth = Math.floor(Math.abs(height / transformY));
            var startX = -spriteWidth / 2 + screenX;
            if(startX < 0) startX = 0;
            var endX = spriteWidth / 2 + screenX;
            if(endX >= width) endX = width - 1;

            for(var x = startX; x < endX; x++) {
                if(transformY > 0 && x > 0 && x < width && transformY < buffer[x]) {
                    context.fillRect(x, startY, 1, endY - startY);
                }
            }
        }*/
    };
}

/*index script
 var engine;
 function main() {
 engine = new Engine("canvas", 1920, 1080);

 engine.setAutoResize(true);
 engine.setClearColor("#aaaaaa");

 engine.update = update;
 engine.render = render;
 engine.init = init;

 engine.onMouseDown = onMouseDown;

 engine.world = new World();
 engine.camera = new Camera();
 engine.raycaster = new Raycaster(engine, engine.camera, engine.world);

 engine.canvas.onclick = function() {
 engine.canvas.requestPointerLock();
 };

 engine.start();
 }

 var entities;
 function init() {
 entities = [new Entity(new Vector(3, 3))];
 }

 function update() {
 engine.raycaster.update();
 }

 function render(context) {
 engine.clear();
 engine.raycaster.render(context, entities);
 }

 function onMouseDown(e) {
 var posX = engine.camera.position.x;
 var posY = engine.camera.position.y;
 var dirX = engine.camera.direction.x;
 var dirY = engine.camera.direction.y;
 var plnX = engine.camera.plane.x;
 var plnY = engine.camera.plane.y;
 var width = engine.canvas.width;
 var height = engine.canvas.height;
 var x = Math.floor(width / 2);

 var cameraX = 2 * x / width - 1;
 var rdx = dirX + plnX * cameraX;
 var rdy = dirY + plnY * cameraX;
 var mapX = Math.floor(posX);
 var mapY = Math.floor(posY);
 var deltaX = Math.sqrt(1 + (rdy * rdy) / (rdx * rdx));
 var deltaY = Math.sqrt(1 + (rdx * rdx) / (rdy * rdy));

 var stepX, stepY, sideX, sideY;
 if(rdx < 0) {
 stepX = -1;
 sideX = (posX - mapX) * deltaX;
 }
 else {
 stepX = 1;
 sideX = (mapX + 1 - posX) * deltaX;
 }
 if(rdy < 0) {
 stepY = -1;
 sideY = (posY - mapY) * deltaY;
 }
 else {
 stepY = 1;
 sideY = (mapY + 1 - posY) * deltaY;
 }

 var exit = false;
 var side, prevX, prevY;
 while(!exit) {
 if(sideX < sideY) {
 sideX += deltaX;
 mapX += stepX;
 side = 0;
 }
 else {
 sideY += deltaY;
 mapY += stepY;
 side = 1;
 }
 if(engine.world.get(mapX, mapY) > 0) exit = true;
 else {
 prevX = mapX;
 prevY = mapY;
 }
 }

 var distance;
 if(side == 0) {
 distance = Math.abs((mapX - posX + (1 - stepX) / 2) / rdx);
 }
 else {
 distance = Math.abs((mapY - posY + (1 - stepY) / 2) / rdy);
 }
 if(distance < 4) {
 if(e.button == 0) engine.world.map[mapY][mapX] = 0;
 if(e.button == 2) engine.world.map[prevY][prevX] = 1;
 }

 }

 function rotate(e) {
 var rotate = -e.movementX / 300;
 var dirX = engine.camera.direction.x;
 var dirY = engine.camera.direction.y;
 var plnX = engine.camera.plane.x;
 var plnY = engine.camera.plane.y;
 engine.camera.direction.x = (dirX * Math.cos(rotate) - dirY * Math.sin(rotate));
 engine.camera.direction.y = (dirX * Math.sin(rotate) + dirY * Math.cos(rotate));
 engine.camera.plane.x = (plnX * Math.cos(rotate) - plnY * Math.sin(rotate));
 engine.camera.plane.y = (plnX * Math.sin(rotate) + plnY * Math.cos(rotate));
 }

 document.addEventListener('pointerlockchange', function() {
 if(document.pointerLockElement === engine.canvas) {
 document.addEventListener("mousemove", rotate, false);
 }
 else {
 document.removeEventListener("mousemove", rotate, false);
 }
 }, false);
 */