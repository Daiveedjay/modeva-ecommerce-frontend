import NavBar from "@/app/_resuseables/nav-bar";
import Footer from "@/app/_sections/footer-section/footer";
import HeroSection from "@/app/_sections/hero-section/hero-section";
import ModevaCollections from "@/app/_sections/modeva-collections-section/modeva-collections";
import NewSection from "@/app/_sections/new-section/new-section";
import OurApproach from "@/app/_sections/our-approach-section/our-approach";

export default function Page() {
  return (
    <>
      {" "}
      <NavBar />
      <div className=" space-y-10 sm:space-y-15 md:space-y-20  xl:space-y-40">
        <HeroSection />
        <NewSection />
        <ModevaCollections />

        <OurApproach />
        <Footer />
        {/* <Footer /> */}
      </div>
    </>
  );
}
