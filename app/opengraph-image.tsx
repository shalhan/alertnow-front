import { ImageResponse } from 'next/og'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={"/cover.png"} height="100" />
      </div>
    )
  )
}