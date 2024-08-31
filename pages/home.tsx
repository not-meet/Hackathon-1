import React from 'react';
import axios from 'axios';
import AiChatToggleButton from '../components/AiChatToggleButton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const reviews = [
  {
    id: 1,
    text: "Great experience! Highly recommend.",
    user: "Jane Doe",
  },
  {
    id: 2,
    text: "Exceptional service and support.",
    user: "John Smith",
  },
  {
    id: 3,
    text: "Quick and reliable, will use again!",
    user: "Alice Johnson",
  },
  {
    id: 4,
    text: "Absolutely amazing! Exceeded my expectations.",
    user: "Michael Lee",
  },
];

export type Mentor = {
  id: number;
  name: string;
  image: string;
  description: string;
};

type HomePageProps = {
  mentors: Mentor[];
};

const HomePage: React.FC<HomePageProps> = ({ mentors = [] }) => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <Header />

      {/* Banner Section */}
      <div
        className="relative bg-cover shadow-2xl bg-center h-[40rem]"
        style={{ backgroundImage: 'url(/m2.jpg)' }}
      >
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <button className="btn bg-gray-800 text-white px-8 py-3 rounded-full shadow-lg hover:bg-black hover:shadow-black">
            Get Started
          </button>
        </div>
      </div>

      {/* Meet Our Mentors Heading */}
      <div className="text-center mt-12 mb-7">
        <div className="flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
          <h2 className="text-4xl font-bold text-gray-800 mx-4">Meet Our Mentors</h2>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>
      </div>

      {/* Dynamic Carousel of Cards */}
      <div className="carousel carousel-center rounded-box gap-4 p-4 w-full">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="carousel-item w-72 h-96">
            <div className="card bg-base-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
              <figure className="px-4 pt-6">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="rounded-xl h-fit w-fit shadow-green-100"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-black">{mentor.name}</h2>
                <p className="text-gray-600">{mentor.description}</p>
                <div className="card-actions">
                  <button className="btn bg-slate-500 text-white hover:bg-black hover:shadow-black">Visit Now</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex mt-10 m-3 items-center justify-between bg-gradient-to-r from-blue-500 to-violet-600 h-72 shadow-lg rounded-lg p-6">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Empowering Growth Through Engaging Seminars
          </h2>
          <p className="text-lg text-white mt-4">
            Join us for expert-led sessions that will enhance your knowledge and skills.
          </p>
        </div>
        <div className="flex-shrink-0 w-1/3 h-full">
          <img
            src="/m4.jpg"
            alt="Seminar"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="flex mt-10 m-3 items-center justify-between bg-gradient-to-r from-purple-600 to-blue-300 h-72 shadow-lg rounded-lg p-6">
        <div className="flex-shrink-0 w-1/3 h-full">
          <img
            src="/M3.jpeg"
            alt="Mentor Blog"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1 ml-6">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Learn from Experience: Mentor Blogs
          </h2>
          <p className="text-lg text-white mt-4">
            Dive into insightful articles written by industry experts, sharing their journey and achievements.
          </p>
        </div>
      </div>

      <div className="flex mt-10 m-3 items-center justify-between bg-gradient-to-r from-purple-500 to-pink-600 h-72 shadow-lg rounded-lg p-6">
        <div className="flex-1">
          <h2 className="text-4xl font-bold text-white leading-snug">
            Personalized One-on-One Consultancy
          </h2>
          <p className="text-lg text-white mt-4">
            Get tailored advice and guidance through direct interaction with experienced mentors.
          </p>
        </div>
        <div className="flex-shrink-0 w-1/3 h-full">
          <img
            src="/ono.jpeg"
            alt="Consultancy"
            className="h-full w-full object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="min-h-screen bg-base-100 py-10">
        {/* Heading */}
        <div className="text-center mt-12 mb-7">
          <div className="flex items-center justify-center">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
            <h2 className="text-4xl font-bold text-gray-800 mx-4"> Why Mentor connect?</h2>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-row items-center justify-center align-bottom gap-6">
          {/* Left Card */}
          <div className='card w-28 h-28 bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300'></div>
          <div className="card w-80 h-96 bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
            <div className="card-body text-center">
              <h3 className="card-title text-xl font-bold text-black">Personalized Mentorship</h3>
              <p className="text-gray-600 mt-10">Get one-on-one guidance tailored to your needs.<br /> <br /> Benefit from dedicated time to address your unique needs and goals.<br /><br /> Set and achieve specific objectives with mentor support.</p>
            </div>
          </div>

          {/* Middle Card */}
          <div className="card w-80 h-[35rem] bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
            <div className="card-body text-center">
              <h3 className="card-title text-2xl text-black justify-center font-bold">Expert Advice</h3>
              <p className="text-gray-600 mt-10">Learn from industry professionals with years of experience. <br /><br />Stay ahead of trends with guidance on the latest industry practices. <br /><br /> Get tailored solutions to specific challenges you face in your career or projects. <br /><br /> Develop long-term strategies with insights from seasoned professionals.</p>
            </div>
          </div>

          {/* Right Card */}
          <div className="card w-80 h-96 bg-slate-100 shadow-xl hover:scale-105 transform transition-transform duration-300">
            <div className="card-body text-center">
              <h3 className="card-title text-black justify-center text-xl font-bold">Career Growth</h3>
              <p className="text-gray-600 mt-10">Advance your career with targeted advice and support.<br /><br />Expand your professional network through mentor connections.<br /><br />Leverage mentor connections to find job openings and career opportunities.</p>
            </div>
          </div>

          <div className='card w-28 h-28 bg-slate-100 hover:scale-105 transform transition-transform duration-300 shadow-xl'></div>
        </div>
      </div>

      <div className="text-center mt-12 mb-7">
        <div className="flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-400"></div>
          <h2 className="text-4xl font-bold text-gray-800 mx-4">hear from our mentees</h2>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-10">
        <div className="carousel w-full max-w-full mx-auto flex flex-wrap justify-center">
          {reviews.map((review, index) => (
            <div
              id={`item${index + 1}`}
              key={review.id}
              className="carousel-item w-full md:w-1/2 lg:w-1/3 p-4 flex justify-center"
            >
              <div className="card w-full bg-base-100 shadow-xl">
                <div className="card-body p-6">
                  <p className="text-gray-700 text-lg italic">"{review.text}"</p>
                  <h2 className="card-title mt-4 text-gray-800">- {review.user}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AiChatToggleButton />
      <Footer />

    </div>
  );
};

export default HomePage;

// Fetch data for SSR
export const getServerSideProps = async () => {
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

