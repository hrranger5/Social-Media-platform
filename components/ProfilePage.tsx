
import React from 'react';
import { Post, User } from '../types';
import { PostCard } from './PostCard';
import { UserPlusIcon, CheckIcon } from './icons';

interface ProfilePageProps {
    user: User;
    posts: Post[];
    currentUser: User;
    userMap: Map<string, User>;
    isFollowing: boolean;
    onFollowToggle: (userId: string) => void;
    likedPosts: Set<string>;
    onLikeToggle: (postId: string) => void;
    onAddComment: (postId: string, text: string) => void;
    onSelectProfile: (userId: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, posts, currentUser, userMap, isFollowing, onFollowToggle, likedPosts, onLikeToggle, onAddComment, onSelectProfile }) => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
                    <img src={user.avatarUrl} alt={user.name} className="w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600 shadow-lg" />
                    <div className="sm:ml-6 mt-4 sm:mt-0 flex-1">
                        <div className="flex items-center justify-center sm:justify-start space-x-4">
                            <h2 className="text-3xl font-bold">{user.name}</h2>
                            {currentUser.id !== user.id && (
                                <button
                                    onClick={() => onFollowToggle(user.id)}
                                    className={`px-4 py-1.5 text-sm font-semibold rounded-full flex items-center space-x-2 transition ${
                                        isFollowing
                                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200'
                                            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {isFollowing ? <CheckIcon className="w-5 h-5" /> : <UserPlusIcon className="w-5 h-5" />}
                                    <span>{isFollowing ? 'Following' : 'Follow'}</span>
                                </button>
                            )}
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">@{user.username}</p>
                        <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-xl">{user.bio}</p>
                        <div className="flex justify-center sm:justify-start space-x-6 mt-4 text-gray-600 dark:text-gray-400">
                            <div><span className="font-bold text-gray-800 dark:text-gray-200">{posts.length}</span> Posts</div>
                            <div><span className="font-bold text-gray-800 dark:text-gray-200">{user.followers}</span> Followers</div>
                            <div><span className="font-bold text-gray-800 dark:text-gray-200">{user.following}</span> Following</div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 px-2">Posts</h3>

            <div className="space-y-6">
                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        author={user}
                        currentUser={currentUser}
                        userMap={userMap}
                        isLiked={likedPosts.has(post.id)}
                        onLikeToggle={onLikeToggle}
                        onAddComment={onAddComment}
                        onSelectProfile={onSelectProfile}
                    />
                ))}
            </div>
        </div>
    );
};
