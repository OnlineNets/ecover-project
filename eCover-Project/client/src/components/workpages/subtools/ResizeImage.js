import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  background: 'none',
  boxShadow: 'none'
}));

const sizePixels = [800, 400, 350, 300, 250, 225, 200, 175, 150,];

export default function ReSizeImage(props) {
  const {width, height} = props;
  const [resizedWidth, setResizedWidth] = React.useState(width);
  const [resizedHeight, setResizedHeight] = React.useState(height);
  const [displaySize, setDisplaySize] = React.useState(`Output Size(px): ${width} X ${height}`);

  const handleChangeWidth = (event) => {
    setResizedWidth(event.target.value);
    let hValue =  parseInt(height / width * event.target.value);
    setResizedHeight('');
    props.setSize({
        width: event.target.value,
        height: hValue
    });
    setDisplaySize(`Output Size(px): ${event.target.value} X ${hValue}`);
  }

  const handleChangeHeight = (event) => {
    setResizedHeight(event.target.value);
    let wValue =  parseInt(width / height * event.target.value);
    setResizedWidth('');
    props.setSize({
        width: wValue,
        height: event.target.value
    });
    setDisplaySize(`Output Size(px): ${wValue} X ${event.target.value}`);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={8} style={{display: 'flex', alignItems: 'center'}}>
          <Item style={{color: 'black'}}>
            Original Size(px): {width} X {height}
           </Item>
        </Grid>
        <Grid item xs={4}>
            <Item>
                <FormControl sx={{ m: 0, minWidth: 85 }} size="small">
                    <InputLabel id="demo-select-small-label" style = {{color: 'black'}}>Width</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={resizedWidth}
                        label="Width"
                        onChange={handleChangeWidth}
                    >
                        <MenuItem value={width}>
                        <em>Origin</em>
                        </MenuItem>
                        {sizePixels.map((value, index)=>{
                            if(value < width) {
                                return <MenuItem value={value} key={index}>{value}</MenuItem>
                            }
                        })}
                    </Select>
                </FormControl>
            </Item>
        </Grid>
        <Grid item xs={8} style={{display: 'flex', alignItems: 'center'}}>
            <Item style={{color: 'black'}}>
                {displaySize}
            </Item>
        </Grid>
        <Grid item xs={4}>
            <Item>
                <FormControl sx={{ m: 0, minWidth: 85 }} size="small">
                    <InputLabel id="demo-select-small-label" style = {{color: 'black'}}>Height</InputLabel>
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={resizedHeight}
                        label="Height"
                        onChange={handleChangeHeight}
                    >
                        <MenuItem value={height}>
                        <em>Origin</em>
                        </MenuItem>
                        {sizePixels.map((value, index)=>{
                            if(value < height) {
                                return <MenuItem value={value} key={index}>{value}</MenuItem>
                            }
                        })}
                    </Select>
                </FormControl>
            </Item>
        </Grid>
      </Grid>
    </Box>
  );
}