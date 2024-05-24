/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Category.module.css';
import categoryImage from '../../assets/images/category/category.png';
import { fetchCategories } from '../../api/connection';
import { useQuery } from 'react-query';
import { BACKEND_URL } from '../../constants/constants';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from 'react';

function Category() {
  const navigate = useNavigate();
  // Extract the city parameter from the URL
  const { city } = useParams<{ city?: string }>();

  // List of valid city names
  const validCities = ['kathmandu', 'lalitpur', 'bhaktapur'];

  // Check if the city parameter is valid
  const isValidCity = typeof city === 'string' && validCities.includes(city);


  const { data: category } = useQuery('category', () => fetchCategories(1, 10));
  const data = category?.data.data.result;
  console.log(data);

  const handleRoute = (category: string) => {
    navigate(`/${city}/${category}`);
  };

  if (isValidCity) {
    return (
      <>
        <div className='container'>
          <div className={styles.content}>
            <div className={styles.left}>
              <h1 className={styles.h1}>Home services on your doorstep!</h1>
              <div className={styles.category}>
                <h4 className={styles.h4}>What are you looking for?</h4>
                <div className={styles.category_items}>
                  {data?.map((data: { id: string; image: string; category_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }, index: Key | null | undefined) => (
                    <div
                      key={index}
                      className={styles.box}
                      onClick={() => handleRoute(`${data.id}`)}
                    >
                      <div className={styles.image}>
                        <img
                          className={styles.image}
                          src={`${BACKEND_URL}` + data.image}
                          alt=''
                          style={{ mixBlendMode: 'color-burn' }}
                        />
                      </div>
                      <span className={styles.name}>{data.category_name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <img src={categoryImage} alt='' />
            </div>
          </div>
        </div>
        <div className='container'>
          <div className={styles.new_services}>
            <h1 className={styles.h1}>New and noteworthy</h1>
            <div className={styles.new_services}>Service1</div>
          </div>
        </div>
        <div className='container'>
          <div className={styles.most_booked}>
            <h1 className={styles.h1}>Most booked services</h1>
            <div className={styles.most_booked}>Service1</div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='container'>
          <div className={styles.location}>
            <h3>Looks like we aren't here yet.</h3>
            <p>We will come here soon! Please try another location for now</p>
          </div>
        </div>
      </>
    );
  }
}

export default Category;
