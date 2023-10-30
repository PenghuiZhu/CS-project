import React from "react";
import {Button, Checkbox, Form, Input, message} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import './Login.css'
import axios from "axios";
export default function Login(props) {
    const onFinish = (values) => {
        console.log(values)

        axios.get(`http://localhost:8000/admins?email=${values.email}&password=${values.password}`)
            .then(res => {
                console.log(res.data);
                if(res.data.length === 0){
                    message.error("Wrong email or password")
                }else{
                    localStorage.setItem("token",JSON.stringify(res.data[0]))
                    props.history.push("/")
                }
            })
    };
    return (
        <div style={{background:'rgb(35,39,65)',height:"100%",overflow:"hidden"}}>
            <div className="formContainer">
                <div className="logintitle">Welcome to CSEE GTA/Grader Application System</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your UMKC Email!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="UMKC Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item email="remember" valuePropEmail="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}