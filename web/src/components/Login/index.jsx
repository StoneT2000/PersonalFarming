import React from 'react';
import Default from '../Default';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import useForm from 'react-hook-form'
import "./index.scss";

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
