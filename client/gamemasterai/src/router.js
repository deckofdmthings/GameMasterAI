import { createRouter, createWebHistory } from 'vue-router';
import HomePath from './components/HomePath.vue';
import ChatRoom from "./components/ChatRoom.vue";
import store from "./store"; // Import the Vuex store
import SetupForm from '@/components/SetupForm.vue';
import LoadGame from '@/components/LoadGame.vue';

const routes = [
    {
        path: '/',
        name: 'HomePath',
        component: HomePath,
    },
    {
        path: "/chat-room",
        name: "ChatRoom",
        component: ChatRoom,
        meta: { requiresSetup: true }, // Removed requiresAuth
    },
    {
        path: "/setup",
        name: "Setup",
        component: SetupForm,
    },
    {
        path: '/load-game',
        name: 'LoadGame',
        component: LoadGame,
    },
    {
        path: '/chat-room/:id',
        name: 'ChatRoom',
        component: ChatRoom
    },
    // Add more routes here as needed
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresSetup = to.matched.some(record => record.meta.requiresSetup);
    console.log('Is authenticated:', store.getters.isAuthenticated); // You can remove this line if you want

    if (requiresSetup && !store.state.gameSetup) {
        next({ name: 'HomePath' });
    } else {
        next();
    }
});

export default router;
