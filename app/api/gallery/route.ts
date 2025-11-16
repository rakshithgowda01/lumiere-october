import { NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import { join } from 'path'

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.JPG', '.JPEG', '.PNG', '.GIF', '.WEBP']

interface GalleryFolder {
  folderName: string
  images: string[]
}

export async function GET() {
  try {
    const publicPath = join(process.cwd(), 'public')
    const galleryPath = join(publicPath, 'gallery')
    
    // Read all items in the gallery directory
    const items = await readdir(galleryPath)
    
    const folders: GalleryFolder[] = []
    
    // Process each item
    for (const item of items) {
      const itemPath = join(galleryPath, item)
      const itemStat = await stat(itemPath)
      
      // If it's a directory, read its contents
      if (itemStat.isDirectory()) {
        const files = await readdir(itemPath)
        const images = files
          .filter(file => {
            const ext = file.substring(file.lastIndexOf('.'))
            return IMAGE_EXTENSIONS.includes(ext)
          })
          .sort((a, b) => {
            // Natural sort for better ordering
            return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
          })
          .map(file => `/gallery/${item}/${file}`)
        
        if (images.length > 0) {
          folders.push({
            folderName: item,
            images
          })
        }
      }
    }
    
    // Sort folders alphabetically
    folders.sort((a, b) => a.folderName.localeCompare(b.folderName))
    
    return NextResponse.json({ folders })
  } catch (error) {
    console.error('Error reading gallery folders:', error)
    return NextResponse.json(
      { error: 'Failed to read gallery folders', folders: [] },
      { status: 500 }
    )
  }
}

