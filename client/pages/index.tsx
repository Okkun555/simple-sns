import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Simple SNS</title>
        <meta name="description" content="Simple SNS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <h1 className="text-3xl font-bold underline">Hello World</h1>
    </>
  );
}
