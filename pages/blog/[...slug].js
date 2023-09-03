import PageTitle from '@/components/PageTitle'
import { BuilderComponent, BuilderContent, builder } from '@builder.io/react'
import '../../builder.config'

builder.init('060eea99331f4244803d550522589538')

export async function getStaticPaths() {
  const posts = await builder.getAll('blog-post', {
    fields: 'data.slug',
  })
  return {
    paths: posts.map(({ data }) => ({
      params: {
        slug: data.slug?.split('/') || '',
      },
    })),
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const post = await builder
    .get('blog-post', {
      query: {
        slug: params.slug.join('/'),
      },
    })
    .promise()

  return { props: { post: post || null } }
}

export default function Blog({ post }) {
  // TODO: add your own 404 page/handling like described
  // here: https://www.builder.io/c/docs/integrating-builder-pages
  return <BuilderComponent model="blog-post" content={post} />
}
