import React, { useState } from "react";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";

import Helmet from "../components/Helmet/Helmet";
import ProductsList from "../components/UI/ProductsList";
import "../styles/shop.css";

import products from "../assets/data/products";

const filterProducts = (filterValue, searchValue) => {
  const filterProductsSuccess =
    filterValue === "all"
      ? products
      : products.filter((item) => item.category === filterValue);

  const searchProducts =
    searchValue === ''
      ? filterProductsSuccess
      : filterProductsSuccess.filter((item) =>
          item.productName.toLowerCase().includes(searchValue.toLowerCase())
        );
  return searchProducts;
};

const Shop = () => {
  const [productsData, setProductsData] = useState(products);
  const [filterValue, setFilterValue] = useState('all');
  const [searchValue, setSearchValue] = useState('');

  const handleFilter = (e) => {
    const currentFilterValue = e.target.value;
    const filterProductsSuccess = filterProducts(currentFilterValue, searchValue);

    setFilterValue(currentFilterValue);
    setProductsData(filterProductsSuccess);
  };

  const handleSearch = (e) => {
    const currentSearchValue = e.target.value;
    const searchedProducts = filterProducts(filterValue, currentSearchValue)
    
    setSearchValue(e.target.value);
    setProductsData(searchedProducts);
  };

  return (
    <Helmet title="Shop">
      <CommonSection title="Products" />
      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="all">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box" onChange={handleSearch}>
                <input type="text" placeholder="Search ...." />
                <span>
                  <i className="ri-search-line"></i>
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {productsData.length === 0 ? (
              <h1 className="text-center fs-4">No products are found !</h1>
            ) : (
              <ProductsList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Shop;
