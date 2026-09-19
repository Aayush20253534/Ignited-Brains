export function MissionVision() {
  return (
    <section className="mission-vision">
      <div className="container mission-vision-inner">
        <article className="mv-card mv-mission">
          <p className="section-eyebrow mv-eyebrow">Our Mission</p>
          <h3 className="mv-title">
            To bring hands-on, future-ready labs into every school and ignite curiosity, creativity and innovation in every student.
          </h3>
          <span className="mv-divider" />
          <div className="mv-art mv-mission-art">
            <span className="mv-astronaut" />
            <span className="mv-earth" />
            <span className="mv-handwriting">"Education that <b>ignites</b> the future."</span>
          </div>
        </article>
        <article className="mv-card mv-vision">
          <p className="section-eyebrow mv-eyebrow">Our Vision</p>
          <h3 className="mv-title">
            A generation of Indian students who don't just learn science but create with it, and build the nation's future.
          </h3>
          <span className="mv-divider" />
          <div className="mv-art mv-vision-art">
            <span className="mv-sunset-art" />
            <span className="mv-student-art" />
            <span className="mv-handwriting mv-handwriting-2">India's <b>Innovators</b><small>Start Here</small></span>
          </div>
        </article>
      </div>
    </section>
  );
}
