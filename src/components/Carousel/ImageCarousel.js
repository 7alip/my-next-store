import { CarouselProvider, Slide, Slider, Dot } from 'pure-react-carousel'
import { Button, Container, Image } from 'semantic-ui-react'
import 'pure-react-carousel/dist/react-carousel.es.css'
import styled from 'styled-components'

const Img = styled(Image)`
  width: 100%;
  height: 500px;
  object-fit: cover;
`

function CustomDotGroup({ slides, size }) {
  return (
    <Container
      textAlign='center'
      style={{ position: 'absolute', bottom: '5px' }}
    >
      <Button.Group size={size}>
        {[...Array(slides).keys()].map(slide => (
          <Button as={Dot} key={slide} icon='circle' slide={slide} />
        ))}
      </Button.Group>
    </Container>
  )
}

function ImageSlide({ index, src }) {
  return (
    <Slide index={index}>
      <Img style={{ width: '100%' }} src={src} />
    </Slide>
  )
}

const ImageCarousel = () => (
  <CarouselProvider
    naturalSlideWidth={3}
    naturalSlideHeight={1}
    totalSlides={3}
    style={{ marginBottom: '20px', position: 'relative' }}
  >
    <Slider>
      <ImageSlide src='https://picsum.photos/900/500' index={0} />
      <ImageSlide src='https://source.unsplash.com/random/900x500' index={1} />
      <ImageSlide src='https://loremflickr.com/900/500' index={2} />
    </Slider>
    <CustomDotGroup slides={3} size='mini' />
  </CarouselProvider>
)

export default ImageCarousel
