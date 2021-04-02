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
  function isChecked(code) {
    return selected?.includes(`{code}`) ? "checked" : "";

  }

  console.log(stops);
  const router = useRouter();
  console.log(router.query);
  const selected = router?.query?.stops?.split(",") ?? [];
  console.log(selected);
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
          {stops?.data?.bikeRentalStations?.map((stop, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`stop${index}`}
                  name={`stop${index}`}
                  checked={isChecked(index, selected)}
                />
                <label htmlFor={`stop${index}`}>
                  {stop.name} {index}
                </label>
              </div>
            );
          })}
          <Link href="/customize">
            <a>Customize</a>
          </Link>
        </section>
      </main>

      <footer>Timo Koola was here</footer>
    </>
  );
}
