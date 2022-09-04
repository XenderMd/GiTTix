import axiosClient from "../api/build-client";
 
const indexPage = ({ currentUser }) => {
 return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>
};
 
export const getServerSideProps = async (context) => {
    const client = axiosClient(context)
    const {data} = await client.get('/api/users/currentUser');
    return { props: data };
};

export default indexPage;