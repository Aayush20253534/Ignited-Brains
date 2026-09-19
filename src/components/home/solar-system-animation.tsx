import type { CSSProperties, ReactNode } from "react";

type OrbitalBodyProps = {
  orbit: string;
  body: string;
  duration: string;
  delay?: string;
  children?: ReactNode;
  loadDelay?: string;
};

function OrbitalBody({ orbit, body, duration, delay = "0s", children, loadDelay = "0s" }: OrbitalBodyProps) {
  return (
    <span
      className={`orbital-path ${orbit}`}
      style={{ "--orbital-duration": duration, "--orbital-delay": delay, "--load-delay": loadDelay } as CSSProperties}
    >
      <i className={`orbital-body ${body}`}>{children}</i>
    </span>
  );
}

/**
 * Attractive CSS solar system animation that kicks in on page load:
 * layered orbits, glowing sun, planets with a moon, Saturn-style ringed
 * planet, comet sweep, twinkling star field, and staggered load-in reveal.
 */
export function SolarSystemAnimation() {
  return (
    <div className="solar-system" aria-hidden="true">
      <span className="solar-stars solar-stars-one" />
      <span className="solar-stars solar-stars-two" />
      <span className="solar-stars solar-stars-three" />

      <span className="solar-glow" />
      <span className="solar-sun"><i /></span>

      <span className="solar-orbit orbit-one">
        <span className="solar-planet planet-mercury" style={{ "--load-delay": ".35s" } as CSSProperties} />
      </span>
      <span className="solar-orbit orbit-two">
        <span className="solar-planet planet-venus" style={{ "--load-delay": ".5s" } as CSSProperties} />
      </span>
      <span className="solar-orbit orbit-three">
        <span className="solar-planet planet-earth" style={{ "--load-delay": ".65s" } as CSSProperties}>
          <i className="planet-moon" />
        </span>
      </span>
      <span className="solar-orbit orbit-four">
        <span className="solar-planet planet-mars" style={{ "--load-delay": ".8s" } as CSSProperties} />
      </span>
      <span className="solar-orbit orbit-five">
        <span className="solar-planet planet-jupiter" style={{ "--load-delay": ".95s" } as CSSProperties} />
      </span>
      <span className="solar-orbit orbit-six">
        <span className="solar-planet planet-saturn" style={{ "--load-delay": "1.1s" } as CSSProperties}>
          <i className="saturn-ring" />
        </span>
      </span>

      <span className="solar-comet"><i /></span>

      <span className="orbital-space" />
      <span className="orbital-halo halo-one" />
      <span className="orbital-halo halo-two" />
      <span className="orbital-glass glass-back" />
      <span className="orbital-plane">
        <span className="orbital-ring ring-one" />
        <span className="orbital-ring ring-two" />
        <span className="orbital-ring ring-three" />
        <span className="orbital-ring ring-four" />
        <OrbitalBody orbit="path-one" body="body-copper" duration="8s" loadDelay="1.25s" />
        <OrbitalBody orbit="path-two" body="body-steel" duration="13s" delay="-4s" loadDelay="1.4s" />
        <OrbitalBody orbit="path-three" body="body-azure" duration="18s" delay="-9s" loadDelay="1.55s">
          <i className="orbital-moon" />
        </OrbitalBody>
        <OrbitalBody orbit="path-four" body="body-gold" duration="27s" delay="-14s" loadDelay="1.7s" />
      </span>
      <span className="orbital-core"><i /></span>
      <span className="orbital-glass glass-front" />
      <span className="orbital-reflection reflection-one" />
      <span className="orbital-reflection reflection-two" />

      <span className="solar-label"><b>IGNITED BRAINS</b><small>SPACE · STEM · AI · ROBOTICS</small></span>
    </div>
  );
}
