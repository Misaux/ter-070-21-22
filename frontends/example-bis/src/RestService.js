import axios from 'axios';
const url = process.env.REACT_APP_API_URL || "http://localhost:3001/";
const RestService = {
    getURL(){return url},
    get: async function() {
        return await axios.get(url)
            .then(res => {
                return res.data;
            }).catch(err =>{
                console.log(err);
            })
    },

};

export default RestService;