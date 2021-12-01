import Link from 'next/link'

export default function RecentItems() {
  return (
    <>
      <div className="MainContentInnerdiv mb-2 orderHistory d-flex justify-content-between">
        <h1>
          View Some Products First. <Link href="/">Go to Home</Link>
        </h1>
      </div>
    </>
  )
}
