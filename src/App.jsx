import p5 from "p5";
import { useEffect, useRef, useState } from "react";

function App() {
  const [scene, setScene] = useState("sphere");
  const previewRef = useRef(null);

  useEffect(() => {
    let fps = 25;
    let texture;

    const sketch = (p) => {
      // p.preload = () => {
      //   texture = p.loadImage("/a.gif");
      // };

      p.setup = () => {
        p.createCanvas(350, 350, p.WEBGL);
        p.frameRate(fps);
        // p.noStroke();
        // p.texture(texture);
        // p.normalMaterial();
      };

      p.draw = () => {
        p.orbitControl();
        p.background(20);

        switch (scene) {
          case "sphere":
            console.log("sphere");
            p.sphere(150);
            break;
          case "cube":
            p.box(150);
            break;
          case "ring":
            p.torus(100, 40, 45);
            break;
        }
      };
    };

    const p5Sketch = new p5(sketch, previewRef.current);
    return () => {
      p5Sketch.remove();
    };
  }, [scene]);

  return <div ref={previewRef}></div>;
}

export default App;
