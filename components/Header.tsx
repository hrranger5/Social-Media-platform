import React, { useState } from 'react';
import { User } from '../types';
import { SunIcon, MoonIcon, SearchIcon } from './icons';

interface HeaderProps {
    currentUser: User;
    onNavigateToFeed: () => void;
    onSelectProfile: (userId: string) => void;
    onSearch: (query: string) => void;
    theme: 'light' | 'dark';
    onThemeToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, onNavigateToFeed, onSelectProfile, onSearch, theme, onThemeToggle }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10">
            <div className="container mx-auto max-w-4xl px-4 py-3">
                <div className="flex justify-between items-center">
                    <h1 
                        className="text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer hidden sm:block"
                        onClick={onNavigateToFeed}
                    >
                        ConnectSphere
                    </h1>

                    <div className="flex-1 max-w-sm sm:max-w-md mx-auto sm:mx-4">
                        <form onSubmit={handleSearchSubmit} className="relative">
                            <input 
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search users..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                aria-label="Search users"
                            />
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon className="w-5 h-5" />
                            </div>
                        </form>
                    </div>

                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button
                            onClick={onThemeToggle}
                            className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <MoonIcon className="w-6 h-6" />
                            ) : (
                                <SunIcon className="w-6 h-6" />
                            )}
                        </button>
                        <img
                            src={currentUser.avatarUrl}
                            alt={currentUser.name}
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-500 transition"
                            onClick={() => onSelectProfile(currentUser.id)}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
