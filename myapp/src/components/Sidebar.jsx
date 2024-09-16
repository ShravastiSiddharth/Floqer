import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faChessBoard, faGear, faUserPlus, faChartSimple, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Sidebar.module.css'

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.userInfoCont}>
            <div className={styles.userInfo}>
            <FontAwesomeIcon icon={faUser} style={{fontSize:'2rem',}}/>
                <h2>Devin</h2>
             
               
               
            </div>
            </div>
            <nav className={styles.sidenav}>
                <ul>
                    <li> <FontAwesomeIcon icon={faHouse} style={{color: "#7d7d7d",}} />
                        
                       
                           <p> Home</p>
                       
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faChessBoard} style={{color: "#7d7d7d",}}/>
                        
                          <p>  Boards</p>
                       
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faGear} style={{color: "#7d7d7d",}}/>
                       
                            <p>Settings</p>
                        
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faUserPlus} style={{color: "#7d7d7d",}}/>
                       
                            <p>Teams</p>
                       
                    </li>
                    <li>
                    <FontAwesomeIcon icon={faChartSimple} style={{color: "#7d7d7d",}}/>
                      
                            <p>Analytics</p>
                       
                    </li>
                </ul>
            </nav>
            
           
            
            <button  className={styles.logoutbtn}><FontAwesomeIcon icon={faRightFromBracket} />Logout</button>
            
        </div>
    );
};

export default Sidebar;
