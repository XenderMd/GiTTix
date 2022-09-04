import 'bootstrap/dist/css/bootstrap.css';
import App from 'next/app';

import axiosClient from "../api/build-client";

const AppComponent = ({Component, pageProps})=>{
    return  <div>
                <h1>Header</h1>
                <Component {...pageProps}/>
            </div>
}


AppComponent.getInitialProps = async appContext =>{
    const appProps = await App.getInitialProps(appContext);
    const client = axiosClient(appContext.ctx)
    const {data} = await client.get('/api/users/currentuser');
    return {data, ...appProps};
}

// export const getServerSideProps = async (appContext) => {
//     console.log(appContext);
// };


export default AppComponent;