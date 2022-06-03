export const fetchComments = async (tweetId:string) => {
  const response = await fetch(`/api/getComments?tweetId=${tweetId}`);
}
