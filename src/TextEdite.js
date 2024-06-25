import React,{useState} from 'react'
import "./Text.css"
import Picker from 'emoji-picker-react';
export default function TextEdite() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const handle = (e) => {
      const newFiles = Array.from(e.target.files);
      const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
      if (imageFiles.length < newFiles.length) {
        setError('Only image files are allowed.');
      } else {
        setError(null);
      }
    
      setFiles((prevFiles) => {
        const updatedFiles = [...prevFiles];
        imageFiles.forEach((newFile) => {
          if (!prevFiles.some((file) => file.name === newFile.name && file.size === newFile.size && file.lastModified === newFile.lastModified)) {
            updatedFiles.push(newFile);
          }
        });
        return updatedFiles;
      });
    };

    
    const handleButtonClick = () => {
      document.getElementById('file-input').click();
    };
    
      const handleRemove = (index) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };


    const [chosenEmoji, setChosenEmoji] = useState(null);

    const onEmojiClick = (event, emojiObject) => {
      setChosenEmoji(emojiObject);
    };
    console.log(chosenEmoji);
  return (
    <div>
      {chosenEmoji ? (
          <span>You chose: {chosenEmoji.emoji}</span>
        ) : (
          <span>No emoji Chosen</span>
        )}
  <Picker
  onEmojiClick={onEmojiClick} 
  // autoFocusSearch={true}
  // open={true}
  // lazyLoad={true}
/>

    <button onClick={handleButtonClick} className='uploadbtn'>Upload</button>
    <input type="file" id="file-input" name="files" multiple accept="image/*" onChange={(e) => handle(e)}   style={{ display: 'none' }}/>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <div>
    <textarea  type='text' placeholder='type.......'  className='textarea'/>
    <div className="image-preview" style={{ display: 'flex', flexWrap: 'wrap' }}>
     
      {files.map((file, index) => (
        <div key={index} style={{ position: 'relative', margin: '10px' }}>
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            style={{ width: '94%', objectFit: 'cover' }}
          />
          <button
            onClick={() => handleRemove(index)}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: 'red',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '33px',
              height: '33px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              lineHeight: '1',
              fontSize:"xx-large"
            }}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  
    <div style={{ marginTop:"-23px" }}>
    <p style={{ color:"black" }}>jghjthyh</p>
    </div>

    </div>
  </div>
  )
}
