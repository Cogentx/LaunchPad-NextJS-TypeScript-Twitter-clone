import { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { IComment, ITweet } from '../../typings';
import { fetchComments } from '../lib/utilities/fetchComments';
import Comment from './Comment';

interface IProps {
  tweet: ITweet;
}

export default function Tweet({ tweet }: IProps) {
  const [comments, setComments] = useState<IComment[]>([]);

  const refreshComments = async () => {
    const comments: IComment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  return (
    <div className="flex flex-col space-y-3 border-y border-gray-100 p-5">
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

      {/* Comment Box Logic */}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 p-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
