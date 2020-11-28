<template>
<div class="main">
    <img id="bag" :src="require('@/assets/' + imgSrc)" />
    <div id="bag-health">
        <div :style="{width:health + '%'}"></div>
    </div>
    <div id="controls">
        <v-btn id="punch" @click="punch" class="red darken-2" color="white">Punch</v-btn>
        <v-btn id="restart" @click="restart" color="primary">Restart</v-btn>
    </div>
</div>
</template>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.js"></script>

<script>

export default {
    data() {
        return {
            health: 100,
            imgSrc: 'bag.png'
        }
    },
    methods: {
        punch() {
            this.health -= 10
            if (this.health <= 0) {
                this.imgSrc = 'burst.png'
            }

            const bag = document.getElementById('bag')
            const h = 570
            const k = 20
            const a = -4 * k / Math.pow(h*2, 2)
            var ypos, start, time

            (function drawPosition(timestamp){
                if(!start){start = timestamp}
                time = timestamp - start
                ypos = a * Math.pow(((time + h) % (h*2) - h),2) + k
                bag.style.transform = 'translateX(' + -ypos + 'px)'
                window.requestAnimationFrame(drawPosition)                
            })(performance.now())


        },
        restart() {
            this.health = 100
            this.imgSrc = 'bag.png'

        }
    }
}
</script>

<style scoped>
.main {
    max-width: 360px;
    margin: 3em auto auto;
    text-align: center;
}

#bag {
    width: 360px;
    height: 360px;
    margin: auto;
    background-size: 80%;
}

#bag-health {
    width: 360px;
    border: 2px solid #000;
    margin: 0 auto 20px auto;
}

#bag-health div {
    height: 20px;
    background: crimson;
    transition: all .4s ease-in;
}

#controls {
    width: 300px;
    margin: 0 auto;
}

#punch {
    padding: .5em 2em;
    color: #fff !important;
    border-radius: 5px;
    float: left;
}

#restart {
    padding: .5em 2em;
    border-radius: 5px;
    float: right;

}
</style>
