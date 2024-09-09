import React, { useState } from 'react';
import axios from 'axios';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' },
];

const SegmentPopup = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [currentSchema, setCurrentSchema] = useState('');

  const handleAddSchema = () => {
    if (currentSchema) {
      const selected = availableSchemas.find((schema) => schema.value === currentSchema);
      setSelectedSchemas([...selectedSchemas, selected]);
      setAvailableSchemas(availableSchemas.filter((schema) => schema.value !== currentSchema));
      setCurrentSchema(''); // Reset dropdown
    }
  };

  const handleSave = async () => {
    const dataToSend = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
  
    console.log(dataToSend, "Data to send");
  
    const webhookUrl = 'https://webhook.site/13a57817-b635-4375-834c-7944644782eb';
  
    try {
      const response = await axios.post(webhookUrl, dataToSend, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
  
      if (response.status === 200) {
        alert('Segment successfully saved and data sent to webhook!');
      } else {
        alert('Failed to send data. Please try again.');
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
  
    onClose(); // Close popup after saving
  };
  
  

  return (
    <div>
      <div className="popup-background" onClick={onClose} />
      <div className="popup">
        <div className="popup-inner">
          <h2>Save Segment</h2>
          <p>Enter the Name of the Segment</p>
          <input
            type="text"
            placeholder="Enter segment name"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
          />
          <p>To save your segment, you need to add schemas to build the query</p>
          <div className="schema-selector">
            <select value={currentSchema} onChange={(e) => setCurrentSchema(e.target.value)}>
              <option value="" disabled>Select a schema</option>
              {availableSchemas.map((schema) => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
          </div>
          <div className="selected-schemas">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="schema-box">
                {schema.label}
              </div>
            ))}
          </div>
          <button onClick={handleAddSchema}>+ Add new schema</button>
          <div>
            <button onClick={handleSave}>Save the segment</button>
            <button className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentPopup;
