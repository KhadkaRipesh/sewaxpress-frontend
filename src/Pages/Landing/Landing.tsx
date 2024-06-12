import styles from './Landing.module.css';
import image from '../../assets/images/ru-service-provider.png';
import whyImage from '../../assets/images/sv.png';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import Footer from '../../Components/resuable/Footer';
import { useNavigate } from 'react-router-dom';
function LandingPage() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value);
    navigate(`/${event.target.value}`);
  };
  return (
    <>
      <div className='container'>
        <div className={styles.section}>
          <div className={styles.image}>
            <img src={image} alt='service providers' />
          </div>
          <div className={styles.content_box}>
            <span className={styles.company}>SewaXpress</span>
            <h1 className={styles.slogan}>Quality home services, on demand</h1>
            <p className={styles.sub_slogan}>
              Bringing convenience to your doorstep with our home services!
            </p>
            <div className={styles.select_menu}>
              <p className={styles.question}>Where do you need Service?</p>
              <FormControl fullWidth className={styles.form}>
                <InputLabel id={styles.label}>City</InputLabel>
                <Select
                  labelId='label'
                  id={styles.select}
                  value={city}
                  label='City'
                  onChange={handleChange}
                  style={{ outline: 'none' }}
                >
                  <MenuItem value={'Kathmandu'}>Kathmandu</MenuItem>
                  <MenuItem value={'Lalitpur'}>Lalitpur</MenuItem>
                  <MenuItem value={'Bhaktapur'}>Bhaktapur</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className={styles.containerr}>
          <div className={styles.left}>
            <h2>Why SewaXpress?</h2>
            <ul className={styles.why_us}>
              <li>
                <div className={styles.why_image}>
                  <img
                    src='https://res.cloudinary.com/urbanclap/image/upload/q_40,f_auto/categories/category_v2/category_29614d40.png'
                    alt=''
                    height={80}
                  />
                </div>
                <section>
                  <h3>Transparent Pricing</h3>
                  <p>See fixed prices before you book. No hidden charges.</p>
                </section>
              </li>
              <li>
                <div className={styles.why_image}>
                  <img
                    src='https://res.cloudinary.com/urbanclap/image/upload/q_40,f_auto/categories/category_v2/category_2cc7d0d0.png'
                    alt=''
                    height={80}
                  />
                </div>
                <section>
                  <h3>Professional Support</h3>
                  <p>Dedicated customer service team for constant support.</p>
                </section>
              </li>
              <li>
                <div className={styles.why_image}>
                  <img
                    src='https://res.cloudinary.com/urbanclap/image/upload/q_40,f_auto/categories/category_v2/category_2caafa00.png'
                    alt=''
                    height={80}
                  />
                </div>
                <section>
                  <h3>Wide range services</h3>
                  <p>We bring everything needed to get the job done well.</p>
                </section>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <img src={whyImage} className={styles.why_image} alt='' />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LandingPage;
