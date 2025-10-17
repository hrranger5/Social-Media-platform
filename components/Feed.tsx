// Fix: Implement the Feed component. This was a placeholder file, causing multiple errors.
// The new implementation displays a list of posts by rendering a PostCard for each.
import React from 'react';
import { Post, User } from '../types';
import { PostCard } from './PostCard';

interface FeedProps {
    posts: Post[];
    currentUser: User;
    userMap: Map<string, User>;
    likedPosts: Set<string>;
    onLikeToggle: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onSelectProfile: (userId: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ posts, currentUser, userMap, likedPosts, onLikeToggle, onAddComment, onSelectProfile }) => {
    return (
        <div className="space-y-6">
            {posts.map(post => {
                const author = userMap.get(post.authorId);
                if (!author) return null; // Should not happen with valid data
                
                return (
                    <PostCard 
                        key={post.id}
                        post={post}
                        author={author}
                        currentUser={currentUser}
                        userMap={userMap}
                        isLiked={likedPosts.has(post.id)}
                        onLikeToggle={onLikeToggle}
                        onAddComment={onAddComment}
                        onSelectProfile={onSelectProfile}
                    />
                );
            })}
        </div>
    );
};
