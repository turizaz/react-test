import axios from 'axios'

async function add(text: string | null) {
    try {
        return await axios.post('/api', {text});
    } catch (e) {
        throw new Error(e.response.data);
    }
}
export default {
    add
}
