export default {
    template: `
        <h2>Notes:</h2>
        <ul v-if="notes">
            <li v-for="note in notes">{{ note.title }}</li>
        </ul>`
}