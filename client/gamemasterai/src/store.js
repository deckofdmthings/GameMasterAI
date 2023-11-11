//GMAI/client/gamemasterai/src/store.js

import { createStore } from "vuex";

const storedUser = localStorage.getItem("user");
const parsedUser = storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;
import axios from 'axios';

export default createStore({
    state: {
        user: parsedUser,
        authToken: localStorage.getItem("authToken") || null,
        userId: parsedUser ? parsedUser._id : null, // Initialize userId from localStorage  
        gameId: null, // Initialize gameId as null 
        credits: 0,
        gameSetup: { // Initialize gameSetup as an object
            gameSystem: '',
            characterName: '',
            characterClass: '',
            characterRace: '',
            characterLevel: '',
            characterBackground: ''
        },
        systemMessageContentDM: '',
        summary: ''

    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem("user", JSON.stringify(user));
        },
        setAuthToken(state, authToken) {
            state.authToken = authToken;
            localStorage.setItem("authToken", authToken);
        },
        setUserId(state, userId) {
            state.userId = userId; // Add a new mutation to set the userId in state
        },
        setCredits(state, credits) {
            state.credits = credits;
        },
        setGameSetup(state, gameSetup) { // Modify setGameSetup to accept an object
            state.gameSetup = gameSetup;
        },
        createNewGame(state) {
            state.gameId = Date.now().toString();
        },
        setGameId(state, gameId) {
            state.gameId = gameId; // Add a new mutation to set the gameId in state
        },
        setSystemMessageContentDM(state, systemMessageContentDM) {
            state.systemMessageContentDM = systemMessageContentDM;
        },
        setSummary(state, summary) {
            state.summary = summary;
        },
        
    },
    actions: {
        loginUser({ commit, dispatch }, { user, authToken, userId }) {
            commit("setUser", user);
            commit("setAuthToken", authToken);
            commit("setUserId", userId); // Add a commit to set the userId when a user logs in
            dispatch('fetchCredits');
        },
        async fetchCredits({ commit, state }) {
            try {
                const response = await axios.get('/api/credits/user/credits', {
                    headers: {
                        Authorization: `Bearer ${state.authToken}`,
                    },
                });
                commit('setCredits', response.data.credits);
            } catch (error) {
                console.error('Error fetching credits:', error);
            }
        }
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        }
    }
});
