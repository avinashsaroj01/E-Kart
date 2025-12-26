import NavBar from "../features/navbar/Navbar";
import AdminProductList from "../features/product copy/components/AdminProductList";

function Home() {
  return (
    <div>
      <NavBar>
        <AdminProductList></AdminProductList>
      </NavBar>
    </div>
  );
}

export default Home;
