import React, {forwardRef} from "react";
import {Form, Input} from "antd";


const UserForm = forwardRef((props,ref) =>{
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const [form] = Form.useForm();
    return(
        <Form {...layout} form={form} ref={ref}>
            <Form.Item name="firstname" label="First Name"
                       rules={[{required: true,message:'Please input First Name'},]}>
                <Input allowClear placeholder="input First Name" />
            </Form.Item>
            <Form.Item name="surname" label="Surname"
                       rules={[{required: true,message:'Please input Surname'},]}>
                <Input allowClear placeholder="input Surname" />
            </Form.Item>
            <Form.Item name="currentlevel" label="Current Level"
                       rules={[{required: true,message:'Please input Current Level(BS/MS/PhD)'},]}>
                <Input allowClear placeholder="input BS/MS/PhD" />
            </Form.Item>
            <Form.Item name="semester" label="Graduating Semester"
                       rules={[{required: true,message:'Please input Graduating Semester'},]}>
                <Input allowClear placeholder="input Graduating Semester"/>
            </Form.Item>
            <Form.Item name="major" label="Current Major"
                       rules={[{required: true,message:'Please input Current Major(CS/IT/ECE/EE)'},]}>
                <Input allowClear placeholder="input CS/IT/ECE/EE"/>
            </Form.Item>
            <Form.Item name="email" label="UMKC Email"
                       rules={[{required: true,message:'Please input UMKC Email'},]}>
                <Input allowClear placeholder="input UMKC Email"/>
            </Form.Item>
            <Form.Item name="studentId" label="Student ID"
                       rules={[{required: true, message:'Please input Student ID'},]}>
                <Input allowClear placeholder="input Student ID"/>
            </Form.Item>
            <Form.Item name="password" label="Password"
                       rules={[{required: true, message:'Please input Password'},]}>
                <Input allowClear placeholder="input Password"/>
            </Form.Item>
        </Form>
    )
})

export default UserForm;