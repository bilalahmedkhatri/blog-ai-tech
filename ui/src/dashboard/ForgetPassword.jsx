import React, { useState } from 'react';
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Alert,
  Stack,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { SitemarkIcon } from './components/CustomIcons';
import { useForgotPasswordQuestionMutation, useForgotPasswordAnswerMutation } from '../apiSlice';
import { useNavigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [requestQuestion, { isLoading: isRequesting }] = useForgotPasswordQuestionMutation();
  const [submitAnswer, { isLoading: isSubmitting }] = useForgotPasswordAnswerMutation();
  const navigate = useNavigate();

  // Function to handle API errors
  const handleApiError = (error) => {
    if (error?.data?.detail) {
      setErrorMessage(error.data.detail); // Set error message from the API response
    } else {
      setErrorMessage('An unexpected error occurred. Please try again.'); // Fallback for unexpected errors
    }
  };

  // Step 1: Request security question
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    try {
      const result = await requestQuestion({ email }).unwrap();
      if (result.security_question) {
        setSecurityQuestion(result.security_question);
        setStep(2); // Move to the next step
      } else {
        setErrorMessage('No security question is set for this account.');
      }
    } catch (error) {
      handleApiError(error); // Handle errors properly
    }
  };

  // Step 2: Submit answer and new password
  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    try {
      const result = await submitAnswer({
        email,
        security_answer: securityAnswer,
        new_password: newPassword,
      }).unwrap();
      if (result.detail === 'Password updated successfully.') {
        setStep(3); // Move to the success step
        setTimeout(() => navigate('/login'), 3000); // Redirect after a delay
      } else {
        setErrorMessage(result.detail || 'Unable to update password.');
      }
    } catch (error) {
      handleApiError(error); // Handle errors properly
    }
  };

  return (
    <AppTheme>
      <CssBaseline enableColorScheme />
      <Stack direction="column" justifyContent="center" sx={{ minHeight: '100vh', px: 2 }}>
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <Typography variant="h4" component="h1" gutterBottom>
            Forgot Password
          </Typography>
          {step === 1 && (
            <Box
              component="form"
              onSubmit={handleQuestionSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 1,
              }}
            >
              {/* <form onSubmit={handleQuestionSubmit}> */}
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isRequesting}
                sx={{ mt: 2 }}
              >
                {isRequesting ? 'Requesting...' : 'Get Security Question'}
              </Button>
              <Box sx={{ mt: 2, minHeight: '40px' }}>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Box>
            </Box>
          )}
          {step === 2 && (
            <form onSubmit={handleAnswerSubmit}>
              <Typography variant="body1" mt={2}>
                <strong>Security Question:</strong> {securityQuestion}
              </Typography>
              <FormControl fullWidth>
                <FormLabel htmlFor="answer">Your Answer</FormLabel>
                <TextField
                  id="answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  placeholder="Your answer"
                  required
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <TextField
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••"
                  required
                  inputProps={{ minLength: 6 }}
                />
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ mt: 2 }}
              >
                {isSubmitting ? 'Submitting...' : 'Reset Password'}
              </Button>
              <Box sx={{ mt: 2, minHeight: '40px' }}>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              </Box>
            </form>
          )}
          {step === 3 && (
            <Typography variant="h5" textAlign="center" mt={2}>
              Password Reset Successful! Redirecting to login...
            </Typography>
          )}
        </Card>
      </Stack>
    </AppTheme>
  );
};

export default ForgotPassword;
