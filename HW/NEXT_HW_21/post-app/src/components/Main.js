import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Main() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        setPosts(storedPosts);
    }, []);

    const handleAddPost = () => {
        if (images.length !== 3) {
            setError('You must upload exactly 3 images.');
            return;
        }

        const newPost = {
            id: posts.length + 1,
            title,
            content,
            images,
            comments: [],
        };
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
        setTitle('');
        setContent('');
        setImages([]);
        setError('');
    };

    const handleImageUpload = (event) => {
        const files = event.target.files;
        if (files.length !== 3) {
            setError('You must upload exactly 3 images.');
            return;
        }

        const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
        setImages(fileArray);
        setError('');
    };

    return (
        <div>
            <h1>Main Page</h1>
            <form>
                <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                <button type="button" onClick={handleAddPost}>
                    Add Post
                </button>
                {error && <p className="error">{error}</p>}
            </form>
            {posts.map((post, index) => (
                <div key={index} className="post">
                    <Link to={`/detail/${post.id}`}>
                        <h2>{post.title}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Main;
