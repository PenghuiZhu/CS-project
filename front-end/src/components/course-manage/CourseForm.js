import React, {forwardRef} from "react";
import {Form, Input} from "antd";


const CourseForm = forwardRef((props,ref) =>{
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
            <Form.Item name="coursenumber" label="Course Number"
                       rules={[{required: true,message:'Please input Course Number'},]}>
                <Input allowClear placeholder="input Course Number" />
            </Form.Item>
            <Form.Item name="coursename" label="Course Name"
                       rules={[{required: true,message:'Please input Course Name'},]}>
                <Input allowClear placeholder="input Course Name" />
            </Form.Item>
            <Form.Item name="need" label="Need"
                       rules={[{required: true,message:'Please input Need(grades/lab instructors/instructor positions)'},]}>
                <Input allowClear placeholder="grades/lab instructors/instructor positions" />
            </Form.Item>
            <Form.Item name="description" label="Description"
                       rules={[{required: true,message:'Please input Description'},]}>
                <Input.TextArea allowClear placeholder="input Description"/>
            </Form.Item>
        </Form>
    )
})

export default CourseForm;