import { useEffect, useState } from 'react'
import { queryGraph } from '../../../helpers/GraphQLCaller'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { SchemeGetProfile, SchemeViewAllMagazines, SchemeGetMagazinesCategories, SchemeGetTrendingMagazines, SchemeGetMagazineBanner } from '../../../helpers/GraphQLSchemes'
import Constants from '../../../helpers/Constants'
import useLocalStorage from '../../../helpers/useLocalStorage'
import { useRouter } from 'next/router'
import NavigationLayout from '../../../components/NavigationLayout'
import HeaderLayout from '../../../components/HeaderLayout'
import MetaLayout from '../../../components/MetaLayout'
import Breadcrumbs from '../../../components/Breadcrumbs'
import cookies from 'next-cookies'
import Banner from './Banner'
import TrendingMagazines from './TrendingMagazines'
import MagazinesList from './MagazinesList'
import DiscoverTopics from './DiscoverTopics'

export default function Magazine({
  profile,
  magazines,
  magazineCategories,
  token,
  selectedCategory,
  searchKeyword,
  magazineBanner,
  trendingMagazines,
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [authToken, setAuthToken] = useLocalStorage("authToken", "");

  const pages = [
    {
      name: 'Career Explorer', href: {
        pathname: '/career_explorer/',
      }, current: false
    },
    {
      name: 'Magazines', href: '#', current: true
    },
  ];

  const handleFilterSubmit = (query) => {
    router.replace(
      {
        pathname: '/career_explorer/magazine',
        query,
      }
    )
  };

  return (
    <>
      <MetaLayout title="Magazine" description="Magazine" />
      <div className="h-screen flex overflow-hidden bg-gray-100 font-roboto">

        <NavigationLayout index="0" setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />

        <div className="flex-1 overflow-auto focus:outline-none" >
          <HeaderLayout setSidebarOpen={setSidebarOpen} profile={profile} title="Magazines" />

          <main className="flex-1 relative z-0 overflow-y-auto">


            <Breadcrumbs pages={pages} />
            <div className="m-4">

              <div className="max-w-6xl mx-auto mt-4">
                <div className="flex flex-col mt-2">
                  <Banner details={magazineBanner} />

                  <TrendingMagazines
                    trendingMagazines={trendingMagazines}
                  />
                  <div className="mt-4 max-w-3xl mx-auto grid grid-cols-1 gap-4 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
                    <MagazinesList
                      token={token}
                      magazines={magazines}
                    />

                    <DiscoverTopics
                      categories={magazineCategories}
                      onFilterSubmit={handleFilterSubmit}
                      selectedCategory={selectedCategory}
                      _searchKeyword={searchKeyword}
                    />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div >
    </>
  )
}

export async function getServerSideProps(context) {
  const { category , search_keyword = '' } = context.query;
  const { token } = cookies(context)
  if (token == null || token == '') {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    }
  }

  console.log(search_keyword)

  const profileClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/user",
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const magazineClient = new ApolloClient({
    uri: Constants.baseUrl + "/api/skills",
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
      // console.log(networkErr);
    });

  const magazines = await queryGraph(
    magazineClient,
    { category_id: parseInt(category) || null,
      search_keyword: search_keyword || '',
    },
    SchemeViewAllMagazines,
  )
    .then((res) => {
      return res.magazinesViewAll;
    }).catch((networkErr) => {
      console.log(networkErr);
      return [];
    });

  const trendingMagazines = await queryGraph(magazineClient, {}, SchemeGetTrendingMagazines)
    .then((res) => {
      return res.trendingMagazines;
    }).catch((networkErr) => {
      console.log(networkErr);
      return [];
    });
    
  const magazineCategories = await queryGraph(magazineClient, {}, SchemeGetMagazinesCategories)
    .then((res) => {
      return res.magazineCategory;
    }).catch((networkErr) => {
      return {};
      // console.log(networkErr);
    });

  const [magazineBanner] = await queryGraph(magazineClient, {}, SchemeGetMagazineBanner)
    .then((res) => {
      return res.magazineBanners;
    }).catch((networkErr) => {
      return {};
      // console.log(networkErr);
    });
    
  return {
    props: {
      profile,
      magazines,
      trendingMagazines,
      magazineCategories,
      token,
      magazineBanner,
      selectedCategory: parseInt(category) || null,
      searchKeyword: search_keyword,
    }
  }
}


