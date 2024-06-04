import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

function Encrypt_Decrypt() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEncryptedFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setEncryptedFile(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleEncrypt = () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result.split(',')[1]; 
      const encrypted = CryptoJS.AES.encrypt(fileContent, 'secret_key').toString();
      const blob = new Blob([encrypted], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'encrypted.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setEncryptedFile(encrypted);
      setDecryptedFile(null);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDecrypt = () => {
    if (!encryptedFile) {
      alert('Please upload an encrypted file first');
      return;
    }

    try {
      const decrypted = CryptoJS.AES.decrypt(encryptedFile, 'secret_key').toString(CryptoJS.enc.Utf8);
      const decryptedDataUrl = `data:image/png;base64,${decrypted}`;
      setDecryptedFile(decryptedDataUrl);
    } catch (error) {
      alert('Decryption failed. Please ensure the file and key are correct.');
    }
  };

  return (
    <div className="Encrypt_Decrypt">
      <h1>Client-Side Encryption & Decryption</h1>
      <div>
        <h2>Encrypt</h2>
        <input type="file" onChange={handleFileChange} />
        <br />
        <button onClick={handleEncrypt}>Encrypt and Download</button>
      </div>
      <div>
        <h2>Decrypt</h2>
        <input type="file" onChange={handleEncryptedFileChange} />
        <br />
        <button onClick={handleDecrypt}>Decrypt</button>
        <br />
        {decryptedFile && (
          <>
            <h2>Decrypted File:</h2>
            <img src={decryptedFile} alt="Decrypted File" />
          </>
        )}
      </div>
    </div>
  );
}

export default Encrypt_Decrypt;
