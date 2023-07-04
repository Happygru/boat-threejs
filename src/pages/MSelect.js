import { useState } from "react";
import { IconButton, Box, Grid, Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';

const MSelect = ({label, dir='row', style}) => {

  const [ visible, setVisible ] = useState(false);

  const toggleSlide = () => {
    setVisible(!visible);
  }

  return <Box width="max-content" position="absolute" height="max-content"  {...style}>
      <Box display="flex" alignItems={'flex-start'} flexDirection={dir} gap="10px">
        <Box m="0" p="5px 15px" letterSpacing={'1px'} fontSize={'16px'} backgroundColor="rgba(0,0,0,0.6)" borderRadius="5px">{label}</Box>
        <IconButton style={{ color: 'white', backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: '5px', padding: `2px 5px ${visible ? '10px' : '5px'}` }} aria-label="add an alarm" onClick={() => toggleSlide()}>
          <ExpandMoreIcon />
        </IconButton>
      </Box>
      <Box position="absolute" width="100%" height={!visible ? '0' : 'auto'} overflow={'hidden'} fontSize={'14px'} backgroundColor="rgba(0,0,0,0.6)" borderRadius="5px" top="35px" sx={{ transition: '0.2s' }}>
        <Grid
          style={{
            textAlign: 'center',
            width: '90%',
            margin: 'auto',
            marginBlock: '15px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <Button
            endIcon={<CloseIcon />}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              borderRadius: '25px',
              backgroundColor: '#ff9900',
              fontSize: '14px',
              padding: '0 10px',
              ':hover': {
                boxShadow: 6,
                backgroundColor: '#ffa31a',
              },
            }}
          >
            <Box as="span" color="white">
              Yamaha F300XCB
            </Box>
          </Button>
          <Button
            endIcon={<CloseIcon />}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              borderRadius: '25px',
              backgroundColor: '#ff9900',
              fontSize: '14px',
              padding: '0 10px',
              ':hover': {
                boxShadow: 6,
                backgroundColor: '#ffa31a',
              },
            }}
          >
            <Box as="span" color="white">
              Yamaha F300XCB
            </Box>
          </Button>
          <Button
            endIcon={<CloseIcon />}
            sx={{
              width: '100%',
              justifyContent: 'space-between',
              borderRadius: '25px',
              backgroundColor: '#ff9900',
              fontSize: '14px',
              padding: '0 10px',
              ':hover': {
                boxShadow: 6,
                backgroundColor: '#ffa31a',
              },
            }}
          >
            <Box as="span" color="white">
              Yamaha F300XCB
            </Box>
          </Button>
        </Grid>
      </Box>
  </Box>
}

export default MSelect;