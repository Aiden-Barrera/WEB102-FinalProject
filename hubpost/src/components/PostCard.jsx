import { useEffect, useState } from "react"
import "./../App.css"
import dayjs from "dayjs"
import { supabase } from "../Client"
import { Form, Input, Button, Modal, notification, Popconfirm } from "antd";
const { TextArea } = Input;



const PostCard = ({id, name, title, exercise, imgURL, feedback, likes, created, postLiked, fetchPost}) => {
    const [date, setDate] = useState(() => dayjs())
    const [commentDate, setCommentDate] = useState(() => dayjs())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [api, contextHolder] = notification.useNotification();
    const [commentClicked, setCommentClicked] = useState(false)
    const [comments, setComments] = useState(null)


    useEffect(() => {
        setDate(dayjs(created))
    }, [])

    const handleClick = async () => {
        await supabase.from("Posts")
            .update({post_likes: likes+1})
            .eq("id", id)
        postLiked(true)
    }

    const onFinish = async (value) => {
        const body = {
            name: value.name,
            exercise_name: value.exercise_name,
            feedback: value.feedback,
            imageURL: value?.imageURL,
            post_title: value.post_title
        }
        await supabase.from("Posts")
            .update(body)
            .eq("id", id)
        api.open({
            message: 'Success!',
            description:
                `Workout Post Successfully Created!`,
        })
        fetchPost()
        setIsModalOpen(false)
    }

    const onFail = (value) => {
        console.log(value)
    }
    
    const handleDelete = async () => {
        await supabase.from("Posts")
            .delete()
            .eq("id", id)
        api.open({
            message: 'Success!',
            description:
                `Workout Post Successfully Deleted!`,
        })
        fetchPost()
        setIsModalOpen(false)
    }

    const fetchComments = async () => {
        const {data} = await supabase.from("Comments")
            .select()
            .eq("post_id", id)
            .order('created_at', { ascending: false })
        setComments(data)
        setCommentDate(dayjs(data.created_at))
        console.log(data)
    }



    return (
        <>
            <div className="card">
                <div className="card-header">
                    <h3>{name}</h3>
                    <h3>{date.format("MMM DD, YYYY")}</h3>
                </div>
                <h1 className="card-title">{title}</h1>
                <img src={imgURL} alt="Exercise IMG" />
                <h2>{exercise}</h2>
                <p style={{fontSize: "20px"}}>{feedback}</p>
                <div className="card-footer">
                    <img src="like.svg" alt="Like Button" onClick={handleClick}/>
                    <p>{likes}</p>
                    <img src="comment.svg" alt="Like Button" onClick={() => {
                        fetchComments()
                        setCommentClicked(!commentClicked)
                    }} style={{marginLeft: "20px"}}/>
                    <img src="edit.svg" alt="Edit Button" style={{marginLeft: "auto"}} onClick={() => {
                        form.setFieldsValue({
                            name,
                            post_title: title,
                            exercise_name: exercise,
                            imageURL: imgURL,
                            feedback
                        })
                        setIsModalOpen(true)
                    }}/>
                </div>
                {commentClicked && (
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "90%", height: "100%", border: "1px solid #666666", borderRadius: "8px", padding: "20px", gap: "10px"}}>
                        {comments?.map((comment, index) => (
                            <div style={{display: "flex", gap: "5px", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                                <p key={index} style={{fontSize: "16px", margin: 0, maxWidth: "335px"}}>{comment.comment}</p>
                                <p key={index} style={{fontSize: "12px", margin: 0}}>{commentDate.format("MMM DD, YYYY")}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {/* Modal for Edit/Delete Posts */}
            {contextHolder}
            <Modal open={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={false}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "rgb(26, 26, 30)", gap: "10px", backgroundColor: "#ffffff", padding: "50px", borderRadius: "8px"}}>
                    <h1>Edit Post</h1>
                    <div style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", color: "rgb(26, 26, 30)"}}>

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
                            {/* backgroundColor: "rgb(239, 71, 111)" */}
                            <Form.Item>
                                <Popconfirm
                                    title="Delete Post"
                                    description="Are you sure you want to delete the post? (Action can't be undone)"
                                    onConfirm={handleDelete}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="primary"
                                        style={{width: "100%", borderRadius: "18px", padding: "22px 0px", backgroundColor: "rgb(239, 71, 111)", fontSize: "18px", fontWeight: "700"}}>Delete</Button>
                                </Popconfirm>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Modal>
        </>
    ) 
}

export default PostCard