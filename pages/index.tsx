import Head from 'next/head'
import Cookies from 'js-cookie'

import type { GetServerSideProps, NextPage } from 'next'

import styles from '../styles/Home.module.css'
import { useLayoutEffect, useState } from 'react'

type Props = {
  cookieValueServer: string
}

const Home: NextPage<Props> = ({ cookieValueServer }) => {
  const [cookieValueClient, setCookieValueClient] = useState('')

  useLayoutEffect(() => {
    const cookieVal = Cookies.get('hello')
    console.log('useEffect cookie value: ', cookieVal)
    setCookieValueClient(cookieVal ?? 'fallback')
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <p style={{ color: 'gray' }}>
          Demo: when cookie is cleared, getServerSideProps will return fallback
          once
        </p>

        <p>Cookie value from getServerSideProps: {cookieValueServer}</p>

        <p>Cookie value in client-side: {cookieValueClient}</p>

        <button
          type="button"
          onClick={() => {
            Cookies.remove('hello')
          }}
        >
          Clear cookie
        </button>

        <button
          type="button"
          onClick={() => {
            window.location.reload()
          }}
        >
          Reload
        </button>
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const hello = ctx.req.cookies['hello']

  return {
    props: {
      cookieValueServer: hello ?? 'fallback',
    },
  }
}
