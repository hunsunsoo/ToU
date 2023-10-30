export type BlockType = 'image-vertical' | 'image-horizontal' | 'image-square'

export interface BlockItem {
  type: BlockType
  data: any
  tag: string[]
}

export interface ImageBlockData {
  imageName: string
  alt?: string
  text?: string
  locationName?: string
  locationUrl?: string
  addDate?: string
  id?: number
}
