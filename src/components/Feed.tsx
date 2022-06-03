import { RefreshIcon } from '@heroicons/react/outline';
import { ITweet } from '../../typings';
import Tweet from './Tweet';
import Tweetbox from './Tweetbox';

interface IProps {
  tweets: ITweet[];
}

export default function Feed({ tweets }: IProps) {
  return (
    <div className="col-span-7 border-x lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon className="mr-5 mt-5 h-8 w-8 transform cursor-pointer text-twitter transition-all duration-500 ease-out hover:rotate-180 active:scale-125" />
      </div>

      <div>
        <Tweetbox />
      </div>

      <div>
        {tweets.map((tweet) => (
          <Tweet key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
