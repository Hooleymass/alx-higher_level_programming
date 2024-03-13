import { Suspense } from "react";
import Loading from "../../loading";
import Image from "next/image";

async function getPost(uri) {
  const query = `
  query GetPostByUri($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
      date
      author {
        node {
          name
          avatar {
            url
          }
        }
      }
      seo {
        metaDesc
        title
        schema {
          raw
        }
        opengraphUrl
        opengraphType
        opengraphImage {
          mediaItemUrl
        }
        opengraphTitle
        opengraphSiteName
        opengraphDescription
      }
    }
  }
      `;

  const variables = {
    uri,
  };

  const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.post) {
    return responseBody.data.post;
  } else {
    throw new Error("Failed to fetch the post");
  }
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export default async function PostDetails({ params }) {
  const post = await getPost(params.uri);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <div className="post-top">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-info">
            <Image
              className="avatar"
              src={post.author.node.avatar.url}
              width={30}
              height={30}
              alt="Author Profile Pic"
            />
            <p>{post.author.node.name}</p>
            <p>{formatDate(post.date)}</p>
          </div>
        </div>
        <div className="post-card" key={post.uri}>
          <p dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </Suspense>
    </main>
  );
}
