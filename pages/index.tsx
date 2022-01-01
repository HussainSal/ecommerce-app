import { Fragment, useEffect, useState } from "react";
import classes from "../styles/index.module.css";
import Image from "next/image";
import {
  Button,
  Typography,
  makeStyles,
  Card,
  Link,
  Box,
} from "@material-ui/core";
import { Grid } from "@mui/material";
import promotinalLamp from "../assets/images/promotionallamp.png";
import promotionChair from "../assets/images/promotionChair.png";
import { latestProductsCategory } from "../assets/data/allData";
import ShopexofferList from "../components/partials/ShopexofferList";
import uniqueProductSofa from "../assets/images/uniqueFeatureCough.png";
import { discountedLinks } from "../assets/data/allData";
import { Tick } from "../components/icons/icon";
import { topCAtegoryChangehandlerData } from "../assets/data/allData";
import Divider from "../components/partials/Divider";
import product5 from "../assets/images/trendingProduct(4).png";
import product6 from "../assets/images/trendingProduct(5).png";
import NextLink from "next/link";
import { allData } from "../assets/data/allData";
import { Heart, AddToCart, Zoomin } from "../components/icons/icon";
import { doc, updateDoc, getFirestore } from "firebase/firestore";
import { useAppContext } from "../store/authContext";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/dist/client/router";

const db = getFirestore();

const useStyle = makeStyles({
  colorFB2E86: {
    backgroundColor: "#FB2E86",
    width: "24px",
  },
  colorFEBAD7: {
    backgroundColor: "#FEBAD7",
  },
  color00009D: {
    backgroundColor: "#00009D",
  },
  colorF701A8: {
    backgroundColor: "#F701A8",
  },
  color151875: {
    color: "#151875",
  },
  card2: {
    width: "360px",
    Height: "306px",
  },
  featuredProductCard: {
    transition: "all .3s ",
    cursor: "pointer",
    "&:hover > *": {
      "& > *": {
        color: "#fff",
      },
    },
  },
});

//FILTERING FEATURED DATA
const featuredProductMatch = allData.filter((product) => {
  return product.category?.includes("Featured Products");
});

//LATEST PRODUCT DATA
const latestProductMatch = allData.filter((product) => {
  return product.category?.includes("LatestProducts");
});

// TRENDING PRODUCTS DATA
const trendingProductMatch = allData.filter((product) => {
  return product.category?.includes("TrendingProducts");
});

const trendingProductMatch2 = allData.filter((product) => {
  return product.category?.includes("TrendingProducts2");
});

// DISCOUNT PRODUCTS DATA
const discountProductMatch = allData.filter((product) => {
  return product.category?.includes("DiscountCategories");
});

// TOP PRODUCTS DATA
const topProductMatch = allData.filter((product) => {
  return product.category?.includes("TopCategories");
});

export default function Home() {
  const ctx = useAppContext();
  const style = useStyle();
  const [takeToCart, setTakeToCart] = useState(false);
  const router = useRouter();

  const [discountItemActiveLink, setDiscountItemActiveLink] =
    useState("Wood Chair");
  const [changeTopCategory, setChangeTopCategory] = useState(1);
  const [changeLatestCategory, setChangeLatestCategory] = useState(0);

  // ADDING ITEM TO CART
  const itemToCart = (id: number) => {
    // console.log(ctx.loggedin.userData.cartItems.length);
    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      cartItems: ctx.loggedin.userData.cartItems
        ? [...ctx.loggedin.userData.cartItems, id]
        : [id],
    });

    ctx.setReset((prvState) => prvState + 1);
  };

  //ADDING ITEM TO WISHLIST
  const itemToWishlist = (id: number) => {
    updateDoc(doc(db, "user", ctx.loggedin.userId), {
      wishlist: ctx.loggedin.userData.wishlist
        ? [...ctx.loggedin.userData.wishlist, id]
        : [id],
    });

    ctx.setReset((prvState) => prvState + 1);
  };

  const takeToProductDetail = (id: number) => {
    router.push(`products/chair/${id}`);
  };

  console.log(ctx.loggedin);

  return (
    <Fragment>
      <header className={classes.sectionHeader}>
        <div className={classes.containerPromotion}>
          <div className={classes.promotion}>
            <div className={classes.imgContainer}>
              <Image src={promotinalLamp} />
            </div>
            <div className={classes.promotionText}>
              <Typography
                style={{ color: "#FB2E86", textTransform: "capitalize" }}
                variant="subtitle1"
              >
                best furniture for your castle
              </Typography>
              <Typography
                variant="h1"
                style={{ textTransform: "capitalize", marginTop: 12 }}
              >
                new furniture collection trends in 2021
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ color: "#8A8FB9", marginTop: 12 }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna
                in est adipiscing
                <br />
                in phasellus non in justo.
              </Typography>
              <Button
                style={{
                  width: "163px",
                  height: "50px",
                  marginTop: "28px",
                  padding: "16px 40px",
                  textTransform: "capitalize",
                  borderRadius: "2px",
                }}
                color="primary"
                variant="contained"
              >
                shop now
              </Button>
            </div>
          </div>
          <div className={classes.promotionChair}>
            <Image src={promotionChair} />
          </div>
        </div>
      </header>

      {/* FEATURED PRODUCTS */}
      <Divider />
      <section className={classes.featuredSection}>
        <div className={classes.containerFeaturedProducts}>
          <Typography style={{ color: "#1A0B5B" }} variant="h2">
            <b>Featured Products</b>
          </Typography>
          <div className={classes.featuredProductsList}>
            {featuredProductMatch.map((cur, i) => {
              return (
                <div
                  onClick={() => !takeToCart && takeToProductDetail(cur.id)}
                  className={classes.featuredProduct}
                >
                  <Card
                    className={`${classes.featuredProductCard} ${style.featuredProductCard}`}
                  >
                    <div
                      onMouseLeave={() => setTakeToCart(false)}
                      onMouseOver={() => setTakeToCart(true)}
                      className={classes.boxSelect}
                    >
                      <div
                        className={`${classes.cart1} ${
                          ctx.loggedin &&
                          ctx.loggedin.userData.cartItems &&
                          ctx.loggedin.userData.cartItems.length >= 0 &&
                          ctx.loggedin.userData.cartItems.includes(cur.id) &&
                          classes.cartActive
                        } `}
                        onClick={() => {
                          itemToCart(cur.id);
                        }}
                      >
                        <AddToCart />
                      </div>

                      <div
                        className={`${classes.cart1} ${
                          ctx.loggedin &&
                          ctx.loggedin.userData.wishlist &&
                          ctx.loggedin.userData.wishlist.length >= 0 &&
                          ctx.loggedin.userData.wishlist.includes(cur.id) &&
                          classes.cartActive
                        } `}
                        onClick={() => {
                          itemToWishlist(cur.id);
                        }}
                      >
                        <Heart />
                      </div>
                      <div
                        onClick={() => takeToProductDetail(cur.id)}
                        className={classes.cart1}
                      >
                        <Zoomin />
                      </div>
                    </div>
                    <div className={classes.featuredProductImage}>
                      <Image alt="" src={cur.image} />
                    </div>
                    <div className={classes.featuredProductText}>
                      <Typography
                        style={{ marginTop: "8px" }}
                        color="primary"
                        variant="body1"
                      >
                        {cur.heading}
                      </Typography>
                      <div className={classes.featuredProductChange}>
                        <span className={classes.change}></span>
                        <span
                          className={`${classes.change} ${style.colorF701A8}`}
                        ></span>
                        <span
                          className={`${classes.change} ${style.color00009D}`}
                        ></span>
                      </div>

                      <Typography className={style.color151875} variant="body2">
                        {cur.code}
                      </Typography>
                      <Typography className={style.color151875} variant="body2">
                        {cur.price}
                      </Typography>
                    </div>
                  </Card>
                </div>
                //{" "}
                // </NextLink>
              );
            })}
          </div>

          <div className={classes.featuredProductChange}>
            <span className={`${classes.change} ${style.colorFB2E86}`}></span>
            <span className={`${classes.change} ${style.colorFEBAD7}`}></span>
            <span className={`${classes.change} ${style.colorFEBAD7}`}></span>
            <span className={`${classes.change} ${style.colorFEBAD7}`}></span>
          </div>
        </div>
      </section>
      {/* LATEST PRODUCTS */}
      <Divider />
      <section className={classes.sectionLatestproducts}>
        <div className={classes.latestProducts}>
          <Typography style={{ color: "#1A0B5B" }} variant="h2">
            <b>Latest Products</b>
          </Typography>
          <div className={classes.latestProductsCategory}>
            {latestProductsCategory.map((cur, i) => {
              return (
                <Typography
                  key={i}
                  variant="body1"
                  className={`${
                    changeLatestCategory === i
                      ? classes.linkStyleLatestCategory
                      : classes.notActiveLinkLatestCategory
                  }`}
                  onClick={() => {
                    setChangeLatestCategory(i);
                    console.log(i);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {cur}
                </Typography>
              );
            })}
          </div>
          <div className={classes.latestProductList}>
            <Grid container columnGap="37px" rowGap="120px">
              {latestProductMatch.map((cur, i) => {
                return (
                  cur.page == changeLatestCategory && (
                    // <NextLink key={i} href={`products/chair/${cur.id}`}>

                    <Grid className={classes.latestGridBox} item>
                      <Card
                        onClick={() =>
                          !takeToCart && takeToProductDetail(cur.id)
                        }
                        className={style.card2}
                      >
                        <div
                          onMouseLeave={() => setTakeToCart(false)}
                          onMouseOver={() => setTakeToCart(true)}
                          className={classes.boxSelect}
                        >
                          <div
                            className={`${classes.cart1} ${
                              ctx.loggedin &&
                              ctx.loggedin.userData.cartItems &&
                              ctx.loggedin.userData.cartItems.length >= 0 &&
                              ctx.loggedin.userData.cartItems.includes(
                                cur.id
                              ) &&
                              classes.cartActive
                            } `}
                            onClick={() => {
                              itemToCart(cur.id);
                            }}
                          >
                            <AddToCart />
                          </div>

                          <div
                            className={`${classes.cart1} ${
                              ctx.loggedin &&
                              ctx.loggedin.userData.wishlist &&
                              ctx.loggedin.userData.wishlist.length >= 0 &&
                              ctx.loggedin.userData.wishlist.includes(cur.id) &&
                              classes.cartActive
                            } `}
                            onClick={() => {
                              itemToWishlist(cur.id);
                            }}
                          >
                            <Heart />
                          </div>
                          <div
                            onClick={() => takeToProductDetail(cur.id)}
                            className={classes.cart1}
                          >
                            <Zoomin />
                          </div>
                        </div>
                        <div className={classes.latestProductPicture}>
                          <Image alt="" src={cur.image} />
                        </div>
                        <div className={classes.latestProductText}>
                          <Typography style={{ color: "#151875" }}>
                            {cur.name}
                          </Typography>

                          <div className={classes.latestPriceText}>
                            <Typography
                              variant="body2"
                              style={{
                                marginRight: "10px",
                                color: "#151875",
                                fontSize: "14px",
                              }}
                            >
                              {cur.price}
                            </Typography>
                            <Typography
                              variant="body2"
                              style={{
                                textDecoration: "line-through",
                                color: "#FB2448",
                                fontSize: "12px",
                              }}
                            >
                              {cur.EarlierPrice}
                            </Typography>
                          </div>
                        </div>
                      </Card>
                    </Grid>
                    // </NextLink>
                  )
                );
              })}
            </Grid>
          </div>
        </div>
      </section>

      {/* SHOPEX PRODUCTS OFFERS */}
      <Divider />
      <section className={classes.sectionShopex}>
        <div className={classes.containerShopexOffer}>
          <Typography
            style={{ color: "#1A0B5B", marginBottom: "55px" }}
            variant="h2"
          >
            <b>What Shopex Offers</b>
          </Typography>
          <ShopexofferList />
          {/* <div className={classes.shopexOfferList}>
            {shopexOfferList.map((cur, i) => {
              return (
                <Box key={i} className={classes.shopexOfferBox}>
                  <div>
                    <Image
                      width="65px"
                      height="65px"
                      src={cur.image}
                      alt={cur.text}
                    />
                  </div>
                  <Typography
                    style={{
                      color: "#151875",
                      marginBottom: "15px",
                      marginTop: "24px",
                    }}
                    variant="subtitle2"
                  >
                    {cur.heading}
                  </Typography>
                  <Typography
                    style={{ color: "#1A0B5B4D", textAlign: "center" }}
                    variant="subtitle1"
                  >
                    {cur.text}
                  </Typography>
                </Box>
              );
            })}
          </div> */}
        </div>
      </section>

      {/* UNIQUE PRODUCTS */}
      <Divider />
      <section className={classes.sectionUnique}>
        <div className={classes.uniqueFeature}>
          <div className={classes.uniqueFeatureCough}>
            <Image
              width="509px"
              height="550px"
              alt=""
              src={uniqueProductSofa}
            />
          </div>
          <div className={classes.uniqueFeatureText}>
            <Typography style={{ color: "#151875" }} variant="h3">
              <b>Unique Features Of Latest & Trending Products </b>
            </Typography>
            <Typography
              style={{ color: "#ACABC3", marginTop: "30px" }}
              variant="subtitle1"
            >
              <span className={`${classes.cirlcle} ${classes.color1}`} /> All
              frames constructed with hardwood solids and laminates{" "}
            </Typography>
            <Typography
              style={{ color: "#ACABC3", marginTop: "13px" }}
              variant="subtitle1"
            >
              <span className={`${classes.cirlcle} ${classes.color2}`} />{" "}
              Reinforced with double wood dowels,nails cornerand machine nails
            </Typography>
            <Typography
              style={{ color: "#ACABC3", marginTop: "13px" }}
              variant="subtitle1"
            >
              <span className={`${classes.cirlcle} ${classes.color3}`} /> Arms,
              backs and seats are structurally reinforced
            </Typography>
            <div className={classes.uniqueButtonBox}>
              <Button
                style={{
                  marginRight: "20px",
                  width: "157px",
                  height: "45px",
                  textTransform: "capitalize",
                }}
                variant="contained"
                color="primary"
              >
                Add to Cart
              </Button>
              <Typography variant="body2" style={{ color: "#151875" }}>
                B&B Italian Sofa <br />
                $32.00
              </Typography>
            </div>
          </div>
        </div>
      </section>
      {/* TRENDING PRODUCTS */}
      <Divider />
      <section className={classes.sectionTrending}>
        <div className={classes.containerFeaturedProducts}>
          <Typography
            style={{ color: "#1A0B5B", marginBottom: "37px" }}
            variant="h2"
          >
            <b>Trending Products</b>
          </Typography>

          <div className={classes.trendingProductsList1}>
            {trendingProductMatch.map((cur, i) => {
              return (
                <div
                  onClick={() => !takeToCart && takeToProductDetail(cur.id)}
                  className={classes.trendingProduct}
                >
                  <div
                    onMouseLeave={() => setTakeToCart(false)}
                    onMouseOver={() => setTakeToCart(true)}
                    className={classes.boxSelect}
                  >
                    <div
                      className={`${classes.cart1} ${
                        ctx.loggedin &&
                        ctx.loggedin.userData.cartItems &&
                        ctx.loggedin.userData.cartItems.length >= 0 &&
                        ctx.loggedin.userData.cartItems.includes(cur.id) &&
                        classes.cartActive
                      } `}
                      onClick={() => {
                        itemToCart(cur.id);
                      }}
                    >
                      <AddToCart />
                    </div>

                    <div
                      className={`${classes.cart1} ${
                        ctx.loggedin &&
                        ctx.loggedin.userData.wishlist &&
                        ctx.loggedin.userData.wishlist.length >= 0 &&
                        ctx.loggedin.userData.wishlist.includes(cur.id) &&
                        classes.cartActive
                      } `}
                      onClick={() => {
                        itemToWishlist(cur.id);
                      }}
                    >
                      <Heart />
                    </div>
                    <div
                      onClick={() => takeToProductDetail(cur.id)}
                      className={classes.cart1}
                    >
                      <Zoomin />
                    </div>
                  </div>
                  <div className={classes.trendingProductImage}>
                    <Image src={cur.image} alt="" />
                  </div>
                  <div className={classes.trendingProductText}>
                    <Typography
                      style={{ color: "#151875", marginTop: "15px" }}
                      variant="subtitle1"
                    >
                      {cur.name}
                    </Typography>
                    <div className={classes.trendingProductPrice}>
                      <Typography
                        style={{
                          fontSize: "14px",
                          lineHeight: "14px",
                          color: "#151875",
                        }}
                      >
                        {cur.price}
                      </Typography>
                      <Typography
                        style={{
                          textDecoration: "line-through",
                          fontSize: "12px",
                          lineHeight: "12px",
                          color: "#C4C4C4",
                        }}
                      >
                        {cur.earlierPrice}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={classes.trendingProductsList1}>
            {
              <NextLink href={"products/chair"}>
                <div className={classes.trendingProductOffer}>
                  <div className={classes.trendingProductOfferText}>
                    <Typography
                      variant="h5"
                      style={{
                        color: "#151875",
                        cursor: "pointer",
                        marginBottom: "10px",
                      }}
                    >
                      23% off in all products
                    </Typography>
                    <Link
                      style={{ cursor: "pointer" }}
                      color="primary"
                      variant="subtitle1"
                    >
                      Shop now
                    </Link>
                  </div>
                  <div className={classes.trendingProductImage2}>
                    <Image alt="" src={product5} />
                  </div>
                </div>
              </NextLink>
            }
            <NextLink href={"products/chair"}>
              <div className={classes.trendingProductOffer3}>
                <div className={classes.trendingProductOfferText}>
                  <Typography
                    variant="h5"
                    style={{
                      color: "#151875",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    23% off in all products
                  </Typography>
                  <Link
                    style={{ cursor: "pointer" }}
                    color="primary"
                    variant="subtitle1"
                  >
                    View Collection
                  </Link>
                </div>
                <div className={classes.trendingProductImage3}>
                  <Image alt="" src={product6} />
                </div>
              </div>
            </NextLink>

            <div className={classes.exclusiveSeatChairBox}>
              {trendingProductMatch2.map((cur, i) => {
                return (
                  <NextLink key={i} href={`products/chair/${cur.id}`}>
                    <div className={classes.exclusiveSeatChair}>
                      <div className={classes.exclusiveChairImage}>
                        <Image alt="" src={cur.image} />
                      </div>
                      <div className={classes.executiveChairText}>
                        <Typography
                          style={{ color: "#151875" }}
                          variant="body2"
                        >
                          {cur.title}
                        </Typography>
                        <Typography
                          style={{ color: "#151875", fontSize: "12px" }}
                          variant="body2"
                        >
                          {cur.price}
                        </Typography>
                      </div>
                    </div>
                  </NextLink>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* DISCOUNTED PRODUCTS */}
      <Divider />
      <section className={classes.sectionDiscount}>
        <div className={classes.containerFeaturedProducts}>
          <Typography
            style={{ color: "#1A0B5B", marginBottom: "30px" }}
            variant="h2"
          >
            <b>Discount Item</b>
          </Typography>
          <div className={classes.discountProductsContainer}>
            <div className={classes.discountProductsSubcontainer1}>
              {discountedLinks.map((cur) => {
                return (
                  <Typography
                    key={cur}
                    style={{
                      color:
                        discountItemActiveLink === cur ? "#FB2E86" : "#151875",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setDiscountItemActiveLink(cur);
                    }}
                    variant="body1"
                  >
                    {cur}
                  </Typography>
                );
              })}
            </div>
          </div>
          {discountProductMatch.map((data, i) => {
            return (
              data.name === discountItemActiveLink && (
                <div key={i} className={classes.discountProductsSubcontainer2}>
                  <div className={classes.discountProductsSubcontainer2Text}>
                    <Typography variant="h3" style={{ color: "#151875" }}>
                      {data.discountPercentage}
                    </Typography>
                    <Typography
                      color="primary"
                      variant="subtitle2"
                      style={{ marginTop: "15px" }}
                    >
                      {data.name === discountItemActiveLink && data.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      style={{
                        lineHeight: "30px",
                        color: "#B7BACB",
                        marginTop: "20px",
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Eu eget feugiat habitasse nec, bibendum condimentum.
                    </Typography>

                    <Grid container>
                      {data.features.map((feat, i) => {
                        return (
                          <Grid key={i} md={6} item>
                            <Typography
                              variant="subtitle1"
                              style={{
                                lineHeight: "30px",
                                color: "#B7BACB",
                                marginTop: "20px",
                              }}
                            >
                              <div
                                className={classes.discountedProductsFeatures}
                              >
                                <Tick /> {feat}
                              </div>
                            </Typography>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <NextLink href={`products/chair/${data.id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        style={{
                          textTransform: "capitalize",
                          height: "57px",
                          width: "200px",
                          marginTop: "40px",
                        }}
                        disableElevation
                      >
                        Shop now
                      </Button>
                    </NextLink>
                  </div>
                  <div className={classes.discountProductsSubcontainer2Image}>
                    <Image src={data.image} />
                  </div>
                </div>
              )
            );
          })}
        </div>
      </section>

      {/* TOP CATEGORIES */}
      <section className={classes.sectionTopCategories}>
        <div className={classes.containerTopProducts}>
          <Typography
            style={{ color: "#1A0B5B", marginBottom: "53px" }}
            variant="h2"
          >
            <b>Top Categories</b>
          </Typography>
          <div className={classes.topCategoriesList}>
            {topProductMatch.map((cur, i) => {
              return (
                changeTopCategory === cur.identifier && (
                  <div key={i} className={classes.topCategoriesProduct}>
                    <div className={classes.topCategoriesImage}>
                      <div className={classes.topCategoriesInnerImage}>
                        <Image alt="" src={cur.image} />
                      </div>
                      <NextLink href={`products/chair/${cur.id}`}>
                        <Button
                          className={classes.topCategoryButton}
                          style={{
                            marginTop: "170px",
                            backgroundColor: "#08d15f",
                            color: "#fff",
                          }}
                          variant="contained"
                        >
                          View Shop
                        </Button>
                      </NextLink>
                    </div>
                    <div className={classes.topCategoriesText}>
                      <Typography color="secondary" variant="subtitle1">
                        {cur.title}
                      </Typography>
                      <Typography color="secondary" variant="body2">
                        {cur.price}
                      </Typography>
                    </div>
                  </div>
                )
              );
            })}
          </div>
          <div className={classes.changeTopCategoryContainer}>
            {topCAtegoryChangehandlerData.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => {
                    setChangeTopCategory(item);
                  }}
                  className={`${classes.topCategoryChangeCircle} ${
                    changeTopCategory === item ? classes.topCategoryActive : ""
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
}
