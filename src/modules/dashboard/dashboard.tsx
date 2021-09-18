import { Card, Link } from "@material-ui/core";
// Link
import React from "react";


const dashboard = () =>
{
//     const OpenUrl = window.location.href;
// console.log(OpenUrl)
return(
    <div>
        <Card>
        {/* <Link to="/courses?sort=name" /> */}
        {/* <Link to="/ProblemsSolutions/getSolution" component={GetSolution} params={{ problemID: '20' }}>Open Solution</Link> */}
        {/* <Link target="_blank" component={RouterLink} to={OpenUrl+'/ProblemsSolutions/getSolution'}>Google</Link> */}
        <Link target="_blank" href="http://localhost:3000/#/ProblemsSolutions/getSolution?problemID=20">Get Solution</Link>

        </Card>
    </div>
)
}
export default dashboard;