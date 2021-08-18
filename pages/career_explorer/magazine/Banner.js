import React from 'react';
import { formatDate } from '/helpers/utils';
import Link from 'next/link';

const Banner = props => {
  const { details } = props;

  if (!details) return null;
  
  return (
    <div className='align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg bg-white p-4'>
      <div className='sm:flex h-full w-full'>
        <div className='mb-4 flex-shrink-0 sm:mb-0 sm:mr-8'>
          <img className='rounded-lg w-96' src={details.image} />
        </div>
        <div className='w-full flex flex-col'>
          {/* <div className='text-sm'>Zulie Rane in The Startup</div> */}
          <Link href={`/career_explorer/magazine/${details.magazine_id}`}>
            <a>
              <div className='font-bold text-xl'>{details.title}</div>
            </a>
          </Link>
          <div className='mt-2 text-sm' >{details.description}</div>
          <div className='mt-auto text-sm text-gray-400'>
            {!!details?.created_at && formatDate(new Date(details.created_at))}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Banner;