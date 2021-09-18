import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './shared/styles/index.css';
import App from './App';
import '@crema/services';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import { useDispatch } from 'react-redux';
// import { UPDATE_AUTH_USER } from './types/actions/Auth.actions';
// import { useHistory } from 'react-router-dom';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



//// ---- HTTP Interceptors ----- ///////////

// let token: any = localStorage.getItem('Token');
// // console.log(token)
// let decodedToken: any = jwt_decode(token);
// console.log("Decoded Token", decodedToken);
// let currentDate = new Date();

// // JWT exp is in seconds
// if (decodedToken.exp * 3600 < currentDate.getTime()) {   
//     alert("Token expired.");
//     // axios.get("").then(res=>
//     //     {
//     //         localStorage.setItem('Token',res.data.access_token);
//     //         localStorage.setItem('RefreshToken',res.data.refresh_token);
//     //     })
// } else {
//     console.log("Valid token");
    axios.interceptors.request.use(
        request => {
            request.baseURL = global.configData?.APIUrl;
            // request.headers['Access-Control-Allow-Headers'] = '*'
            request.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Token')
            // request.headers['Access-Control-Allow-Origin'] = '*'

            return request;
        }
    );
// }


//// ---- HTTP Interceptors ----- ///////////
