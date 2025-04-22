import { useState, useEffect } from "react"
import { supabase } from "../Client"
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom"
const { TextArea } = Input;


const CreatePost = () => {
    const [form] = Form.useForm()
    const navigate = useNavigate()

    useEffect(() => {
        form.resetFields()
    }, [])

    const onFinish = async (value) => {
        const body = {
            name: value.name,
            exercise_name: value.exercise_name,
            feedback: value.feedback,
            imageURL: value?.imageURL,
            post_title: value.post_title
        }
        await supabase.from("Posts")
            .insert(body)
            .select()
        form.resetFields()
        navigate("/", {
            state: { postCreated: true }
        })
    }

    const onFail = (value) => {
        console.log(value)
        form.resetFields()
    }

    return (
        <>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: "100vw", height: "90vh"}}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "rgb(26, 26, 30)", gap: "10px", backgroundColor: "#ffffff", padding: "50px", borderRadius: "8px"}}>
                    <h1>Create your own Workout Post</h1>
                    <div style={{display: "flex", flexDirection: "column", width: "80%", justifyContent: "center", alignItems: "center", color: "rgb(26, 26, 30)"}}>

                        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFail} autoComplete="off" style={{width: "100%"}}>
                            <Form.Item name="name" label={<span style={{fontWeight: "700"}}>Name</span>} rules={[
                                {
                                    required: true,
                                    message: "Please input your Name!"
                                },
                                {
                                    pattern: /^[a-zA-Z\s]+$/,
                                    message: "Digits aren't allowed!"
                                },
                            ]}
                            validateTrigger="onSubmit">
                                <Input placeholder="Your Name"/>
                            </Form.Item>
                            <Form.Item name="post_title" label={<span style={{fontWeight: "700"}}>Title of Post</span>} rules={[
                                {
                                    required: true,
                                    message: "Please input your Post Title!"
                                },
                            ]}
                            validateTrigger="onSubmit">
                                <Input placeholder="Your Post Title"/>
                            </Form.Item>
                            <Form.Item name="exercise_name" label={<span style={{fontWeight: "700"}}>Name of Exercise</span>} rules={[
                                {
                                    required: true,
                                    message: "Please input your Exercise Name!"
                                },
                                {
                                    pattern: /^[a-zA-Z\s]+$/,
                                    message: "Digits and Special Chars aren't allowed!"
                                },
                            ]}
                            validateTrigger="onSubmit">
                                <Input placeholder="Exercise name"/>
                            </Form.Item>
                            <Form.Item name="imageURL" label={<span style={{fontWeight: "700"}}>Image URL</span>} validateTrigger="onSubmit">
                                <Input placeholder="Img URL" />
                            </Form.Item>
                            <Form.Item name="feedback" label={<span style={{fontWeight: "700"}}>Feedback</span>} rules={[
                                {
                                    required: true,
                                    message: "Please input your Feedback!"
                                },
                            ]}
                            validateTrigger="onSubmit">
                                <TextArea rows={4} placeholder="Enter your Feedback!"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" 
                                    style={{width: "100%", borderRadius: "18px", padding: "22px 0px", backgroundColor: "rgb(88,185,158)", fontSize: "18px", fontWeight: "700"}}>Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePost