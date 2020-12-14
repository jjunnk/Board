<template>
<v-card flat class="main" color="base">
    <CalorieDiary v-if="pageMove === 'calorie-Diary'"/>
    <FastestClick  v-else-if="pageMove === 'Fastest-click-Game'"/>
    <PunchGame  v-else-if="pageMove === 'punch-game'"/>
    <TodoList  v-else-if="pageMove === 'todolist'"/>
</v-card>
</template>
<script>
import ProjectItem from '@/views/ProjectItem.vue'

import CalorieDiary from './CalorieDiary.vue'
import FastestClick from './FastestClick.vue'
import PunchGame from './PunchGame.vue'
import TodoList from './TodoList.vue'

export default {
    /* eslint-disable */
    name:'ProjectPage',
    components:{CalorieDiary,FastestClick, PunchGame, TodoList, ProjectItem },
    data() {
        return {
            project:{}
        }
    },
    created(){
        const projectId = ~~this.$route.params.id
        this.project = this.$store.getters.getProject(projectId)
        console.log(this.$route.params.id)
    },
    computed:{
        pageMove(){
            return this.$route.params.id
        }
    }
}
</script>


<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

/* fastest game style*/
@keyframes decrement {
    from { transform:scale(1)}
    to{ transform:scale(.9)}
}

.decrement{animation: decrement .3s normal forwards ease-in-out;}

.main {
    position: relative;
    height:100%;
    margin:0;
    padding:0;
}

#FastestGameWrapper .container {
    text-align: center;
    color: #fff;
    position: absolute;
    transform: translate(-50%, -40%);
    top: 40%;
    left: 50%;
}

#FastestGameWrapper #clickbtn {
    position: relative;
    border: none;
    color: #fff;
    width: 200px;
    height: 200px;
    transition: 0.3s;
    border-radius: 50%;
    background-color: #F7A381;
    margin-bottom: 1.7em 
}

#FastestGameWrapper #clickbtn:active {
    width: 190px;
    height: 190px;
}

#FastestGameWrapper #clickbtn:focus {
    outline: none;
}

#FastestGameWrapper #status {
    background: transparent;
    position: relative;
    font-size: 60px;
    text-transform: uppercase;
    font-weight:bold;
}

#FastestGameWrapper #timer {
    text-align: center;
    margin-top: 140px;
}

#FastestGameWrapper h1 {
    color: #fff;
    font-weight: 400;
    font-family: $fontfamily;
    font-size:1.8em;
}

#FastestGameWrapper .over {
    background-color: transparent;
    display: none;
}
</style>
