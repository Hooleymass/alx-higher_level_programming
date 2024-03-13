import PostCard from "@/app/components/PostCard";

async function getPosts(slug) {
  const query = `
    query GetPostsBySlug($slug: ID!) {
      user(id: $slug, idType: SLUG) {
        uri
        name
        posts(first: 10) {
          nodes {
            title
            date
            commentCount
            excerpt
            content
            uri
            author {
              node {
                name
              }
            }
            categories {
              nodes {
                name
                slug
                uri
              }
            }
            featuredImage {
              node {
                altText
                sourceUrl(size: THUMBNAIL)
                srcSet(size: THUMBNAIL)
                title
              }
            }
            tags {
              nodes {
                name
                id
                uri
                slug
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    slug,
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

  if (responseBody && responseBody.data && responseBody.data.user) {
    return responseBody.data.user.posts.nodes;
  } else {
    throw new Error("Failed to fetch the posts");
  }
}

export default async function AuthorDetails({ params }) {
  const author = await getPosts(params.slug);

  return <PostCard posts={author} />;
}
