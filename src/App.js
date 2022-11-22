//IMPORT VARIOUS MODULES AND DEPENDENCIES FOR THE PROJECT
import React, {useState} from "react"; 
import {numbers,upperCaseLetters,lowerCaseLetters,specialCharacters} from "./components/characters";
import {ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SUCCESS_COPY, FAILED_COPY } from "./components/feedback";
import "./App.css";

//SET INITIAL STATES
const  App = () => {

   const [password, setPassword] = useState("")
   const [passwordLength, setPasswordLength] = useState(26)
   const [includeNumbers, setIncludeNumbers] = useState(false)
   const [includeUppercase, setIncludeUppercase] = useState(false)
   const [includeLowercase, setIncludeLowercase] = useState(false)
   const [includeSpecialcharacters, setIncludeSpecialcharacters] = useState(false)
    
   //HANDLE EMPTY AND SELECTED INPUTS FOR PASSWORD GENERATION
     //If no input was selected =>
    const handleGeneratedPassword = () => {
      if(!includeNumbers && !includeUppercase && !includeLowercase && !includeSpecialcharacters) {
        notify("You must tick atleast one checkbox before generating password!😥", true)
      }
      //If inputs were selected =>
      else {
      let characterList = ""
      if (includeNumbers) {
        characterList = characterList + numbers
      }
      if (includeUppercase) {
        characterList = characterList + upperCaseLetters
      }
      if (includeLowercase) {
        characterList = characterList + lowerCaseLetters
      }
      if (includeSpecialcharacters) {
        characterList = characterList + specialCharacters
      }
      setPassword(createPassword(characterList))
      notify("Password is generated successfully😊", false)
    }


  }

  //MAKE SURE THE PASSWORD TO BE GENERATED DOESN'T EXCEED THE PASSWORD LENGTH

  const createPassword = (characterList) => {
    let password = "";
    const characterListLength = characterList.length;
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characterListLength);
      password = password + characterList.charAt(characterIndex);
    }
    return password;
  };


  //HANDLE HOW PASSWORD IS COPIED TO CLIPBOARD

  const copyToClipboard = (password) => {
    navigator.clipboard.writeText(password);
  };

  //HANDLE VARIOUS SUCCESS AND FAILURE NOTIFICATIONS
  const notify = (message, hasError = false) => {
    if (hasError) {
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleCopiedPassword = (e) => {
    if (password === "") {
      notify(FAILED_COPY, true);
    } else {
      copyToClipboard(password);
      notify(SUCCESS_COPY);
    }
  };
    



//HANDLE THE FORM AND UI

  return (
    <div className="container">
      <div className="heading">
        <h1>Password Generator</h1>
      </div>
          
      <div className="generator">
        <h3>{password}</h3>
        <button className="copy__btn">
          <i onClick={handleCopiedPassword} className="far fa-clipboard"></i>
        </button>
      </div>
          {/* Input for password Length */}
      <div className="form-group">
        <label htmlFor="password-strength">Password length</label>
        <input
          className="pw"
          defaultValue={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
          type="number"
          id="password-strength"
          name="password-strength"
          max="26"
          min="8"
        />
      </div>

      {/* Input for upperCase Letters */}
      <div className="form-group">
        <label htmlFor="uppercase-letters">Add Uppercase Letters</label>
        <input
          type="checkbox"
          checked={includeUppercase}
          onChange={(e) => setIncludeUppercase(e.target.checked)}
          id="uppercase-letters"
          name="uppercase-letters"
        />
      </div>

      {/* Input for lowerCase Letters */}
      <div className="form-group">
        <label htmlFor="lowercase-letters">Add Lowercase Letters</label>
        <input
          type="checkbox"
          checked={includeLowercase}
          onChange={(e) => setIncludeLowercase(e.target.checked)}
          id="lowercase-letters"
          name="lowercase-letters"
        />
      </div>
      {/* Input for Numbers */}
      <div className="form-group">
        <label htmlFor="include-numbers">Include Numbers</label>
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={(e) => setIncludeNumbers(e.target.checked)}
          id="include-numbers"
          name="include-numbers"
        />
      </div>

      {/* Input for specialCharacters */}
      <div className="form-group">
        <label htmlFor="include-specialchars">Include Symbols</label>
        <input
          type="checkbox"
          checked={includeSpecialcharacters}
          onChange={(e) => setIncludeSpecialcharacters(e.target.checked)}
          id="include-specialchars"
          name="include-specialchars"
        />
      </div>

      {/* The Submit button */}
      <button onClick={handleGeneratedPassword} className="generator__btn">
        Generate Password
      </button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );

}


export default App;
