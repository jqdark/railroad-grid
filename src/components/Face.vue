<template>
    <div class="face">
        <div :class="{
            rotating: animate
        }" :style="{
            transform: 'rotate(' + (90 * rotation) + 'deg)'
        }">
            <img v-if="isString(tile)" :src="getImage(tile)">
            <template v-else>
                <img v-if="tile.up" :src="getImage(tile.up)" class="up">
                <img v-if="tile.right" :src="getImage(tile.right)" class="right">
                <img v-if="tile.down" :src="getImage(tile.down)" class="down">
                <img v-if="tile.left" :src="getImage(tile.left)" class="left">
            </template>
        </div>
        <img v-if="!isString(tile)" src="../assets/tiles/station.svg">
    </div>
</template>

<script>
import _ from "lodash";

export default {
    name: "Face",
    props: {
        rotation: {
            type: Number,
            default: 0
        },
        tile: {
            type: [String, Object],
            required: true
        },
        animate: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getImage(name) {
            return require("../assets/tiles/" + name + ".svg");
        },
        isString: _.isString
    }
}
</script>

<style scoped lang="sass">
    .face
        pointer-events: none
        position: relative
        width: var(--unit)
        height: var(--unit)
        img, div
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%

    .rotating
        transition: transform 0.3s

    .right
        transform: rotate(90deg)

    .down
        transform: rotate(180deg)

    .left
        transform: rotate(-90deg)

</style>
