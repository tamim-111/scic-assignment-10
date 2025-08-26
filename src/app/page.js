import Blog from "./components/Blog.";
import Hero from "./components/Hero";
import RecentListings from "./components/RecentListings";
import Review from "./components/Review";
import SpecialOffers from "./components/SpecialOffers";

export default function Home() {
  return (
    <>
      <Hero></Hero>
      <RecentListings></RecentListings>
      <SpecialOffers></SpecialOffers>
      <Review></Review>
      <Blog></Blog>
    </>
  );
}
