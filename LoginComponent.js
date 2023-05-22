import { ref, reactive } from "vue";

export default {
    props: ["notes"],
    setup(props) {
        const host = "http://localhost:3001";

        const message = "Hello World!";
        const email = ref("");
        const password = ref("");
        const notes = ref(null);

        const login = async () => {
            // console.log({email: email.value, password: password.value});
            const res = await fetch(`${host}/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email: email.value, password: password.value})
            });
            const data = await res.json();
            console.log(data);
            if(!data.errors) {
                console.log("Success");
                const notesres = await fetch(`${host}/getNotes/`, {
                    headers: {"Authorization": `Bearer ${data.jwt}`}
                })
                const notesf = await notesres.json();
                props.notes = notesf.notes;
                // notes.value = notesf.notes;
                console.log(notesf);
                // notes.push(notesres.notes);
            }
        
        }

        return {
            message, login, email, password, notes
        };

    },
    template: `
        <form @submit.prevent="login">
            <div class="loginDiv">
                <label for="email">Enter Email:</label>
                <input type="text" name="email" id="email" placeholder="Enter Email" v-model="email">
                <br/>
                <label for="password">Enter Password:</label>
                <input type="password" name="password" id="password" placeholder="Enter Password" v-model="password">
                <button type="submit">Submit</button>
            </div>
        </form>`
}