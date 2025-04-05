import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

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
          name: 'test'
        };
      }
      return {
        userId: decodedToken.user_id,
        email: decodedToken.email,
        name: decodedToken.name
      };
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  }
  return null;
};