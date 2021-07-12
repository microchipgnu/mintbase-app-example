import Document, { Head, Html, Main, NextScript } from 'next/document'
import styled from 'styled-components'

const Body = styled.body`
  background-color: ${({ theme }) => theme.DARK1};
  margin: 0 auto;
  padding: 0;
`

const MainH = styled(Html)`
  background-color: ${({ theme }) => theme.DARK};
  margin: 0 auto;
`

export default class MyDocument extends Document {
  render() {
    return (
      <MainH>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Lato:100,300&display=swap"
            rel="stylesheet"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@100;200&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Body>
          <Main />
          <NextScript />
        </Body>
      </MainH>
    )
  }
}
