import React, { useState } from 'react';
import cookies from 'next-cookies';
import Breadcrumbs from '/components/Breadcrumbs';
import MetaLayout from '/components/MetaLayout';
import HeaderLayout from '/components/HeaderLayout';
import NavigationLayout from '/components/NavigationLayout';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Constants from '/helpers/Constants';
import { queryGraph } from '/helpers/GraphQLCaller';
import { SchemeGetProfile, SchemeGetHomeData } from '/helpers/GraphQLSchemes';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import Link from 'next/link';

const breakpoints = {
  "(min-width: 464px)": {
    slidesPerView: 1,
  },
  "(min-width: 768px)": {
    slidesPerView: 2,
  },
  "(min-width: 1200px)": {
    slidesPerView: 4,
  },
};

const pages = [
  {
    name: 'Dashboard', href: '/', current: true,
  },
];

const coaches = [
  {
    id: 85,
    name: 'Test Coach',
    designation: 'Career Coach',
    img: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
  },
  {
    id: 85,
    name: 'Test Coach',
    designation: 'Career Coach',
    img: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
  },
  {
    id: 85,
    name: 'Test Coach',
    designation: 'Career Coach',
    img: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
  },
  {
    id: 85,
    name: 'Test Coach',
    designation: 'Career Coach',
    img: 'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png',
  },
];

export default function Home({ profile, home }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [masterClassSliderRef, masterClassSlider] = useKeenSlider({
    breakpoints: { ...breakpoints, "(min-width: 1200px)": { slidesPerView: 2.5 }, },
    spacing: 10,
  });
  const [assessmentSliderRef, assessmentSlider] = useKeenSlider({
    breakpoints,
    spacing: 10,
  });
  const [articlesSliderRef, articlesSlider] = useKeenSlider({
    breakpoints: { ...breakpoints, "(min-width: 1200px)": { slidesPerView: 3.5 }, },
    spacing: 10,
  });
  const [videosSliderRef, videosSlider] = useKeenSlider({
    breakpoints: { ...breakpoints, "(min-width: 1200px)": { slidesPerView: 2.5 }, },
    spacing: 10,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <MetaLayout title={'Dashboard'} description={'Home Page'} />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
        <NavigationLayout index="1" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-auto focus:outline-none">
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={'Dashboard'} />
          <main className="flex-1 relative z-0 overflow-y-auto">
            <Breadcrumbs pages={pages} />
            <div className="flex px-4 justify-center">
              <div className="mb-4 max-w-3xl w-full grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">

                <div className='space-y-6 lg:col-start-1 lg:col-span-2'>
                  {/* STAT CARDS START */}
                  <div className='sm:flex bg-white shadow rounded-lg p-4 min-w-full'>
                    <div className='bg-blue-100 p-3 mb-4 sm:mb-0 sm:ml-1 sm:mr-2 sm:w-1/3 w-full rounded-md'>
                      <div>
                        <div className='flex items-center'>
                          <img src={'/img/play.svg'} className='mr-3' />
                          Total Videos Watched
                        </div>
                        <div className='mt-3'>
                          <span className='font-bold text-3xl mr-2'>12</span>
                          <span>Videos</span>
                        </div>
                      </div>
                    </div>
                    <div className='bg-green-50 p-3 my-4 sm:my-0 sm:mx-2 sm:w-1/3 w-full rounded-md'>
                      <div>
                        <div className='flex items-center'>
                          <img src={'/img/assesment.svg'} className='mr-3' />
                          Total Assessment
                        </div>
                        <div className='mt-3'>
                          <span className='font-bold text-3xl mr-2'>12</span>
                          <span>Assessment</span>
                        </div>
                      </div>
                    </div>
                    <div className='bg-yellow-100 p-3 mt-4 sm:mt-0 sm:ml-2 sm:mr-1 sm:w-1/3 w-full rounded-md'>
                      <div>
                        <div className='flex items-center'>
                          <img src={'/img/play.svg'} className='mr-3' />
                          Total Articles Read
                        </div>
                        <div className='mt-3'>
                          <span className='font-bold text-3xl mr-2'>12</span>
                          <span>Articles</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* STAT CARDS END */}

                  {/* LIFOLOGY MASTER START */}
                  <div className='bg-white shadow rounded-lg p-4 pb-5 min-w-full'>
                    <div className='flex justify-between'>
                      <div className='font-bold text-xl mb-3'>Watch Lifology Master Class</div>
                    </div>
                    <div className='relative flex items-center'>
                      <a
                        onClick={(event) => {
                          masterClassSlider.prev()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                      </a>
                      <a
                        onClick={(event) => {
                          masterClassSlider.next()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                      <div className='navigation-wrapper keen-slider' ref={masterClassSliderRef}>
                        {home.master_class_videos?.map(video => (
                          <div key={video.id} className='keen-slider__slide rounded-lg'>
                            <Link href={`/career_explorer/career_video/${video.id}`}>
                              <a href={`/career_explorer/career_video/${video.id}`}>
                                <div className='h-72 mx-1 my-2 p-4 group relative rounded-lg bg-white shadow hover:shadow-xl hover:scale-105 duration-200'>
                                  <div className='h-3/4 relative'>
                                    <img src={video.thumbnail} className='h-full w-full rounded-lg' />
                                    <img src='/img/play-yellow.svg' className='absolute -bottom-4 -right-3' />
                                  </div>
                                  <div className='pt-3'>
                                    <div className='text-sm text-gray-400'>Author</div>
                                    <div className='font-bold text-lg'>Chetan Bhagat</div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* LIFOLOGY MASTER END */}

                  {/* ASSESSMENT START */}
                  <div className='bg-white shadow rounded-lg p-4 pb-5 min-w-full'>
                    <div className='font-bold text-xl mb-3'>Assessment</div>
                    <div className='relative flex items-center'>
                      <a
                        onClick={(event) => {
                          assessmentSlider.prev()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                      </a>
                      <a
                        onClick={(event) => {
                          assessmentSlider.next()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                      <div className='navigation-wrapper keen-slider' ref={assessmentSliderRef}>
                        {home.assessment?.map(assessment => (
                          <div key={assessment.id} className='keen-slider__slide rounded-lg'>
                            <Link href='#'>
                              <a href='#'>
                                <div className='h-72 mx-1 my-2 group relative rounded-lg bg-white shadow hover:shadow-xl hover:scale-105 duration-200'>
                                  <img src={assessment.dash_cards_image || '/img/Mask_Group_11.png'} className='h-full rounded-lg' />
                                  <div className='absolute top-8 left-5 text-white'>
                                    <div className='text-2xl font-medium w-40 break-words'>{assessment.title}</div>
                                    <div className='text-lg mt-2 w-40'>{assessment.subtitle}</div>
                                  </div>
                                  <div className='flex items-center absolute bottom-4 right-5'>
                                    <div className='text-white mr-2'>Start</div>
                                    <img src='/img/arrow-right-white.svg' />
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* ASSESSMENT END */}

                  {/* VIDEOS START */}
                  <div className='bg-white shadow rounded-lg p-4 pb-5 min-w-full'>
                    <div className='flex justify-between'>
                      <div className='font-bold text-xl mb-3'>Recommended Videos</div>
                      <a href='#' className='text-lblue font-medium'>View All</a>
                    </div>
                    <div className='relative flex items-center'>
                      <a
                        onClick={(event) => {
                          videosSlider.prev()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                      </a>
                      <a
                        onClick={(event) => {
                          videosSlider.next()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                      <div className='keen-slider navigation-wrapper' ref={videosSliderRef}>
                        {home.watch_videos?.map(video => (
                          <div key={video.id} className='keen-slider__slide rounded-lg'>
                            <Link href={`/career_explorer/career_video/${video.id}`}>
                              <a href={`/career_explorer/career_video/${video.id}`}>
                                <div className='h-48 mx-1 my-2 rounded-lg group relative bg-white shadow hover:shadow-xl hover:scale-105 duration-200'>
                                  <img src={video.thumbnail || '/img/Mask_Group_11.png'} className='h-full w-full rounded-lg' />
                                  <div className={'text-white absolute bottom-0 rounded-b-lg w-full p-2 px-3 bg-black bg-opacity-75'}>{video.title}</div>
                                  <div className={'text-white absolute bottom-0 rounded-b-lg w-full p-2 px-3'}>{video.title}</div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* VIDEOS END */}

                  {/* COURSE+UNI START */}
                  <div className='bg-white shadow rounded-lg p-4 pb-5 min-w-full'>
                    <div className='flex justify-between'>
                      <div className='font-bold text-xl mb-3'>Course & University</div>
                      <a href='#' className='text-lblue font-medium'>View All</a>
                    </div>
                    <div className='grid gap-6 sm:grid-cols-5 grid-cols-2'>
                      {home.university?.map(uni => (
                        <Link href={`/career_explorer/course_and_university/${uni.id}`}>
                          <a href={`/career_explorer/course_and_university/${uni.id}`}>
                            <div className='flex p-5 bg-white shadow cursor-pointer hover:shadow-lg rounded-md col-span-1 h-40 duration-200'>
                              <img src={uni.logo} className='bg-gray-100 m-auto' />
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* COURSE+UNI END */}

                  {/* ARTICLES START */}
                  <div className='bg-white shadow rounded-lg p-4 pb-5 min-w-full'>
                    <div className='flex justify-between'>
                      <div className='font-bold text-xl mb-3'>Recommended Articles</div>
                      <a href='#' className='text-lblue font-medium'>View All</a>
                    </div>
                    <div className='relative flex items-center'>
                      <a
                        onClick={(event) => {
                          articlesSlider.prev()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full left-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                      </a>
                      <a
                        onClick={(event) => {
                          articlesSlider.next()
                        }}>
                        <div className="cursor-pointer group absolute w-8 h-8 bg-black bg-opacity-50 hover:bg-opacity-100 z-50 rounded-full right-0 flex items-center duration-500 -translate-y-2/4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 p-2 group-hover:p-1 group-active:p-2 duration-500" fill="none" viewBox="0 0 24 24" stroke="white">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </a>
                      <div className='keen-slider navigation-wrapper' ref={articlesSliderRef}>
                        {home.articles?.map(article => (
                          <div key={article.id} className='keen-slider__slide'>
                            <Link href={`/career_explorer/magazine/${article.id}`}>
                              <a href={`/career_explorer/magazine/${article.id}`}>
                                <div className='h-72 mx-1 my-2 group relative rounded-lg bg-white shadow hover:shadow-lg hover:scale-105 duration-200'>
                                  <div className='h-1/2'>
                                    <img className='rounded-t-lg h-full' src={article.thumbnail} />
                                  </div>
                                  <div className='font-bold mt-2 px-2'>
                                    <div>{article.title}</div>
                                  </div>
                                </div>
                              </a>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* ARTICLES END */}

                  {/* COACHES START */}
                  <div className='bg-white shadow rounded-lg p-4 pb-5 min-w-full'>
                    <div className='flex justify-between'>
                      <div className='font-bold text-xl mb-3'>Our Coaches</div>
                      <a href='#' className='text-lblue font-medium'>View All</a>
                    </div>
                    <div className='grid gap-6 sm:grid-cols-4 grid-cols-1'>
                      {coaches.map(coach => (
                        <Link href={`/coaching/coach/${coach.id}`}>
                          <a href={`/coaching/coach/${coach.id}`}>
                            <div className='sm:h-64 flex flex-col items-center px-10 sm:pt-0 pt-2 bg-white shadow rounded-md col-span-1 hover:shadow-lg duration-200'>
                              <img src={coach.img} className='rounded-full bg-gray-100 mt-auto' />
                              <div className='text-xl font-bold my-2'>John Doe</div>
                              <div className='text-sm text-gray-300 font-medium'>Career Coach</div>
                              <div className='mt-auto mb-4 text-lblue'><a href='#'>View Profile</a></div>
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                  {/* COACHES END */}

                </div>

                <div aria-labelledby="" className="lg:col-start-3 lg:col-span-1">
                  <div className="bg-white shadow rounded-lg">
                    <img className={'w-full'} src={'/img/dashboard_banner_bg.png'} />
                  </div>
                </div>

              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
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

  console.log(token)

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

  const dashboardClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/dashboard",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const home = await queryGraph(dashboardClient, {}, SchemeGetHomeData)
    .then((res) => {
      return res.home
    }).catch((networkErr) => {
      return {};
    })

  return {
    props: {
      profile,
      home
    },
  };
}