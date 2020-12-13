<template>
<board-index :category="category"></board-index>
</template>

<script>
import boardIndex from '@/components/board/index'
export default {
    components: {
        boardIndex
    },
    computed: {
        category() {
            return this.$route.query.category
        }
    }
}
</script>
