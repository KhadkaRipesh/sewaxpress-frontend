import { NavLink } from 'react-router-dom';
import { navlinks } from '../../Constants';
import styles from './Nav.module.css';
const routes = navlinks;
function Nav() {
  return (
    <>
      <div className={styles.container}>
        <div className='row'>
          {routes.map((data) => {
            return (
              <NavLink to={data.route}>
                <div className='label'>{data.label}</div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Nav;
