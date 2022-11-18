# Firebase Demo

Firebase is a great way to get your feet wet with the whole serverless arch thing. It does require some setup, but once you have the connections and api keys the implementation is straight forward.

## Setup
You have to have a google account to use this. You will just google firebase and go to the console. Then you will setup a new project, and you can use this one as refrence to where the credentials will go that they throw at you. Please utilize the ENV files for your parameters so you don't get in trouble with Google. You can easily deploy apps using firebase, you will also need to upgrade to the pay as you go, you can have it alert you when money exceeds a provided value. The documentation is REALLY good so if you go slow and steady through the documentation you will have minimal barriers to get across. This is also widely used so there are alot of help docs.

On your google acount you will need to go to acount security enable two factor authentication. Once that is done, a new selection will appear in the same selection called App Password. You will go and create a new app password and use this value in the function directories .env file.

You will follow the firebase guide on initial app creation on the firebase console website. Within the firebase init step only select hosting (the files one) and functions. For the hosting setup instead of public as the deployment directory enter build. This will be the result from running npm run build which will build a production ready version of the react app, hence why we want to use this folder for the root for deploying the react app.

## Running locally

Please create a .ENV file in both the project root directory and in the functions directory.

Root Directery ENV File
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
```

Functions Directory ENV File
```
GOOGLE_APP_PASS=
```

To run the app locally
```
npm install
npm start
```
