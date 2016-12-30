import firebase from 'firebase'

export function fireInit(func) {
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
	    func(true, user)
	  } else {
	    func(false)
	  }
	}, function(error) {
	  console.log(error)
	})
}
