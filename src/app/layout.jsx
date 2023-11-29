import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { ThemeContextProvider } from '@/context/ThemeContext'
import ThemeProvider from '@/providers/ThemeProvider'
import AuthProvider from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

let url
if (process.env.VERCEL_URL !== undefined) {
  // url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  url = `https://${process.env.VERCEL_URL}`
} else {
  url = 'http://localhost:3000'
}
console.log("🚀 ~ file: layout.jsx:16 ~ url:", url)
console.log("🚀 ~ file: layout.jsx:16 ~ mongo:", process.env.MONGO_URI)
// console.log("🚀 ~ file: layout.jsx:16 ~ auth url:", process.env.NEXTAUTH_URL)


export const metadata = {
  title: 'Blog App',
  description: 'The best blog app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <svg>
          <filter id='noiseFilter'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.6'
              stitchTiles='stitch' />
            <feColorMatrix in="colorNoise" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
            <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
            <feBlend in="SourceGraphic" in2="monoNoise" mode="screen" />
          </filter>

        </svg>
        {/* <div className="main">
          <div></div>
        </div> */}
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className='container'>
                <div className='wrapper'>
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
