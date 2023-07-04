import { useCallback, useState } from 'react';
import Boat from './boat';
import { Grid, Button, Box } from '@mui/material';
import MSelect from './MSelect';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CloseIcon from '@mui/icons-material/Close';

import initialData from './initial-data';

export default function View() {

  const [state, setState] = useState(initialData);

  const handleDragStart = useCallback(
    start => {
      document.body.style.color = "orange";
      document.body.style.transition = "background-color 0.2s ease";

      setState({
        ...state,
        homeIndex: state.columnOrder.indexOf(start.source.droppableId)
      });
    },
    [state]
  );

  const handleDragUpdate = useCallback(
    update => {
      const opacity = update.destination
        ? update.destination.index / Object.keys(state.tasks).length
        : 0;

      document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
    },
    [state]
  );

  const handleDragEnd = useCallback(
    result => {
      document.body.style.color = "inherit";
      document.body.style.backgroundColor = "inherit";

      setState({
        ...state,
        homeIndex: null
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
      console.log(result)
      const start = state.columns[result.source.droppableId];
      const finish = state.columns[result.destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(result.source.index, 1);
        newTaskIds.splice(result.destination.index, 0, result.draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds
        };

        setState({
          ...state,
          columns: {
            ...state.columns,
            [newColumn.id]: newColumn
          }
        });
        return;
      }

      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(result.source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(result.destination.index, 0, result.draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      };

      setState({
        ...state,
        columns: {
          ...state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      });
    },
    [state]
  );

  return (
    <div>
      {
        <Grid
          sx={{
            background:
              'linear-gradient(to right, #070807,#2b2a27,#302f2c, #ab7329)',
            minHeight: '100vh',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ background: 'radial-gradient(circle, rgba(171, 115, 41, 0.5) 30%, rgb(45 44 41) 69%)', width: '100%', height: '100%', position: 'absolute', zIndex: '-1', left: '50%' }}></div>
          <Grid
            container
            columnSpacing={2}
            style={{
              zIndex: '1000',
              padding: '1%',
            }}
          >
            <Grid item xs={12} md={8} lg={9}>
              <Grid item xs={12}>
                <Grid item lg={8} md={12} xs={12}>
                  <Grid style={{ fontSize: '50px', color: 'white' }}>
                    ANTTEC 750 SPD
                  </Grid>
                  <Grid style={{ color: 'white' }}>
                    Hello , enjoy the life!!!
                  </Grid>
                </Grid>
                <Grid />
              </Grid>
              <Grid
                sx={{
                  paddingLeft: '10%',
                  marginTop: '10px',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <MSelect label="YAMAHA F300XCB" style={{ top: '50px', right: '10%' }} />
                <MSelect label="SIMRAD HAL020+" style={{ top: '100px', left: '45%' }} />
                <MSelect label="BOW COMPARTMENTS" style={{ top: 'calc(20% + 140px)', left: '15%' }} />
                <MSelect label="Sleipner bowthruster" style={{ bottom: '14%', right: '18%' }} />
                <Boat />
              </Grid>
              <Grid item xs={12} />
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Grid container>
                <DragDropContext
                  onDragStart={handleDragStart}
                  onDragUpdate={handleDragUpdate}
                  onDragEnd={handleDragEnd}
                >
                  <Grid
                    item
                    xs={12}
                    margin={'2%'}
                    style={{
                      backgroundColor: '#212121',
                      padding: '3%',
                      alignContent: 'center',
                      borderRadius: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <Grid
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        padding: '1%',
                      }}
                    >
                      CONFIGURATION
                    </Grid>
                    <Droppable droppableId={`${state.columnOrder[0]}`}>
                      {(provided, snapshot) => (
                        <div
                          style={{ width: "100%", height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {
                            state.columns['column-1'].taskIds.map(taskId => state.tasks[taskId]).map((task, index) => (
                              <Draggable draggableId={task.id} index={index} key={`${Date.now()}${index}`}>
                                {(provided, snapshot) => (
                                  <Grid
                                    style={{
                                      textAlign: 'center',
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div
                                      {...provided.dragHandleProps} 
                                      className='draggable-item'
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
                            ))
                          }
                        </div>
                      )}
                    </Droppable> 
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    flexDirection={'column'}
                    gap={'0.5rem'}
                    padding={'2%'}
                    margin={'2%'}
                    style={{
                      backgroundColor: '#212121',
                      borderRadius: '20px',
                    }}
                  >
                    <p style={{ color: 'white', textAlign: 'center' }}>ADDONS</p>
                    <Droppable droppableId={`${state.columnOrder[1]}`}>
                        {(provided, snapshot) => (
                          <div
                            style={{ width: "100%", height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {
                              state.columns['column-2'].taskIds.map(taskId => state.tasks[taskId]).map((task, index) => (
                                <Draggable draggableId={task.id} index={index} key={`${Date.now()}${index}`}>
                                {(provided, snapshot) => (
                                  <Grid
                                    style={{
                                      textAlign: 'center',
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                  >
                                    <div
                                      {...provided.dragHandleProps} 
                                      className='draggable-item black'
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
                              ))
                            }
                          </div>
                        )}
                      </Droppable> 
                  </Grid>
                </DragDropContext>
                <Grid
                  item
                  xs={12}
                  margin={'2%'}
                  sx={{
                    backgroundColor: '#212121',
                    padding: '3%',
                    alignContent: 'center',
                    borderRadius: '20px',
                  }}
                >
                  <p style={{ textAlign: 'center', color: 'white' }}>
                    Total: 143 000$
                  </p>
                  <Grid
                    container
                    columnSpacing={1}
                    style={{ justifyContent: 'space-between' }}
                  >
                    <Grid>
                      <Button
                        style={{
                          color: 'white',
                          marginLeft: '15px',
                          borderRadius: '25px',
                          backgroundColor: '#ff9900',
                          ':hover': {
                            boxShadow: 4,
                            backgroundColor: '#ffa31a',
                          },
                        }}
                      >
                        <>SIMULATE</>
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        style={{
                          marginRight: '15px',
                          color: 'white',
                          borderRadius: '25px',
                          backgroundColor: '#ff9900',
                          ':hover': {
                            boxShadow: 4,
                            backgroundColor: '#ffa31a',
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
