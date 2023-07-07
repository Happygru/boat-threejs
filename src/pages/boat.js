import MSelect from "./MSelect";
import { useEffect } from "react";

const Boat = ({ data, deleteConfiguration }) => {
  useEffect(() => {
    const modelViewerTexture1 = document.querySelector(
      "model-viewer#modelViewer"
    );
    modelViewerTexture1.addEventListener("load", () => {
      const material = modelViewerTexture1.model.materials;

      const createAndApplyTexture = async (id, channel, event) => {
        const texture = await modelViewerTexture1.createTexture(event);
        const index = parseInt(id) - 1;
        if (channel.includes("base") || channel.includes("metallic")) {
          material[index].pbrMetallicRoughness["channel"].setTexture(texture);
        } else {
          material[index][channel].setTexture(texture);
        }
      };

      document.querySelectorAll(".select_model").forEach(function (element) {
        element.addEventListener("click", function () {
          createAndApplyTexture(
            this.getAttribute("dataid"),
            this.getAttribute("dataindex"),
            this.getAttribute("datatexture")
          );
        });
      });
    });
  }, []);

  const getData = (param) => {
    return data && data.length > 0
      ? data.filter((task) => task.type === param)
      : [];
  };

  return (
    <model-viewer
      id="modelViewer"
      src="boat.gltf"
      ar
      ar-modes="webxr scene-viewer quick-look"
      camera-controls
      enviroment-image="base_color_anytec_750.png"
      shadow-intensity="0.67"
      shadow-softness="0.81"
      camera-orbit="227.7deg 74.51deg 14.64m"
      field-of-view="20.46deg"
    >
      <MSelect
        data-normal="0 1 0"
        data-visibility-attribute="visible"
        data-position="-1 1.5 1.5"
        className="Hotspot"
        slot="hotspot-4"
        list={getData("4")}
        dataid="4"
        deleteConfiguration={deleteConfiguration}
      />
      <MSelect
        className="Hotspot"
        slot="hotspot-2"
        data-position="-0.007 1.043 1.349"
        data-normal="0 1 0"
        data-visibility-attribute="visible"
        dir="row-reverse"
        list={getData("3")}
        dataid="3"
        deleteConfiguration={deleteConfiguration}
      />
      <MSelect
        className="Hotspot"
        slot="hotspot-1"
        data-position="0.576 -0.875 -0.962"
        data-normal="0 1 0"
        data-visibility-attribute="visible"
        dir="row-reverse"
        list={getData("2")}
        dataid="2"
        deleteConfiguration={deleteConfiguration}
      />
      <MSelect
        className="Hotspot"
        slot="hotspot-3"
        data-position="0.013 -1.308 3.564"
        data-normal="0.151 -0.155 0.976"
        data-visibility-attribute="visible"
        list={getData("1")}
        dataid="1"
        deleteConfiguration={deleteConfiguration}
      />
    </model-viewer>
  );
};

export default Boat;
