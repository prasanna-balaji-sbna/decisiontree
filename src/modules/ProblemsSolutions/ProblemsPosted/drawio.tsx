import AppAnimate from '@crema/core/AppAnimate';
import React, { useEffect } from 'react';
import { Box, Card, Grid } from "@material-ui/core";
// import $ from "jquery";

const DrawIO = () => {
  // const innerRef = useRef(null);

  useEffect(() => {
    // var initial = image.getAttribute('src');
    // image.setAttribute('src', 'http://www.draw.io/images/ajax-loader.gif');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('frameborder', '0');
    iframe.addEventListener("click", function (e) {
      console.log(e, "event")
    })

    var close = function () {
      // image.setAttribute('src', initial);
      document.body.removeChild(iframe);
      window.removeEventListener('message', receive);
    };

    var receive = function (evt:any) {
      console.log(evt, "buvi console")
      var msg = JSON.parse(evt.data);
      console.log(msg, "buvi console")

      if (evt.data.length > 0) {
        var msg = JSON.parse(evt.data);
        console.log(msg, "buvi console")

        if (msg.event == 'init') {
          if(iframe.contentWindow !== null)
          {
            iframe.contentWindow.postMessage(JSON.stringify({
              action: 'load',
              // xmlpng: initial
            }), '*');
          }

        }
        else if (msg.event == 'export') {
          console.log("export")
          close();
							// eslint-disable-next-line no-restricted-globals
          save(window.location.href);
        }
        else if (msg.event == 'save') {
          if(iframe.contentWindow !== null)
          {
          iframe.contentWindow.postMessage(JSON.stringify({
            action: 'export',
            format: 'xml', spin: 'Updating page'
          }), '*');
        }
        }
        else if (msg.event == 'exit') {
          close();
        }
      }
    };

    window.addEventListener('message', receive);
    iframe.setAttribute('src', 'http://10.1.2.72:8080/?offline=1&https=0');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('height', '700px');
    document.getElementById("Grid")?.appendChild(iframe)
    // grid?.appendChild(iframe)
    // document..appendChild(iframe);

  }, [])
  function save(url:any)
  {
    console.log(url, "event")

  }
  // const print = (e: any) => {
  //   console.log(e, "event")
  // }
  return (
    <div>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <Card className="Card">
          <Box>
            <Grid id="Grid" container>
              <Grid item lg={10} md={10}>
                <label style={{
                  margin: '0.5rem',
                  fontWeight: 'bold', fontSize: '23px'
                }} className="pageheader" >Draw the Solution</label>
              </Grid>
              {/* <body >

              </body> */}
              {/* <div  dangerouslySetInnerHTML={{ __html: "<iframe frameBorder='0' style={{width:'100%',height:'600px'}}  src='http://10.1.2.72:8080/?offline=1&https=0' />"}} /> */}
              {/* id="iframe" */}
              {/* sandbox="allow-downloads allow-same-origin allow-scripts allow-popups allow-forms" */}
              {/* <iframe id="iframe" frameBorder="0" width="100%" height="600px" ></iframe> */}
            </Grid>
          </Box>
        </Card>
      </AppAnimate>
    </div>
  )
}
export default DrawIO;