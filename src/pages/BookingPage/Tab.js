import React, { useState } from 'react';
import classes from '../../components/Secheader.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import classes2 from './Tab.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faChildren, faHome, faCar } from '@fortawesome/free-solid-svg-icons';

function Tab({ onCategoryChange, loading }) {
  const [isActive, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
    // Call the onCategoryChange function with the selected category
    switch (tabNumber) {
      case 1:
        onCategoryChange('Men');
        break;
      case 2: 
        onCategoryChange('Ladies');
        break;
      case 3:
        onCategoryChange('Kids');
        break;
      case 4:
        onCategoryChange('Home');
        break;
      case 5:
        onCategoryChange('Pick Up & Delivery');
        break;
      default:
        onCategoryChange('Men'); // If none of the above, set category to null
    }
  };

  return (
    <>
      <div className="container">
        <nav className={`${classes.navbar} ${classes2.navbar} row-fluid`} style={{ textAlign: 'center' }}>
          <a
            onClick={() => handleTabClick(1)}
            className={isActive === 1 ? `${classes.activeNavLink} col` : `${classes.navLink} col`}
            style={{ cursor: 'pointer' }} // Add this line to change cursor to pointer
          >
            <FontAwesomeIcon icon={faMale}></FontAwesomeIcon> Men
          </a>

          <a
            onClick={() => handleTabClick(2)}
            className={isActive === 2 ? `${classes.activeNavLink} col ` : `${classes.navLink} col `}
            style={{ cursor: 'pointer' }} // Add this line to change cursor to pointer
          >
            <FontAwesomeIcon icon={faFemale}></FontAwesomeIcon> Ladies
          </a>
          <a
            onClick={() => handleTabClick(3)}
            className={isActive === 3 ? `${classes.activeNavLink} col` : `${classes.navLink} col`}
            style={{ cursor: 'pointer' }} // Add this line to change cursor to pointer
          >
            <FontAwesomeIcon icon={faChildren}></FontAwesomeIcon> Kids
          </a>
          <a
            onClick={() => handleTabClick(4)}
            className={isActive === 4 ? `${classes.activeNavLink} col` : `${classes.navLink} col`}
            style={{ cursor: 'pointer' }} // Add this line to change cursor to pointer
          >
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Home
          </a>
          <a
            onClick={() => handleTabClick(5)}
            className={isActive === 5 ? `${classes.activeNavLink} col` : `${classes.navLink} col`}
            style={{ cursor: 'pointer' }} // Add this line to change cursor to pointer
          >
            <FontAwesomeIcon icon={faCar}></FontAwesomeIcon> Pick Up & Delivery
          </a>
        </nav>
      </div>

      {loading && (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
          <div className="spinner-border text-secondary" role="status">

          </div>
        </div>
      )}
    </>
  );
}

export default Tab;