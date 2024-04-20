

export const metadata = {
  title: 'Blogs List',
  description: 'Dủng để SEO nha',
}

// NOI DUNG GỐC ĐỂ BAO TẤT CẢ PAGE TRONG THƯ MỤC 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {children}
    </>
  )
}