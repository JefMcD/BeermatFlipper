
// Import react libraries
import { useState } from 'react'

// Import Project SVG components
import PrevButton from './assets/svg_components/prev.jsx'
import NextButton from './assets/svg_components/next.jsx'

// Import Component Styles
import './css/svgBeermat.css'

// Project 'Database'
import image_database from './database/imageDB'


const BeermatTitle = (props) => {
  return(
    <div className='pic-title'>
      {props.beermat_title}
    </div>
  )

}

const BeermatGallery = (props) => {
  return(
    <div className='main-pic-container'>
      <img className='main-pic' src={props.picture} />
    </div>
  )
}

const BeermatDescription = (props) => {
  return(
    <div className="pic-description-container">

    <div className="pic-description">
      <div className="scroll-content">
        {props.descrip}
      </div>
    </div>

    <div className="fade-effect"></div>
    
  </div>
  )
}

const BeermatNav = (props) => {
  return(
    
    <div className='gallery-nav'>

      <div className='nav-btn ' id='prev-arrow' onClick = {props.prev}>
        <PrevButton />
      </div>

      <div className='nav-btn' id='next-arrow' onClick = {props.next}>
        <NextButton />
      </div>
    </div>
  )
}





const SvgBeermat = (props) => {
  const baseUrl = './src/assets/images/pics/'
 
  const [count, setCount] = useState(0)
  const [galleryPic, setGalleryPic] = useState(image_database[0])

  console.log('galleryPic = ', galleryPic)
  console.log('Initial galleryPic Id = ', galleryPic.id)
  console.log('image location = ', baseUrl+galleryPic.imgName)

  /* nextImage is a closure function which returns the next index in the image_database */
  /* and sets the new state                                                             */
  const nextImage = () => {

    const currentid = galleryPic.id
    var nextImageIndex = image_database.length

    // iterate through the imageDatabase and search for the object with the corrosponding id
    const last_image_index = image_database.length-1
    console.log('last image = ', last_image_index)
    for(let i=0; i<image_database.length; i++){
      if(image_database[i].id === currentid ){
        if(i != last_image_index){
          console.log('index = ', i)
          nextImageIndex = i + 1 // index of next image
        }else{ // last image
          nextImageIndex = i // current image
        }
      }
    }
    if(currentid === image_database[nextImageIndex].id){
      // last image so do a gsap bounce
      gsap.from("#next-arrow", { x: -20, duration: 0.35 });
    }else{
      // load next image and update state
      const newGalleryPic = {...image_database[nextImageIndex]}
      setGalleryPic(newGalleryPic)
    }



  }



  /* prevImage is a closure function that returns the prev image in the image_databse */
  /* and sets the new state                                                           */
  const prevImage = () => {

    const currentid = galleryPic.id
    var prevImageIndex = 0

    // iterate through the imageDatabase and search for the object with the corrosponding id
    const first_image_index = 0
    for(let i=0; i<image_database.length; i++){
      if(image_database[i].id === currentid ){
        if(i != first_image_index){
          prevImageIndex = i - 1 // index of prev image
        }else{ // last image
          prevImageIndex = i // current image
        }
      }
    }

    // Change State or Bounce
    if(currentid != image_database[prevImageIndex].id){
      // If not first image change state to previous image
      const newGalleryPic = {...image_database[prevImageIndex]}
      setGalleryPic(newGalleryPic)
    }else{
      // If prev clicked on first image, animate a bounce
      gsap.from("#prev-arrow", { x: 20, duration: 0.35 });
    }

  }



  return (
    <>
      <div className='beermat-container'>

        <BeermatTitle beermat_title = {galleryPic.title} />

        <BeermatGallery picture = {baseUrl+galleryPic.imgName} />

        <BeermatDescription descrip = {galleryPic.description} />

        <BeermatNav prev = {prevImage} next = {nextImage}/>

      </div>
    </>
  )
}

export default SvgBeermat
