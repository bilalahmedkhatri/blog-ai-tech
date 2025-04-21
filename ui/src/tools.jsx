import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
// import useGetUserProfileByIdSlugQuery from './apiSlice';


export const getEmailAndName = () => {
  const token = Cookies.get('access_token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        console.log("Token has expired");
        return {
          userId: 'user',
          email: 'test@gmail.com',
          name: 'test',
          img: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        };
      }
      return {
        userId: decodedToken.user_id,
        email: decodedToken.email,
        name: decodedToken.name,
        img: decodedToken.img,
      };
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  return null;
};


export const isPasswordStrong = (password) => {
  console.log("Debug: password =", password, "length =", password.length);
  const errors = [];

  // Check for at least 8 characters
  if (!/.{8,}/.test(password)) {
    errors.push('at least 8 characters');
  }
  // Check for one lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('one lowercase letter');
  }
  // Check for one uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('one uppercase letter');
  }
  // Check for one digit
  if (!/\d/.test(password)) {
    errors.push('one digit');
  }
  // Check for one special character (@#$%^&+=!)
  if (!/[@#$%^&+=!]/.test(password)) {
    errors.push('one special character (@#$%^&+=!)');
  }

  console.log("Debug: errors =", errors);
  return { valid: errors.length === 0, errors };
};


export function UserProfile(userProfile) {
  if (!userProfile) {
    return null;
  } else if (userProfile.length > 0) {
    try {
      const first_name = userProfile[0].first_name || userProfile.name || '';
      const last_name = userProfile[0].last_name || userProfile.name || '';
      return {
        userId: userProfile.user_id,
        email: userProfile.email,
        name: first_name || last_name,
        profile_image: userProfile.img,
        security_question: userProfile.security_question,
        security_answer: userProfile.security_answer,
        phone_number: userProfile.phone_number,
      }
    } catch (error) {
      const error_message = error.message;
      console.error("Error decoding user profile:", error_message);
    }
  }
}
