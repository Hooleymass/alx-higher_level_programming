import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";

async function getPosts() {
  const query = `
  {
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

  return data.posts.nodes;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = new Date(dateString).toLocaleDateString(
    undefined,
    options
  );
  return formattedDate;
}

export default async function PostList() {
  const posts = await getPosts();

  return (
    <Suspense fallback={<Loading />}>
      <div className="card">
        {posts.map((post) => (
          <div className="card-res" key={post.uri}>
            <div className="card-start">
              <Link href={`/post/${post.uri}`}>
                <div className="image-container">
                {post.featuredImage ? (
                  <Image
                    className="thumb"
                    src={post.featuredImage.node.sourceUrl}
                    alt={post.featuredImage.node.altText}
                    width={500}
                    height={300}
                  />
                ) : (
                  <div className="placeholder-image">
                    <Image
                      src={`https://placehold.co/600x400/000000/000FFF/png?text=kenyaplus`}
                      alt="Placeholder For Kenyaplus"
                      width={600}
                      height={400}
                    />
                  </div>
                )}
                </div>
              </Link>
              <div className="card-content">
                <div className="category-tags">
                  {post.categories.nodes.length > 0 && (
                    <div className="categories">
                      {" "}
                      {post.categories.nodes.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/category/${category.slug}`}
                        >
                          <span className="category" key={category.slug}>
                            {category.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {post.tags.nodes.length > 0 && (
                    <div className="tags">
                      {" "}
                      {post.tags.nodes.map((tag) => (
                        <span className="tag" key={tag.slug}>
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="card-info">
                  <p className="hover:underline">{post.author.node.name}</p>
                  <p className="hover:underline">{formatDate(post.date)}</p>
                  <p className="hover:underline">
                    {post.commentCount === null
                      ? "0 comments"
                      : post.commentCount === 1
                      ? "1 comment"
                      : `${post.commentCount} comments`}
                  </p>
                </div>
                <Link href={`/post${post.uri}`}>
                  <h3 className="hover:underline">
                    {post.title.length > 45
                      ? post.title.slice(0, 45) + "..."
                      : post.title}
                  </h3>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.slice(0, 200) + "...",
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
