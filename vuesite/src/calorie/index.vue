<template>
    <v-card flat width="100%" height="100%">
        <v-container id="calorieCounter">
            <v-card>
                <v-toolbar class="text--center" flat>
                    <v-spacer />
                    <v-toolbar-title class="text--center headline font-weight-bold" color="info">칼로리 다이어리 Calorie Diary
                    </v-toolbar-title>
                    <v-spacer />
                </v-toolbar>
                <v-divider />
                <v-expansion-panels multiple>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-icon left>mdi-brightness-5</v-icon> 아침 식사
                            <v-spacer />
                            <vue-timepicker format="hh:mm A" :minute-interval="5" placeholder="시간 선택" />
                            <div>{{ totalBFCalories }} Kcal</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pa-0">
                            <v-row class="item header ma-0 px-4 " width="100%">
                                <v-col cols="3">음식</v-col>
                                <v-col cols="2">칼로리 (kcal)</v-col>
                                <v-col cols="2">지방 (g)</v-col>
                                <v-col cols="2">탄수화물 (g)</v-col>
                                <v-col cols="2">단백질 (g)</v-col>
                                <v-col cols="1"></v-col>
                            </v-row>
                            <v-row class="item ma-0 px-4" width="100%" v-for="(BFitem,i) in BFitems" :key="i">
                                <v-col cols="3">
                                    <v-text-field placeholder="음식 명" v-model="BFitem.name" @keypress.enter="saveBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="BFitem.calories"
                                        @keypress.enter="saveBFItem"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="지방 (g)" type="number" v-model="BFitem.fat"
                                        @keypress.enter="saveBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="BFitem.carbs"
                                        @keypress.enter="saveBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="단백질 (g)" type="number" v-model="BFitem.protein"
                                        @keypress.enter="saveBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn icon @click="removeItem(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-footer class="new rounded-t">
                                <v-col cols="3">
                                    <v-text-field placeholder="음식 명" v-model="newBFName" @keypress.enter="addBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="newBFCalories"
                                        @keypress.enter="addBFItem"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="지방 (g)" type="number" v-model="newBFFat"
                                        @keypress.enter="addBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="newBFCarbs"
                                        @keypress.enter="addBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="단백질 (g)" type="number" v-model="newBFProtein"
                                        @keypress.enter="addBFItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn icon outlined @click="addBFItem()">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-footer>
                            <v-footer class="total rounded-b">
                                <v-col cols="3">총 칼로리</v-col>
                                <v-col cols="2">{{ totalBFCalories }} Kcal</v-col>
                                <v-col cols="2">{{ totalBFFat }} g</v-col>
                                <v-col cols="2">{{ totalBFCarbs }} g</v-col>
                                <v-col cols="2">{{ totalBFProtein }} g</v-col>
                                <v-col cols="1"></v-col>
                            </v-footer>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-icon left>mdi-brightness-7</v-icon>점심 식사
                            <v-spacer />
                            <vue-timepicker format="hh:mm A" :minute-interval="5" placeholder="시간 선택" />
                            <div>{{ totalLunchCalories }} Kcal</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pa-0">
                            <v-row class="item header ma-0 px-4 " width="100%">
                                <v-col cols="3">음식</v-col>
                                <v-col cols="2">칼로리 (kcal)</v-col>
                                <v-col cols="2">지방 (g)</v-col>
                                <v-col cols="2">탄수화물 (g)</v-col>
                                <v-col cols="2">단백질 (g)</v-col>
                                <v-col cols="1"></v-col>
                            </v-row>
                            <v-row class="item ma-0 px-4" width="100%" v-for="(lunchItem,i) in lunchItems" :key="i">
                                <v-col cols="3">
                                    <v-text-field placeholder="음식 명" v-model="lunchItem.name"
                                        @keypress.enter="saveLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="lunchItem.calories"
                                        @keypress.enter="saveLunchItem"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="지방 (g)" type="number" v-model="lunchItem.fat"
                                        @keypress.enter="saveLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="lunchItem.carbs"
                                        @keypress.enter="saveLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="단백질 (g)" type="number" v-model="lunchItem.protein"
                                        @keypress.enter="saveLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn icon @click="removeItem(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-footer class="new rounded-t">
                                <v-col cols="3">
                                    <v-text-field placeholder="음식 명" v-model="newLunchName"
                                        @keypress.enter="addLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="newLunchCalories"
                                        @keypress.enter="addLunchItem"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="지방 (g)" type="number" v-model="newLunchFat"
                                        @keypress.enter="addLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="newLunchCarbs"
                                        @keypress.enter="addLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="단백질 (g)" type="number" v-model="newLunchProtein"
                                        @keypress.enter="addLunchItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn icon outlined @click="addLunchItem()">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-footer>
                            <v-footer class="total rounded-b">
                                <v-col cols="3">총 칼로리</v-col>
                                <v-col cols="2">{{ totalLunchCalories }} Kcal</v-col>
                                <v-col cols="2">{{ totalLunchFat }} g</v-col>
                                <v-col cols="2">{{ totalLunchCarbs }} g</v-col>
                                <v-col cols="2">{{ totalLunchProtein }} g</v-col>
                                <v-col cols="1"></v-col>

                            </v-footer>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            <v-icon left>mdi-brightness-3</v-icon>저녁 식사
                            <v-spacer />
                            <vue-timepicker format="hh:mm A" :minute-interval="5" placeholder="시간 선택" />
                            <div>{{ totalDinnerCalories }} Kcal</div>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content class="pa-0">
                            <v-row class="item header ma-0 px-4 " width="100%">
                                <v-col cols="3">음식</v-col>
                                <v-col cols="2">칼로리 (kcal)</v-col>
                                <v-col cols="2">지방 (g)</v-col>
                                <v-col cols="2">탄수화물 (g)</v-col>
                                <v-col cols="2">단백질 (g)</v-col>
                                <v-col cols="1"></v-col>
                            </v-row>
                            <v-row class="item ma-0 px-4" width="100%" v-for="(dinnerItem,i) in dinnerItems" :key="i">
                                <v-col cols="3">
                                    <v-text-field placeholder="음식 명" v-model="dinnerItem.name"
                                        @keypress.enter="saveDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="dinnerItem.calories"
                                        @keypress.enter="saveDinnerItem"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="지방 (g)" type="number" v-model="dinnerItem.fat"
                                        @keypress.enter="saveDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="dinnerItem.carbs"
                                        @keypress.enter="saveDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="단백질 (g)" type="number" v-model="dinnerItem.protein"
                                        @keypress.enter="saveDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn icon @click="removeItem(i)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-row>
                            <v-footer class="new rounded-t">
                                <v-col cols="3">
                                    <v-text-field placeholder="음식 명" v-model="newDinnerName"
                                        @keypress.enter="addDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="칼로리 (kcal)" type="number" v-model="newDinnerCalories"
                                        @keypress.enter="addDinnerItem"></v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="지방 (g)" type="number" v-model="newDinnerFat"
                                        @keypress.enter="addDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="탄수화물 (g)" type="number" v-model="newDinnerCarbs"
                                        @keypress.enter="addDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="2">
                                    <v-text-field placeholder="단백질 (g)" type="number" v-model="newDinnerProtein"
                                        @keypress.enter="addDinnerItem">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="1">
                                    <v-btn icon outlined @click="addDinnerItem()">
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-footer>
                            <v-footer class="total rounded-b">
                                <v-col cols="3">총 칼로리</v-col>
                                <v-col cols="2">{{ totalDinnerCalories }} Kcal</v-col>
                                <v-col cols="2">{{ totalDinnerFat }} g</v-col>
                                <v-col cols="2">{{ totalDinnerCarbs }} g</v-col>
                                <v-col cols="2">{{ totalDinnerProtein }} g</v-col>
                                <v-col cols="1"></v-col>

                            </v-footer>

                        </v-expansion-panel-content>
                    </v-expansion-panel>

                </v-expansion-panels>
                <v-footer class="total">
                    <v-col cols="3">총 {{ totals }} Kcal</v-col>
                    <v-col cols="3">지방 {{ totalFat }} g</v-col>
                    <v-col cols="3">탄수화물 {{ totalCarbs }} g</v-col>
                    <v-col cols="3">단백질 {{ totalProtein }} g</v-col>
                </v-footer>
            </v-card>
        </v-container>
    </v-card>
</template>
<script>
    import VueTimepicker from 'vue2-timepicker'
    import 'vue2-timepicker/dist/VueTimepicker.css'

    export default {
        components: {
            VueTimepicker
        },
        data() {
            return {
                BFitems: [{
                        id: 1,
                        name: '바나나',
                        calories: 105,
                        fat: 0.39,
                        carbs: 26.95,
                        protein: 1.29
                    },
                    {
                        id: 1,
                        name: '삶은 계란',
                        calories: 154,
                        fat: 10.57,
                        carbs: 1.12,
                        protein: 12.53
                    }
                ],
                lunchItems: [{
                        id: 1,
                        name: '고구마',
                        calories: 128,
                        fat: 0.15,
                        carbs: 30.35,
                        protein: 1.72
                    },
                    {
                        id: 1,
                        name: '삶은 계란',
                        calories: 154,
                        fat: 10.57,
                        carbs: 1.12,
                        protein: 12.53
                    }
                ],
                dinnerItems: [{
                        id: 1,
                        name: '고구마',
                        calories: 128,
                        fat: 0.15,
                        carbs: 30.35,
                        protein: 1.72
                    },
                    {
                        id: 1,
                        name: '삶은 계란',
                        calories: 154,
                        fat: 10.57,
                        carbs: 1.12,
                        protein: 12.53
                    }
                ],
                totals: '',
                totalFat: '',
                totalCarbs: '',
                totalProtein: '',
                totalBFCalories: 0,
                totalBFFat: 0,
                totalBFCarbs: 0,
                totalBFProtein: 0,
                totalLunchCalories: 0,
                totalLunchFat: 0,
                totalLunchCarbs: 0,
                totalLunchProtein: 0,
                totalDinnerCalories: 0,
                totalDinnerFat: 0,
                totalDinnerCarbs: 0,
                totalDinnerProtein: 0,
                newBFName: '',
                newBFCalories: '',
                newBFFat: '',
                newBFCarbs: '',
                newBFProtein: '',
                newLunchName: '',
                newLunchCalories: '',
                newLunchFat: '',
                newLunchCarbs: '',
                newLunchProtein: '',
                newDinnerName: '',
                newDinnerCalories: '',
                newDinnerFat: '',
                newDinnerCarbs: '',
                newDinnerProtein: '',
            }
        },
        created() {
            this.saveBFItem()
            this.saveLunchItem()
            this.saveDinnerItem()

        },
        methods: {
            addBFItem() {
                const name = this.newBFName.trim()
                const calories = parseFloat(this.newBFCalories.trim() || 0)
                const fat = parseFloat(this.newBFFat.trim() || 0)
                const carbs = parseFloat(this.newBFCarbs.trim() || 0)
                const protein = parseFloat(this.newBFProtein.trim() || 0)
                if (name && calories) {
                    this.BFitems.push({
                        name: name,
                        calories: calories,
                        fat: fat,
                        carbs: carbs,
                        protein: protein
                    })
                    this.newBFName = '',
                        this.newBFCalories = '',
                        this.newBFFat = '',
                        this.newBFCarbs = '',
                        this.newBFProtein = ''
                    calTotals(this)

                } else {
                    alert('음식 데이터를 추가하세요')
                }
            },
            async addLunchItem() {
                const name = this.newLunchName.trim()
                const calories = parseFloat(this.newLunchCalories.trim() || 0)
                const fat = parseFloat(this.newLunchFat.trim() || 0)
                const carbs = parseFloat(this.newLunchCarbs.trim() || 0)
                const protein = parseFloat(this.newLunchProtein.trim() || 0)
                if (name && calories) {
                    this.lunchItems.push({
                        name: name,
                        calories: calories,
                        fat: fat,
                        carbs: carbs,
                        protein: protein
                    })
                    this.newLunchName = '',
                        this.newLunchCalories = '',
                        this.newLunchFat = '',
                        this.newLunchCarbs = '',
                        this.newLunchProtein = ''
                    await calTotals(this)

                } else {
                    alert('음식 데이터를 추가하세요')
                }

            },
            addDinnerItem() {
                const name = this.newDinnerName.trim()
                const calories = parseFloat(this.newDinnerCalories.trim() || 0)
                const fat = parseFloat(this.newDinnerFat.trim() || 0)
                const carbs = parseFloat(this.newDinnerCarbs.trim() || 0)
                const protein = parseFloat(this.newDinnerProtein.trim() || 0)
                if (name && calories) {
                    this.dinnerItems.push({
                        name: name,
                        calories: calories,
                        fat: fat,
                        carbs: carbs,
                        protein: protein
                    })
                    this.newDinnerName = '',
                        this.newDinnerCalories = '',
                        this.newDinnerFat = '',
                        this.newDinnerCarbs = '',
                        this.newDinnerProtein = ''
                    calTotals(this)

                } else {
                    alert('음식 데이터를 추가하세요')
                }
            },

            removeItem(i) {
                this.items.splice(i, 1)
                calTotals(this)
                calTotals(this)
                calTotals(this)
            },
            saveBFItem() {
                calTotals(this)
            },
            saveLunchItem() {
                calTotals(this)
            },
            saveDinnerItem() {
                calTotals(this)
            },
            customFormatter(time) {
                return moment(time).format('hh:mm a')
            }

        }
    }

    function calTotals(calorieCounter) {
        calorieCounter.totalBFCalories = parseBFTotals(calorieCounter.BFitems, 'calories').toFixed(2)
        calorieCounter.totalBFFat = parseBFTotals(calorieCounter.BFitems, 'fat').toFixed(2)
        calorieCounter.totalBFCarbs = parseBFTotals(calorieCounter.BFitems, 'carbs').toFixed(2)
        calorieCounter.totalBFProtein = parseBFTotals(calorieCounter.BFitems, 'protein').toFixed(2)

        calorieCounter.totalLunchCalories = parseLunchTotals(calorieCounter.lunchItems, 'calories').toFixed(2)
        calorieCounter.totalLunchFat = parseLunchTotals(calorieCounter.lunchItems, 'fat').toFixed(2)
        calorieCounter.totalLunchCarbs = parseLunchTotals(calorieCounter.lunchItems, 'carbs').toFixed(2)
        calorieCounter.totalLunchProtein = parseLunchTotals(calorieCounter.lunchItems, 'protein').toFixed(2)

        calorieCounter.totalDinnerCalories = parseDinnerTotals(calorieCounter.dinnerItems, 'calories').toFixed(2)
        calorieCounter.totalDinnerFat = parseDinnerTotals(calorieCounter.dinnerItems, 'fat').toFixed(2)
        calorieCounter.totalDinnerCarbs = parseDinnerTotals(calorieCounter.dinnerItems, 'carbs').toFixed(2)
        calorieCounter.totalDinnerProtein = parseDinnerTotals(calorieCounter.dinnerItems, 'protein').toFixed(2)

        calorieCounter.totals = parseFloat(calorieCounter.totalBFCalories + calorieCounter.totalLunchCalories +
            calorieCounter.totalDinnerCalories).toFixed(2)
        calorieCounter.totalFat = parseFloat(calorieCounter.totalBFFat + calorieCounter.totalLunchFat + calorieCounter
            .totalDinnerFat).toFixed(2)
        calorieCounter.totalCarbs = parseFloat(calorieCounter.totalBFCarbs + calorieCounter.totalLunchCarbs +
            calorieCounter.totalDinnerCarbs).toFixed(2)
        calorieCounter.totalProtein = parseFloat(calorieCounter.totalBFProtein + calorieCounter.totalLunchProtein +
            calorieCounter.totalDinnerProtein).toFixed(2)



    }

    function parseBFTotals(array, element) {
        var sum = 0
        array.forEach((BFitem) => {
            sum = sum + parseFloat(BFitem[element])
        }, sum, element)
        return sum
    }

    function parseLunchTotals(array, element) {
        var sum = 0
        array.forEach((lunchItem) => {
            sum = sum + parseFloat(lunchItem[element])
        }, sum, element)
        return sum
    }

    function parseDinnerTotals(array, element) {
        var sum = 0
        array.forEach((dinnerItem) => {
            sum = sum + parseFloat(dinnerItem[element])
        }, sum, element)
        return sum
    }
</script>
<style scoped>
    .v-main__wrap>.v-card {
        background-color: #FEFCF5 !important;
    }

    .v-toolbar__content {
        text-align: center !important;
    }

    footer.total {
        background-color: #655d5d;
        color: #fff;
    }

    footer.new {
        background-color: #ebdaca;
    }
</style>