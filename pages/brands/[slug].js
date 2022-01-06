
import { useRouter } from 'next/router'
import { Layout } from '@components/common'
import BrandView from '@components/brand'

// export async function getStaticProps({ param }) {
//   console.log("param ", param);
//   return param
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: {slug: "1"}
//       },
//       {
//         params: {slug: "2"}
//       },
//       {
//         params: {slug: "3"}
//       },
//       {
//         params: {slug: "4"}
//       },
//     ],
//     fallback: false
//   }
// }

export default function Slug() {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <BrandView  />
  )
}

Slug.Layout = Layout
