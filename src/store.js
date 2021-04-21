import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state() {
        return {
            drag: null,
            hasMouse: window.matchMedia("(pointer: fine)").matches
        }
    },
    mutations: {
        setDrag(state, drag) {
            state.drag = drag;
        },
        updateDrag(state, { x, y }) {
            state.drag.x = x - state.drag.dx;
            state.drag.y = y - state.drag.dy;
        },
        endDrag(state) {
            state.drag = null;
        },
        rotate(state, change) {
            state.drag.rotation += change;
        }
    }
})