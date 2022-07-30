import { useState } from "react";
import "./Login.css";

export default function Signup() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("userId", formValues.email);
    window.location.href = "https://wysa-529fd.web.app/";
  };

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1>Signup Form</h1>

        <div className="ui divider"></div>

        <div className="ui form">
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}
