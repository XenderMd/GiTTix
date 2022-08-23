
import {useState} from 'react'



const signup = ()=>{

    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('');

    const onSubmit =(e)=>{
        e.preventDefault();
        console.log(email);
        console.log(password);
    }



    return (
        <form onSubmit={onSubmit}>
            <h1>Sign up</h1>
            <div className='mb-3'>
                <label htmlFor="signupEmail" className="form-label">Email Address</label>
                <input onChange={e=>setEmail(e.target.value)} value={email} id="signupEmail" className="form-control"></input>
            </div>
            <div className='mb-3'>
                <label htmlFor="signupPassword" className="form-label" >Password</label>
                <input onChange={e=>setPassword(e.target.value)} value={password} id="signupPassword" className="form-control" type='password'></input>
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default signup;