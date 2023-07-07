const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Yamaha F300XCB",
      type: "4",
      texture: "textures/base_color_anytec_750.png",
    },
    "task-2": {
      id: "task-2",
      content: "Simrad Halo20+",
      type: "3",
      texture: "textures/base_color_anytec_750.png",
    },
    "task-3": {
      id: "task-3",
      content: "Slepner bowthruster",
      type: "2",
      texture: "textures/base_color_anytec_750.png",
    },
    "task-4": {
      id: "task-4",
      content: "Vision X lights",
      type: "1",
      texture: "textures/base_color_anytec_750.png",
    },
    "task-5": {
      id: "task-5",
      content: "Zipwake",
      type: "1",
      texture: "textures/normal_map_anytec_750.png",
    },
    "task-6": {
      id: "task-6",
      content: "M400",
      type: "2",
      texture: "textures/normal_map_anytec_750.png",
    },
    "task-7": {
      id: "task-7",
      content: "Fusion speaker system",
      type: "3",
      texture: "textures/normal_map_anytec_750.png",
    },
    "task-8": {
      id: "task-8",
      content: "Mercury 250 XLAM DS",
      type: "1",
      texture: "textures/specular_color_anytec_750.png",
    },
    "task-9": {
      id: "task-9",
      content: "Yamaha F200XB",
      type: "2",
      texture: "textures/specular_color_anytec_750.png",
    },
    "task-10": {
      id: "task-10",
      content: "Sleipner specular_color_anytec_750 windlass",
      type: "3",
      texture: "textures/specular_color_anytec_750.png",
    },
    "task-11": {
      id: "task-11",
      content: "Boat trailer 5T242000TB",
      type: "1",
      texture: "textures/base_color_anytec_750.png",
    },
    "task-12": {
      id: "task-12",
      content: "Boat trailer 240000TB SVX",
      type: "2",
      texture: "textures/base_color_anytec_750.png",
    },
    "task-13": {
      id: "task-13",
      content: "Yamaha F200XB",
      type: "3",
      texture: "textures/base_color_anytec_750.png",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      taskIds: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
      ],
    },
    "column-2": {
      id: "column-2",
      taskIds: ["task-8", "task-9", "task-10", "task-11", "task-12", "task-13"],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

export default initialData;
