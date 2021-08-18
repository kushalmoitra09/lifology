import React, { useState } from 'react';
import MetaLayout from '/components/MetaLayout';
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import cookies from 'next-cookies'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from '/helpers/Constants.js'
import { queryGraph } from '/helpers/GraphQLCaller';
import { SchemeGetProfile } from '/helpers/GraphQLSchemes';
import classNames from '/helpers/classNames';
import Breadcrumbs from '/components/Breadcrumbs';
import { Tab } from '@headlessui/react';
import { SchemeMyLifologyCareerPools, SchemeMyLifologyMagazines, SchemeMyLifologyUniversities, SchemeMyLifologyVideos } from '../../helpers/GraphQLSchemes';
import Link from 'next/link';

const pages = [
  {
    name: 'Bookmarks', href: '/bookmarks', current: true
  },
];

const tabs = ['Videos', 'Magazines', 'Career Families', 'University'];

const Bookmarks = props => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {
    videos,
    magazines,
    careerPools,
    universities,
    profile,
  } = props;

  const Panels = () => (
    <Tab.Panels className={'mt-4'}>
      {/* VIDEOS START */}
      <Tab.Panel className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'}>
        {videos.map(video => (
          <Link key={video.id} href={`/career_explorer/career_video/${video.id}`}>
            <div className={'rounded-md shadow relative overflow-x-hidden cursor-pointer text-sm text-white'}>
              <img src={video.thumbnail} className={'h-48 rounded-md w-full'} />
              <div className={'absolute bottom-0 w-full p-2 px-3 bg-black opacity-50'}>{video.title}</div>
              <div className={'absolute bottom-0 w-full p-2 px-3'}>{video.title}</div>
            </div>
          </Link>
        ))}
      </Tab.Panel>
      {/* VIDEOS END */}
      {/* MAGAZINES START */}
      <Tab.Panel className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'}>
        {magazines.map(magazine => (
          <Link key={magazine.id} href={`/career_explorer/magazine/${magazine.id}`}>
            <div className={'rounded-md shadow relative overflow-x-hidden cursor-pointer text-sm text-white'}>
              <img src={magazine.thumbnail} className={'h-48 rounded-md w-full'} />
              <div className={'absolute bottom-0 w-full p-2 px-3 bg-black opacity-50'}>{magazine.title}</div>
              <div className={'absolute bottom-0 w-full p-2 px-3'}>{magazine.title}</div>
            </div>
          </Link>
        ))}
      </Tab.Panel>
      {/* MAGAZINES END */}
      {/* CAREER POOLS START */}
      <Tab.Panel className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'}>
        {careerPools.map(careerPool => (
          <Link key={careerPool.id} href={`/career_explorer/job_families/${careerPool.id}`}>
            <div className={'rounded-md shadow relative overflow-x-hidden cursor-pointer text-sm text-white'}>
              <img src={careerPool.thumbnail} className={'h-48 rounded-md w-full'} />
              <div className={'absolute bottom-0 w-full p-2 px-3 bg-black opacity-50'}>{careerPool.name}</div>
              <div className={'absolute bottom-0 w-full p-2 px-3'}>{careerPool.name}</div>
            </div>
          </Link>
        ))}
      </Tab.Panel>
      {/* CAREER POOLS END */}
      {/* UNIVERSITIES START */}
      <Tab.Panel className={'grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4'}>
        {universities.map(university => (
          <Link key={university.id} href={`/career_explorer/course_and_university/${university.id}`}>
            <div className={'rounded-md shadow relative overflow-x-hidden cursor-pointer text-sm text-white'}>
              <img src={university.logo} className={'h-48 rounded-md w-full'} />
              <div className={'absolute bottom-0 w-full p-2 px-3 bg-black opacity-50'}>{university.name}</div>
              <div className={'absolute bottom-0 w-full p-2 px-3'}>{university.name}</div>
            </div>
          </Link>
        ))}
      </Tab.Panel>
      {/* UNVIERSITIES END */}
    </Tab.Panels>
  );

  const Tabs = () => (
    <Tab.List className={'flex mb-1 space-x-1 bg-gray-100 rounded shadow'}>
      {tabs.map(tab => (
        <Tab
          key={tab}
          className={({ selected }) =>
            classNames(
              'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded duration-200 border-b-4',
              selected
                ? 'bg-white shadow text-lblue border-b-4 border-lblue'
                : 'text-gray-300 hover:bg-white/[0.12] hover:text-gray-600 border-gray-100'
            )
          }
        >
          {tab}
        </Tab>
      ))}
    </Tab.List>
  );

  return (
    <div>
      <MetaLayout title={'Bookmarks'} description={'Private bookmarks'} />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
        <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-auto focus:outline-none">
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={'Bookmarks'} />
          <main className="flex-1 relative z-0 overflow-y-auto">
            <Breadcrumbs pages={pages} />
            <div className="m-4">
              <div className="max-w-6xl mx-auto mt-4">
                <div className="flex flex-col mt-2">
                  <div className={'bg-white rounded-md shadow lg:col-start-1 lg:col-span-2 p-4'}>
                    <Tab.Group>
                      <Tabs />
                      <Panels />
                    </Tab.Group>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { token } = cookies(context)
  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }
  const magazineClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/my-lifology",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  const videos = await queryGraph(magazineClient, {}, SchemeMyLifologyVideos)
    .then((res) => {
      return res.videos
    }).catch((networkErr) => {
      return {};
    })

  const magazines = await queryGraph(magazineClient, {}, SchemeMyLifologyMagazines)
    .then((res) => {
      return res.magazines
    }).catch((networkErr) => {
      return {};
    })

  const careerPools = await queryGraph(magazineClient, {}, SchemeMyLifologyCareerPools)
    .then((res) => {
      return res.careerPools
    }).catch((networkErr) => {
      return {};
    })

  const universities = await queryGraph(magazineClient, {}, SchemeMyLifologyUniversities)
    .then((res) => {
      return res.universities
    }).catch((networkErr) => {
      return {};
    })
  const profileClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/user",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
    .then((res) => {
      return res.profile
    }).catch((networkErr) => {
      return {};
    })

  return {
    props: {
      videos,
      magazines,
      careerPools,
      universities,
      profile,
      token,
    }
  }
}

export default Bookmarks;