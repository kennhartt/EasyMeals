import Navbar from "../components/navbar";
import Banner from "../components/banner";
import SearchResults from "../components/searchResults";

export default function Index() {
  return (
    <React.Fragment>
      <div>
        <Navbar />
        <Banner />
        <SearchResults />
      </div>
    </React.Fragment>
  );
}
