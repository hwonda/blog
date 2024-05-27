import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { sync } from 'glob'

const ROOT_PATH = '/public/posts'
const POST_PATH = path.join(process.cwd(), ROOT_PATH)

export const getPostPaths = (category?: string) => {
  const postPaths: string[] = sync(`${POST_PATH}/**/*.mdx`)
  return postPaths
}

export const getPostList = async () => {
  const postPaths = getPostPaths()

  const postList = await Promise.all(
    postPaths.map(async (postPath) => {
      const postContent = fs.readFileSync(postPath, 'utf-8')
      const { data } = matter(postContent)
      return data
    })
  )
  return postList
}
