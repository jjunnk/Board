<template>
<div>
    <div id="bag" :class="{burst : ended}"></div>
    <div id="bag-health">
        <div :style="{width:health + '%'}"></div>
    </div>
    <div id="controls">
        <div @click="punch" v-show="!ended"></div>
        <div @click="restart">Restart</div>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            health: 100,
            ended: false
        }
    },
    methods: {
        punch() {
            this.health -= 10
            if (this.health <= 0) this.ended = true
        },
        restart() {
            this.health = 100
            this.ended = false
        }
    }
}
</script>

<style scoped>
#bag {
    border: 1px solid red;
    width: 200px;
    height: 500px;
    margin: auto;
    background: url(/assets/punch-bag.png) center no-repeat;
    background-size: 80%;
}

#bag.burst {
    background-image: url(/assets/burst.png);
}

#bag-health {
    width: 200px;
    border: 2px solid #000;
    margin: 0 auto 20px auto;
}

#bag-health div {
    height: 20px;
    background: crimson
}

#controls {
    width: 120px;
    margin: 0 auto;
}
</style>
