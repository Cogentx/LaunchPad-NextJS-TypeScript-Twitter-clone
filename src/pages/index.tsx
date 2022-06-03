import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { ITweet } from '../../typings';
import Feed from '../components/Feed';
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import { fetchTweets } from '../lib/utilities/fetchTweets';

interface IProps {
  tweets: ITweet[];
}

const Home: NextPage<IProps> = ({ tweets }: IProps) => {
  return (
    <div className="mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>Twitter Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-cols-9">
        <Sidebar />
        <Feed tweets={tweets} />
        <Widgets />
      </main>
    </div>
  );
};

export default Home;

// Setup Server-Side Render using Next.js
export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};
