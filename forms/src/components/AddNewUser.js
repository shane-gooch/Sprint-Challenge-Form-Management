import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function AddNewUser({ touched, errors }) {
  return (
    <div className="form">
      <h3>Add New User</h3>
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

    const url = "http://localhost:5000/api/register";
    axios
      .post(url, values)
      .then(res => {
        console.log(res);
        // useLocalStorage("token", res.data.token);
        formikBag.props.setToken(res.data.token);
        // localStorage.setItem("token", res.data.token);
        formikBag.props.history.push("/restricted");
      })
      .catch(err => console.log(err.response));
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required("Password is required"),
    password: Yup.string()
      .min(4)
      .required("Password is required")
  })
})(AddNewUser);
