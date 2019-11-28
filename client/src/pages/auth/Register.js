import React from "react";
import useForm from "react-hook-form";
import {Link, Redirect} from "react-router-dom";

import Input from "../../components/Input";

import {useAuth} from "../../context/auth";
import * as api from "../../services/auth";

import "../../App.css";
import logoImg from "../../logo.svg";

import {Card, Form, Logo} from '../../components/AuthForms';

const Register = (props) => {
    // const referer = props.location.state.referer || '/';

    const {state, handleAuthentication} = useAuth();
    const {register, handleSubmit} = useForm();

    const onSubmit = async values => {
        try {
            console.log(values);

            let response = await api.register(values);

            handleAuthentication(response);

            alert("Registration Successful")

        } catch (error) {
            alert("an error occurr");
            console.log(error);
        } finally {
            // setIsLoading(false)
        }
    };

    if (state.isLoggedIn) {
        return <Redirect to={'/'}/>;
    }

    return (

        <Card>
            <Logo src={logoImg}/>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Input
                    label={"First name"}
                    type="text"
                    name="firstName"
                    ref={register({required: true, maxLength: 80})}/>

                <Input
                    label={"Last name"}
                    type="text"
                    name="lastName"
                    ref={register({required: true, maxLength: 100})}/>

                <Input
                    label={"Email"}
                    type="text"
                    name="email"
                    ref={register({
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    })}/>

                <Input
                    label={"Password"}
                    type="password"
                    name="password"
                    ref={register({required: true, minLength: 6})}/>

                <input type="submit"/>
            </Form>
            <Link to="/login">Already have an account?</Link>
        </Card>
    );
};


export default Register;