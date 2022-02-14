import axios from 'axios';

const url = process.env.REACT_APP_API_URL || "http://localhost:3000/";
console.log(url)
const RestService = {
    getURL(){return url},
    get: async function () {
        return axios.get(url)
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
            })
    },
    getURLVideo: async function () {
        return axios.get(url + "/video")
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
            })
    },
    getURLAudio: async function () {
        return axios.get(url + "/audio")
            .then(res => {
                return res.data;
            }).catch(err => {
                console.log(err);
            })
    }
};

export default RestService;