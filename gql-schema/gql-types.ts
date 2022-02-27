export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /** The created user */
  user: User;
};

export type IBasePostEvent = {
  /** Event type */
  eventType: PostEventType;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  createUser: CreateUserPayload;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};

/** When a new post is created */
export type NewPostEvent = IBasePostEvent & {
  __typename?: 'NewPostEvent';
  /** Event type */
  eventType: PostEventType;
  /** Post id */
  id: Scalars['ID'];
  /** Post title */
  title: Scalars['String'];
};

/** Blog post */
export type Post = {
  __typename?: 'Post';
  /** Post author */
  author: Maybe<User>;
  content: Scalars['String'];
  created: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export enum PostEventType {
  NewPost = 'NewPost'
}

export type PostInput = {
  authorId: Scalars['Int'];
  content: Scalars['String'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Blog post */
  post: Maybe<Post>;
  /** List of posts */
  posts: Array<Post>;
  user: Maybe<User>;
  /** List of users */
  users: Array<User>;
};


export type QueryPostArgs = {
  id: InputMaybe<Scalars['ID']>;
};


export type QueryUserArgs = {
  id: InputMaybe<Scalars['ID']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Events related to posts */
  postEvents: IBasePostEvent;
};

/** Blog user */
export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  /** User's blog posts */
  posts: Array<Post>;
};

export type UserInput = {
  name: Scalars['String'];
};
