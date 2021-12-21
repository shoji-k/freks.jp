// Initialize Firebase
var config = {
  apiKey: "AIzaSyARYJw-Rl9EbDSEebrIEmph0qclJoBQIJA",
  authDomain: "pushtest-7bfd3.firebaseapp.com",
  databaseURL: "https://pushtest-7bfd3.firebaseio.com",
  projectId: "pushtest-7bfd3",
  storageBucket: "pushtest-7bfd3.appspot.com",
  messagingSenderId: "961077676981"
};
var messaging = firebase.initializeApp(config).messaging();
