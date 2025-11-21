import React, { useState, useEffect } from 'react';
import Card from './Card'; // Assumes you have a simple Card component
import { supabase } from '../supabaseClient';

const ReadPosts = () => {
    const [posts, setPosts] = useState([]);
    const [orderBy, setOrderBy] = useState('created_at');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase // Destructure 'error' as well
                .from('posts')
                .select()
                .order(orderBy, { ascending: false });
            
            // Handle potential errors from Supabase
            if (error) {
                console.error("Error fetching posts:", error);
                setPosts([]); // Optionally clear posts on error
                return; // Stop execution if there's an error
            }

            // Check if data is null or empty before attempting to filter
            if (!data) { // Or if (!data || data.length === 0)
                setPosts([]); // Set posts to an empty array if no data is returned
                return;
            }
            
            // Local Search Filter
            const filteredData = data.filter(post => 
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setPosts(filteredData);
        }
        fetchPosts();
    }, [orderBy, searchQuery]);

    return (
        <div className="ReadPosts">
            <div className="filters">
                <h3>Order By:</h3>
                <button onClick={() => setOrderBy('created_at')}>Newest</button>
                <button onClick={() => setOrderBy('upvotes')}>Most Popular</button>
                
                <input 
                    type="text" 
                    placeholder="Search destinations..." 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>
            
            <div className="feed-container">
                {posts && posts.length > 0 ?
                    posts.map((post) => (
                        <Card key={post.id} id={post.id} title={post.title} created_at={post.created_at} upvotes={post.upvotes}/>
                    )) : <h2>No trips found yet!</h2>
                }
            </div>
        </div>
    )
}

export default ReadPosts;