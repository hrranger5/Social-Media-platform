// Fix: Implement the PostCard component. This was a placeholder file, causing 'not a module' errors.
// The new implementation displays an individual post, its author, and handles interactions like likes and comments.
import React, { useState } from 'react';
import { Post, User } from '../types';
import { HeartIcon, ChatBubbleIcon } from './icons';

interface PostCardProps {
    post: Post;
    author: User;
    currentUser: User;
    userMap: Map<string, User>;
    isLiked: boolean;
    onLikeToggle: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onSelectProfile: (userId: string) => void;
}

const timeAgo = (timestamp: string): string => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

    if (seconds < 5) return "just now";

    let interval = seconds / 31536000;
    if (interval > 1) {
        const years = Math.floor(interval);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        const months = Math.floor(interval);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
        const days = Math.floor(interval);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
        const hours = Math.floor(interval);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
        const minutes = Math.floor(interval);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    }
    return `${Math.floor(seconds)} second${seconds > 1 ? 's' : ''} ago`;
};


export const PostCard: React.FC<PostCardProps> = ({ post, author, currentUser, userMap, isLiked, onLikeToggle, onAddComment, onSelectProfile }) => {
    const [commentText, setCommentText] = useState('');
    const [showComments, setShowComments] = useState(false);

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText.trim()) {
            onAddComment(post.id, commentText.trim());
            setCommentText('');
        }
    };
    
    const postTimeAgo = timeAgo(post.timestamp);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <img 
                        src={author.avatarUrl} 
                        alt={author.name} 
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={() => onSelectProfile(author.id)}
                    />
                    <div className="ml-3">
                        <p 
                            className="font-bold text-gray-900 dark:text-gray-100 cursor-pointer"
                            onClick={() => onSelectProfile(author.id)}
                        >
                            {author.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">@{author.username} &middot; {postTimeAgo}</p>
                    </div>
                </div>

                <p className="text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
            </div>
            
            {post.imageUrl && (
                <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-cover" />
            )}

            <div className="p-4">
                <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-4">
                        <button 
                            onClick={() => onLikeToggle(post.id)}
                            className={`flex items-center space-x-1 hover:text-red-500 transition focus:outline-none ${isLiked ? 'text-red-500' : ''}`}
                            aria-label={isLiked ? "Unlike post" : "Like post"}
                        >
                            <HeartIcon className="w-6 h-6" />
                            <span className="font-semibold text-sm">{post.likes}</span>
                        </button>
                        <button 
                            onClick={() => setShowComments(!showComments)}
                            className="flex items-center space-x-1 hover:text-blue-500 transition focus:outline-none"
                            aria-label="View comments"
                        >
                            <ChatBubbleIcon className="w-6 h-6" />
                            <span className="font-semibold text-sm">{post.comments.length}</span>
                        </button>
                    </div>
                </div>

                {showComments && (
                    <div className="mt-4 space-y-3">
                        {post.comments.length > 0 ? (
                            post.comments.map(comment => {
                                const commentAuthor = userMap.get(comment.authorId);
                                if (!commentAuthor) return null;
                                return (
                                    <div key={comment.id} className="flex items-start space-x-3">
                                        <img 
                                            src={commentAuthor.avatarUrl} 
                                            alt={commentAuthor.name}
                                            className="w-8 h-8 rounded-full cursor-pointer"
                                            onClick={() => onSelectProfile(commentAuthor.id)}
                                        />
                                        <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                                            <p>
                                                <span 
                                                    className="font-bold text-sm text-gray-900 dark:text-gray-100 cursor-pointer"
                                                    onClick={() => onSelectProfile(commentAuthor.id)}
                                                >
                                                    {commentAuthor.name}
                                                </span>
                                                <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">{comment.text}</span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
                        )}
                    </div>
                )}

                <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center space-x-2">
                    <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-8 h-8 rounded-full" />
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full pl-4 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                        aria-label="Add a comment"
                    />
                    <button type="submit" className="text-blue-600 dark:text-blue-400 font-semibold disabled:text-gray-400 disabled:dark:text-gray-500" disabled={!commentText.trim()}>Post</button>
                </form>
            </div>
        </div>
    );
};
