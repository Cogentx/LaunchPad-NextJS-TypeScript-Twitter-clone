// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../../sanity';
import { Tweet } from '../../../typings';
import { groq } from 'next-sanity';

type Data = {
  tweets: Tweet[];
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
  const tweets: Tweet[] = await sanityClient.fetch(feedQuery);

  response.status(response.statusCode).json({ tweets });
}
