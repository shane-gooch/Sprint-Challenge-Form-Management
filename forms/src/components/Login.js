import React from "react";

import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function Login({ touched, errors }) {
  return (
    <div className="form">
      <h3>Login</h3>
      <Form>
        <label htmlFor="username">Username: </label>
        <Field type="text" name="username" placeholder="Enter Username" />
        {touched.username && errors.username && <p>errors.username</p>}
        <label htmlFor="password">Password: </label>
        <Field type="password" name="password" placeholder="Enter Password" />
        {touched.password && errors.password && <p>errors.password</p>}
        <button>Submit</button>
      </Form>
    </div>
  );
}

export default withFormik({
  mapPropsToValues: () => {
    return {
      username: "",
      password: ""
    };
  },
  handleSubmit: (values, formikBag) => {
    console.log(formikBag);

    const url = "http://localhost:5000/api/login";
    axios
      .post(url, values)
      .then(res => {
        formikBag.props.setToken(res.data.token);
        formikBag.props.history.push("/restricted");
      })
      .catch(err => console.log(err.response));
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required(""),
    password: Yup.string().required("")
  })
})(Login);
