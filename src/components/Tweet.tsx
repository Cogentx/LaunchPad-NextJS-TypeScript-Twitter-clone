import React, { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import {
  ChatAlt2Icon,
  HeartIcon,
  SwitchHorizontalIcon,
  UploadIcon,
} from '@heroicons/react/outline';
import { CommentBody, IComment, ITweet } from '../../typings';
import { fetchComments } from '../lib/utilities/fetchComments';
import Comment from './Comment';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { postComment } from '../lib/utilities/postComment';

interface IProps {
  tweet: ITweet;
}

export default function Tweet({ tweet }: IProps) {
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: IComment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const commentToast = toast.loading('Posting Comment...');

    const commentInfo: CommentBody = {
      text: input,
      tweetId: tweet._id,
      username: session?.user?.name || 'Unknown User',
      profileImage: session?.user?.image || '/avatar-profile-placeholder.jpeg',
    };

    // Comment logic
    try {
      // TODO: handle newly created comment if there is a use-case to do so
      // const comment: IComment = await postComment(commentInfo);
      await postComment(commentInfo);
    } catch (error) {
      // TODO: handle exception more gracefully than simply console logging
      console.log('Tweet - posting new comment:', { error });
    }

    toast.success('Comment Posted!', {
      id: commentToast,
    });

    // Reset default UI values
    setInput('');
    setCommentBoxVisible(false);
    refreshComments();
  };

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
              className="m-5 ml-0 mb-1 max-h-60 rounded-lg object-cover shadow-sm"
              src={tweet.image}
              alt="tweet image"
            />
          )}
        </div>
      </div>

      <div className="m-5 ml-0 flex justify-between">
        <div
          className="tweetButton"
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
        >
          <ChatAlt2Icon className="h-5 w-5" />
          <p>{comments.length}</p>
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

      {/* Comment Box Logic */}
      {commentBoxVisible && (
        <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
          <input
            className="flex-1 rounded-lg bg-gray-100 p-2 outline-none"
            type="text"
            placeholder="Write a comment..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={!input}
            className="text-twitter disabled:text-gray-200"
            type="submit"
          >
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
