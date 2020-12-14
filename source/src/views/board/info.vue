<template>
<div>
    <board-content v-if="!action" :boardId="info" :category="category" :tag="tag" />
    <board-form v-else :boardId="info" :action="action" />
</div>
</template>

<script>
import BoardContent from '@/components/board/content'
import BoardForm from '@/components/board/form'

export default {
    components: {
        BoardContent,
        BoardForm
    },
    computed: {
        info() {
            return this.$route.params.info
        },
        action() {
            return this.$route.query.action
        },
        category() {
            return this.$route.params.category
        },
        tag() {
            return this.$route.query.tag
        }
    }
}
</script>
