import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const EditPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState({title: "", content: "", image_url: ""});

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

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('posts')
            .update({title: post.title, content: post.content, image_url: post.image_url})
            .eq('id', id);
        window.location = "/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return { ...prev, [name]:value}
        })
    }

    if (!post.id) return <div>Loading...</div>;

    return (
        <div>
            <form onSubmit={updatePost}>
                <label>Destination (Title)</label> <br />
                <input type="text" name="title" value={post.title} onChange={handleChange} /> <br />

                <label>Trip Details (Content)</label> <br />
                <textarea name="content" rows="5" value={post.content} onChange={handleChange} /> <br />

                <label>Photo URL</label> <br />
                <input type="text" name="image_url" value={post.image_url} onChange={handleChange} /> <br />

                <input type="submit" value="Update Trip" />
            </form>
        </div>
    )
}

export default EditPost;