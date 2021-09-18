import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { ListSubheader } from '@material-ui/core';
// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 1000,
    height: 1000,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));
export interface IImagesProperties {
    'imageId':number,
    'imageName':string,
    'src':any
}
const TitlebarGridList = (props:IImagesProperties) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList style={{width:'100%',height:'193px',padding:'2px'}}>
        <GridListTile key="Subheader" cols={4} style={{ height: 'auto',width:'100%' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {/* {tileData.map((tile) => ( */}
          <GridListTile key={props.imageId} style={{width:'100%'}}>
            <img src={props.src} alt={props.imageName} />
            <GridListTileBar
              title={props.imageName}
              actionIcon={
                <IconButton aria-label={`info about ${props.imageName}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </GridListTile>
        {/* ))} */}
      </GridList>
     </div>
  );
}
export default TitlebarGridList;