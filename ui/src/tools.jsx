import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
// import useGetUserProfileByIdSlugQuery from './apiSlice';


/**
 * Validates a URL string using the URL constructor.
 * @param {string} value – the URL to validate.
 * @returns {boolean}
 */
const isValidUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Determines the API base URL securely:
 * 1. Localhost development: uses window.protocol + localhost, logs only in DEV mode.
 * 2. Production with valid BLOG_API_URL: validates URL and matches exact hostname.
 * 3. Fallback: window.location.origin with a DEV-only warning.
 */
export const getApiUrl = () => {
  const { hostname, protocol, origin } = window.location;            // MDN: hostname & origin :contentReference[oaicite:0]{index=0}
  const envUrl = import.meta.env.BLOG_API_URL?.trim();               // Vite env :contentReference[oaicite:1]{index=1}

  let apiAdd = '/api/';
  // 1. Local development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    const localApi = `${protocol}//localhost:8000${apiAdd}`;                   // protocol consistency avoids mixed content :contentReference[oaicite:2]{index=2}
    if (import.meta.env.DEV) {
      console.warn('Dev: using localhost API at', localApi);
    }
    return localApi;
  }

  // 2. Production – valid env URL
  if (envUrl && isValidUrl(envUrl)) {
    const { hostname: envHost } = new URL(envUrl);
    console.log('Debug: envUrl =', envUrl, 'envHost =', envHost, 'hostname =', hostname);
    // Exact hostname match avoids substring spoofing :contentReference[oaicite:3]{index=3}
    if (envHost === hostname) {
      if (import.meta.env.DEV) {
        console.info('DEV: BLOG_API_URL matches host; using page origin', origin + apiAdd);
      }
      return origin + apiAdd;
    }
    // Trust a different, valid API host
    console.log('Using BLOG_API_URL:', envUrl + apiAdd);
    return envUrl + apiAdd;
  }

  // 3. Fallback to origin with DEV warning
  if (import.meta.env.DEV) {
    console.warn('BLOG_API_URL is unset/invalid; defaulting to page origin', origin);
  }
  console.log('Using page origin for API:', origin + apiAdd);
  return origin + apiAdd;
};


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
