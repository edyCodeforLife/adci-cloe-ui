import React, { useState, useEffect } from 'react';
import { useSkin } from '@hooks/useSkin'
import { Link, useNavigate } from 'react-router-dom'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import { useTranslation } from 'react-i18next'

import { useDispatch, useSelector } from 'react-redux'
import { getLogin } from '@store/login'
import { PATH_DASHBOARD } from '../navigation/path';
import PreDashboardWrapper from './PreDashboardWrapper';
import { LOGIN_DARK, LOGIN_ } from '../utility/Source';
import { AuthService } from '../data/business/index';
import { handleLogin } from '../redux/login';
import toast from 'react-hot-toast';
import { determineRole } from '../utility/Utils';
import { ToastContent } from '../utility/layouts';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { skin } = useSkin()
  const { t } = useTranslation();
  const navigate = useNavigate();
  const illustration = skin === 'dark' ? LOGIN_DARK : LOGIN_;
  const dispatch = useDispatch();

  const signIn = () => {
    const _service = new AuthService();
    console.log("---> " + email + ",," + password)
    let payload = {
      username: email,//"kasino.bd@gmail.com",//"albertus.haryo@yopmail.com",//"arfan.cm@gmail.com",//"kasino.bd@gmail.com", //"email, //"kasino.bd@gmail.com"
      password: password,//"password123", //password, // "password123"
    }
    const token = sessionStorage.getItem("access_token");
    if (token) {
      sessionStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token")
    }

    setTimeout(() => {
      _service.Login(payload, {
        Success: (res) => {
          dispatch(handleLogin({ value: { username: payload.username, ...res } }))
          sessionStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
          localStorage.setItem("email", res?.email);
          localStorage.setItem("role", determineRole(res?.roles));
          res?.roles[0] === 'bd' || res?.email.includes('bd') ? localStorage.setItem("userId", res.userId) : localStorage.setItem("customerId", res.customerId)
          navigate(PATH_DASHBOARD);
        }
        ,
        ValidationError: (res) => {
          toast(
            <ToastContent code="Validation Error" res={res} />, {
            duration: 2000
          }
          )
        },
        ServerError: (res) => {
          toast(
            <ToastContent code="Server Error" res={res} />, {
            duration: 2000
          }
          )
        },
        handle401: (res) => {
          toast(
            <ToastContent code="401" res={res} />, {
            duration: 2000
          }
          )
        }
      })
    }, 250);

    // dispatch(getLogin(payload)).then(navigate("/home"));
  }

  return (
    <PreDashboardWrapper bgPage={illustration}>
      <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
        <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
          <CardTitle tag='h2' className='fw-bold mb-1'>
            Welcome to CLOE! 👋
          </CardTitle>
          <CardText className='mb-2'>Please sign-in to your account</CardText>
          <Form className='auth-login-form mt-2' onSubmit={e => e.preventDefault()}>
            <div className='mb-1'>
              <Label className='form-label' for='login-email'>
                Email
              </Label>
              <Input type='email' id='login-email' placeholder='Email Address' autoFocus onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='mb-1'>
              <div className='d-flex justify-content-between'>
                <Label className='form-label' for='login-password'>
                  Password
                </Label>
                <Link to='/forgot-password'>
                  <small>Forgot Password?</small>
                </Link>
              </div>
              <InputPasswordToggle className='input-group-merge' id='login-password' onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='form-check mb-1'>
              <Input type='checkbox' id='remember-me' />
              <Label className='form-check-label' for='remember-me'>
                Remember Me
              </Label>
            </div>
            <Button color='primary' block onClick={() => signIn()}>
              Sign in
            </Button>
          </Form>
        </Col>
      </Col>
    </PreDashboardWrapper>
  )
}

export default Login
