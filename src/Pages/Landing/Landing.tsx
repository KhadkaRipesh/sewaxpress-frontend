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
function LandingPage() {
  const [city, setCity] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };
  return (
    <>
      <div className='container'>
        <div className={styles.section}>
          <div className={styles.image}>
            <img src={image} alt='service providers' width={400} />
          </div>
          <div className={styles.content_box}>
            <span className={styles.company}>SewaXpress</span>
            <h1 className={styles.slogan}>Quality home services, on demand</h1>
            <p className={styles.sub_slogan}>
              Hami kaha sabai sewa uplabdha xa
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
                >
                  <MenuItem value={'kathmandu'}>Kathmandu</MenuItem>
                  <MenuItem value={'lalitpur'}>Lalitpur</MenuItem>
                  <MenuItem value={'bhaktapur'}>Bhaktapur</MenuItem>
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
                <div className={styles.why_image}></div>
                <section>
                  <h3>Transparent Pricing</h3>
                  <p>See fixed prices before you book. No hidden charges.</p>
                </section>
              </li>
              <li>
                <div className={styles.why_image}></div>
                <section>
                  <h3>Professional Support</h3>
                  <p>Dedicated customer service team for constant support.</p>
                </section>
              </li>
              <li>
                <div className={styles.why_image}></div>
                <section>
                  <h3>Wide range services</h3>
                  <p>See fixed prices before you book. No hidden charges.</p>
                </section>
              </li>
            </ul>
          </div>
          <div className={styles.right}>
            <img src={whyImage} alt='' height={400} />
          </div>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
