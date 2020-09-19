<template>
    <canvas id="canvas" width="300" height="300" v-on:click="clickCanvas"></canvas>
</template>

<script>
export default {
    name: "Graph",
    props: {
        radius: Number
    },
    data() {
        return {
            address: 'localhost:8090'
        }
    },
    methods: {
        drawCanvas() {
            const canvas = document.getElementById("canvas");
            let context = canvas.getContext("2d");

            context.clearRect(0, 0, canvas.width, canvas.height);

            let r;
            if (this.r) {
                r = Number(this.r);
            } else {
                r = 3;
            }

            //прямоугольник
            context.beginPath();
            context.rect(150, 150, 65, 130);
            context.closePath();
            context.strokeStyle = "blue";
            context.fillStyle = "blue";
            context.fill();
            context.stroke();

            // сектор
            context.beginPath();
            context.moveTo(150, 150);
            context.arc(150, 150, 130, -Math.PI / 2, Math.PI, true);
            context.closePath();
            context.strokeStyle = "blue";
            context.fillStyle = "blue";
            context.fill();
            context.stroke();

            //треугольник
            context.beginPath();
            context.moveTo(150, 150);
            context.lineTo(280, 150);
            context.lineTo(150, 85);
            context.lineTo(150, 150);
            context.closePath();
            context.strokeStyle = "blue";
            context.fillStyle = "blue";
            context.fill();
            context.stroke();

            //отрисовка осей
            context.beginPath();
            context.strokeStyle = "black";
            context.fillStyle = "black";
            context.font = "10px Verdana";
            context.moveTo(150, 0);
            context.lineTo(150, 300);
            context.moveTo(150, 0);
            context.lineTo(145, 15);
            context.moveTo(150, 0);
            context.lineTo(155, 15);
            context.fillText("Y", 160, 10);
            context.moveTo(0, 150);
            context.lineTo(300, 150);
            context.moveTo(300, 150);
            context.lineTo(285, 145);
            context.moveTo(300, 150);
            context.lineTo(285, 155);
            context.fillText("X", 290, 135);

            // деления X
            context.moveTo(145, 20);
            context.lineTo(155, 20);
            context.fillText(r, 160, 20);
            context.moveTo(145, 85);
            context.lineTo(155, 85);
            context.fillText((r / 2), 160, 78);
            context.moveTo(145, 215);
            context.lineTo(155, 215);
            context.fillText(-(r / 2), 160, 215);
            context.moveTo(145, 280);
            context.lineTo(155, 280);
            context.fillText(-r, 160, 280);
            // деления Y
            context.moveTo(20, 145);
            context.lineTo(20, 155);
            context.fillText(-r, 20, 170);
            context.moveTo(85, 145);
            context.lineTo(85, 155);
            context.fillText(-(r / 2), 70, 170);
            context.moveTo(215, 145);
            context.lineTo(215, 155);
            context.fillText((r / 2), 215, 170);
            context.moveTo(280, 145);
            context.lineTo(280, 155);
            context.fillText(r, 280, 170);

            context.closePath();
            context.strokeStyle = "black";
            context.fillStyle = "black";
            context.stroke();
        },
        clickCanvas(event) {
            let elem = document.getElementById('canvas');
            let br = elem.getBoundingClientRect();
            let left = br.left;
            let top = br.top;
            let x = event.clientX - left;
            let y = event.clientY - top;
            let isHit = this.fits(x, y);
            this.drawPoint(x, y, isHit);
        },
        fits(x, y) {
            ({x, y} = this.formatPoints(x, y));
            if (x >= 0 && y <= 0 && x <= (this.r / 2) && y >= -this.r)
                return 'true';
            if (x >= 0 && y >= 0 && y <= (this.r - x) / 2)
                return 'true';
            if (x <= 0 && y >= 0 && x * x + y * y <= this.r * this.r)
                return 'true';
            return 'false';
        },
        drawPoint(x, y, isGoal) {
            let canvas = document.getElementById('canvas'),
                context = canvas.getContext("2d");
            context.beginPath();
            context.arc(x, y, 2, 0, 2 * Math.PI, false);
            context.closePath();
            if (isGoal === 'true' || isGoal === true) {
                context.strokeStyle = "green";
                context.fillStyle = "green";
            } else {
                context.strokeStyle = "red";
                context.fillStyle = "red";
            }
            context.fill();
            context.stroke();
            ({x, y} = this.formatPoints(x, y));
            this.sendPoint(x, y)
        },
        sendPoint(xNormalized, yNormalized, radius) {
            const requestOptions = {
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                method: 'POST',
                body: JSON.stringify({
                    x: xNormalized,
                    y: yNormalized,
                    r: radius ? radius : this.r
                }),
                credentials: 'include'
            }
            console.log(JSON.stringify({
                x: xNormalized,
                y: yNormalized,
                r: Number(this.r)
            }));
            fetch(`http://${this.address}/backend/api/point/check`, requestOptions)
                .then(res => {
                    res.text().then(text => {
                        console.log(text);
                    })
                });
        },
        formatPoints(x, y) {
            return {x: this.r * (x - 150) / 130, y: this.r * (150 - y) / 130}
        }
    },
    mounted() {
        this.drawCanvas();
    },
    watch: {
        r: function (val) {
            if (val < 5 && val > -3) {
                this.drawCanvas();
            }
        }
    },
    computed: {
        r: function () {
            return this.radius;
        }
    }
}
</script>

<style scoped>

</style>
