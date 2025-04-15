import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { useSignupMutation } from '../apiSlice';
import { useNavigate } from 'react-router-dom';
import { isPasswordStrong } from '../tools';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export default function SignUp(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [secondName, setSecondName] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const [secondNameError, setSecondNameError] = React.useState(false);
  const [secondNameErrorMessage, setSecondNameErrorMessage] = React.useState('');

  const [signup, { isLoading, error }] = useSignupMutation();
  const navigate = useNavigate();

  const validateInputs = () => {
    const isEmailValid = (email) => emailRegex.test(email);
    let isValid = true;

    if (firstName.trim() === "" || firstName.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    if (secondName.trim() === "" || secondName.length < 1) {
      setSecondNameError(true);
      setSecondNameErrorMessage('Second name is required.');
      isValid = false;
    } else {
      setSecondNameError(false);
      setSecondNameErrorMessage('');
    }

    if (!email || !isEmailValid(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password) {
      setPasswordError(true);
      setPasswordErrorMessage('Password is required.');
      isValid = false;
    } else {
      const { valid, errors } = isPasswordStrong(password) || { valid: false, errors: [] };
      if (!valid) {
        setPasswordError(true);
        setPasswordErrorMessage(`Password must contain ${errors.join(', ')}.`);
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage('');
      }
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateInputs()) {
      return;
    }
    try {
      await signup({ first_name: firstName, last_name: secondName, email, password }).unwrap();
      navigate('/dashboard');
    } catch (err) {
      if (err?.data?.detail) {
        setPasswordError(true);
        setPasswordErrorMessage(err.data.detail);
      } else {
        setPasswordError(true);
        setPasswordErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="firstName">First Name</FormLabel>
              <TextField
                autoComplete="firstName"
                name="firstName"
                required
                fullWidth
                id="firstName"
                placeholder="Jon"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={nameError}
                helperText={nameErrorMessage}
                color={nameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="secondName">Last Name</FormLabel>
              <TextField
                autoComplete="secondName"
                name="secondName"
                required
                fullWidth
                id="secondName"
                placeholder="Snow"
                value={secondName}
                onChange={(e) => setSecondName(e.target.value)}
                error={secondNameError}
                helperText={secondNameErrorMessage}
                color={secondNameError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                variant="outlined"
                error={emailError}
                helperText={emailErrorMessage}
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            {/* Remove onClick here so validation runs only on form submission */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 1 }}
            >
              {isLoading ? 'Loading...' : 'Submit'}
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Typography sx={{ textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/login/" variant="body2" sx={{ alignSelf: 'center' }}>
              Sign in
            </Link>
          </Typography>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
