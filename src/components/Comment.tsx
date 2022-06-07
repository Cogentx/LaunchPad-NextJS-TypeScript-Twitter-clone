import TimeAgo from 'react-timeago';
import { IComment } from '../../typings';

interface IProps {
  comment: IComment;
}

export default function Comment({ comment }: IProps) {
  return (
    <div className="relative flex space-x-2">
      <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
      <img
        className="mt-2 h-7 w-7 rounded-full object-cover"
        src={comment.profileImage}
        alt="Commenter Profile Image"
      />

      <div>
        <div className="flex items-center space-x-1">
          <p className="mr-1 font-bold">{comment.username}</p>
          <p className="hidden text-sm text-gray-500 lg:inline">
            @{comment.username.replace(/\s+/g, '').toLowerCase()} ·
          </p>
          
          <TimeAgo
            className="text-sm text-gray-500"
            date={comment._createdAt}
          />
        </div>
        <p className="pt-1">{comment.text}</p>
      </div>
    </div>
  );
}
