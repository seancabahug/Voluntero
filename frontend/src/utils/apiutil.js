var authenticated = false;
var token = null;

const APIUtil = {
    isAuthenticated: () => authenticated,
    authenticate(data, cb) {
        fetch("/api/users/login", {
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
                    cb(0, data.error.message || ((data.error.toString() == "[object Object]") ? JSON.stringify(data.error) : data.error));
                    break;
                case 201: // Authenticated!
                    token = data.token;
                    authenticated = true;
                    cb(1);
                    break;
                default:
                    cb(0); // Something went wrong
                    break;
            }
        });
    },
    registerUser(data, cb) {
        fetch("/api/users/register", {
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
                case 400:
                    cb(0, data.error.message || ((data.error.toString() == "[object Object]") ? JSON.stringify(data.error) : data.error));
                    break;
                case 201: 
                    cb(1);
                    break;
                default:
                    cb(0, "Something went wrong while contacting the server!"); // Something went wrong
                    break;
            }
        });
    }
};

export default APIUtil;