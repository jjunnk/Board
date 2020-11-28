<template>
<v-card class="main" flat  height="100vh" :color="$vuetify.theme.dark ? 'base1' : 'info'">
    <v-container class="ma-auto">
        <v-btn id="clickbtn" @click="updateCount"></v-btn>
        <h2 id="status">{{status}}</h2>
        <h1>You clicked <b>{{numClicks}}</b> times</h1>
        <h1>You have <b>{{secs}} secs</b> left</h1>
    </v-container>
</v-card>
</template>

<script>
export default {
    data() {
        return {
            active: false,
            numClicks: 0,
            secs: 10,
            colors: ['#F7A381', '#EBC0C0', '#C0EBCC', '#CCCFEB', '#C0EBCC'],
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
            const color = this.colors[Math.round(Math.random() * (this.colors.length - 1))]
            btn.style.backgroundColor = color

            if (this.active == false) {
                this.secs = 10
                this.numClicks = 0
                this.active = true
            }

            if(this.numClicks % 10 == 0){
                btn.classList.add('decrement')
            }
        }
    }
}
</script>

<style scoped>

@keyframes decrement {
    from { transform:scale(1)}
    to{ transform:scale(.9)}
}

.decrement{animation: decrement .3s normal forwards ease-in-out;}
.main{
    color: #fff;
    text-align: center;
    position: relative;
    height:100%;
    margin:0;
    padding:0;
}

.container {
    position: absolute;
    transform: translate(-50%, -40%);
    top: 40%;
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
    background-color: #F7A381;
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
