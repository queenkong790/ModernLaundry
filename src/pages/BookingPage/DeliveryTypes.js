import { useState, useRef, useEffect } from 'react';
import classes from './DeliveryTypes.module.css';

function DeliveryTypes({ onDeliveryTypeChange }) {
  const [selectedDeliveryType, setSelectedDeliveryType] = useState('');

  const radioRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  useEffect(() => {
    // Check if any delivery type is already selected when the component is first rendered
    if (!selectedDeliveryType) {
      setSelectedDeliveryType('1'); // Set the default value to '1' (STANDARD (48HRS))
      onDeliveryTypeChange('1'); // Call the callback with the selected value
    }
  }, [selectedDeliveryType, onDeliveryTypeChange]);

  const handleRadioChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDeliveryType(selectedValue);
    onDeliveryTypeChange(selectedValue); // Call the callback with the selected value
  };

  const handleDivClick = (deliveryType) => {
    setSelectedDeliveryType(deliveryType);
    Object.keys(radioRefs).forEach((key) => {
      if (key !== deliveryType) {
        // Uncheck other radio inputs
        radioRefs[key].current.checked = false;
      }
    });
    onDeliveryTypeChange(deliveryType); // Call the callback with the selected value
  };

  return (
    <>
      <div className={`${classes.types} row`} style={{ margin: '0', padding: '0' }}>
        <div className={`${classes.box} ${classes.edge1} col`} onClick={() => handleDivClick('1')}>
          <input
            ref={radioRefs[1]}
            type='radio'
            name='group3'
            value='1'
            onChange={handleRadioChange}
            checked={selectedDeliveryType === '1'} // Set to true for the first radio button
          />
          <label style={{ fontSize: '14px', cursor: 'pointer' }}>STANDARD (48HRS)</label>
        </div>
        <div className={`${classes.box} col`} onClick={() => handleDivClick('2')}>
          <input
            ref={radioRefs[2]}
            type='radio'
            name='group3'
            value='2'
            onChange={handleRadioChange}
            checked={selectedDeliveryType === '2'} // Set to true for the second radio button
          />
          <label style={{ fontSize: '14px', cursor: 'pointer' }}>EXPRESS &nbsp;(24HRS)</label>
        </div>
        <div className={`${classes.box} ${classes.edge2} col`} onClick={() => handleDivClick('3')}>
          <input
            ref={radioRefs[3]}
            type='radio'
            name='group3'
            value='3'
            onChange={handleRadioChange}
            checked={selectedDeliveryType === '3'} // Set to true for the third radio button
          />
          <label style={{ fontSize: '14px', cursor: 'pointer' }}>SAME DAY (12HRS)</label>
        </div>
      </div>
    </>
  );
}

export default DeliveryTypes;
