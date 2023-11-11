<template>
    <div id="app">
        <img :src="logo" alt="logo" class="logo-image" />
        <div class="buttons">
            <button @click="navigateTo('/setup')">New Game</button> <!-- New Link -->
            <button @click="navigateTo('/load-game')">Load Game</button> <!-- No v-if -->
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import GameMasterAILogo from '@/assets/GameMasterAILogo.png';

export default {
    name: "App",
    data() {
        return {
            logo: GameMasterAILogo,
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated"]),
    },
    methods: {
        onLogout() {
            this.$store.commit("setUser", null);
            this.$router.push("/"); // Navigate to home instead of login
        },
        navigateTo(route) {
            this.$router.push(route);
        }
    },
}
</script>



<style>
    /* Apply your desired styles for the buttons */

    .logo-image {
        width: 400px;
        height: 200px;
    }

    button {
        display: inline-block;
        margin: 5px;
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        text-align: center;
        text-decoration: none;
        outline: none;
        color: #fff;
        background-color: #4CAF50;
        border: none;
        border-radius: 15px;
        box-shadow: 0 9px #999;
    }

        button:hover {
            background-color: #3e8e41
        }

        button:active {
            background-color: #3e8e41;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
        }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
