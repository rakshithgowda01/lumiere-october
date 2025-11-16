import { NextResponse } from 'next/server'

// Google Drive folder IDs
const DRIVE_FOLDER_IDS: Record<string, string> = {
  boxing: "1NQU_f6yya0LWnsybExRA_ctVFUZjnrV6",
  food: "1RBtzqXIVl4-cp03VZSUxFndVyGTmiafe",
  gym: "14TbyU-TAWsiqo2JHb_q1nf9pL-24WWzt",
  jewellery: "1ewTYQD0NbfgE2sHmMMP1SUyS88E6cKoQ",
  portraits: "1vkEl6sOR0Mqv6qp2f_mDsWNkGxolfCBp",
  sports: "15ukGGuJAmjUmlrmaDsu3dfBGtnjx-lho",
  reels: "1Fl4i5xX_KBMeanEdvRF8X9ssAk-pYpsH",
}

interface DriveImage {
  id: string
  name: string
  thumbnailLink?: string
  webViewLink?: string
}

// Convert Google Drive file ID to direct image URL
const getDriveImageUrl = (fileId: string, thumbnail: boolean = false) => {
  if (thumbnail) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`
  }
  return `https://drive.google.com/uc?export=view&id=${fileId}`
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const folderId = searchParams.get('folderId')
    const category = searchParams.get('category')

    if (!folderId && !category) {
      return NextResponse.json(
        { error: 'folderId or category is required' },
        { status: 400 }
      )
    }

    const targetFolderId = folderId || DRIVE_FOLDER_IDS[category || '']
    
    if (!targetFolderId) {
      return NextResponse.json(
        { error: 'Invalid folder ID or category' },
        { status: 400 }
      )
    }

    // Note: To use Google Drive API, you need:
    // 1. Enable Google Drive API in Google Cloud Console
    // 2. Create credentials (API key or OAuth)
    // 3. Set up the API key in environment variables
    
    // For now, we'll return a structure that can be populated
    // You can either:
    // A) Use Google Drive API with API key (set NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY)
    // B) Manually provide file IDs
    // C) Use embedded iframe (current fallback)

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY

    if (apiKey) {
      try {
        const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${targetFolderId}'+in+parents+and+mimeType+contains+'image'&fields=files(id,name,thumbnailLink,webViewLink)&key=${apiKey}`
        
        const response = await fetch(apiUrl, {
          headers: {
            'Accept': 'application/json',
          },
        })
        const data = await response.json()

        if (data.files && Array.isArray(data.files)) {
          const images = data.files.map((file: DriveImage) => ({
            id: file.id,
            src: getDriveImageUrl(file.id, false),
            thumbnail: file.thumbnailLink || getDriveImageUrl(file.id, true),
            title: file.name.replace(/\.[^/.]+$/, ''), // Remove extension
          }))

          return NextResponse.json({ images })
        }
      } catch (apiError) {
        console.error('Google Drive API error:', apiError)
        // Fall through to return empty array
      }
    }

    // Return empty array - will use embedded iframe as fallback
    return NextResponse.json({ images: [] })
  } catch (error) {
    console.error('Error fetching Drive images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images', images: [] },
      { status: 500 }
    )
  }
}

