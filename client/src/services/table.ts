import axios from 'axios'

async function add(text: string | null) {
    try {
        return await axios.post('/api', {text});
    } catch (e) {
        console.log(e.response.data)
        throw new Error(e);
    }
}
export default {
    add
}
