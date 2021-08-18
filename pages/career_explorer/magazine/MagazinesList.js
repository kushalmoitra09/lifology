import React, { useEffect, useState } from 'react';
import styles from '/styles/Magazine.module.css';
import { BookmarkIcon } from '@heroicons/react/outline';
import { BookmarkIcon as SolidBookmarkIcon } from '@heroicons/react/solid';
import Constants from '/helpers/Constants';
import { SchemeBookmarkMagazine, SchemeCheckMagazineStatus } from '/helpers/GraphQLSchemes';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { mutateGraph, queryGraph } from '/helpers/GraphQLCaller';
import Link from 'next/link';
import { formatDate } from '/helpers/utils';

const MagazineSingle = props => {
  const [magazineBookmarked, setMagazineBookmarked] = useState();
  const { token, magazine } = props;
  const Bookmark_Icon = magazineBookmarked ? SolidBookmarkIcon : BookmarkIcon;
  
  const client = new ApolloClient({
    uri: Constants.baseUrl + '/api/skills',
    cache: new InMemoryCache(),
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  const fetchMagazineStatus = () => {
    queryGraph(client,
      {
        magazine_id: Number(magazine.id)
      }, SchemeCheckMagazineStatus)
      .then((res) => {
        setMagazineBookmarked(res.checkMagazineStatus.bookmark_status)
      }).catch((networkErr) => {
        console.log(networkErr)
      });
  };

  useEffect(() => {
    fetchMagazineStatus();
  }, []);

  const bookmarkMagazine = () => {
    mutateGraph(client,
      {
        magazine_id: Number(magazine.id)
      }, SchemeBookmarkMagazine)
      .then((res) => {
        setMagazineBookmarked(res.magazineBookmark.bookmark_status)
      }).catch((networkErr) => {
        console.log(networkErr)
      });
  }

  return (
    <div className={'flex px-4 py-6 my-5 shadow hover:shadow-lg rounded-md duration-200'}>
      <div className={'w-8/12 pr-10 flex flex-col'}>
        <Link href={`/career_explorer/magazine/${magazine.id}`}>
          <div className={'font-bold text-lg w-full cursor-pointer'}>{magazine.title}</div>
        </Link>
        <div className={`${styles['magazine-list-single-item-description']} text-sm my-4`}>{magazine.description}</div>
        <div className={'text-sm text-gray-400 flex justify-between flex-col sm:flex-row pt-4'}>
          <div className={'py-3 sm:py-0'}>{!!magazine?.created_at && formatDate(new Date(magazine.created_at))}</div>
          <div className={'text-black flex'}>
            <Bookmark_Icon
              className={'h-5 mr-3 cursor-pointer'}
              onClick={bookmarkMagazine}
            />
            <span>{magazineBookmarked ? 'Bookmark Added' : 'Add to bookmark'}</span>
          </div>
        </div>
      </div>
      <div className={'w-4/12'}>
        <img
          src={magazine.thumbnail}
          className={'rounded-lg min-h-full'}
        />
      </div>
    </div>
  );
};

const MagazinesList = props => {
  const {
    token,
    magazines,
  } = props;

  return (
    <div className='space-y-6 lg:col-start-1 lg:col-span-2 bg-white shadow sm:rounded-lg p-4 pt-3'>
      <div className={''}>
        {magazines?.map(magazine => (
          <MagazineSingle
            key={magazine.id}
            token={token}
            magazine={magazine}
          />
        ))}
      </div>
    </div>
  );
};

export default MagazinesList;