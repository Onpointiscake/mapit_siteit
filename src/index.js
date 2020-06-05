import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import AWS from 'aws-sdk'
import 'bootstrap/dist/css/bootstrap.min.css';

import config from './config.json'
import Amplify from 'aws-amplify'

Amplify.configure({
    Auth: {
        mandatorySignId: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        identityPoolId: config.cognito.IDENTITY_POOL
    },
    Storage: {
        AWSS3: {
            bucket: config.s3.bucket,
            region: config.s3.region, 
        }
    }
})

ReactDOM.render(<App />, document.getElementById('root'));

