import Cookies from 'universal-cookie';

const cookies = new Cookies();

const APIUtil = {
    isAuthenticated: () => typeof(cookies.get('token')) != "undefined",
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
                    const onehrdate = () => {var n = new Date(); n.setTime(n.getTime + (60*60*1000)); return n};
                    cookies.set('token', data.token, { path: '/', expires: onehrdate()}); // Token will expire in 1 hour
                    cb(1);
                    break;
                default:
                    cb(0, "Something went wrong while contacting the server!"); // Something went wrong
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
    },
    logout(cb) {
        cookies.remove('token');
        cb();
    }
};

export default APIUtil;