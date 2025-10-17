import React from 'react';
import { User } from '../types';

interface SearchResultsProps {
    users: User[];
    query: string;
    onSelectProfile: (userId: string) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ users, query, onSelectProfile }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    Search Results for "<span className="text-blue-600 dark:text-blue-400">{query}</span>"
                </h2>
            </div>
            {users.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {users.map(user => (
                        <li 
                            key={user.id} 
                            className="p-4 flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer"
                            onClick={() => onSelectProfile(user.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && onSelectProfile(user.id)}
                            aria-label={`View profile of ${user.name}`}
                        >
                            <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full" />
                            <div>
                                <p className="font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">@{user.username}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    <p>No users found matching your search.</p>
                </div>
            )}
        </div>
    );
};
