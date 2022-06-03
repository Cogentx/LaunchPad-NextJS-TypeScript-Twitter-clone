// data coming in from Sanity CMS Backend
export interface ITweet extends TweetBody {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  _type: 'tweet';
  blockTweet: string;
}

// data we're making available on the Client
export type TweetBody = {
  text: string;
  username: string;
  profileImage: string;
  image?: string;
};
