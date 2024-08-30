"use client"; 

import React, { useState, useEffect,ChangeEvent} from 'react';
import styles from './selection.module.css'; 


export default function CitySelection (){

    const [cities, setCities] = useState<CityData[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('')

  
    useEffect(() => {
        async function fetchCities() {
          try {
            const { default: data } = await import('@/app/api/cities.json');
            setCities(data as CityData[]);
          } catch (error) {
            console.error('Data loading error:', error);
          }
        }
        fetchCities();
      }, []);


    interface CityData {
        city: string;
        federal_district: string;
        fias_id: string;
        kladr_id: string;
        lat: string;
        lon: string;
        okato: number;
        oktmo: number;
        population: number;
        region_iso_code: string;
        region_name: string;
      }
  
    const handleCitySelect = (cityData: CityData) => {
      setSelectedCity(cityData.city);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        console.log('searchQuery:', searchQuery);
    };

    // Фильтрация списка городов на основе строки поиска
    const filteredCities = cities.filter(city =>
        city.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  





    return <div className={styles.container}>
    <div className={styles.goBackContainer}>
        <button className={styles.backBtn}>
            <img src='/goback-icon.svg' alt='goback' className={styles.goBackIcon}/>
        </button>                
    </div>
    <div className={styles.searchBar}>
        <img src='/search-icon.svg' alt='search' className={styles.searchIcon}/>
        <input type='text' placeholder='Enter the city name' className={styles.cityInput} value={searchQuery} onChange={handleSearchChange}/>
    </div>
    <ul className="city-list">
        {filteredCities.map((city) => (
          <li key={city.fias_id} onClick={() => handleCitySelect(city)}  className={`${styles.cityItem} ${selectedCity === city.city ? styles.selected : ''}`}>
                        <span>{city.city}</span>
            {selectedCity === city.city && <span className="checkmark">✔️</span>}
          </li>
        ))}
      </ul>

    </div>
}