import Blog from "./components/Blog.";
import Hero from "./components/Hero";
import Review from "./components/Review";
import SpecialOffers from "./components/SpecialOffers";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <SpecialOffers></SpecialOffers>
      <Review></Review>
      <Blog></Blog>
    </>
  );
}
