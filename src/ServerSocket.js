function ServerSocket(ip, port) {
    var script = document.createElement("script");
    script.src = "http://" + ip + ":" + port + "/socket.io/socket.io.js";
    document.head.appendChild(script);

    this.ip = ip;
    this.port = port;
    this.socket = null;
    this.ready = false;
    this.init = function() {};

    script.onload = (function() {
        this.ready = true;
        this.init();
    }).bind(this);

    this.setInitFunction = function(funct) {
        this.init = funct;
        if(this.ready) funct();
    };

    this.connect = function() {
        this.socket = io.connect("http://" + this.ip + ":" + this.port);
        this.socket.on('error', console.error.bind(console));
        this.socket.on('message', console.log.bind(console));
    };

    this.send = function(type, data) {
        this.socket.emit(type, data);
    };

    this.receive = function(type, funct) {
        this.socket.on(type, function(data) {
            funct(data);
        });
    };
}