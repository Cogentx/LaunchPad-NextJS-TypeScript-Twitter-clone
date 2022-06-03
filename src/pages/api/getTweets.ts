// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../../sanity';
import { ITweet } from '../../../typings';
import { groq } from 'next-sanity';

type Data = {
  tweets: ITweet[];
};

const feedQuery = groq`
*[_type=="tweet" && !blockTweet] {
  _id,
  ...
} | order(_createdAt desc)
`;

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const tweets: ITweet[] = await sanityClient.fetch(feedQuery);

  response.status(response.statusCode).json({ tweets });
}
