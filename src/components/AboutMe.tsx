import { useEffect, useState } from 'react'
import { characters, period_month } from '../utils/constants'
import { HeroInfo } from '../utils/types';
import { useParams } from 'react-router-dom';

const AboutMe = () => {
  const [hero, setHero] = useState<HeroInfo>();
  const { heroid } = useParams();

  useEffect(() => {

    //Option 1
    // let currentHeroId = heroid ?? 'luke';
    // if (!characters[heroid as keyof typeof characters] ) {
    //   currentHeroId = 'luke';
    // }

    //Option 2
    const defaultHeroId = Object.keys(characters)[0];
    const currentHeroId = heroid && characters[heroid as keyof typeof characters] ? heroid : defaultHeroId;

    const selectedHero = characters[currentHeroId as keyof typeof characters];
    const hero = JSON.parse(localStorage.getItem(currentHeroId)!);
    if (hero && ((Date.now() - hero.time) < period_month)) {
      setHero(hero.payload)
    }
    else {
      fetch(selectedHero.url)
        .then(response => response.json())
        .then(data => {
          const info = {
            name: data.name,
            gender: data.gender,
            birth_year: data.birth_year,
            height: data.height,
            mass: data.mass,
            hair_color: data.hair_color,
            skin_color: data.skin_color,
            eye_color: data.eye_color
          }
          setHero(info);
          localStorage.setItem(currentHeroId, JSON.stringify({
            time: Date.now(),
            payload: info
          }))
        })
    }
    return () => console.log(`Component about me unmounted!`);
  }, [heroid])

  return (
    <>
      {(!!hero) &&
        <div className='text-3xl leading-loose text-justify tracking-widest ml-8'>
          {Object.keys(hero).map(key => <p key={key}><span className='text-[1.5em] capitalize'>{key.replace('_', ' ')}:</span> {hero[key as keyof HeroInfo]}</p>)}
        </div>
      }
    </>
  )
}

export default AboutMe