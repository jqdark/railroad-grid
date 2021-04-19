<template>
    <div class="tile" @mouseup="place" @mousedown.prevent="mouseDown" :style="hoverStyle">
        <Face v-if="tile" :tile="tile" :rotation="rotation" />
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
            "drag"
        ]),
        hoverStyle() {
            return this.sourceOf ? {"--tile-hover": "oldlace"} : {};
        }
    },
    methods: {
        ...mapMutations([
            "startDrag"
        ]),
        place() {
            if (this.drag && !this.sourceOf) {
                this.tile = this.drag.tile;
                this.rotation = (this.drag.rotation % 4);
            }
        },
        mouseDown(event) {
            this.startDrag({
                dx: event.offsetX,
                dy: event.offsetY,
                tile: this.tile,
                rotation: this.rotation
            });
            if (!this.sourceOf) {
                this.tile = null;
                this.rotation = 0;
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
        &:hover
            background-color: var(--tile-hover)

</style>
