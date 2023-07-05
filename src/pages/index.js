import { useCallback, useState } from "react";
import Boat from "./boat";
import { Grid, Button, Box } from "@mui/material";
import MSelect from "./MSelect";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CloseIcon from "@mui/icons-material/Close";

import backgroundImg from "../assets/background.png";

import initialData from "./initial-data";

export default function View() {
  const [state, setState] = useState(initialData);
  const [currentDragItem, setCurrentDragItem] = useState({
    taskId: "",
    columnId: "",
  });

  const deleteConfiguration = useCallback(
    (clickID) => {
      const updatedColumns = {
        ...state.columns,
        "column-1": {
          ...state.columns["column-1"],
          taskIds: state.columns["column-1"].taskIds.filter(
            (taskId) => taskId !== clickID
          ),
        },
        "column-2": {
          ...state.columns["column-2"],
          taskIds: [...state.columns["column-2"].taskIds, clickID],
        },
      };

      const updatedData = {
        ...state,
        columns: updatedColumns,
      };
      setState({ ...updatedData });
    },
    [state]
  );

  const handleDragStart = useCallback(
    (start) => {
      setCurrentDragItem({
        taskId: start.draggableId,
        columnId: start.source.droppableId,
      });
      setState({
        ...state,
        homeIndex: state.columnOrder.indexOf(start.source.droppableId),
      });
    },
    [state]
  );

  const handleDragUpdate = useCallback((update) => {}, []);

  const handleDragEnd = useCallback(
    (result) => {
      setState({
        ...state,
        homeIndex: null,
      });

      if (!result.destination) {
        return;
      }

      if (
        result.destination.droppableId === result.source.droppableId &&
        result.destination.index === result.source.index
      ) {
        return;
      }
      const start = state.columns[result.source.droppableId];
      const finish = state.columns[result.destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(result.source.index, 1);
        newTaskIds.splice(result.destination.index, 0, result.draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        setState({
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn,
          },
        });
        return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(result.source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(result.destination.index, 0, result.draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      });
    },
    [state]
  );

  return (
    <div>
      {
        <Grid
          sx={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "100% 100%",
            minHeight: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={12} md={8} lg={9}>
              <Grid
                sx={{
                  position: "absolute",
                  width: "100vw",
                  height: "100vh",
                  color: "white",
                }}
              >
                <MSelect
                  label="YAMAHA F300XCB"
                  style={{ top: "21%", right: "28%" }}
                />
                <MSelect
                  label="SIMRAD HAL020+"
                  style={{ top: "28%", left: "45%" }}
                />
                <MSelect
                  label="BOW COMPARTMENTS"
                  style={{ top: "calc(34% + 170px)", left: "29%" }}
                />
                <MSelect
                  label="Sleipner bowthruster"
                  style={{ bottom: "24%", right: "30%" }}
                />
                <Boat />
              </Grid>
              <Grid item xs={12} sx={{ padding: "16px" }}>
                <Grid item lg={8} md={12} xs={12}>
                  <Box
                    as="p"
                    m="0"
                    style={{ fontSize: "50px", color: "white" }}
                  >
                    ANTTEC 750 SPD
                  </Box>
                  <Box style={{ color: "white", width: "60%" }}>
                    A leisure boat with professional boat standards for those
                    with high demands. Designed for use in our Nordic waters in
                    all weather conditions. Now better than ever before with a
                    refined cockpit environment, a completely new canopy
                    solution, and a multitude of updates from bow to stern.
                  </Box>
                </Grid>
                <Grid />
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={3}
              sx={{ zIndex: "100", padding: "16px" }}
            >
              <Grid container>
                <DragDropContext
                  onDragStart={handleDragStart}
                  onDragUpdate={handleDragUpdate}
                  onDragEnd={handleDragEnd}
                >
                  <Grid
                    item
                    xs={12}
                    margin={"2%"}
                    style={{
                      backgroundColor: "#212121",
                      padding: "3%",
                      alignContent: "center",
                      borderRadius: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                    }}
                  >
                    <Grid
                      style={{
                        color: "white",
                        textAlign: "center",
                        padding: "1%",
                      }}
                    >
                      CONFIGURATION
                    </Grid>
                    <Droppable droppableId={`${state.columnOrder[0]}`}>
                      {(provided, snapshot) => (
                        <div
                          style={{
                            width: "100%",
                            height: `${
                              state.columns["column-1"].taskIds.length * 34 +
                              (state.columns["column-1"].taskIds.length - 1) *
                                10 +
                              (snapshot.isDraggingOver &&
                              currentDragItem.columnId !== "column-1"
                                ? 44
                                : 0)
                            }px`,
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                          className="column1_area"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {state.columns["column-1"].taskIds
                            .map((taskId) => state.tasks[taskId])
                            .map((task, index) => (
                              <Draggable
                                draggableId={task.id}
                                index={index}
                                key={`${Date.now()}${index}`}
                              >
                                {(provided, snapshot) => (
                                  <Grid
                                    id={task.id}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div
                                      {...provided.dragHandleProps}
                                      className={`draggable-item ${
                                        snapshot.isDragging ? "black" : ""
                                      }`}
                                    >
                                      <div>
                                        <Box as="span" color="white">
                                          {task.content}
                                        </Box>
                                        <CloseIcon
                                          style={{ cursor: "pointer" }}
                                          onClick={() =>
                                            deleteConfiguration(task.id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </Grid>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                    </Droppable>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    flexDirection={"column"}
                    gap={"0.5rem"}
                    padding={"2%"}
                    margin={"2%"}
                    style={{
                      backgroundColor: "#212121",
                      borderRadius: "20px",
                    }}
                  >
                    <p style={{ color: "white", textAlign: "center" }}>
                      ADDONS
                    </p>
                    <Droppable droppableId={`${state.columnOrder[1]}`}>
                      {(provided, snapshot) => (
                        <div
                          style={{
                            width: "100%",
                            height: `${
                              state.columns["column-2"].taskIds.length * 34 +
                              (state.columns["column-2"].taskIds.length - 1) *
                                10 +
                              (snapshot.isDraggingOver &&
                              currentDragItem.columnId !== "column-2"
                                ? 44
                                : 0)
                            }px`,
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                          className="column2_area"
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {state.columns["column-2"].taskIds
                            .map((taskId) => state.tasks[taskId])
                            .map((task, index) => (
                              <Draggable
                                draggableId={task.id}
                                index={index}
                                key={`${Date.now()}${index}`}
                              >
                                {(provided, snapshot) => (
                                  <Grid
                                    style={{
                                      textAlign: "center",
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div
                                      {...provided.dragHandleProps}
                                      className={`draggable-item ${
                                        snapshot.isDragging ? "" : "black"
                                      }`}
                                    >
                                      <div>
                                        <Box as="span" color="white">
                                          {task.content}
                                        </Box>
                                        <CloseIcon />
                                      </div>
                                    </div>
                                  </Grid>
                                )}
                              </Draggable>
                            ))}
                        </div>
                      )}
                    </Droppable>
                  </Grid>
                </DragDropContext>
                <Grid
                  item
                  xs={12}
                  margin={"2%"}
                  sx={{
                    backgroundColor: "#212121",
                    padding: "3%",
                    alignContent: "center",
                    borderRadius: "20px",
                  }}
                >
                  <p style={{ textAlign: "center", color: "white" }}>
                    Total: 143 000$
                  </p>
                  <Grid
                    container
                    columnSpacing={1}
                    style={{ justifyContent: "space-between" }}
                  >
                    <Grid>
                      <Button
                        style={{
                          color: "white",
                          marginLeft: "15px",
                          borderRadius: "25px",
                          backgroundColor: "#ff9900",
                          ":hover": {
                            boxShadow: 4,
                            backgroundColor: "#ffa31a",
                          },
                        }}
                      >
                        <>SIMULATE</>
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        style={{
                          marginRight: "15px",
                          color: "white",
                          borderRadius: "25px",
                          backgroundColor: "#ff9900",
                          ":hover": {
                            boxShadow: 4,
                            backgroundColor: "#ffa31a",
                          },
                        }}
                      >
                        DEALERS
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      }
    </div>
  );
}
