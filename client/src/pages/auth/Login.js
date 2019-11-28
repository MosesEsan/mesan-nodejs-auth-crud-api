import React from "react";
import useForm from "react-hook-form";
import { Link, Redirect } from "react-router-dom";

import { useAuth }  from "../../context/auth";
import * as api from "../../services/auth";

import "../../App.css";
import {Card, Form, Logo} from '../../components/AuthForms';

const Login = (props) => {
    // const referer = props.location.state.referer || '/';

    const { state, handleAuthentication} = useAuth();
    const { register, handleSubmit , errors } = useForm();

    const onSubmit = async values => {
        console.log(values);
        try {
            const {email, password} = values;


            let response = await api.login({email, password});

            console.log(response)

            handleAuthentication(response);

        } catch (error) {
            alert("an error occurr");
            console.log(error);
        } finally {
            // setIsLoading(false)
        }
    };

    if (state.isLoggedIn) {
        return <Redirect to={'/dashboard'} />;
    }

    return (

        <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                name="email"
                ref={register({
                    required: 'Your email address is required',
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                    }
                })}
            />
            {errors.email && errors.email.message}

            <input
                name="password"
                type="password"
                ref={register({ required: true, minLength: 6 })}
            />

            {errors.password && errors.password.message}

            <button type="submit">Submit</button>
            <Link to="/register">Don't have an account?</Link>
        </form>
        </Card>
    );
};




export default Login;