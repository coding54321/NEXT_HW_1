import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const imageRefs = useRef([]);

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const foundPost = storedPosts.find((p) => p.id === parseInt(id));
        setPost(foundPost);
    }, [id]);

    const handleImageClick = (idx) => {
        const newHref = prompt('Enter new image URL:');
        if (newHref) {
            const newPost = { ...post, images: post.images.map((img, i) => (i === idx ? newHref : img)) };
            setPost(newPost);
            const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = storedPosts.map((p) => (p.id === newPost.id ? newPost : p));
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };

    const handleUpdatePost = () => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = storedPosts.map((p) => (p.id === post.id ? post : p));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleDeletePost = () => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = storedPosts.filter((p) => p.id !== post.id);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        navigate('/');
    };

    const handleAddComment = () => {
        const updatedPost = { ...post, comments: [...post.comments, newComment] };
        setPost(updatedPost);
        setNewComment('');
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = storedPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleDeleteComment = (idx) => {
        const updatedComments = post.comments.filter((_, i) => i !== idx);
        const updatedPost = { ...post, comments: updatedComments };
        setPost(updatedPost);
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const updatedPosts = storedPosts.map((p) => (p.id === updatedPost.id ? updatedPost : p));
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const handleImageUpload = (event, idx) => {
        const file = event.target.files[0];
        if (file) {
            const newImage = URL.createObjectURL(file);
            const newPost = { ...post, images: post.images.map((img, i) => (i === idx ? newImage : img)) };
            setPost(newPost);
            const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            const updatedPosts = storedPosts.map((p) => (p.id === newPost.id ? newPost : p));
            localStorage.setItem('posts', JSON.stringify(updatedPosts));
        }
    };

    return (
        post && (
            <div>
                <h1>{post.title}</h1>
                <textarea value={post.content} onChange={(e) => setPost({ ...post, content: e.target.value })} />
                <div className="images">
                    {post.images.map((image, idx) => (
                        <div key={idx} className="image-container">
                            <img
                                src={image}
                                alt={`post-img-${idx}`}
                                onClick={() => handleImageClick(idx)}
                                ref={(el) => (imageRefs.current[idx] = el)}
                            />
                            <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event, idx)} />
                        </div>
                    ))}
                </div>
                <button onClick={handleUpdatePost}>Update Post</button>
                <button onClick={handleDeletePost}>Delete Post</button>
                <button onClick={() => navigate('/')}>Go to Home</button>
                <div>
                    <h2>Comments</h2>
                    <ul>
                        {post.comments.map((comment, idx) => (
                            <li key={idx} className="comment">
                                {comment}
                                <button onClick={() => handleDeleteComment(idx)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    <button onClick={handleAddComment}>Add Comment</button>
                </div>
            </div>
        )
    );
}

export default Detail;
