import type { Metadata } from "next";
import { projects } from "../data/projects";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description: "Explore ScaleWeb's website and product work for Civic Pulse AI, HYDRAA Drop, VCAP Physiotherapy and AfterHours.",
};

export default function Portfolio() {
  return <main className="portfolio-page" id="top">
    <a className="skip-link" href="#portfolio-projects">Skip to projects</a>
    <header className="portfolio-nav shell">
      <a className="wordmark" href="/" aria-label="ScaleWeb Agency home"><strong>SCALEWEB</strong><span>AGENCY</span></a>
      <a href="/">Back to home <span aria-hidden="true">↗</span></a>
    </header>
    <section className="portfolio-intro" aria-labelledby="portfolio-title">
      <div className="reference-heading"><p className="reference-eyebrow">Our portfolio</p><h1 id="portfolio-title">Ideas, <em>made real.</em></h1><p>A closer look at the websites and digital experiences we’ve designed and built.</p></div>
    </section>
    <div className="portfolio-grid shell" id="portfolio-projects">
      {projects.map((project) => <article className="portfolio-project" key={project.slug} aria-labelledby={`project-${project.slug}`}>
        <a className="portfolio-preview" href={`/work/${project.slug}`} aria-label={`Explore ${project.name} case study`}>
          <picture><source media="(max-width: 640px)" srcSet={project.mobile} /><img src={project.desktop} alt={`${project.name} website design`} width={1200} height={900} loading={project.number === "01" ? "eager" : "lazy"} /></picture><span aria-hidden="true">↗</span>
        </a>
        <div className="portfolio-project-copy"><p>{project.category}</p><h2 id={`project-${project.slug}`}>{project.name}</h2><p>{project.description}</p><div className="portfolio-project-links"><a href={`/work/${project.slug}`}>Explore project <span aria-hidden="true">↗</span></a><a href={project.live} target="_blank" rel="noreferrer">Live website <span aria-hidden="true">↗</span></a></div></div>
      </article>)}
    </div>
    <footer className="portfolio-closing shell"><p>Have something in mind?</p><a className="portfolio-link" href="/#contact">Let’s build it <span aria-hidden="true">↗</span></a></footer>
  </main>;
}
