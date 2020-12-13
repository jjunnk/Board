<template>
<v-card id="punchGameWrapper" flat max-width="360px" class="text-center ma-auto mt-6" color="base">
    <img id="bag" :src="require('@/assets/' + imgSrc)" />
    <div id="bag-health">
        <div :style="{width:health + '%'}"></div>
    </div>
    <div>
        <v-btn id="punch" @click="punch" class="red darken-2 mr-12 ml-2" dark>Punch</v-btn>
        <v-btn id="restart" @click="restart" color="primary">Restart</v-btn>
    </div>
</v-card>
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
    created(){
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

#bag {
    width: 360px;
    height: 360px;
    margin: auto;
    background-size: 80%;
}

#bag-health {
    width: 100%;
    border: 2px solid #000;
    margin: 0 auto 20px auto;
}

#bag-health div {
    height: 20px;
    background: crimson;
    transition: all .4s ease-in;
}

</style>
