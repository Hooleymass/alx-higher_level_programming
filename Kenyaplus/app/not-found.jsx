import Link from 'next/link'
 
export default function NotFound() {
  return (
    <main>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="hover:underline text-blue-400" href="/">Return Home</Link>
    </main>
  )
}