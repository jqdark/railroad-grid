<template>
    <div id="app" class="col center" :style="dragStyle"
        @mousemove="mouseMove"
        @mouseup="endDrag"
        @touchmove="touchMove"
        @touchend="touchEnd"
    >

        <div class="row center">
            <div class="row-responsive center">

                <div class="grid row">

                    <div class="grid-side col">
                        <div class="grid-cap-left">
                            <img src="./assets/rail-end.svg">
                        </div>
                        <div class="grid-cap-left">
                            <img src="./assets/road-end.svg">
                        </div>
                        <div class="grid-cap-left">
                            <img src="./assets/rail-end.svg">
                        </div>
                    </div>


                    <div class="col">
                        <div class="row grid-end">
                            <div class="grid-cap flipped">
                                <img src="./assets/road-end.svg">
                            </div>
                            <div class="grid-cap flipped">
                                <img src="./assets/rail-end.svg">
                            </div>
                            <div class="grid-cap flipped">
                                <img src="./assets/road-end.svg">
                            </div>
                        </div>
                        <div class="grid-tiles col">
                            <div class="row" v-for="row in 9" :key="row">
                                <div class="grid-tile" v-for="col in 9" :key="col">
                                    <Tile :col="col-1" :row="row-1" />
                                </div>
                            </div>
                        </div>
                        <div class="row grid-end">
                            <div class="grid-cap">
                                <img src="./assets/road-end.svg">
                            </div>
                            <div class="grid-cap">
                                <img src="./assets/rail-end.svg">
                            </div>
                            <div class="grid-cap">
                                <img src="./assets/road-end.svg">
                            </div>
                        </div>
                    </div>


                    <div class="grid-side col">
                        <div class="grid-cap-left flipped">
                            <img src="./assets/rail-end.svg">
                        </div>
                        <div class="grid-cap-left flipped">
                            <img src="./assets/road-end.svg">
                        </div>
                        <div class="grid-cap-left flipped">
                            <img src="./assets/rail-end.svg">
                        </div>
                    </div>

                </div>


                <div class="menu col-responsive">

                    <div class="menu-block col">
                        <div class="row">
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'rail',
                                    left: 'rail',
                                    right: 'rail',
                                    down: 'rail'
                                }" />
                            </div>
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'rail',
                                    left: 'rail',
                                    right: 'rail',
                                    down: 'road'
                                }" />
                            </div>
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'rail',
                                    left: 'rail',
                                    right: 'road',
                                    down: 'road'
                                }" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'road',
                                    left: 'road',
                                    right: 'road',
                                    down: 'road'
                                }" />
                            </div>
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'rail',
                                    left: 'road',
                                    right: 'road',
                                    down: 'road'
                                }" />
                            </div>
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'rail',
                                    left: 'road',
                                    right: 'road',
                                    down: 'rail'
                                }" />
                            </div>
                        </div>
                    </div>

                    <div class="menu-block col">
                        <div class="row">
                            <div class="menu-item">
                                <Tile sourceOf="road-I" />
                            </div>
                            <div class="menu-item">
                                <Tile sourceOf="road-L" />
                            </div>
                            <div class="menu-item">
                                <Tile sourceOf="road-T" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="menu-item">
                                <Tile sourceOf="rail-I" />
                            </div>
                            <div class="menu-item">
                                <Tile sourceOf="rail-L" />
                            </div>
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    left: 'rail',
                                    down: 'rail',
                                    right: 'rail'
                                }" />
                            </div>
                        </div>
                    </div>

                    <div class="menu-block col">
                        <div class="row">
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    up: 'rail',
                                    down: 'road'
                                }" />
                            </div>
                            <div class="menu-item">
                                <Tile sourceOf="join-X" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    left: 'rail',
                                    down: 'road'
                                }" />
                            </div>
                            <div class="menu-item">
                                <Tile :sourceOf="{
                                    right: 'rail',
                                    down: 'road'
                                }" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="instructions row center">
            <p v-if="hasMouse">
                Drag and drop to place tiles. Press Q and E while dragging to rotate.
            </p>
            <p v-else>
                Drag and drop to place tiles. Tap placed tiles to rotate.
            </p>
        </div>

        <template v-if="drag">
            <div class="drag" :style="{
                left: drag.x + 'px',
                top: drag.y + 'px',
            }">
                <Face v-bind="drag" :animate="true" />
            </div>
        </template>

    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Tile from "./components/Tile.vue";
import Face from "./components/Face.vue";

export default {
    name: "App",
    components: {
        Tile, Face
    },
    mounted() {
        window.onkeydown = this.keyPress;
    },
    computed: {
        ...mapState([
            "drag",
            "hasMouse"
        ]),
        dragStyle() {
            return {
                "--tile-hover": (this.drag ? "lightgrey" : "oldlace")
            }
        }
    },
    methods: {
        ...mapMutations([
            "endDrag",
            "rotate",
            "updateDrag"
        ]),
        mouseMove(event) {
            this.updateDrag({
                x: event.pageX,
                y: event.pageY
            });
        },
        keyPress(event) {
            if (event.key == "q") {
                this.rotate(-1);
            } else if (event.key == "e") {
                this.rotate(1);
            }
        },
        touchMove(event) {
            if (event.touches.length == 1) {
                event.preventDefault();
                this.updateDrag({
                    x: event.touches[0].pageX,
                    y: event.touches[0].pageY
                });
            } else {
                this.endDrag();
            }
        },
        touchEnd(event) {
            if (
                (event.touches.length == 0) &&
                (event.changedTouches.length == 1)
            ) {
                document.elementFromPoint(
                    event.changedTouches[0].pageX,
                    event.changedTouches[0].pageY
                )?.dispatchEvent?.(new Event("tiledrop"));
            }
            this.endDrag();
        }
    }
}
</script>

<style lang="sass">

    // Style reset
    body
        margin: 0

    // Media queries
    :root
        --unit: 8vh
        @media (max-aspect-ratio: 4/3)
            --unit: 6vw
        @media (max-aspect-ratio: 1/1)
            --unit: 6vh
        @media (max-aspect-ratio: 3/4)
            --unit: 8vw

    // Utility classes
    .col
        display: flex
        flex-direction: column

    .col-responsive
        display: flex
        flex-direction: column
        @media (max-aspect-ratio: 1/1)
            flex-direction: row

    .row
        display: flex

    .row-responsive
        display: flex
        @media (max-aspect-ratio: 1/1)
            flex-direction: column-reverse

    .center
        justify-content: center

    .flipped
        transform: rotate(180deg)

    // Container and background
    #app
        width: 100vw
        height: 100vh
        background-color: lightsteelblue

    // Grid styling
    .grid-tiles
        width: calc((9 * var(--unit)) + 18px)
        height: calc((9 * var(--unit)) + 18px)
        padding: 1px
        position: relative
        background-color: slategrey
        &::before
            content: ""
            display: block
            position: absolute
            pointer-events: none
            top: calc((3 * var(--unit)) + 6px)
            left: calc((3 * var(--unit)) + 6px)
            border: solid red 2px
            width: calc((3 * var(--unit)) + 4px)
            height: calc((3 * var(--unit)) + 4px)

    .grid-tile
        padding: 1px

    .grid-side
        height: calc((7 * var(--unit)) + 16px)
        padding: calc((3/2 * var(--unit)) + 4px) 0
        justify-content: space-between

    .grid-end
        width: calc((7 * var(--unit)) + 16px)
        padding: 0 calc(var(--unit) + 2px)
        justify-content: space-between

    .grid-cap
        background-color: oldlace
        border-bottom-left-radius: calc(2/10 * var(--unit))
        border-bottom-right-radius: calc(2/10 * var(--unit))
        border: solid slategrey 2px
        border-top: none
        img
            display: block
            width: var(--unit)
            height: calc(1/2 * var(--unit))

    .grid-cap-left
        background-color: oldlace
        border-bottom-left-radius: calc(2/10 * var(--unit))
        border-top-left-radius: calc(2/10 * var(--unit))
        border: solid slategrey 2px
        border-right: none
        width: calc(0.5 * var(--unit))
        height: var(--unit)
        img
            display: block
            transform-origin: bottom
            transform: rotate(90deg) translateY(calc(1/2 * var(--unit)))
            width: var(--unit)
            height: calc(1/2 * var(--unit))

    // Menu styling
    .menu
        justify-content: space-around
        margin-left: calc(3/4 * var(--unit))
        padding: calc(3/4 * var(--unit)) 0
        @media (max-aspect-ratio: 1/1)
            margin-left: 0
            margin-bottom: calc(3/4 * var(--unit))
            padding: 0

    .menu-item
        margin: 4px
        box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)

    // Instructions
    .instructions
        margin: 0 50px
        margin-top: calc(1/2 * var(--unit))
        font-size: 20px
        font-family: sans-serif
        font-weight: bold

    // Draggable styling
    .drag
        position: absolute
        pointer-events: none
        img
            width: var(--unit)
            height: var(--unit)
            transition: transform 0.2s
            position: absolute
            top: 0
            left: 0

</style>
