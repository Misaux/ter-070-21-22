import axios from 'axios';
const url = process.env.REACT_APP_API_URL;
const RestService = {
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