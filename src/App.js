import React, {useEffect, useState} from 'react';
import './App.css';

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

const MyUploader = () => {
    // specify upload params and url for your files
    const getUploadParams = ({file,  meta }) => {
        const body = new FormData();
        body.append('image', file);
        return {
            url: 'http://3.85.88.158/api/v1/image-upload',
            body
        }
    }

    // called every time a file's `status` changes
    const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    // receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta));
        debugger
        allFiles.forEach(f => f.remove())
    }

  return (
      <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*"
      />
  )
}




function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MyUploader/>
        {/*<button onClick={() => {*/}
        {/*  debugger*/}
        {/*  console.log("WOW")*/}
        {/*}}>wow</button>*/}
      </header>
    </div>
  );
}

export default App;
