export interface Posts {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: User;
}

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: Posts[];
  profile: Profile;
}

export interface Profile {
  id: number;
  bio: string;
  profileImageUrl: string;
  userId: number;
  user: User;
}
