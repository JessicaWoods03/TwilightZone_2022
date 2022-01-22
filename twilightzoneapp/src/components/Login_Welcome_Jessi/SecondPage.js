import React from "react";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";

const SecondPage = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gridGap: 0 }}>
      <div class="pageBox">
        <img src={"bigfoot.gif"} className="gif"/>
        <div>
          <Button id="btn" variant="contained" size="small">Hunt</Button>
          <Typography style={{ color: "#fff" }}> OR </Typography>
          <Button id="btn" variant="contained">Report</Button>
        </div>
      </div>
      <div class="pageBox">
        <img src={"UFO2.gif"} className="gif" />
        <div>
          <Button id="btn" variant="contained"> Hunt</Button>
          <Typography style={{ color: "#fff" }}> OR </Typography>
          <Button id="btn" variant="contained">Report</Button>
        </div>
      </div>
      <div class="pageBox">
        <img src={"ghost2.gif"} className="gif" />
        <div>
          <Button id="btn" variant="contained"> Hunt</Button>
          <Typography style={{ color: "#fff" }}> OR </Typography>
          <Button id="btn" variant="contained">Report</Button>
        </div>
      </div>
    </div>
  )
}

export default SecondPage;