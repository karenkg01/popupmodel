import React, { Component } from "react";
// We are using axios as the http library
import axios from "axios";
import "./FileUpload.module.css";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ComputerIcon from '@mui/icons-material/Computer';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const API_URL = "https://xm2fv4k5r5.execute-api.us-east-2.amazonaws.com/uploadTryTwo";

export default class FileUpload extends Component {
  
    // fileToUpload contains the actual file object
    // uploadSuccess becomes true when the file upload is complete
    constructor(props){
        super(props);
       
        this.state = {
            fileToUpload: undefined,
            uploadSuccess: undefined,
            error: undefined 
        }
        this.myTablefunc = this.myTablefunc.bind(this)
        this.checkAllBoxes = this.checkAllBoxes.bind(this)
        this.CloseModal = props.handleClose
    }
   
     myTablefunc() {
        const table = document.getElementById("myTable");
       
        // console.log("this.state.fileToUpload",this.state.fileToUpload)
        
        for(let i=0; i< this.state.fileToUpload.length;i++){
            // this.state.fileToUpload[i];
            // console.log("this.state.fileToUpload", this.state.fileToUpload[i]);
            const row = table.insertRow(1);
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            cell1.innerHTML = '<input class="checkboxRow" type="checkbox" />';
            cell2.innerHTML = this.state.fileToUpload[i].name;
            cell3.innerHTML = this.state.fileToUpload[i].name;
            cell4.innerHTML = this.state.fileToUpload[i].name;
        }
   
    }
  
    async uploadFile() {
        // When the upload file button is clicked, invoke lambda via API Gateway
        try {
            const formData = new FormData();
            // formData.append("version", "1.0")
            for(const file of this.state.fileToUpload) {
                // formData.append("meta", {})
                formData.append("filename",file);
            }
            const response = await axios.post(API_URL, formData);
            this.setState({
              uploadSuccess: "File upload successfull",
              error: undefined,
            });
        } catch(err) {
            // handle the error
            console.error(err);
            this.setState({
              error: "Error Occured while uploading the file",
              uploadSuccess: undefined,
            });
        }
    }

    checkAllBoxes = ()=> {
      const checkboxes = document.getElementsByClassName("checkboxRow");
      if(checkboxes[0].checked){
        for(let i=0;i< checkboxes.length; i++){
          // console.log(checkboxes[i]);
           checkboxes[i].checked = true;
        }
      }else{
        for(let i=0;i< checkboxes.length; i++){
          // console.log(checkboxes[i]);
           checkboxes[i].checked = false;
        }
      }
      

    }

  render() {
    return (
        <>
      <div className={"fileUploadCont"}>
        <div className={"header"}>
          File Upload to S3 with Lambda, And React axios Application
        </div>
        <div>
        <IconButton aria-label="CloseIcon" onClick={()=> this.CloseModal()}  >
          <CloseIcon />
        </IconButton>
        </div>
        <div>
          <form>
            <div className="form-group">
              {/* <input
                type="file"
                className="form-control-file"
                id="fileUpload"
                multiple
                onChange={(e) => {
                    console.log("Hi there Dude")
                  this.setState({
                    fileToUpload: e.target.files,
                  }, this.myTablefunc);
             
                }}

              /> */}
              <Button
              startIcon={<ComputerIcon />}
              variant="outlined"
              component="label"
              >
              Browse Computer
              <input
                id="fileUpload"
                multiple
                onChange={(e) => {
                  console.log("Hi there Dude")
                this.setState({
                  fileToUpload: e.target.files,
                }, this.myTablefunc);
           
              }}
                type="file"
                hidden
              />
              </Button>
             
              <div>
                <span>
                  {this.state.uploadSuccess ? "File Upload Successfully" : ""}
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>

<h2>HTML Table</h2>

<table id="myTable">
  <tr>
    <th><input class="checkboxRow" type="checkbox"  onChange={this.checkAllBoxes} /></th>
    <th>Company</th>
    <th>Contact</th>
    <th>Country</th>
    
  </tr>
</table>
<button
  type="button"
  className="btn btn-light"
  onClick={(e) => {
    this.uploadFile();
  }}
>
  Upload your file
</button>
</>
    );
  }
}
