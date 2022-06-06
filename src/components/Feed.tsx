import { useState } from 'react';
import { RefreshIcon } from '@heroicons/react/outline';
import toast from 'react-hot-toast';
import { ITweet } from '../../typings';
import { fetchTweets } from '../lib/utilities/fetchTweets';
import Tweet from './Tweet';
import Tweetbox from './Tweetbox';

interface IProps {
  tweets: ITweet[];
}

export default function Feed({ tweets: tweetsProp }: IProps) {
  const [tweets, setTweets] = useState<ITweet[]>(tweetsProp);

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');

    const tweets = await fetchTweets();
    setTweets(tweets);

    toast.success('Feed Updated!', {
      id: refreshToast,
    });
  };

  return (
    <div className="col-span-7 border-x lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5 mt-5 h-8 w-8 transform cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>

      <div>
        {/* TODO: this would be a use-case for Context API or Redux or Recoil to avoid Prop Drilling; only one level to pass 'setTweet' state update function;  certainly if going more than one level deep this change would be a must */}
        <Tweetbox setTweets={setTweets} />
      </div>

      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
