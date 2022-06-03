import type { NextApiRequest, NextApiResponse } from 'next';
import { IComment } from '../../../typings';
import { sanityClient } from '../../../sanity';
import { groq } from 'next-sanity';

type Data = {
  comments: IComment[];
};

const commentQuery = groq`
*[_type=="comment" && references(*[_type=="tweet" && _id==$tweetId]._id)] {
  _id,
  ...
} | order(_createdAt desc)

`;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const { tweetId } = request.query;

  const comments: IComment[] = await sanityClient.fetch(commentQuery, {tweetId});

  response.status(response.statusCode).json({comments});

}
