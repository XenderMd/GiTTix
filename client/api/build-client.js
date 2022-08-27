import axios from 'axios';

const axiosClient = ({req})=>{
    if(typeof window === 'undefined'){
        // We are on the server
        return axios.create({
            baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
            withCredentials:true
        });
    } else {
        // We are on the browser
        return axios.create({
            baseURL:'/'
        });
    };
};

export default axiosClient;