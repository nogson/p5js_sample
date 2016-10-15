var maxLineSize = 30;
var circles = [];
var speedBase = 2;
var circleSize = 30;
var radiusBase = 40;
var baseNumber = 6;


//初期化関数
function setup() {
    //canvas
    createCanvas(window.windowWidth, window.windowHeight);

    //円のインスタンスを作成
    _.each(_.range(maxLineSize), function(v, i) {
        var radius = radiusBase * i;
        //スピードはあまりはやくならないように0.01で調整
        var speed = (speedBase * (i + 1) * 0.01);

        _.each(_.range(baseNumber * i), function(value, j) {
            var degree = 360 / (baseNumber * i) * j;
            circles.push(new Circle(circleSize, radius, degree, speed, i));
        });
    });

}


//canvasに描画　毎フレーム実行される
function draw() {
    //背景を塗りつぶし
    background(255); //再描画

    _.each(circles, function(circle) {
        circle.move();
    });
}


//円のクラス
function Circle(size, radius, degree, speed, index) {
    this.x = width / 2;
    this.y = height / 2;
    this.degree = degree;
    this.rad = 0;
    this.radius = radius;
    this.size = size;
    this.isScaleUp = false;
		this.count = 0;

    this.move = function() {
        //角度を増やす
        this.degree += speed;
        //角度をラジアンに変換
        this.rad = this.degree * Math.PI / 180;
        //x座標
        this.x = width / 2 + this.radius * Math.cos(this.rad);
        //y座標
        this.y = height / 2 + this.radius * Math.sin(this.rad);

				this.count += 0.1;

				if(this.count > index){
						this.scale();
				}

        noStroke();
        fill('#000000');
        //x,yをもとに座表示セット
        ellipse(this.x, this.y, this.size, this.size);
    }

		this.scale = function(){
			if (this.size <= 0) {
					this.isScaleUp = true;
			} else if (this.size >= circleSize) {
					this.isScaleUp = false;
			}

			if (this.isScaleUp === true) {
					this.size += 0.5;
			} else {
					this.size -= 0.5;
			}
		}
}
