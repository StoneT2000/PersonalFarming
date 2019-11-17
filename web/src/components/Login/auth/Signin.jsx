import React, {Component} from 'react';
import axios from "axios";
import Default from '../../Default';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import useForm from 'react-hook-form'
import "../index.scss";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions",
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

/*
function Login() {
  const { register, handleSubmit, watch, errors } = useForm()
  const onSubmit = data => { console.log(data) }
  return (
      <Default>
        <div className="Login">
            <div>
            <h1>Login Form</h1>
            <Form className="form" onSubmit={handleSubmit(onSubmit)}>>
              <Form.Field>
                <label>Username</label>
                <input placeholder='username' ref={register({ required: true })} />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input placeholder='password' ref={register({ required: true })} />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input placeholder='confirmPassword' ref={register({ required: true })} />
                {errors.confirmPassword && <span>This field is required</span>}
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
            </div>
        </div>
    </Default>
  );
}
export default Login;
*/
