import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
// import Avatar from '@material-ui/core/Avatar';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
// import Pagination from '@material-ui/lab/Pagination';
import AppAnimate from '@crema/core/AppAnimate';
const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#fff"
    },
    hero: {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80')`,
        height: "500px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        fontSize: "4rem",
        [theme.breakpoints.down("sm")]: {
            height: 300,
            fontSize: "3em"
        }
    },
    blogsContainer: {
        paddingTop: theme.spacing(3)
    },
    blogTitle: {
        fontWeight: 800,
        paddingBottom: theme.spacing(3)
    },
    card: {
        maxWidth: "100%",
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent: "space-between"
    },
    author: {
        display: "flex"
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center"
    }
}));
const file='data:image/png;base64,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'
const Blogs = () => {
    const classes = useStyles();
    return (

        <AppAnimate animation='transition.slideUpIn' delay={200}>
            <Card className="Card">
                <Box>
                <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography variant="h4" className={classes.blogTitle}>
          Blogs
        </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    {/* <CardMedia */}
                                     <img
                                     width="100%"
                                     alt="logo"
                 
                                       className={classes.media}
                                     src={file}
                                 />
                                        {/* className={classes.media}
                                        image="https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                                        title="Contemplative Reptile"
                                    /> */}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            React useContext
                                        </Typography>
                                        {/* <Typography variant="body2" color="textSecondary" component="p">
                                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                            across all continents except Antarctica
                                        </Typography> */}
                                    </CardContent>
                                </CardActionArea>
                                <CardActions className={classes.cardActions}>
                                    <Box className={classes.author}>
                                        {/* <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" /> */}
                                        <Box ml={2}>
                                            <Typography variant="subtitle2" component="p">
                                                Guy Clemons
                                            </Typography>
                                            <Typography variant="subtitle2" color="textSecondary" component="p">
                                                May 14, 2020
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <BookmarkBorderIcon />
                                    </Box>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
</Container>

</Box>
            </Card>
        </AppAnimate>
    )
}
export default Blogs;