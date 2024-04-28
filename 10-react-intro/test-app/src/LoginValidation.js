// import { useState } from 'react';

// function LoginValidation(setMsg, onLogin) {
//   const [username, setUsername] = useState('');

//   function updateUsername(e) {
//     setUsername(e.target.value);
//   }

//   function validateUsername() {
//     const regex = /[^A-Za-z0-9_]+/g;
  
//     if (!username || username.match(regex)) {
//       const msg = 'This username is invalid!';
//       setMsg(msg);
//       return false; 
//     }
  
//     if (username.toLowerCase() === 'dog') {
//       const msg = "Sorry, you can not use dog as an username!";
//       setMsg(msg);
//       return false; 
//     }
//     setMsg('');
//     return true; 
//   }
  
//   function processLogin() {
//     if (validateUsername()) { 
//       onLogin(username);
//       setMsg('');
//     }
//   }
  

//   return { username, updateUsername, processLogin };
// }

// export default LoginValidation;
