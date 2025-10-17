export interface User {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  authorId: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

export interface SocialData {
  users: User[];
  posts: Post[];
}

export enum View {
  Feed = 'FEED',
  Profile = 'PROFILE',
  Search = 'SEARCH',
}
