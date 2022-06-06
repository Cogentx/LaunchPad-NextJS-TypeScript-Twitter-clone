import { ITweet, TweetBody } from '../../../typings';


export const postTweet = async (tweetInfo: TweetBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addTweet`,
      {
        body: JSON.stringify(tweetInfo),
        method: 'POST',
      }
    );

    const data = await response.json();
    const tweet:ITweet = data.tweet;

    return tweet;

  } catch (error) {
    // TODO: handle exception more gracefully than simply console logging
    console.log('postTweet:', { error });
  }
};
