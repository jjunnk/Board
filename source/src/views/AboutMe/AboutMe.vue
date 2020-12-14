<template>
    <v-card flat class="project" color="base">
        <v-card-title class="base__title pa-0">About Me</v-card-title>
        <v-row>
            <v-col cols="12" md="5">
                <v-img :src="require('@/assets/about-origin.jpg')" aspect-ratio="1" />
            </v-col>
            <v-col cols="12" md="7" class="pl-md-14">
                <h1 color="primary">Skills</h1>
                <ul class="skill-bar-wrap">
                    <li v-for="(skill, i) in skills" :key="i">
                        <p>{{skill.name}}<span class="skill-percent">{{skill.percent}}%</span></p>
                        <div class="skill-bar">
                            <div class="skill" :data-skill="skill.percent"></div>
                        </div>
                    </li>
                </ul>
            </v-col>
        </v-row>
    </v-card>
</template>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

<script type="text/javascript">
    export default {
        data() {
            return {
                skills: this.$store.state.skills
            }
        },
        mounted() {
            this.skillAnimation()
        },
        methods: {
            skillAnimation() {
                const bars = document.querySelectorAll('.skill')
                setInterval(() => {
                    bars.forEach((bar) => {
                        var barWidth = parseFloat(bar.dataset.skill)

                        for (var i = 0; i < barWidth; i++) {
                            bar.style.width = i + '%'
                            bar.style.opacity = '1'
                        }
                    })
                }, 1000)
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

* {
    font-family: $fontfamily;
}

h1 {
    letter-spacing: 5px;
    font-weight: bold;
    font-size: 1.5rem;
    margin-bottom: 1em;
}

ul.skill-bar-wrap {
    padding: 0;
    li {
        margin-bottom: 20px;
    }
    p {
        margin: 5px 0;
        span {
            float: right;
        }
    }
    .skill-bar {
        height: 22px;
        width: 100%;
        border-radius: 20px;
        background: lightgray;
        position: relative;
        box-shadow: 2px 3px 3px $darkBrown, 2px 5px 5px $darkBrown;

    }

    .skill {
        height: 100%;
        width: 0;
        opacity: 0;
        background: $brown;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 2px 3px 3px $darkBrown, 2px 5px 5px $darkBrown;
        transition: 1s ease;
    }
}


div.theme--dark ul > li{
    .skill-bar{
        background: $darkBrown;
        box-shadow: 2px 3px 3px #3d3836 , 2px 5px 5px #3d3836;
        }
    .skill{
        background: $beige;
        box-shadow: none;
        box-shadow: 2px 3px 3px #3d3836, 2px 5px 5px #3d3836;
    }
}
</style>