import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export const getEmailAndName = () => {
  const token = Cookies.get('access_token');
  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      console.log("Decoded token:", decodedToken);
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