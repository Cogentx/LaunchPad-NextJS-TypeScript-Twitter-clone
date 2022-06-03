import { IComment } from '../../typings';

interface IProps {
  comment: IComment;
}

export default function Comment({comment}: IProps) {
  return <div>
    {comment.comment}
  </div>;
}
