import Firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyB8aS80bsZRep8XapZlAL6SZiyEVY84r6U',
    authDomain: 'testfirebase-ecdab.firebaseapp.com',
    databaseURL: 'https://testfirebase-ecdab.firebaseio.com',
    projectId: 'testfirebase-ecdab',
    storageBucket: 'testfirebase-ecdab.appspot.com',
    messagingSenderId: '1068521284080'
};

export default Firebase.initializeApp(config);