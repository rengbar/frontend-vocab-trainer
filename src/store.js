// store.js
import { reactive, provide, inject } from 'vue';

export const store = reactive({
    username: '',
    userId: '',
    gameId: ''
});

export function useStore() {
    return store;
}

export function provideStore() {
    provide('store', store);
}

export function injectStore() {
    return inject('store');
}
