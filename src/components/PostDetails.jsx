import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const PostDetails = () => {
    const { id } = useParams();
    const [post, setPost] = useState({id: null, title: "", content: "", image_url: "", upvotes: 0, comments: []});
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            const { data } = await supabase
                .from('posts')
                .select()
                .eq('id', id)
                .single();
            setPost(data);
        }
        fetchPost();
    }, [id]);

    // Handle Upvote
    const updateCount = async () => {
        const updatedCount = post.upvotes + 1;
        await supabase
            .from('posts')
            .update({ upvotes: updatedCount})
            .eq('id', id);
        setPost((prev) => ({...prev, upvotes: updatedCount}));
    }

    // Handle Delete
    const deletePost = async () => {
        await supabase
            .from('posts')
            .delete()
            .eq('id', id);
        window.location = "/";
    }

    // Handle Adding Comment
    const addComment = async (e) => {
        e.preventDefault();
        if(!newComment) return;
        
        // Assume 'comments' is a JSONB or Array column in Supabase
        const currentComments = post.comments || []; 
        const updatedComments = [...currentComments, newComment];

        await supabase
            .from('posts')
            .update({ comments: updatedComments })
            .eq('id', id);
            
        setPost((prev) => ({...prev, comments: updatedComments}));
        setNewComment("");
    }

    return (
        <div className="post-details">
            <h2>{post.title}</h2>
            <p>Posted on: {post.created_at}</p>
            <button onClick={updateCount}>👍 Upvotes: {post.upvotes}</button>
            
            {post.image_url && <img src={post.image_url} alt="Travel" style={{width: '300px'}}/>}
            <p>{post.content}</p>

            <div className="actions">
                <Link to={`/edit/${id}`}><button>Edit Post</button></Link>
                <button className="deleteBtn" onClick={deletePost}>Delete Post</button>
            </div>

            <div className="comments-section">
                <h3>Comments</h3>
                {post.comments && post.comments.map((comment, index) => (
                    <div key={index} className="comment">- {comment}</div>
                ))}
                
                <form onSubmit={addComment}>
                    <input 
                        type="text" 
                        placeholder="Leave a comment..." 
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    )
}

export default PostDetails;