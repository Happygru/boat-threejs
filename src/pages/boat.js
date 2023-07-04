import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Boat() {
  useEffect(() => {
    const canvas = document.querySelector("#canvas");
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    const fov = 150;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 20;
    camera.position.y = 100;
    camera.position.x = 40;

    const scene = new THREE.Scene();

    {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      const mainLight = new THREE.DirectionalLight(0xffffff, 1);
      mainLight.position.set(1, 1, 1);
      scene.add(ambientLight, mainLight);
    }

    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeInstance(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);

      cube.position.x = x;

      return cube;
    }

    const loader = new GLTFLoader();
    loader.load("boat.gltf", (gltf) => {
      scene.add(gltf.scene);
      // Optional: You can perform additional operations on the loaded model here
    });
    const cubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2),
    ];
    const controls = new OrbitControls(camera, renderer.domElement);

    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set(-2, 0.4, -0.9);

    controls.update();
    renderer.setPixelRatio(1);
    function render(time) {
      time *= 0.001;

      cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * 0.1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
      });
      renderer.setClearColor("rgb(255, 0, 0)", 0);
      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }, []);

  return (
    <canvas
      id="canvas"
      style={{ width: "100%", height: "calc(100vh + 100vw)/2" }}
    />
  );
}
