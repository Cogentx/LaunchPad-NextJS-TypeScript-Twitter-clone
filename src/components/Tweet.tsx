import TimeAgo from 'react-timeago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { ITweet } from '../../typings';

interface IProps {
  tweet: ITweet;
}

export default function Tweet({ tweet }: IProps) {
  return (
    <div className="flex flex-col space-x-3 border-y border-gray-100 p-5">
      <div className="flex space-x-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={tweet.profileImage}
          alt="Profile Image"
        />

        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, '').toLowerCase()} ·
            </p>
            <TimeAgo
              className="text-sm text-gray-500"
              date={tweet._createdAt}
            />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && (
            <img
              className="m-5 ml-0 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="tweet image"
            />
          )}

          <div className="m-5 ml-0 flex justify-between">
            <div className="tweetButton">
              <ChatAlt2Icon className="h-5 w-5" />
              <p>5</p>
            </div>
            <div className="tweetButton">
              <SwitchHorizontalIcon className="h-5 w-5" />
            </div>
            <div className="tweetButton">
              <HeartIcon className="h-5 w-5" />
            </div>
            <div className="tweetButton">
              <UploadIcon className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
