// Components
import GSearchSchemaScript from '../components/app/scripts/GSearchSchemaScript'
import Head from 'next/head'
// import Navbar from '../components/navigation/Navbar'
// import Hero from '../components/sections/Hero'
// import Services from '../components/sections/Services'
// import WhatWeDo from '../components/sections/WhatWeDo'
import dynamic from 'next/dynamic'

const Sphere = dynamic(() => import('../components/animation/Sphere'), {
  ssr: false
})

/**
 * the base URL of the application
 */
const baseUrl = process.env.HOST

/**
 * The name of the organization
 */
const organization = 'emah'

/**
 * The desciption of the organization
 */
const description = 'Expert Marketing Associates & Hacks'

/**
 * The keyword list as string
 */
const keywords = String([
  'eamh',
  'marketing',
  'expert marketing',
  'marketing hacks',
  'marketing associates',
  'publicidad experta',
  'publicidad',
  'web development',
  'desarrollo web',
  'app development',
  'desarrollo de aplicaciones'
])

/**
 * The social media image URL
 */
const socialImageUrl = `${baseUrl}images/emah.jpg`

/**
 * The main page of the application
 * @returns HomePage component
 */
const HomePage = () => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>Expert Marketing Associates & Hacks – emah – Endless posibilities</title>
        <link rel='icon' href='/favicon.ico' />
        <link rel='canonical' href={baseUrl} />
        <link rel='apple-touch-icon' href='/images/apple-touch-icon.png' />
        <meta name='theme-color' content='#FF6700' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta property='og:locale' content='es_MX' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content={organization} />
        <meta property='og:description' content={description} />
        <meta property='og:url' content={baseUrl} />
        <meta property='og:site_name' content={organization} />
        <meta property='og:image' content={socialImageUrl} />
        <meta property='og:image:secure_url' content={socialImageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='640' />
        <meta property='og:image:type' content='image/jpeg' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={organization} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:site' content='@rehsok' />
        <meta name='twitter:image' content={socialImageUrl} />
      </Head>
      <Sphere />
      {/* <main>
        <Navbar />
        <Hero />
        <WhatWeDo />
        <Services />
      </main> */}
      <GSearchSchemaScript />
    </>
  )
}

export default HomePage
