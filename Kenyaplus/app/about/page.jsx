import React from "react";

const getAbout = async () => {
  const query = `
    query GetCategoryByUri($uri: ID = "/about") {
      page(id: $uri, idType: URI) {
        title
        content
      }
    }
  `;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // ... any other headers you need to include (like authentication tokens)
      },
      cache: "no-store",
    }
  );

  const { data } = await res.json();

  return data.page;
};

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export default async function About() {
  const about = await getAbout();

  return (
    <main>
      <h3>{about.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: about.content }} />
    </main>
  );
};

