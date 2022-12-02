import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Lottie from "lottie-react";
import PizzaIconLoading from '../../assets/gif/PizzaIconLoading.json';
import { SkeletonCircle, SkeletonText } from '../../components/PizzaPageSkeleton';

import styles from './PizzaPage.module.scss';

const PizzaPage: React.FC = () => {
  const [data, setData] = useState<{
    imageUrl: string,
    price: number,
    name: string,
    structure: [
      {
        title: string,
        img: string,
        id: number
      }
    ]
  }>();

  const { id } = useParams();
  const fetchData = () => {
    try {
      setTimeout(() =>
          axios.get(`https://637ce41a72f3ce38eab0b9e2.mockapi.io/items/${id}`)
              .then(res => setData(res.data)), 500);
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if(!data) {
    return (
        <div className={styles.loadingContainer}>
          <SkeletonCircle/>
          <SkeletonText/>
        </div>
    )
  }
  return (
    <div className={styles.root}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={data.imageUrl} alt=""/>
      </div>
      <div className={styles.textContainer}>
        <h2 className={styles.pizzaName}>{data.name}</h2>
        <div className={styles.description}>
          <h4 className={styles.sectionTitle}>
            Description:
          </h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto beatae, culpa ipsum laboriosam magnam molestias necessitatibus nesciunt nobis, nulla reprehenderit similique vero voluptatibus? Aspernatur autem dicta, inventore iste reiciendis similique.</p>
        </div>
        <div className={styles.composition}>
          <h4 className={styles.sectionTitle}>
            Composition of the product:
          </h4>
          <ul className={styles.compositionList}>
            {
              data.structure.map(i => (
                  <li className={styles.compositionItem} key={i.id}>
                    <img className={styles.compositionItemImg} src={i.img} alt=""/>
                    <p className={styles.compositionItemTitle}>{i.title}</p>
                  </li>
              ))
            }
          </ul>
        </div>
      </div>

    </div>
  )
}

export default PizzaPage