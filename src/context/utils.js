import axios from 'axios'
export const setupAuthHeaderForServiceCalls = (token) => {
    if (token) {
        return (axios.defaults.headers.common["Authorization"] = token);
    }
    delete axios.defaults.headers.common["Authorization"];
}