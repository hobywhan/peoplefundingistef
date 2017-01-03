import firebase from 'firebase'
import {LoadingState, AuthenticatedState} from '../main.js'

export function fireInit() {
	var config = {
		apiKey: 'AIzaSyDwJ1XZk23i79ePjEd5jXqBw_fObVGscUQ',
    authDomain: 'peoplefundingistef.firebaseapp.com',
    databaseURL: 'https://peoplefundingistef.firebaseio.com',
    storageBucket: 'peoplefundingistef.appspot.com',
    messagingSenderId: '353174719687'
	}
	firebase.initializeApp(config)

	firebase.auth().onAuthStateChanged(function (user) {
	  if (user) {
			let newUser = {
				// displayName: user.displayName ? user.displayName : '',
				email: user.email ? user.email : '',
				emailVerified: user.emailVerified ? user.emailVerified : '',
				photoURL: user.photoURL ? user.photoURL : '',
				// uid: user.uid ? user.uid : '',
				accessToken: user.accessToken ? user.accessToken : '',
				providerData: user.providerData ? user.providerData : ''
			}
			firebase.database().ref('users').once('value', function(snapshot) {
			  if (snapshot.hasChild(user.uid)) {
					firebase.database().ref('users/' + user.uid).set(newUser)
			  } else {
					firebase.database().ref('users/' + user.uid).push(user)
				}
			})
			AuthenticatedState.$emit('toggle', true)
	  } else {
			AuthenticatedState.$emit('toggle', false)
	  }
		LoadingState.$emit('toggle', false)
	}, function(error) {
	  console.log(error)
	})
}
