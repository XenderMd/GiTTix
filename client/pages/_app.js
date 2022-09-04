import 'bootstrap/dist/css/bootstrap.css';
import App from 'next/app';

import axiosClient from "../api/build-client";
import Header from '../components/header';

const AppComponent = ({Component, pageProps, currentUser})=>{
    // console.log(currentUser);
    return  <div>
                <Header currentUser={currentUser}/>
                <Component {...pageProps}/>
            </div>
}


AppComponent.getInitialProps = async appContext =>{
    // console.log(appContext.Component);
    const appProps = await App.getInitialProps(appContext);
    const client = axiosClient(appContext.ctx)
    const {data} = await client.get('/api/users/currentuser');
    // console.log(data);
    return {...data, ...appProps};
}

// export const getServerSideProps = async (appContext) => {
//     console.log(appContext);
// };


export default AppComponent;