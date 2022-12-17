import React from 'react'
import { GetServerSideProps, NextPage } from 'next';
import { Provider } from 'next-auth/providers';
import { getProviders, getSession, signIn } from 'next-auth/react';
import Head from 'next/head';
import Image from 'next/image';
import logoGoogle from '../public/assets/logo-google.svg'
import logoGitHub from '../public/assets/logo-github.svg'

type LoginProps = {
  csrfToken: any,
  providers: Provider[],
}

const Login: NextPage<LoginProps> = ({ providers }) => {
  return (
    <>
      <Head>
        <title>Kanban | Login Page</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className='flex flex-row w-screen h-screen'>
        <div className='w-2/4 bg-purple h-full flex justify-center items-center text-center'>
          <div className='p-2 w-[320px] border-y-2 border-white'>
            <h1 className='text-white text-hXL font-bold'>Welcome to your favorite Kanban !</h1>
          </div>
        </div>
        <div className='w-2/4 bg-black h-full flex justify-center items-center'>
          <div className='h-[96px] flex flex-col justify-between items-center  '>
            <h1 className='text-white text-hXL tracking-S'>LOGIN</h1>
            <div className='flex flex-row justify-between w-[420px]'>
              {
                Object.values(providers).map((provider) => {
                  return (
                    <div key={provider.name}>
                      <button className='flex flex-row justify-center items-center w-[200px] h-[48px] bg-white p-2 rounded-[24px] text-hM text-purple' onClick={() => signIn(provider.id)}>
                        Sign in with {provider.name}
                        {provider.name === 'Google' && <Image src={logoGoogle} alt='logo google' className='w-7 ml-2' />}
                        {provider.name === 'GitHub' && <Image src={logoGitHub} alt='logo Github' className='w-7 ml-2' />}
                      </button>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  else return {
    props: {
      providers: await getProviders(),
    },
  }
}

export default Login;