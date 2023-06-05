import 'bootstrap/dist/css/bootstrap.css';
import App from 'next/app';

import axiosClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className='container'>
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = axiosClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  const appProps = await App.getInitialProps(appContext);
  return { ...data, ...appProps };
};

export default AppComponent;
