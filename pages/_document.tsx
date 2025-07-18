import { Html, Head, Main, NextScript } from 'next/document'
import { useRouter } from 'next/router'

export default function Document() {
  return (
    <Html lang='vi'>
      <Head>
        <meta
          name='zalo-platform-site-verification'
          content='E-QKUUJZ974-_A1Coy4iT2dteqB5WN4TCpCo'
        />
      </Head>
      <body>
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-KL3KDJW5'
            height='0'
            width='0'
            style={{
              display: 'none',
              visibility: 'hidden',
            }}></iframe>
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
