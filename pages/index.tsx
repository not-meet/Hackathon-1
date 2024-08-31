// index.tsx

import axios from 'axios';
import { GetServerSideProps } from 'next';
import HomePage, { Mentor } from "./home";

type Props = {
  mentors: Mentor[];
};

export default function Home({ mentors }: Props) {
  return (
    <main className="min-h-screen bg-background-light">
      <HomePage mentors={mentors} />
    </main>
  );
}

// Fetch data for SSR
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  try {
    const { data } = await axios.get<Mentor[]>('http://localhost:3000/api/home');
    return {
      props: {
        mentors: data,
      },
    };
  } catch (error) {
    console.error('Failed to fetch mentors:', error);
    return {
      props: {
        mentors: [],
      },
    };
  }
};
