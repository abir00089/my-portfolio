import { useState } from "react";
import "./styles/WhatIDo.css";

type WhatItem = {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
};

const whatIDoItems: WhatItem[] = [
  {
    title: "WEB DEVELOPMENT",
    subtitle: "Building Frontends & UIs",
    description:
      "Crafting performant and responsive interfaces. Building real-world web development projects using modern essentials.",
    tags: ["HTML5", "CSS3", "JavaScript", "Basic UI/UX"],
  },
  {
    title: "CORE & AI",
    subtitle: "Programming & Problem Solving",
    description:
      "Strong foundation in Data Structures, Algorithms, and logical problem-solving. Currently exploring Artificial Intelligence and Machine Learning fundamentals.",
    tags: ["C", "C++", "Python", "DSA", "Problem Solving", "AI & ML"],
  },
];

const WhatIDo = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <section className="whatIDO" id="what-i-do">
      <div className="what-box">
        <h2>
          WH<span className="hat-h2">AT</span>
          <br />
          I <span className="do-h2">DO</span>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          {whatIDoItems.map((item, index) => (
            <article
              key={item.title}
              className={`what-content what-noTouch ${activeIndex === index ? "what-content-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              onMouseMove={handleMouseMove}
            >
              <div className="what-hover"></div>
              <div className="what-corner"></div>
              <div className="what-content-in">
                <h4>{item.subtitle}</h4>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <h5>Skillset & tools</h5>
                <div className="what-content-flex">
                  {item.tags.map((tag) => (
                    <span key={tag} className="what-tags">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="what-arrow"></span>
            </article>
          ))}
          <div className="what-border1">
            <svg viewBox="0 0 450 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="448" height="498" stroke="white" strokeOpacity="0.2" />
            </svg>
          </div>
          <div className="what-border2">
            <svg viewBox="0 0 450 500" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1" y="1" width="448" height="498" stroke="white" strokeOpacity="0.2" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;