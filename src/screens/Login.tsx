function Login() {
    return (
        <main>
            <div>
                <label htmlFor="firstname">First name</label>
                <input autoComplete="true" type="text" name="firstname" id="firstname" />
            </div>

            <div>
                <label htmlFor="lastname">Last name</label>
                <input autoComplete="true" type="text" name="lastname" id="lastname" />
            </div>
        </main>
    );
}

export default Login;
