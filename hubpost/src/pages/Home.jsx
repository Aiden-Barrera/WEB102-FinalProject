import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom";
import { supabase } from "../Client"
import {notification} from "antd"
import PostCard from "../components/PostCard"
import { LoadingOutlined } from '@ant-design/icons';
import {Input, Spin, message, Dropdown} from "antd"

const items = [
    {
        key: '1',
        label: "Newest"
    }, 
    {
        key: "2",
        label: "Oldest"
    }
]

const Home = () => {
    const [posts, setPosts] = useState(null)
    const [postLiked, setPostLiked] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [messageApi, messageContextHolder] = message.useMessage();
    const location = useLocation()
    const [userSearched, setUserSearched] = useState("")
    const [filteredPost, setFilteredPost] = useState(null)
    const [displayedPosts, setDisplayedPosts] = useState(null); // Posts being shown (filtered/sorted)
    const [sortOrder, setSortOrder] = useState("1"); // "1" for Newest, "2" for Oldest
    

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
        const { data } = await supabase.from("Posts")
            .select();
    
        // Apply the current sorting preference
        const sorted = [...data].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return sortOrder === '1' ? dateB - dateA : dateA - dateB;
        });
    
        setPosts(sorted);
        setDisplayedPosts(sorted);
        setPostLiked(false);
    };

    useEffect(()=>{
        fetchPosts()
    }, [postLiked])

    const handleChange = (e) => {
        setUserSearched(e.target.value)
    }

    const handleSearch = () => {
        if (userSearched === "") return setDisplayedPosts(posts);
        
        const filtered = posts.filter((post) =>
            post.post_title.toLowerCase().includes(userSearched.toLowerCase())
        );
    
        if (filtered.length > 0) {
            setDisplayedPosts(filtered);
        } else {
            messageApi.open({
                type: 'error',
                content: 'No Post Title Matched!',
            });
        }
    };

    const orderBy = (key) => {
        setSortOrder(key); // Save the current order
        const sorted = [...displayedPosts].sort((a, b) => {
            const dateA = new Date(a.created_at);
            const dateB = new Date(b.created_at);
            return key === '1' ? dateB - dateA : dateA - dateB;
        });
        setDisplayedPosts(sorted);
    };


    if (!posts) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100vw",
                height: "100vh"
            }}>
                <Spin indicator={<LoadingOutlined style={{ fontSize: "64px" }} spin />} />
                Loading...
            </div>
        );
    }
    

    return (
        <>
            {contextHolder}
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "80vh", color: "rgb(239,239,240)"}}>
                <h1 style={{margin: "0 0 100px 50px"}}>Welcome to <span style={{fontWeight: "700", color: "rgb(88,185,158)"}}>TrainingFeed</span></h1>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "20px", justifyContent: "center", backgroundColor: "rgb(239,239,240)", width: "100vw", height: "auto", padding: "50px"}}>
                <h1 style={{color: "rgb(26, 26, 30)"}}>Community Workout Post</h1>
                <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {messageContextHolder}
                    <Input style={{fontSize: "18px", width: "500px", borderRadius: "18px", marginBottom: "20px"}} value={userSearched} onChange={handleChange} placeholder="Search by Post Title..." 
                        suffix={<img src="/searchIcon.svg" alt="Icon" style={{ width: "24px", marginLeft: "5px",cursor: "pointer" }} onClick={handleSearch}/>}
                    />
                    <Dropdown menu={{
                        items,
                        onClick: (e) => orderBy(e.key)
                    }}
                    placement="bottom" arrow={{ pointAtCenter: true }}
                    >
                        <img src="/filter.svg" alt="filter icon" style={{ width: "24px", marginLeft: "10px", cursor: "pointer", marginBottom: "20px" }} />
                    </Dropdown>
                </div>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    justifyContent: "center",
                }}>
                    {displayedPosts?.map((post, index) => (
                        <PostCard key={index} id={post.id} name={post.name} title={post.post_title} exercise={post.exercise_name} imgURL={post.imageURL} feedback={post.feedback} likes={post.post_likes} created={post.created_at} postLiked={setPostLiked} fetchPost={fetchPosts}/>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home