import { Tweet } from '../../../typings';

export const fetchTweets = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTweets`
  );

  const data = await response.json();
  const tweets: Tweet[] = data.tweets;

  return tweets;
};
