import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state() {
        return {
            drag: null
        }
    },
    mutations: {        
        startDrag(state, drag) {
            state.drag = drag;
        },
        endDrag(state) {
            state.drag = null;
        },
        rotate(state, change) {
            if (state.drag) {
                state.drag.rotation += change;
            }
        }
    }
})