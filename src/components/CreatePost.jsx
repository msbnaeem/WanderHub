import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const CreatePost = () => {
    const [post, setPost] = useState({title: "", content: "", image_url: ""});

    const createPost = async (event) => {
        event.preventDefault();
        await supabase
            .from('posts')
            .insert({title: post.title, content: post.content, image_url: post.image_url})
            .select();
        window.location = "/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return { ...prev, [name]:value}
        })
    }

    return (
        <div>
            <form onSubmit={createPost}>
                <label>Destination (Title)</label> <br />
                <input type="text" name="title" onChange={handleChange} required /> <br />

                <label>Trip Details (Content)</label> <br />
                <textarea name="content" rows="5" onChange={handleChange} /> <br />

                <label>Photo URL</label> <br />
                <input type="text" name="image_url" onChange={handleChange} /> <br />

                <input type="submit" value="Share Trip" />
            </form>
        </div>
    )
}

export default CreatePost;