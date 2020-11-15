<template>
<div id="main">
    <img id="bag" :src="require('@/assets/' + imgSrc)" />
    <div id="bag-health">
        <div :style="{width:health + '%'}"></div>
    </div>
    <div id="controls">
        <button id="punch" @click="punch">Punch</button>
        <button id="restart" @click="restart">Restart</button>
    </div>
</div>
</template>

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
        },
        restart() {
            this.health = 100
            this.imgSrc = 'bag.png'

        }
    }
}
</script>

<style scoped>
#main {
    max-width: 360px;
    margin: 1.5em auto auto;
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
    background-color: crimson;
    color: #fff;
    border: 1px solid crimson;
    border-radius: 5px;
    float: left;
}

#restart {
    padding: .5em 2em;
    background-color: black;
    color: #fff;
    border: 1px solid black;
    border-radius: 5px;
    float: right;

}
</style>
