<template>
    <v-container id="calorieCounter">
        <v-card>
            <v-toolbar class="text--center headline font-weight-bold" flat>
                칼로리 다이어리
            </v-toolbar>
            <v-divider/>
        
            <v-card-title class="text--center">
                <v-icon left>mdi-brightness-5</v-icon> 아침 식사
                <v-spacer/>
                <vue-timepicker  format="hh:mm A" :minute-interval="5" placeholder="시간 선택" />
            </v-card-title>
            <v-row class="item header ma-0 px-4 " width="100%">
                <v-col cols="3">음식</v-col>
                <v-col cols="2">칼로리 (kcal)</v-col>
                <v-col cols="2">지방 (g)</v-col>
                <v-col cols="2">탄수화물 (g)</v-col>
                <v-col cols="2">단백질 (g)</v-col>
                <v-col cols="1"></v-col>
            </v-row>
            <v-row class="item ma-0 px-4" width="100%" v-for="(item,i) in items" :key="i">
                <v-col cols="3">
                    <v-text-field placeholder="음식 명" v-model="item.name" @keypress.enter="saveItem" >
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="item.calories"
                        @keypress.enter="saveItem"></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="지방 (g)" type="number" v-model="item.fat" @keypress.enter="saveItem">
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="item.carbs" @keypress.enter="saveItem">
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="단백질 (g)" type="number" v-model="item.protein" @keypress.enter="saveItem">
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn icon @click="removeItem(i)">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-footer>
                <v-col cols="4">총 칼로리</v-col>
                <v-col cols="2">{{ totalCalories}} Kcal</v-col>
                <v-col cols="2">{{totalFat}} g</v-col>
                <v-col cols="2">{{totalCarbs}} g</v-col>
                <v-col cols="2">{{totalProtein}} g</v-col>
            </v-footer>
            <v-footer class="new">
                <v-col cols="3">
                    <v-text-field placeholder="음식 명" v-model="newName" @keypress.enter="addItem" >
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="newCalories"
                        @keypress.enter="addItem" ></v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="지방 (g)" type="number" v-model="newFat" @keypress.enter="addItem" >
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="newCarbs" @keypress.enter="addItem" >
                    </v-text-field>
                </v-col>
                <v-col cols="2">
                    <v-text-field placeholder="단백질 (g)" type="number" v-model="newProtein" @keypress.enter="addItem" >
                    </v-text-field>
                </v-col>
                <v-col cols="1">
                    <v-btn icon outlined @click="addItem()">
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-footer>
        </v-card>
    </v-container>
</template>
<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

    export default {
        components:{VueTimepicker},
        data() {
            return {
                items: [{
                    id: 1,
                    name: '떡볶이',
                    calories: 280,
                    fat: 2.91,
                    carbs: 60.42,
                    protein: 6.97
                }],
                totalCalories: '',
                totalFat: '',
                totalCarbs: '',
                totalProtein: '',
                newName: '',
                newCalories: '',
                newFat: '',
                newCarbs: '',
                newProtein: '',

            }
        },
        created(){
            this.saveItem()
        },
        methods: {
            addItem() {
                const name = this.newName.trim()
                const calories = parseFloat(this.newCalories.trim() || 0)
                const fat = parseFloat(this.newFat.trim() || 0)
                const carbs = parseFloat(this.newCarbs.trim() || 0)
                const protein = parseFloat(this.newProtein.trim() || 0)
                if (name && calories) {
                    this.items.push({
                        name: name,
                        calories: calories,
                        fat: fat,
                        carbs: carbs,
                        protein: protein
                    })
                    this.newName = '',
                        this.newCalories = '',
                        this.newFat = '',
                        this.newCarbs = '',
                        this.newProtein = ''
                calculateTotals(this)

                } else {
                    alert('음식 데이터를 추가하세요')
                }
            },
        
            removeItem(i) {
                this.items.splice(i, 1)
                calculateTotals(this)
            },
            saveItem() {
                calculateTotals(this)

            },
            customFormatter(time){
                return moment(time).format('hh:mm a')
            }

        }
    }

    function calculateTotals(calorieCounter) {
        calorieCounter.totalCalories = parseTotals(calorieCounter.items, 'calories')
        calorieCounter.totalFat = parseTotals(calorieCounter.items, 'fat')
        calorieCounter.totalCarbs = parseTotals(calorieCounter.items, 'carbs')
        calorieCounter.totalProtein = parseTotals(calorieCounter.items, 'protein')
    }

    function parseTotals(array, element) {
        var sum = 0
        array.forEach((item) => {
            sum = sum + parseFloat(item[element])
        }, sum, element)
        return sum
    }
</script>
<style scoped>
.v-toolbar__content{text-align:center !important;}
</style>