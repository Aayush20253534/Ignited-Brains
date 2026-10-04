import { ContinuousRow } from "@/components/home/continuous-row";
import { HomeIcon } from "@/components/home/home-icon";
import { learningCycle } from "@/data/home";

import styles from "./learning-system.module.css";

export function LearningSystem() {
  return (
    <section
      data-home-motion="learning-cycle"
      className={styles.section}
      aria-labelledby="learning-system-heading"
    >
      <div className={styles.earth} aria-hidden="true" />
      <div className={`container-wide ${styles.content}`}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Our Learning System</p>
          <h2 id="learning-system-heading" className={styles.heading}>
            From curiosity to creation.
          </h2>
          <p className={styles.subtitle}>The Ignited Brains Learning System</p>
        </div>

        <ContinuousRow
          label="Observe to Share learning cycle"
          variant="learning-cycle"
          duration={28}
          className={styles.row}
        >
          {learningCycle.map((item, index) => (
            <div key={item.step} className={`home-marquee-item ${styles.step}`}>
              <div className={styles.iconRing}>
                <HomeIcon name={item.icon} className={styles.icon} />
              </div>

              {index < learningCycle.length - 1 ? (
                <span className={`phone-cycle-connector ${styles.phoneConnector}`} aria-hidden="true" />
              ) : null}
              <span className={styles.connector} aria-hidden="true" />

              <div className={styles.stepCopy}>
                <span className={styles.number}>{item.step}</span>
                <h3 className={styles.stepTitle}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          ))}
        </ContinuousRow>
      </div>
    </section>
  );
}
