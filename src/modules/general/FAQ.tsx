
import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import AppAnimate from '../../@crema/core/AppAnimate';

const FAQ = () => {

return (

    <AppAnimate animation='transition.slideUpIn' delay={200}>

<Card className="Card">
 
        
            <Box>
                  <Box  component='h4' mb={3} fontSize={20}>
                     FAQ
                
                  

                </Box>
                </Box>
                </Card>
               </AppAnimate>
               
)
};
export default FAQ;