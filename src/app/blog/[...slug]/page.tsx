import { notFound } from 'next/navigation'

export default function Docs({ params }: { params: { slug: string[] } }) {
  if (params.slug[0] !== 'docs') {
    return notFound()
  }

  return (
    <>
      <h1>Docs Page</h1>
      <h2>{JSON.stringify(params.slug, null, 2)}</h2>
    </>
  )
}
