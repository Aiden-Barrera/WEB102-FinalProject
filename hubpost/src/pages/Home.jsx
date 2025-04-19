import { useState, useEffect } from "react"
import { supabase } from "../Client"
import PostCard from "../components/PostCard"

const Home = () => {
    const [posts, setPosts] = useState(null)
    const [postLiked, setPostLiked] = useState(false)

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
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "90vh", color: "rgb(239,239,240)"}}>
                <h1>Welcome to <span style={{fontWeight: "700", color: "rgb(88,185,158)"}}>hubPost</span></h1>
            </div>
            <div style={{display: "flex", justifyContent: "center", backgroundColor: "rgb(239,239,240)", width: "100vw", height: "auto", padding: "50px"}}>
                {posts?.map((post, index) => (
                    <PostCard key={index} id={post.id} name={post.name} title={post.post_title} exercise={post.exercise_name} imgURL={post.imageURL} feedback={post.feedback} likes={post.post_likes} created={post.created_at} postLiked={setPostLiked}/>
                ))}
            </div>
        </>
    )
}

export default Home