import TimeAgo from 'react-timeago';
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

          <p>{tweet.text}</p>

          {tweet.image && (
            <img
              className="m-5 ml-0 mb-1 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="tweet image"
            />
          )}
        </div>
      </div>
    </div>
  );
}
