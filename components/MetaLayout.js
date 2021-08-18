import React from 'react'
import Head from 'next/head'
import NextNProgress from 'nextjs-progressbar'

const MetaLayout = ({ title, description, children }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <title>{title}</title>
                <meta name="description" content={description}></meta>

                {/* Twitter */}
                {/* <meta name="twitter:card" content="summary" key="twcard" />
            <meta name="twitter:creator" content="@lifologyofficial" key="twhandle" /> */}

                {/* Open Graph */}
                <meta property="og:url" content="https://www.ligology.com" key="ogurl" />
                <meta property="og:image" content="/img/logoBlue.png" key="ogimage" />
                <meta property="og:site_name" content="Lifology" key="ogsitename" />
                <meta property="og:title" content={title} key="ogtitle" />
                <meta property="og:description" content={description} key="ogdesc" />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"></link>

                {children}
            </Head>

            <NextNProgress />
        </>
    )
}

export default MetaLayout
