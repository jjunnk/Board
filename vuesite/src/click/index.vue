<template>
<v-main class="main">
    <v-container class="ma-auto">
        <v-btn id="clickbtn" @click="updateCount"></v-btn>
        <h2 id="status">{{status}}</h2>
        <h1>You clicked <b>{{numClicks}}</b> times</h1>
        <h1>You have <b>{{secs}} secs</b> left</h1>
    </v-container>
</v-main>
</template>

<script>
export default {
    data() {
        return {
            active: false,
            numClicks: 0,
            secs: 10,
            colors: ['#9bcd77', '#d777b0', '#fed401', '#ff2c3c', '#66c652'],
            status: ''

        }
    },
    created() {
        setInterval(() => {
            if (this.active) {
                this.secs-- // 1 감소
                if (this.secs == 0) {
                    this.active = false
                    const btn = document.getElementById('clickbtn')
                    btn.classList.add('over')
                    this.status = 'Game Over'
                }
            }

        }, 1000)

    },
    methods: {
        updateCount() {
            this.numClicks += 1
            const btn = document.getElementById('clickbtn')

            if (this.active == false) {
                this.secs = 10
                this.numClicks = 0
                this.active = true
            }
            const color = this.colors[Math.round(Math.random() * (this.colors.length - 1))]
            btn.style.backgroundColor = color
        }
    }
}
</script>

<style scoped>
.main {
    background-color: #323133;
    color: #fff;
    text-align: center;
    background-image: url('http://imgh.us/bg_12.svg');
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    background-attachment: fixed;
    min-height: 600px;
    position: relative
}

.container {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
}

#clickbtn {
    position: relative;
    border: none;
    color: #fff;
    width: 200px;
    height: 200px;
    transition: 0.3s;
    border-radius: 50%;
    background-color: #f2ca27;
    margin-bottom: 1.5em
}

#clickbtn:active {
    width: 190px;
    height: 190px;
}

#clickbtn:focus {
    outline: none;
}

#status {
    background: transparent;
    position: relative;
    font-size: 60px;
    text-transform: uppercase;
}

#timer {
    text-align: center;
    margin-top: 140px;
}

h1 {
    color: #fff;
    font-weight: 300;
}

.over {
    background-color: transparent;
    display: none;
}
</style>
