import { ITweet } from '../../../typings';

export const fetchTweets = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`
  );

  const data = await response.json();
  const tweets: ITweet[] = data.tweets;

  return tweets;
};
