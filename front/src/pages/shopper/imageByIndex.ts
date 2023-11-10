import image1 from './images/slide-1.png'
import image2 from './images/slide-2.png'
import image3 from './images/slide-3.png'
import image4 from './images/slide-4.png'

export const images: string[] = [image1, image2, image3, image4]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex
