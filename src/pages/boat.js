import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Boat = () => {
  useEffect(() => {
    let canvas = document.querySelector("#canvas");
    let scene = new THREE.Scene();
    let camera;
    let renderer;
    camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.25,
      20
    );
    camera.position.set(-5.8, 2, -6);
    const light1 = new THREE.PointLight({ color: "#800080" }, 15);
    light1.position.set(0, 3, 2);
    light1.castShadow = true;
    light1.shadow.mapSize.width = 1024;
    light1.shadow.mapSize.height = 768;
    light1.shadow.radius = 5;
    scene.add(light1);

    const light2 = new THREE.PointLight({ color: "#800080" }, 10);
    light2.position.set(-10, 3, 2);
    light2.castShadow = true;
    light2.shadow.mapSize.width = 1024;
    light2.shadow.mapSize.height = 768;
    light2.shadow.radius = 5;
    scene.add(light2);

    let loader = new GLTFLoader();
    loader.load("boat.gltf", function (gltf) {
      scene.add(gltf.scene);
      render();
    });

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
      alpha: true,
    });
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping; //added contrast for filmic look
    renderer.toneMappingExposure = 1;
    renderer.setClearColor(0x000000, 0);
    renderer.outputEncoding = THREE.sRGBEncoding; //extended color space for the hdr

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", render); // use if there is no animation loop to render after any changes
    controls.minDistance = 2;
    controls.maxDistance = 10;
    controls.target.set(0, 0, -0.2);
    controls.update();

    window.addEventListener("resize", onWindowResize);
    render(); //the update loop
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

      render();
    }

    function render() {
      renderer.render(scene, camera);
    }
  }, []);

  return <canvas id="canvas" style={{ width: "100%", height: "100vh" }} />;
};

export default Boat;