import { BlogPosts } from 'app/components/posts'
import { ExperienceList } from './components/resume'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
       sanjay
      </h1>
      <p className="mb-4">
        {`I’m a software engineer with degrees in Math and Computer Science
          from UT Austin. I’ve been in the industry for four years now and
          always love chatting about tech, cool articles, or new
          opportunities. Feel free to reach out!`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <div>
        <ExperienceList />
      </div>
    </section>
  )
}
