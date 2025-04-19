import { useEffect, useState } from "react"
import "./../App.css"
import dayjs from "dayjs"
import { supabase } from "../Client"


const PostCard = ({id, name, title, exercise, imgURL, feedback, likes, created, postLiked}) => {
    const [date, setDate] = useState(() => dayjs())

    useEffect(() => {
        setDate(dayjs(created))
    }, [])

    const handleClick = async () => {
        await supabase.from("Posts")
            .update({post_likes: likes+1})
            .eq("id", id)
        postLiked(true)
    }

    return (
        <div className="card">
            <div className="card-header">
                <h3>{name}</h3>
                <h3>{date.format("MMM DD, YYYY")}</h3>
            </div>
            <h1 className="card-title">{title}</h1>
            <img src={imgURL} alt="Exercise IMG" />
            <h2>{exercise}</h2>
            <p>{feedback}</p>
            <div className="card-footer">
                <img src="like.svg" alt="Like Button" onClick={handleClick}/>
                <p>{likes}</p>
            </div>
        </div>
    ) 
}

export default PostCard