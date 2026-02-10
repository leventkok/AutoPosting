import { Hero } from "./components/landing/Hero";
import { Features } from "./components/landing/Features";
import { HowItWorks } from "./components/landing/HowItWorks";


export default function Home(){
  return(
    <main>
      <Hero />
      <Features />
      <HowItWorks />
    </main>
  )
}
