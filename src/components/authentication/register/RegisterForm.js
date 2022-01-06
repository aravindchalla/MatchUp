import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import {SignUp} from '../../../APIcalls/Auth'

import { connect } from 'react-redux';
import {postUser} from '../../../redux/actions/userActions';
// ----------------------------------------------------------------------

function RegisterForm(props) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('First name required'),
    lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
    dob: Yup.string().required('DOB is required')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword:'',
      dob:''
    },
    validationSchema: RegisterSchema,
    onSubmit: (values, actions) => {
      const user = {
        "firstName": values.firstName,
        "lastName": values.lastName,
        "email": values.email,
        "password": values.password,
        "confirmPassword":values.confirmPassword,
        "dob": values.dob,
        "photoURL" : `/static/mock-images/avatars/avatar_${Math.floor(Math.random() * (24) + 1)}.jpg`,
        "CartProducts" : []
      }
      SignUp(user)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          props.postUser(user);
          localStorage.setItem("userId", res.user.id);
          const curruser = {
            "firstName": res.user.firstName,
            "lastName": res.user.lastName,
            "email": res.user.email,
            "photoURL": res.user.photoURL,
          }
          localStorage.setItem("user", JSON.stringify(curruser));
          navigate('/dashboard/app', { replace: true });
        }
        else{
          switch(res.status){
            case 401 : {console.log(res.msg)};break;
            case 500 : console.log(res.msg);break;
            default : console.log(res);
          }
        }
        actions.setSubmitting(false);
      })
      .catch(err=>{
        console.log(err)
      })
    }
  });

  const { errors, touched,values, handleSubmit, isSubmitting, getFieldProps } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="confirm-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="confirmPassword"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                    <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />

          <TextField
              fullWidth
              id="date"
              label="DOB"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...getFieldProps('dob')}
              error={Boolean(touched.dob && errors.dob)}
              helperText={touched.dob && errors.dob}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Register
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
const mapStateToProps = (state) => {
  return {
    user : state.userReducer.user
  } 
}

const mapDispatchToProps = (dispatch)=>{
  return {
    postUser : (user)=>{dispatch(postUser(user))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);