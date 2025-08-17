import { BlogPosts } from "app/components/posts";
import { ExperienceList } from "./components/resume";
import { ProjectList } from "./components/projects";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        sanjay <span className="font-light"> • chasing light </span>
      </h1>
      <p className="mb-4">
        {`I build fast and aggressively simple systems. My life lives at the intersection of mathematics, code, and design.
          I believe in first principles, deliberate craftsmanship, and ideas that endure. The rest is just implementation detail.
        `}
      </p>
      <div className="my-8">
        <h3 className="font-semibold my-2">Projects</h3>
        <ProjectList />
      </div>
      <div className="my-8">
        <h3 className="font-semibold my-2">Writing</h3>
        <BlogPosts />
      </div>
      <div className="my-8">
        <h3 className="font-semibold my-2">Experience</h3>
        <ExperienceList />
      </div>
    </section>
  );
}
