<template>
    <div class="note-panel">
        <h3>Summary:</h3>
        <div v-if="isEditing">
            <textarea v-model="editableSummary" rows="10" cols="50"></textarea>
            <button @click="saveChanges">Save</button>
            <button @click="isEditing = false">Cancel</button>
        </div>
        <div v-else>
            <p>{{ summary }}</p>
            <button @click="editSummary">Edit</button>
        </div>
    </div>
</template>

<script>export default {
        name: "NotePanel",
        props: ['summary'],
        data() {
            return {
                isEditing: false,
                editableSummary: ''
            };
        },
        methods: {
            editSummary() {
                this.isEditing = true;
                this.editableSummary = this.summary;
            },
            saveChanges() {
                this.$emit('update-summary', this.editableSummary);
                this.isEditing = false;
            }
        }
    }</script>

<style scoped>
    .note-panel {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
        border: 1px solid #ccc;
        padding: 1rem;
    }
</style>
