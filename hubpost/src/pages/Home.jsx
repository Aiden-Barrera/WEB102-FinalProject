import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { supabase } from "../Client"
import {notification} from "antd"
import PostCard from "../components/PostCard"

const Home = () => {
    const [posts, setPosts] = useState(null)
    const [postLiked, setPostLiked] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const location = useLocation()

    useEffect(() => {
        if (location.state?.postCreated) {
            api.open({
                message: 'Success!',
                description:
                    `Workout Post Successfully Created!`,
            });
        }
    }, [location.state])

    const fetchPosts = async () => {
        const {data} = await supabase.from("Posts")
            .select()
            .order('created_at', { ascending: false })
        setPosts(data)
        setPostLiked(false)
    }

    useEffect(()=>{
        fetchPosts()
    }, [postLiked])

    return (
        <>
            {contextHolder}
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "90vh", color: "rgb(239,239,240)"}}>
                <h1>Welcome to <span style={{fontWeight: "700", color: "rgb(88,185,158)"}}>hubPost</span></h1>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", backgroundColor: "rgb(239,239,240)", width: "100vw", height: "auto", padding: "50px"}}>
                <h1 style={{color: "rgb(26, 26, 30)"}}>Community Workout Post</h1>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    justifyContent: "center",
                }}>
                    {posts?.map((post, index) => (
                        <PostCard key={index} id={post.id} name={post.name} title={post.post_title} exercise={post.exercise_name} imgURL={post.imageURL} feedback={post.feedback} likes={post.post_likes} created={post.created_at} postLiked={setPostLiked} fetchPost={fetchPosts}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home