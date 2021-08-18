import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ShareIcon,
  BookmarkIcon,
} from '@heroicons/react/outline'
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/solid';
import { queryGraph } from '/helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeGetMagazineDetails } from '/helpers/GraphQLSchemes'
import Constants from '/helpers/Constants.js'
import NavigationLayout from '/components/NavigationLayout'
import HeaderLayout from '/components/HeaderLayout'
import MetaLayout from '../../../components/MetaLayout'

import "react-multi-carousel/lib/styles.css";
import { mutateGraph } from '../../../helpers/GraphQLCaller'
import { formatDate } from '/helpers/utils'
import NextNProgress from 'nextjs-progressbar'
import Breadcrumbs from '../../../components/Breadcrumbs'
import { useRouter } from 'next/router'

import cookies from 'next-cookies'
import { SchemeAddMagazineComment, SchemeBookmarkMagazine, SchemeMagazineLikeDislike } from '../../../helpers/GraphQLSchemes';

function getVideoId(url) {
  var regExp = /https:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/
  var match = url.match(regExp);
  if (match) {
    return match[2]
  }
  return ''
}

export default function CareerVideoDetail({ profile, magazineDetails, relatedVideos, token }) {
  const router = useRouter();
  const [magazine, setMagazine] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [videoStatus, setVideoStatus] = useState([]);
  const [comment, setComment] = useState('');
  const Bookmark_Icon = !!magazine?.bookmark_status ? SolidBookmarkIcon : BookmarkIcon;
  const pages = [
    {
      name: 'Career Explorer', href: '/career_explorer/', current: false
    },
    {
      name: 'Magazines', href: '/career_explorer/magazine', current: false,
    },
    {
      name: 'Magazine Details', href: '#', current: true
    },
  ];
  const client = new ApolloClient({
    uri: Constants.baseUrl + "/api/skills",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  useEffect(() => {
    setMagazine(magazineDetails)
  }, []);

  const bookmarkMagazine = () => {
    mutateGraph(client,
      {
        magazine_id: Number(magazine.id)
      }, SchemeBookmarkMagazine)
      .then((res) => {
        setMagazine({ ...magazine, bookmark_status: res.magazineBookmark.bookmark_status })
      }).catch((networkErr) => {
        console.log(networkErr)
      });
  }

  const addComment = () => {
    mutateGraph(client,
      {
        magazine_id: Number(magazine.id),
        comment,
      }, SchemeAddMagazineComment)
      .then((res) => {
        // setMagazine({ ...magazine, bookmark_status: res.magazineBookmark.bookmark_status })
        setComment('');
      }).catch((networkErr) => {
        console.log(networkErr)
      });
  }

  const removeLike_Dislike = () => {
    mutateGraph(client,
      {
        magazine_id: Number(magazine.id),
        like_status: 2,
      }, SchemeMagazineLikeDislike)
      .then((res) => {
        setMagazine({ ...magazine, like_status: res.magazineLikeStatus.like_status })
        setComment('');
      }).catch((networkErr) => {
        console.log(networkErr)
      });
  };
  
  const handleDislike = () => {
    if (magazine.like_status == 0) {
      removeLike_Dislike();
    } else {
      mutateGraph(client,
        {
          magazine_id: Number(magazine.id),
          like_status: 0,
        }, SchemeMagazineLikeDislike)
        .then((res) => {
          setMagazine({ ...magazine, like_status: res.magazineLikeStatus.like_status })
          setComment('');
        }).catch((networkErr) => {
          console.log(networkErr)
        });
    }
  };
  
  const handleLike = () => {
    if (magazine.like_status == 1) {
      removeLike_Dislike();
    } else {
      mutateGraph(client,
        {
          magazine_id: Number(magazine.id),
          like_status: 1,
        }, SchemeMagazineLikeDislike)
        .then((res) => {
          setMagazine({ ...magazine, like_status: res.magazineLikeStatus.like_status })
          setComment('');
        }).catch((networkErr) => {
          console.log(networkErr)
        });
    }
  };
  
  const getRecommendedVideos = () => (
    <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
      <div className="bg-white px-4 py-4 shadow sm:rounded-lg sm:px-4" style={{ height: '100vh', overflow: 'auto' }} >
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Recommended Videos
        </h2>
        {relatedVideos.map((r) => (
          <a href={`/career_explorer/magazine/${r.id}`}>
            <div className="flex my-4">
              <div className="mr-4 mt-2 flex-shrink-0 self-start">
                <img className="w-20 rounded object-cover" src={r.thumbnail} />
              </div>
              <div className="self-center">
                <h4 className="text-sm font-bold">{r.title}</h4>
                <p className="mt-1 text-xs text-justify" >
                  {r.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );

  const getDetailsView = () => (
    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
      <section aria-labelledby="applicant-information-title" >
        <div className="bg-white shadow sm:rounded-lg p-4">
          <div className="sm:flex sm:py-4">
            <div className={'sm:w-1/2 w-full'}>
              <img className={'rounded-md'} src={magazine?.thumbnail} />
            </div>
            <div className={'sm:px-6 sm:mt-0 mt-4'}>
              <div className={'font-bold text-lg'}>{magazine?.title}</div>
              <div className={'text-sm text-gray-400 pt-3'}>
                {!!magazine?.created_at && formatDate(new Date(magazine.created_at))}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 my-4" />
          
          <div>
            <div className="mt-2 mb-4 text-sm text-justify flex-shrink-0 sm:mb-0 sm:mr-4">
              {magazine?.description}
            </div>
            <div className={'mt-4'}>
              <div>Tags</div>
              <ul className={'flex mt-1 flex-wrap'}>{magazine?.tags?.map(tag => (
                <li key={tag} className={'text-sm bg-gray-200 rounded-full max-w-min py-2 px-4 mr-3 mb-3'}>{tag}</li>
              ))}</ul>
            </div>
          </div>

          <div className="w-full h-px bg-gray-200 mt-2 mb-2" />
          <div className={'flex flex-wrap max-w-full'}>
            <div className="self-center w-full flex flex-wrap text-xs">
              <div className="flex py-2">
                <svg onClick={handleLike} className="h-4 w-4 mr-2 cursor-pointer" fill={magazine?.like_status == 1 ? "#1171ba" : "none"} viewBox="0 0 24 24" stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Like</span>
              </div>
              <div className="flex py-2">
                <svg onClick={handleDislike} className="h-4 w-4 mr-2 ml-4 cursor-pointer" fill={magazine?.like_status == 0 ? "#1171ba" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
                <span>Dislike</span>
              </div>
              <div className="flex py-2 ml-4 mr-auto">
                <ShareIcon className={'h-4 mr-2'} />
                  Share
                </div>
              <div className={'flex py-2 items-center'}>
                <Bookmark_Icon
                  className={'h-5 mr-2 cursor-pointer'}
                  onClick={bookmarkMagazine}
                />
                <span>{!!magazine?.bookmark_status ? 'Bookmark Added' : 'Add to bookmark'}</span>
              </div>
            </div>
          </div>
          <div className="w-full h-px bg-gray-200 mt-2 mb-4" />
          <div>
            <div className={'text-md mb-2'}>Leave a comment</div>
            <textarea
              placeholder={'Write something...'}
              value={comment}
              onChange={e => setComment(e.target.value)}
              className={'rounded-md bg-gray-200 outline-none w-full h-28 p-2 mb-2'}
            />
            <button
              className={'flex ml-auto py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-lblue focus:outline-none disabled:bg-gray-500 disabled:cursor-default duration-200'}
              onClick={addComment}
              disabled={!comment?.length}
            >
              Apply  
            </button>
          </div>
        </div>
      </section>
    </div>
  );
  
  const IFrameView = () => (
    <iframe src={'https://en.wikipedia.org/wiki/Main_Page'} className={'space-y-6 lg:col-start-1 lg:col-span-2 w-full h-full'} allowFullScreen={true} />
  );
  
  return (
    <>
      <MetaLayout title={magazine?.title} description={magazine?.description} />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
        <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-auto focus:outline-none">
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={magazine?.title} />
          <main className="flex-1 relative z-0 overflow-y-auto">
            <Breadcrumbs pages={pages} />
            <div className="m-4">
              <div className="max-w-6xl mx-auto mt-4">
                <div className="flex flex-col mt-2">
                  <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {/* <IFrameView /> */}
                    {getDetailsView()}
                    {getRecommendedVideos()}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
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
  const magazineClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/skills",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  const magazine = await queryGraph(magazineClient, { id: parseInt(context.params.id) }, SchemeGetMagazineDetails)
    .then((res) => {
      return res.magazineDetails
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
      profile,
      magazineDetails: magazine.details,
      relatedVideos: magazine.relatedVideos || [],
      token,
    }
  }
}