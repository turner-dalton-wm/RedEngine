function SeededRandom(seed) {
    this.seed = seed;
    this.next = function() {
        this.seed = Math.sin(this.seed) * 10000;
        return this.seed - Math.floor(this.seed);
    }
    this.nextInt = function() {
        return Math.floor(this.next() * 9007199254740991);
    }
}

function Noise1(seed, octaves, persistance, frequency) {
    this.seed = seed;
    this.octaves = octaves;
    this.persistance = persistance;
    this.frequency = frequency;

    this.generate = function(x) {
        var total = 0;
        var freq = this.frequency;
        var amp = this.persistance;
        for(var i = 0; i < this.octaves; i++) {
            total += this.interpolateNoise(x * freq) * amp;
            freq *= 2;
            amp *= this.persistance;
        }
        return (total + 1) / 2;
    }

    this.interpolateNoise = function(x) {
        var intx = Math.floor(x);
        var fractx = x - intx;
        var v1 = this.smoothNoise(intx);
        var v2 = this.smoothNoise(intx + 1);
        return this.interpolate(v1, v2, fractx);
    }

    this.interpolate = function(a, b, x) {
        var ft = x * 3.1415927;
        var f = (1 - Math.cos(ft)) * .5;
        return  a * (1 - f) + b * f;
    }

    this.smoothNoise = function(x) {
        return this.getNoise(x) / 2 + this.getNoise(x - 1) / 4 + this.getNoise(x + 1) / 4;
    }

    this.getNoise = function(x) {
        var rng = new SeededRandom(this.hash(x, this.seed));
        var r = rng.nextInt();
        return (r & 32767) / 32767 - .5;
    }

    this.hash = function(x, y) {
        var a = x >= 0 ? 2 * x : -2 * x - 1;
        var b = y >= 0 ? 2 * y : -2 * y - 1;
        return a >= b ? a * a + a + b : a + b * b;
    }
}

function Noise2(seed, octaves, persistance, frequency) {
    this.seed = seed;
    this.octaves = octaves;
    this.persistance = persistance;
    this.frequency = frequency;

    this.generate = function(x, y) {
        var total = 0;
        var freq = this.frequency;
        var amp = this.persistance;
        for(var i = 0; i < this.octaves; i++) {
            total += this.interpolateNoise(x * freq, y * freq) * amp;
            freq *= 2;
            amp *= this.persistance;
        }
        return (total + 1) / 2;
    }

    this.interpolateNoise = function(x, y) {
        var intx = Math.floor(x);
        var fractx = x - intx;
        var inty = Math.floor(y);
        var fracty = y - inty;
        var v1 = this.smoothNoise(intx, inty);
        var v2 = this.smoothNoise(intx + 1, inty);
        var v3 = this.smoothNoise(intx, inty + 1);
        var v4 = this.smoothNoise(intx + 1, intx + 1);
        var i1 = this.interpolate(v1, v2, fractx);
        var i2 = this.interpolate(v3, v4, fractx);
        return this.interpolate(i1, i2, fracty);
    }

    this.interpolate = function(a, b, x) {
        var ft = x * 3.1415927;
        var f = (1 - Math.cos(ft)) * .5;
        return  a * (1 - f) + b * f;
    }

    this.smoothNoise = function(x, y) {
        var corners = (this.getNoise(x-1, y-1) + this.getNoise(x+1, y-1) + this.getNoise(x-1, y+1) + this.getNoise(x+1, y+1) ) / 16;
        var sides   = (this.getNoise(x-1, y) + this.getNoise(x+1, y) + this.getNoise(x, y-1) + this.getNoise(x, y+1) ) / 8;
        var center = this.getNoise(x, y) / 4;
        return corners + sides + center;
    }

    this.getNoise = function(x, y) {
        var rng = new SeededRandom(this.hash(this.hash(x, y), this.seed));
        var r = rng.nextInt();
        return (r & 32767) / 32767 - .5;
    }

    this.hash = function(x, y) {
        var a = x >= 0 ? 2 * x : -2 * x - 1;
        var b = y >= 0 ? 2 * y : -2 * y - 1;
        return a >= b ? a * a + a + b : a + b * b;
    }
}