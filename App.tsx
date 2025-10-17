// Fix: Implement the main App component. This was a placeholder file, causing 'not a module' and other errors.
// The new implementation manages application state, fetches data, and renders different views.
import React, { useState, useEffect, useMemo } from 'react';
import { generateSocialData } from './services/geminiService';
import { SocialData, User, Post, View } from './types';
import { Header } from './components/Header';
import { Feed } from './components/Feed';
import { ProfilePage } from './components/ProfilePage';
import { SearchResults } from './components/SearchResults';

const App: React.FC = () => {
    const [socialData, setSocialData] = useState<SocialData | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [view, setView] = useState<View>(View.Feed);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    
    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
    const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());

    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const fetchSocialData = async () => {
            try {
                setIsLoading(true);
                const data = await generateSocialData();

                // Update the first user's name as requested
                if (data.users.length > 0) {
                    data.users[0].name = 'Hafsa Raja';
                }
                
                setSocialData(data);
                setCurrentUser(data.users[0]); // Set the first user as the current user
                // Randomly follow some users
                const initialFollowing = new Set<string>();
                data.users.slice(1, 4).forEach(u => initialFollowing.add(u.id));
                setFollowingUsers(initialFollowing);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred.');
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchSocialData();
    }, []);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const userMap = useMemo(() => {
        if (!socialData) return new Map<string, User>();
        return new Map(socialData.users.map(user => [user.id, user]));
    }, [socialData]);

    const handleSelectProfile = (userId: string) => {
        setSelectedUserId(userId);
        setView(View.Profile);
        window.scrollTo(0, 0);
    };

    const handleNavigateToFeed = () => {
        setView(View.Feed);
        setSelectedUserId(null);
        setSearchQuery('');
        window.scrollTo(0, 0);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setView(View.Search);
        window.scrollTo(0, 0);
    };

    const handleLikeToggle = (postId: string) => {
        setLikedPosts(prev => {
            const newLiked = new Set(prev);
            if (newLiked.has(postId)) {
                newLiked.delete(postId);
            } else {
                newLiked.add(postId);
            }
            return newLiked;
        });
        setSocialData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                posts: prev.posts.map(p => {
                    if (p.id === postId) {
                        return { ...p, likes: likedPosts.has(postId) ? p.likes - 1 : p.likes + 1 };
                    }
                    return p;
                })
            };
        });
    };
    
    const handleFollowToggle = (userId: string) => {
        setFollowingUsers(prev => {
            const newFollowing = new Set(prev);
            if (newFollowing.has(userId)) {
                newFollowing.delete(userId);
            } else {
                newFollowing.add(userId);
            }
            return newFollowing;
        });
    };

    const handleAddComment = (postId: string, text: string) => {
        if (!socialData || !currentUser) return;

        const newComment = {
            id: `c-${Date.now()}`,
            postId,
            authorId: currentUser.id,
            text,
            timestamp: new Date().toISOString(),
        };

        setSocialData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                posts: prev.posts.map(p => {
                    if (p.id === postId) {
                        return { ...p, comments: [...p.comments, newComment] };
                    }
                    return p;
                })
            }
        });
    };

    const handleThemeToggle = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const renderContent = () => {
        if (!socialData || !currentUser) return null;

        switch(view) {
            case View.Profile:
                const profileUser = userMap.get(selectedUserId!);
                if (!profileUser) return <div>User not found.</div>;
                const userPosts = socialData.posts.filter(p => p.authorId === selectedUserId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                return <ProfilePage 
                    user={profileUser}
                    posts={userPosts}
                    currentUser={currentUser}
                    userMap={userMap}
                    isFollowing={followingUsers.has(selectedUserId!)}
                    onFollowToggle={handleFollowToggle}
                    likedPosts={likedPosts}
                    onLikeToggle={handleLikeToggle}
                    onAddComment={handleAddComment}
                    onSelectProfile={handleSelectProfile}
                />;
            case View.Search:
                const searchResults = socialData.users.filter(u => 
                    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    u.username.toLowerCase().includes(searchQuery.toLowerCase())
                );
                return <SearchResults users={searchResults} query={searchQuery} onSelectProfile={handleSelectProfile} />;
            case View.Feed:
            default:
                const sortedPosts = [...socialData.posts].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
                return <Feed 
                    posts={sortedPosts}
                    currentUser={currentUser}
                    userMap={userMap}
                    likedPosts={likedPosts}
                    onLikeToggle={handleLikeToggle}
                    onAddComment={handleAddComment}
                    onSelectProfile={handleSelectProfile}
                />;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center">
                    <svg className="animate-spin h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Generating your social sphere...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">An Error Occurred</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">We couldn't generate the social data.</p>
                    <p className="mt-4 p-3 bg-red-100 dark:bg-gray-700 text-red-700 dark:text-red-300 rounded-md text-sm font-mono">{error}</p>
                    <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }
    
    if (!currentUser) return null; // Should not happen if not loading and no error

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
            <Header 
                currentUser={currentUser} 
                onNavigateToFeed={handleNavigateToFeed} 
                onSelectProfile={handleSelectProfile}
                onSearch={handleSearch}
                theme={theme}
                onThemeToggle={handleThemeToggle}
            />
            <main className="container mx-auto max-w-4xl px-4 py-24">
                {renderContent()}
            </main>
        </div>
    );
};

export default App;
