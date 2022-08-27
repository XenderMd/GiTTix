import axiosClient from "../api/build-client";
 
const indexPage = ({ currentUser }) => {
    console.log(currentUser);
    return <h1>Hello, {currentUser?.email ?? 'user'}</h1>;
};
 
export const getServerSideProps = async (context) => {
    const client = axiosClient(context)
    const {data} = await client.get('/api/users/currentUser');
    return { props: data };
};

export default indexPage;