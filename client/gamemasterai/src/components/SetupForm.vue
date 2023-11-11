// GMAI/client/gamemasterai/src/components/SetupForm.vue


<template>
    <form @submit.prevent="submitForm">
        <h1 class="form-title">The Start of Your Adventure</h1> <!-- Title text added here -->
        <h4 class="form-description">Select the building blocks of your character and story. Allow up to 30 seconds after clicking "start game". If you wish to make your own custom prompt entirely, type it in the bottom box and start game!</h4>
        <div>
            <label for="game-system">Game System:</label>
            <select id="game-system" v-model="formData.gameSystem">
                <option disabled value="">Please select one</option>
                <option>Dungeons and Dragons 5th Edition</option>
            </select>
        </div>
        <div>
            <label for="adventure-Setting">Adventure Setting:</label>
            <select id="adventure-Setting" v-model="formData.adventureSetting">
                <option disabled value="">Please select one</option>
                <option>Classic Fantasy</option>
                <option>Steampunk</option>
            </select>
        </div>
        <div>
            <label for="character-name">Character Name:</label>
            <input id="character-name" v-model="formData.characterName" type="text">
        </div>
        <div>
            <label for="Character Class">Character Class:</label>
            <input id="character-class" v-model="formData.characterClass" type="text">
        </div>
        <div>
            <label for="Character Race">Character Race:</label>
            <input id="character-race" v-model="formData.characterRace" type="text">
        </div>
        <div>
            <label for="Character Level">Character Level:</label>
            <input id="character-level" v-model="formData.characterLevel" type="text">
        </div>
        <div>
            <label for="Character Background">Character Background:</label>
            <input id="character-background" v-model="formData.characterBackground" type="text">
        </div>
        <div>
            <label for="or">OR:</label>
        </div>
        <div>
            <label for="custom-dm-content">Custom Prompt:</label>
            <textarea id="custom-dm-content" v-model="formData.customDMContent" placeholder="Type your own custom prompt here." rows="4"></textarea>
        </div>        <button type="submit">Start Game</button>
    </form>
    
</template>

<script>
    import axios from 'axios';


    export default {
        data() {
            return {
                gameSystemPrompts: {
                    "Dungeons and Dragons 5th Edition": require('@/prompts/DungeonsAndDragons.txt'),
                },

                adventureSettingPrompts: {
                    "Classic Fantasy": require('@/prompts/ClassicFantasy.txt'),
                    "Steampunk": require ('@/prompts/Steampunk.txt'),
                },

                formData: {
                    gameSystem: '',
                    characterName: '',
                    characterClass: '',
                    characterRace: '',
                    characterLevel: '',
                    characterBackground: ''
                }
            };
        },
        methods: {

        async generateCampaignConcept() {
        // Generate the campaign concept using the OpenAI API.
        const prompt = "Write a brief, 2 sentence adventure prompt for a new D&D adventure. Use the following to inform this:" + this.adventureSettingPrompts[this.formData.adventureSetting].default + 'Player Character name: ' + this.formData.characterName + ', Player Charactre Class: ' + this.formData.characterClass + ', Player Character Race: ' + this.formData.characterRace + ', Player Character Starting Level:' + this.formData.characterLevel + '. Player Character Background: ' + this.formData.characterBackground;

        try {
            const response = await axios.post('http://localhost:5001/api/game-session/generate-campaign', {
                messages: [{ role: "user", content: prompt }],
            });

            return response.data;
        } catch (error) {
            console.error('Error generating campaign concept:', error);
        }
    },

    async submitForm() {
            this.$store.commit('createNewGame');
            this.$store.commit('setGameSetup', this.formData);

            let systemMessageContentDM;

            // Check if the custom DM content is provided
            if (this.formData.customDMContent && this.formData.customDMContent.trim() !== "") {
                // Use the custom DM content
                systemMessageContentDM = this.formData.customDMContent.trim();
            } else {
                // Generate the campaign concept as before
                const campaignConcept = await this.generateCampaignConcept();
                systemMessageContentDM = this.gameSystemPrompts[this.formData.gameSystem].default + campaignConcept + 'Assume the player knows nothing. Allow for an organic introduction of information.';
            }

            // Set the system message content DM
            this.$store.commit('setSystemMessageContentDM', systemMessageContentDM);

            const gameId = this.$store.state.gameId;
            this.$router.push({ name: 'ChatRoom', params: { id: gameId } });
        }
    }
    };</script>


<style scoped>
</style>
