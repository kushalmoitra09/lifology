import React, { useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import cookies from 'next-cookies';
import Constants from '/helpers/Constants';
import { queryGraph } from '/helpers/GraphQLCaller';
import { SchemeGetProfile } from '/helpers/GraphQLSchemes';
import NavigationLayout from '/components/NavigationLayout';
import HeaderLayout from '/components/HeaderLayout';
import MetaLayout from '/components/MetaLayout';
import Breadcrumbs from '/components/Breadcrumbs';
import { SchemeGetScholarships } from '/helpers/GraphQLSchemes';
import { SchemeGetScholarshipDetails } from '../../../../helpers/GraphQLSchemes';

const pages = [
  {
    name: 'Career Explorer', href: '/career_explorer/', current: false
  },
  {
    name: 'Scholarship', href: '/career_explorer/scholarship', current: false,
  },
  {
    name: 'Scholarship Details', href: '#', current: true,
  },
];

export default function ScholarshipDetails({ profile, scholarship }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getFormattedLocation = (location) =>
    location.indexOf(',') === -1 ? location : `${location.split(',')[0]}, ${location.split(',')[1]}`;

  const getSecondarySection = () => (
    <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
      <div className={'bg-white shadow rounded-md p-5 mb-5'}>
        <div className={'flex items-center py-4'}>
          <img src={'/img/award-badge.svg'} className={'h-14'} />
          <div className={'pl-4'}>
            <div className={'text-sm font-medium'}>Awards</div>
            <div className={'text-lg font-bold'}>{scholarship.no_awards}</div>
          </div>
        </div>
        <div className={'flex items-center py-4'}>
          <img src={'/img/money-badge.svg'} className={'h-14'} />
          <div className={'pl-4'}>
            <div className={'text-sm font-medium'}>Scholarship Amount</div>
            <div className={'text-lg font-bold'}>{`${scholarship.amount ? `$${scholarship.amount}` : 'N/A'}`}</div>
          </div>
        </div>
        <div className={'flex items-center py-4'}>
          <img src={'/img/calendar-badge.svg'} className={'h-14'} />
          <div className={'pl-4'}>
            <div className={'text-sm font-medium'}>Deadline</div>
            <div className={'text-lg font-bold'}>{scholarship.deadline}</div>
          </div>
        </div>
      </div>
      <div className={'bg-white shadow rounded-md p-5'}>
        <div className={'mb-4'}>
          <div className={'font-bold mb-2'}>Career Fields</div>
          <div className={'flex flex-wrap'}>
            {scholarship.studying_subjects.split(',').map(subject => (
              <div className={'text-sm border-2 border-gray-200 rounded-full max-w-max py-1.5 px-5 mr-4 mb-3'}>{subject}</div>
            ))}
          </div>
        </div>
        {/* <div className={'mb-6'}>
          <div className={'font-bold mb-2'}>What You Will Get</div>
          <div className={'text-sm'}>
            Lorem Ipsum Dolor Sit Amet, Consectetur dipisc Lit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua.
          </div>
        </div> */}
        <div className={'mb-6'}>
          <div className={'font-bold mb-2'}>Nationalities</div>
          <div className={'text-sm'}>{scholarship.studying_in}</div>
        </div>
        <div className={''}>
          <div className={'font-bold mb-2'}>Applicable In</div>
          <div className={'text-sm'}>{scholarship.from_countries}</div>
        </div>
      </div>
    </section>
  );
  
  const getDetailsSection = () => (
    <div className="space-y-6 lg:col-start-1 lg:col-span-2">
      <section aria-labelledby="applicant-information-title" >
        <div className="bg-white shadow sm:rounded-lg px-6 py-4">
          <div className="sm:flex sm:py-4">
            <div style={{ width: '250px', maxWidth: '250px' }} className={'w-full'}>
              <img style={{ width: '250px', maxWidth: '250px' }} className={'rounded-md shadow'} src={scholarship?.image} />
            </div>
            <div className={'sm:px-6 sm:my-0 mt-5 mb-8'}>
              <div className={'bg-gray-100 max-w-min px-6 py-2 rounded-full text-sm mb-2'}>Scholarship</div>
              <div className={'font-bold text-lg'}>{scholarship?.name}</div>
              <div className={'flex items-center mt-auto pt-2'}>
                <img src={'/img/map-marker.svg'} className={'h-5'} />
                <div className={'text-sm ml-1'}>{getFormattedLocation(scholarship.studying_in)}</div>
              </div>
            </div>
          </div>
          <div className={'mb-5 mt-2'}>
            <div className={'font-bold mb-1'}>Description</div>
            <div className="mt-2 mb-4 text-sm text-justify flex-shrink-0 sm:mb-0 sm:mr-4">
              {scholarship?.description}
            </div>
          </div>
          <div className={'pb-4'}>
            <div className={'font-bold mb-1'}>Eligibility Criteria</div>
            <div className="mt-2 mb-4 text-sm text-justify flex-shrink-0 sm:mb-0 sm:mr-4">
              {scholarship?.other_criteria}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  
  return (
    <div>
      <MetaLayout title={'Scholarship'} description={'scholarship details'} />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">
        <NavigationLayout index="4" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <div className="flex-1 overflow-auto focus:outline-none">
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title={'Scholarship'} />
          <main className="flex-1 relative z-0 overflow-y-auto">
            <Breadcrumbs pages={pages} />
            <div className="m-4">
              <div className="max-w-6xl mx-auto mt-4">
                <div className="flex flex-col mt-2">
                  <div className="max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    {getDetailsSection()}
                    {getSecondarySection()}
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
  const { id } = context.query;

  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  const scholarshipClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/career",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const scholarship = await queryGraph(scholarshipClient, { scholarship_id: parseInt(id) }, SchemeGetScholarshipDetails)
    .then((res) => {
      return res.scholarshipDetails;
    }).catch((networkErr) => {
      console.log(networkErr)
      return { count: 0, scholarships: [] };
    })
    
  const profileClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/user",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const profile = await queryGraph(profileClient, {}, SchemeGetProfile)
    .then((res) => {
      return res.profile
    }).catch((networkErr) => {
      return {};
    });

  return {
    props: {
      token,
      scholarship,
      profile,
    }
  }
}
