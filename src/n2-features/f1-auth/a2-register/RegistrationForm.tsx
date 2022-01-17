import s from "./RegistrationForm.module.scss";
import Title from "../../../n1-main/m1-ui/common/Pvl/title/Title.jsx";
import Subtitle from "../../../n1-main/m1-ui/common/Pvl/subtitle/Subtitle.jsx";
import { Input } from "../../../n1-main/m1-ui/common/Pvl/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../../../n1-main/m2-bll/store";
import { createNewUser, RequestStatusType } from "../../../n1-main/m2-bll/registrationReducer";
import { Navigate, NavLink } from "react-router-dom";
import React, { ChangeEvent, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "../../../n1-main/m1-ui/common/Pvl/button/Button";
import { buttonColorTwo } from "../../../n1-main/m1-ui/common/styles/inlineVariables";
import { buttonFontColorTwo } from "../../../n1-main/m1-ui/common/styles/inlineVariables";





// стилизация кнопок
const styleButton1 = {
   backgroundColor: buttonColorTwo,
   color: buttonFontColorTwo,
   width: "124px",
   boxShadow: "none"
}

const styleButton2 = {
   width: "187px"
}

export default function RegistrationForm() {
   const [inputType, setInputType] = useState('password')

   // данные для input email
   const inputData1 = {
      id: "email",
      type: "email",
      name: "email",
      for: "email",
      label: "Email",
      style: {
         display: "none"
      }
   }

   // данные для input password
   const inputData2 = {
      id: "password",
      type: inputType,
      name: "password",
      for: "password",
      label: "Password",
      style: {
         display: "inlineBlock"
      }
   }

// данные для input confirm password
   const inputData3 = {
      id: "checkPassword",
      type: inputType,
      name: "checkPassword",
      for: "checkPassword",
      label: "Confirm password",
      style: {
         display: "inlineBlock"
      }
   }

   const schemeCreator = () => {
      return yup.object().shape({
         email: yup.string().email('Invalid email').required('Required').trim(),
         password: yup.string()
            .matches(/^[a-zA-Z0-9]+/, 'Password can only contain Latin letters and numbers.')
            .required('Required')
            .min(7, 'Password must be more than 7 characters...'),
         checkPassword: yup.string()
            .required('Required'),
      })
   }

   const dispatch = useDispatch()
   const [errorSelf, setErrorSelf] = useState<string | null>(null)
   const [showPas, setShowPass] = useState(false)

   const error = useSelector<AppStoreType, string | null>(state => state.registration.error)
   const message = useSelector<AppStoreType, string | null>(state => state.registration.message)
   const status = useSelector<AppStoreType, RequestStatusType>(state => state.registration.status)


   const createNewUserHandler = (email: string, password: string) => {
      dispatch(createNewUser(email, password))
   }
   const showPasswordHandler = (value: ChangeEvent<HTMLInputElement>) => {
      setShowPass(value.currentTarget.checked)
   }
   const onKeypressHandler = () => {
      setErrorSelf(null)
   }

   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
         checkPassword: '',
      },
      onSubmit: (values) => {
         if (values.email.trim() !== "" && values.password === values.checkPassword) {
            formik.resetForm()
            createNewUserHandler(values.email, values.password)
         } else {
            if (values.password !== values.checkPassword) {
               setErrorSelf('password dont equal')
               setTimeout(() => {
                  setErrorSelf(null)
               }, 2000)
            }
         }
      },
      validationSchema: schemeCreator()
   });

   if (status === 'register_success') {
      return <Navigate to={"/login"} />
   }

   return (
      <form onSubmit={formik.handleSubmit}>
         {status === 'loading'
            ? <h1>...loading</h1>
            : <div>
               <div className={s.contentWrap}>
                  <Title />
                  <Subtitle subtitle="Sign Up" />
                  <span style={{ color: 'red' }}>{error && error}</span>
                  <span style={{ color: 'green' }}>{message && message}</span>
                  <Input
                     inputData={inputData1}
                     {...formik.getFieldProps('email')}
                  />
                  <span className={s.error}>{formik.touched.email ? formik.errors.email : ''}</span>
                  <Input
                     inputData={inputData2}
                     setInputType={setInputType}
                     {...formik.getFieldProps('password')}
                  />
                  <span className={s.error}>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</span>
                  <Input
                     inputData={inputData3}
                     setInputType={setInputType}
                     {...formik.getFieldProps('checkPassword')}
                  />
                  <span className={s.error}>{formik.touched.checkPassword && formik.errors.checkPassword ? formik.errors.checkPassword : ''}</span>
                  <div className={s.block}>
                     <Button label="Cancel" style={styleButton1} />
                     <Button type="submit" label="Register" style={styleButton2} />
                  </div>
                  <NavLink className={s.link} to="/login">Login</NavLink>
               </div>
            </div>
         }
      </form >
   );
}


