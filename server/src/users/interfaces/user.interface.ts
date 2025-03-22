export interface User {
  id: number;
  email: string;
  name: string | null;
  posts?: Post[];
}

export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content?: string;
  published: boolean;
  authorId: number;
}

export interface ReqAuthSub {
  user: {
    sub: number;
  };
}
