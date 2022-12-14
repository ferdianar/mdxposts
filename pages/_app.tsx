import type { AppProps, NextWebVitalsMetric } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import "@styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  // NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 })

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Current path route: ${url}`)
      NProgress.start()
    }
    const handleStop = () => {
      NProgress.done()
    }
    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleStop)
    router.events.on("routeChangeError", handleStop)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleStop)
      router.events.off("routeChangeError", handleStop)
    }
  }, [router])
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default MyApp
