import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import { postSignUp } from '../../api';
import BookNow from '../BookNow';
import classes from './Login.module.css';
import classes1 from './Signup.module.css';
import { useNavigate } from 'react-router-dom';

const initials = {
  email: "",
  rate_code: ""
};

function Guest() {
  const [input, setInput] = useState(initials);
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const inputhandler = (input, value) => {
    setInput((prevInput) => {
      return {
        ...prevInput,
        [input]: value,
      };
    });
  };

  const submithandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await postSignUp(input);
      console.log(res);
    } catch (error) {
      console.error(error);
    }

    // Map selected Emirate to a number before redirecting to BookNow page
    const emiratesMap = {
      "Ras Al Khaimah": 1,
      "Sharjah": 2,
      "Dubai": 3,
      "Umm Al Quwain": 4,
      "Ajman": 5
    };
    
    // Get the selected Emirate from the input state
    const selectedEmirate = input.rate_code;

    // Check if the selected Emirate exists in the emiratesMap
    if (selectedEmirate in emiratesMap) {
      const emirateNumber = emiratesMap[selectedEmirate];
      setRedirect(true);
      navigate('/cart', { state: { emirateNumber } });
    }
  };

  if (redirect) {
    return <BookNow />;
  }

  return (
    <>
      {/* ... (rest of the component code) ... */}
    </>
  );
}

export default Guest;