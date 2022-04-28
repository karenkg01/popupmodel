import React, { Component } from "react";
// We are using axios as the http library
import axios from "axios";
import "./FileUpload.module.css";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ComputerIcon from "@mui/icons-material/Computer";
import { DataGrid } from "@mui/x-data-grid";
import InfoIcon from "@mui/icons-material/Info";
import ClearIcon from '@mui/icons-material/Clear';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const API_URL =
  "https://xm2fv4k5r5.execute-api.us-east-2.amazonaws.com/uploadTryTwo";

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  icon: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
  form:{
    marginTop: '20px',
    borderRadius: '5px',
    boxShadow: '0 4px 2px -2px grey',
    backgroundColor: 'white',
    padding: '30px'
  }
}



const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default class FileUpload extends Component {
  // fileToUpload contains the actual file object
  // uploadSuccess becomes true when the file upload is complete
  constructor(props) {
    super(props);

    this.state = {
      fileToUpload: [],
      uploadSuccess: undefined,
      error: undefined,
      age: undefined

    };

    this.checkAllBoxes = this.checkAllBoxes.bind(this);
    this.CloseModal = props.handleClose;
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (event)=>{
    this.setState({age: event.target.value});
  }

   columns = [
    { field: "documentName", headerName: "Document Name", width: 130},
    { field: "schoolArea", headerName: "School Area", width: 130 , renderCell: ()=>{
      return(
        <div>
           <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={this.state.age}
              onChange={(e)=> this.handleChange(e)}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>
      )
    }},
    { field: "subject", headerName: "Subject", width: 130 },
    { field: "documentType", headerName: "Document Type", width: 130 },
    { field: "remove", headerName: "Remove", width: 130, renderCell: (values)=>{
      return (
        <div onClick={()=> this.handleRemove(values)}>
          <ClearIcon />
        </div>
      )
    } },
  ];

  async uploadFile() {
    // When the upload file button is clicked, invoke lambda via API Gateway
    try {
      const formData = new FormData();
      // formData.append("version", "1.0")
      for (const file of this.state.fileToUpload) {
        // formData.append("meta", {})
        formData.append("filename", file);
      }
      const response = await axios.post(API_URL, formData);
      this.setState({
        uploadSuccess: "File upload successfull",
        error: undefined,
      });
    } catch (err) {
      // handle the error
      console.error(err);
      this.setState({
        error: "Error Occured while uploading the file",
        uploadSuccess: undefined,
      });
    }
  }

  checkAllBoxes = () => {
    const checkboxes = document.getElementsByClassName("checkboxRow");
    if (checkboxes[0].checked) {
      for (let i = 0; i < checkboxes.length; i++) {
        // console.log(checkboxes[i]);
        checkboxes[i].checked = true;
      }
    } else {
      for (let i = 0; i < checkboxes.length; i++) {
        // console.log(checkboxes[i]);
        checkboxes[i].checked = false;
      }
    }
  };

  handleRemove = (values)=>{
    
  }

  render() {
    console.log({ data: this.state.fileToUpload });
    const forMattedData = this.state.fileToUpload.map((item, index) => {
      return { id: index, documentName: item.name  };
    });

    return (
      <div >
        <div style={styles.header}>
          <div style={styles.icon}>
            UPLOAD NEW DOCUMENT
            <InfoIcon />
          </div>

          <div>
            <IconButton
              aria-label="CloseIcon"
              onClick={() => this.CloseModal()}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <div style={styles.form}>
          <div>
            <Button
              className="container"
              startIcon={<ComputerIcon />}
              variant="outlined"
              component="label"
            >
              Browse Computer
              <input
                id="fileUpload"
                multiple
                onChange={(e) => {
                  console.log("files value", e.target.files);
                  let files = [];
                  Array.from(e.target.files).forEach((file) => {
                    console.log({ file });
                    files.push(file);
                  });
                  this.setState({
                    fileToUpload: files,
                  });
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

          <div style={{ height: 300, width: "100%" ,marginTop: '20px', marginBottom: '20px', borderRadius: '5px',
            boxShadow: '0 4px 2px -2px grey'}}>
            <DataGrid
              rows={forMattedData}
              columns={this.columns}
              hideFooter
              // pageSize={5}
              // rowsPerPageOptions={[0]}
              checkboxSelection
            />
          </div>
         <div  style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <button

                type="button"
                className="btn btn-light"
                onClick={(e) => {
                  this.uploadFile();
                }}
              >
                Upload your file
              </button>
         </div>
        </div>
      </div>
    );
  }
}
