import { useNavigate, useParams } from 'react-router-dom';
import styles from './Category.module.css';
import image1 from '../../assets/images/category/beauty.jpg';
import image2 from '../../assets/images/category/man.avif';
import image3 from '../../assets/images/category/ac.jpg';
import image4 from '../../assets/images/category/cleaner.jpg';
import image5 from '../../assets/images/category/pluimb.webp';
import image6 from '../../assets/images/category/painter.jpg';
import categoryImage from '../../assets/images/category/category.png';

function Category() {
  const navigate = useNavigate();
  // Extract the city parameter from the URL
  const { city } = useParams<{ city?: string }>();

  // List of valid city names
  const validCities = ['kathmandu', 'lalitpur', 'bhaktapur'];

  // Check if the city parameter is valid
  const isValidCity = typeof city === 'string' && validCities.includes(city);

  const categories = [
    {
      name: `Women's Salon & Spa`,
      image: `${image1}`,
      type: 'b7fdee94-c52a-4aab-986e-84bdf105a9fc',
    },
    {
      name: `Men's Salon & Massage`,
      image: `${image2}`,
      type: 'b7fdee94-c52a-4aab-986e-84bdf105a9fc',
    },
    {
      name: `AC & Appliance Repair`,
      image: `${image3}`,
      type: 'b7fdee94-c52a-4aab-986e-84bdf105a9fc',
    },
    {
      name: `Cleaning & Pest Control`,
      image: `${image4}`,
      type: 'b7fdee94-c52a-4aab-986e-84bdf105a9fc',
    },
    {
      name: `Electrician, Plumber & Carpenters`,
      image: `${image5}`,
      type: 'b7fdee94-c52a-4aab-986e-84bdf105a9fc',
    },
    {
      name: `Painting & Waterproofing`,
      image: `${image6}`,
      type: 'b7fdee94-c52a-4aab-986e-84bdf105a9fc',
    },
  ];

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
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className={styles.box}
                      onClick={() => handleRoute(`${category.type}`)}
                    >
                      <div className={styles.image}>
                        <img
                          className={styles.image}
                          src={category.image}
                          alt=''
                          style={{ mixBlendMode: 'color-burn' }}
                        />
                      </div>
                      <span className={styles.name}>{category.name}</span>
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
