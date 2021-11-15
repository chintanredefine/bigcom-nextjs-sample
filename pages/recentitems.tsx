import { Container } from '@components/ui'
import ProfileHead from '@components/common/ProfileNavlink/profile_head'
import { Layout } from '@components/common'

export default function RecentItems() {
  return (
    // <Container>
    //   <div className="container">
    <div className="account account--fixed">
      <h2 className="page-heading">Recent Items</h2>
      <ProfileHead />
      <div className="flex-1 p-24 flex flex-col justify-center items-center">
        This is recent items page "We are working on this page " so come on this
        later on
      </div>
    </div>
    //   </div>
    // </Container>
  )
}

RecentItems.Layout = Layout
