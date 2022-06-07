// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// Sanity CMS Mutations: https://www.sanity.io/docs/http-mutations
import type { NextApiRequest, NextApiResponse } from 'next';
import { IComment, CommentBody } from '../../../typings';

type Data = {
  comment: IComment;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const {
    text,
    username,
    profileImage,
    tweetId,
  }: CommentBody = JSON.parse(request.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: 'comment',
          username,
          text,
          profileImage,
          tweet: {
            _type: 'reference',
            _ref: tweetId,
          }
        },
      },
    ],
  };

  const apiEndPoint: string = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  try {
    const result = await fetch(apiEndPoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
      },
      body: JSON.stringify(mutations),
    });

    //TODO: option to handle non-exception error such as invalid authorization here
    const comment: IComment = await result.json();
    response.status(response.statusCode).json({ comment });
  } catch (error) {
    // TODO: handle exception more gracefully than simply console logging
    console.log('addComment error: ', error);
  }
}
