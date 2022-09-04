import 'bootstrap/dist/css/bootstrap.css';

const globalStyle = ({Component, pageProps})=>{
    return  <div>
                <h1>Header</h1>
                <Component {...pageProps}/>
            </div>
}

export default globalStyle