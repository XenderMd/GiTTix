import axios from 'axios';
 
const indexPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Hello, {currentUser?.email ?? 'user'}</h1>;
};
 
export const getServerSideProps = async ({ req }) => {
    let res;
    if (typeof window === 'undefined') {
        //we are on the server
        res = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentUser',
            {
                withCredentials: true,
                headers: req.headers
            }
        );
    } else {
        //we are in the browser
        res = await axios.get('/api/users/current');
    }
    return { props: res.data };
};

export default indexPage;