
const signup = ()=>{
    return (
        <form>
            <h1>Sign up</h1>
            <div className='mb-3'>
                <label for="signupEmail" className="form-label">Email Address</label>
                <input id="signupEmail" className="form-control"></input>
            </div>
            <div className='mb-3'>
                <label for="signupPassword" className="form-label" >Password</label>
                <input id="signupPassword" className="form-control" type='password'></input>
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    )
}

export default signup;