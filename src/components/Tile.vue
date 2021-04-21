<template>
    <div class="tile" :style="hoverStyle"
        @mouseup="place"
        @mousedown.prevent="mouseDown"
        @touchstart="touchStart"
        @tiledrop="place"
        @click.prevent="mobileRotate"
    >
        <Face v-if="tile" :tile="tile" :rotation="rotation" :animate="!hasMouse" />
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Face from "./Face.vue";

export default {
    name: "Tile",
    components: {
        Face
    },
    props: {
        sourceOf: [String, Object]
    },
    data() {
        return {
            tile: this.sourceOf,
            rotation: 0
        }
    },
    computed: {
        ...mapState([
            "drag",
            "hasMouse"
        ]),
        hoverStyle() {
            return this.sourceOf ? {"--tile-hover": "oldlace"} : {};
        }
    },
    methods: {
        ...mapMutations([
            "setDrag"
        ]),
        startDrag(drag) {
            if (this.tile) {
                this.setDrag({
                    ...drag,
                    tile: this.tile,
                    rotation: this.rotation
                });
                if (!this.sourceOf) {
                    this.tile = null;
                    this.rotation = 0;
                }
            }
        },
        place() {
            if (this.drag && !this.sourceOf) {
                this.tile = this.drag.tile;
                this.rotation = (this.drag.rotation % 4);
            }
        },
        mouseDown(event) {
            const dx = event.offsetX;
            const dy = event.offsetY;
            this.startDrag({
                dx, dy,
                x: event.pageX - dx,
                y: event.pageY - dy,
                touch: false
            });
        },
        touchStart(event) {
            if (event.touches.length == 1) {
                const pageX = event.touches[0].pageX;
                const pageY = event.touches[0].pageY;
                const rectangle = this.$el.getBoundingClientRect();
                this.startDrag({
                    x: rectangle.left,
                    y: rectangle.top,
                    dx: pageX - rectangle.left,
                    dy: pageY - rectangle.top,
                    touch: true
                });
            }
        },
        mobileRotate() {
            if (
                !this.hasMouse &&
                !this.sourceOf &&
                this.tile
            ) {
                this.rotation = (this.rotation + 1) % 4;
            }
        }
    }
}
</script>

<style scoped lang="sass">
    .tile
        width: var(--unit)
        height: var(--unit)
        background-color: oldlace
        @media (hover: hover)
            &:hover
                background-color: var(--tile-hover)

</style>
