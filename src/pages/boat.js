import MSelect from "./MSelect";

const Boat = () => {
  return (
    <model-viewer
      id="modelViewer"
      src="boat.gltf"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      poster="poster.webp"
      enviroment-image="royal_esplanade_1k.hdr"
      shadow-intensity="0.67"
      shadow-softness="0.81"
      camera-orbit="227.7deg 74.51deg 14.64m"
      field-of-view="20.46deg"
    >
      <MSelect label="YAMAHA F300XCB" style={{ right: "28%" }} />
      <MSelect
        label="SIMRAD HAL020+"
        className="Hotspot"
        slot="hotspot-2"
        data-position="-0.007 1.043 1.349"
        data-normal="0 1 0"
        data-visibility-attribute="visible"
        dir="row-reverse"
      />
      <MSelect
        label="BOW COMPARTMENTS"
        className="Hotspot"
        slot="hotspot-1"
        data-position="0.576 -0.875 -0.962"
        data-normal="0 1 0"
        data-visibility-attribute="visible"
        dir="row-reverse"
      />
      <MSelect
        label="Sleipner bowthruster"
        className="Hotspot"
        slot="hotspot-3"
        data-position="0.013 -1.308 3.564"
        data-normal="0.151 -0.155 0.976"
        data-visibility-attribute="visible"
      />
    </model-viewer>
  );
};

export default Boat;
