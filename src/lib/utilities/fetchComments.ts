import { IComment } from "../../../typings";

export const fetchComments = async (tweetId:string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
  );

  const data = await response.json();
  const comments: IComment[]= data.comments;
  return comments;
}
