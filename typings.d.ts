// data coming in from Sanity CMS Backend
export interface ITweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'tweet';
  blockTweet: string;
}

export interface IComment extends CommentBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'comment';
  tweet: {
    _ref: string;
    _type: 'reference';
  };
}

// data we're making available on the Client
export type TweetBody = {
  text: string;
  username: string;
  profileImage: string;
  image?: string;
};

export type CommentBody = {
  comment: string;
  username: string;
  tweetId: string;
  profileImage: string;
};
