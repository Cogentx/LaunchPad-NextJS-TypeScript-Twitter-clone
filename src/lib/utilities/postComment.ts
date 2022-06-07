import { IComment, CommentBody } from '../../../typings';

export const postComment = async (commentInfo: CommentBody) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/addComment`,
      {
        body: JSON.stringify(commentInfo),
        method: 'POST',
      }
    );

    const data = await response.json();
    const comment: IComment = data.comment;

    return comment;
  } catch (error) {
    // TODO: handle exception more gracefully than simply console logging
    console.log('postComment:', { error });
  }
};
