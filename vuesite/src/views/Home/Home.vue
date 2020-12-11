<template>
    <section class="home">
        <transition name="intro" mode="in-out">
            <Intro v-if="rangeSliderValue < maxValue" />
        </transition>
        <div class="home__titleContainer">
            <transition name="intro" mode="in-out">
                <h1 class="base__title font-weight-bold" v-if="rangeSliderValue > maxValue - 1" color="primary">{{ name1 }}<br/>{{ name2 }}</h1>
            </transition>
            <transition name="intro" mode="in-out">
                <h2 class="home__subTitle text-h6 mt-12" v-if="rangeSliderValue > maxValue - 1" color="primary">{{ jobTitle }}</h2>
            </transition>
        </div>
        <transition name="intro" mode="in-out">
            <div class="photoContainer" v-if="rangeSliderValue > maxValue - 1">
                <drawCanvas/>
            </div>
        </transition>
    </section>
</template>
<script>
    /* eslint-disable */
    import Intro from "./Intro.vue";
    import DrawCanvas from './DrawCanvas.vue'

    export default {
        name: 'home',
        components: {
            DrawCanvas,
            Intro
        },
        data() {
            return {
                name1: '이수진',
                name2: 'Lee sujin',
                jobTitle: 'Front-End Developer',
                maxValue: this.$store.state.maxRangeSliderValue,
                intro:false
            }
        },
        computed: {
            rangeSliderValue() {
                return this.$store.getters.getRangeSliderValue
            },

        },

        
    }
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.home {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: unset;
    overflow: hidden;
    height:100%;
    @include tablet {
        overflow: unset;
    }

    .iconContainer {
        display: flex;
        animation: mobileText 0.5s ease;
        animation-fill-mode: forwards;
    }

    .icon {
        display: inline-block;
        position: relative;
        text-decoration: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        margin-top: $s-9;
        margin-right: $s-6;
        padding: 0;

        &:after {
            content: none;
        }

        &:last-child {
            margin-right: 0;
        }

        &:hover {
            .iconName {
                opacity: 1;
                transform-origin: center;
                transform: translateX(-50%) rotate(10deg);
            }
        }

        .iconImage {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 25px;
            transform: translate(-50%, -50%);
        }

        .iconName {
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translateX(-50%) rotate(0deg);
            letter-spacing: 3px;
            opacity: 0;
            transition: all 0.3s ease;
            margin-left: 5%;
        }
    }

    .photoContainer {
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex: 0 65%;
        margin: 0 auto;
        animation: mobileText 0.5s ease;
        animation-fill-mode: forwards;
        overflow: hidden;

        @include tablet {
            flex: 0 100%;
            /* margin: $s-6 auto 0 auto; */
        }

        @include mobile {
            flex: 0 100%;
        }
    }

    &__titleContainer {
        display: inline-flex;
        flex: 0 35%;
        flex-direction: column;

         @include tablet {
             flex: 0 100%;
         }

        .base__title {
            font-family: $fontfamily !important;
            max-width: 400px;
            line-height: 1.8em;
            animation: mobileText 0.5s ease;
            animation-fill-mode: forwards;

            @include tablet {
                line-height: $s-9;
            }
        }
    }

    &__subTitle {
        font-family: $fontfamily !important;
        text-align: left;
        animation: mobileText 0.5s ease;
        animation-fill-mode: forwards;
    }
}
</style>