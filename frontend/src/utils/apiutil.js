const APIUtil = {
    authenticated: false,
    token: null,
    authenticate(data, cb) {
        fetch("http://localhost:8080/api/users/login", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(async res => {
            var data = await res.json();
            switch(res.status){
                case 500: // Invalid/Auth failed
                case 403:
                case 401:
                    cb(0, {error: data.error});
                    break;
                case 201: // Authenticated!
                    cb(1);
                    this.token = data.token;
                    this.authenticated = true;
                    break;
                default:
                    cb(2); // Something went wrong
                    break;
            }
        });
    }
};

export default APIUtil;