// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Sanity CMS Mutations: https://www.sanity.io/docs/http-mutations
import type { NextApiRequest, NextApiResponse } from 'next';
import { ITweet, TweetBody } from '../../../typings';

type Data = {
  tweet: ITweet;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const {
    text,
    username,
    profileImage,
    image = '',
  }: TweetBody = JSON.parse(request.body);

  const mutations = {
    mutations: [
      {
        _type: 'tweet',
        blockTweet: false,
        username,
        text,
        profileImage,
        image,
      },
    ],
  };

  const apiEndPoint: string = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const result = await fetch(apiEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_TOKEN}`,
    },
    body: JSON.stringify(mutations),
  });

  const tweet: ITweet = await result.json();

  response.status(response.statusCode).json({ tweet });
}
