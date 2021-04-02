import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export async function getStaticProps(context) {
  const res = await fetch(
    "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
       {
        bikeRentalStations {
          name
          stationId
          bikesAvailable
          capacity
          state
        }
      }`,
      }),
    }
  );
  const stops = await res.json();

  if (!stops) {
    return {
      notFound: true,
    };
  }

  return {
    props: { stops }, // will be passed to the page component as props
  };
}
// return <li key={index}>{stop.name}</li>;

export default function Home({ stops }) {
  const router = useRouter();
  console.log(router.query);
  console.log(stops);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Welcome to Bike Widget Helper</h1>
      </header>

      <main>
        <section>
          <Link href="/">
            <a>Change selection</a>
          </Link>
        </section>
      </main>

      <footer>Timo Koola was here</footer>
    </>
  );
}
