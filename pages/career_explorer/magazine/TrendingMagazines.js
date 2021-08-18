import React from 'react';
import { formatDate } from '/helpers/utils';
import Link from 'next/link';

const TrendingMagazines = props => {
  const { trendingMagazines } = props;

  if (!trendingMagazines) return null;
  
  return (
    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg mt-4 bg-white p-4">
      <div className="sm:flex h-full w-full">
        <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-8  " >
          <div className="self-center font-medium text-base w-full">
            <h2 className="text-xl ">Trending Magazines</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
        {trendingMagazines.map((magazine, i) => (
          <div className="px-2 bg-white overflow-hidden flex items-center relative" key={`${magazine.data}` + i}>
            <img className="m-2 rounded-2xl w-20 h-20" src={magazine.thumbnail} />
            <div className="h-20 flex flex-col pl-2">
              <div className="text-sm">{magazine.subheading}</div>
              <Link href={`/career_explorer/magazine/${magazine.id}`}>
                <a>
                  <div className="font-bold">{magazine.title}</div>
                </a>
              </Link>
              <div className="mt-auto text-sm text-gray-400">
                {!!magazine?.created_at && formatDate(new Date(magazine.created_at))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};

export default TrendingMagazines;