<template>
    <li v-text="value.title" @click="toggleActive(index); toggleTag(index)" :style="active" ref="tabBarLi"></li>
</template>
<script>
    export default {
        name: "tabBarItems",
        props:
            {
                value: Object,
                index: Number,
                toggleActive: Function,
                moveTagStyle: Object,
                listItemStyle: Object,
                activeFontColor: Object,
                noActiveFontColor:Object
            },
        methods: {
            toggleTag(index) {
                console.log('3');
                this.$emit('toggleMoveTag', index)
            },
        },
        computed: {
            active: function () {
                if (this.value.isActive) {
                    return {color: this.activeFontColor.color}
                } else {
                    return {color: this.noActiveFontColor.color}
                }
            }
        },
        mounted() {
            this.$refs.tabBarLi.style.width = this.listItemStyle.width + 'px';
            this.$refs.tabBarLi.style.height = this.listItemStyle.height + 'px';
            this.$refs.tabBarLi.style.lineHeight = this.listItemStyle.height + 'px';
            this.$refs.tabBarLi.style.fontSize = this.listItemStyle.fontSize + 'px';
            this.$refs.tabBarLi.style.fontWeight = this.listItemStyle.fontWeight;
        }
    }
</script>

<style scoped>

</style>
