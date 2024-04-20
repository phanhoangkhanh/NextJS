import BlogsPage from "./blogs/page"
import type { Metadata } from 'next'



export const metadata: Metadata = {
  title: 'META',
  description: 'Phục vu cho SEO nè ',
}

export default function Home({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    hí hí
      {children}
    </>
  )
}
