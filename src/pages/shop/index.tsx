import { useMemo, useState } from "react";
import styled from "styled-components";
import {
  ArrowRight,
  ChevronDown,
  Filter,
  Search,
  ShoppingBag,
  //   SlidersHorizontal,
  X,
  Check,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/router/paths";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const ITEMS_PER_SLIDE = 4;

const chunkItems = <T,>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];

  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }

  return chunks;
};

type ProductCategory =
  | "All"
  | "Skincare"
  | "Haircare"
  | "Body Care"
  | "Beauty"
  | "Accessories";

interface Product {
  id: string;
  name: string;
  category: Exclude<ProductCategory, "All">;
  price: number;
  image: string;
  badge?: string;
  description: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Radiance Face Oil",
    category: "Skincare",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85",
    badge: "Bestseller",
    description:
      "A nourishing facial oil designed to leave your skin soft, hydrated and naturally radiant.",
  },
  {
    id: "2",
    name: "Hydrating Body Butter",
    category: "Body Care",
    price: 14500,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    badge: "New",
    description:
      "A rich body butter formulated to deeply nourish dry skin and lock in moisture.",
  },
  {
    id: "3",
    name: "Silk Hair Treatment",
    category: "Haircare",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1527799820374-dcf8e6d7f7b6?auto=format&fit=crop&w=900&q=85",
    description:
      "A luxurious treatment designed to restore softness, shine and manageability.",
  },
  {
    id: "4",
    name: "Daily Glow Cleanser",
    category: "Skincare",
    price: 12500,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=85",
    description:
      "A gentle daily cleanser that refreshes the skin without stripping away natural moisture.",
  },
  {
    id: "5",
    name: "Luxury Body Mist",
    category: "Beauty",
    price: 16000,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85",
    badge: "Popular",
    description:
      "A beautifully scented body mist for an effortless everyday fragrance.",
  },
  {
    id: "6",
    name: "Nourishing Hair Oil",
    category: "Haircare",
    price: 13500,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    description:
      "A lightweight nourishing oil for healthier-looking, softer and shinier hair.",
  },
  {
    id: "7",
    name: "Exfoliating Body Scrub",
    category: "Body Care",
    price: 15500,
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=85",
    description:
      "A gentle exfoliating scrub that smooths and refreshes the skin.",
  },
  {
    id: "8",
    name: "Beauty Essentials Set",
    category: "Beauty",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    badge: "Gift Set",
    description:
      "A curated collection of beauty essentials, perfect for yourself or someone special.",
  },
];

const categories: ProductCategory[] = [
  "All",
  "Skincare",
  "Haircare",
  "Body Care",
  "Beauty",
  "Accessories",
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter((product) => product.category === activeCategory);
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      );
    }

    if (sort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "Name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, search, sort]);

  const productSlides = useMemo(
    () => chunkItems(filteredProducts, ITEMS_PER_SLIDE),
    [filteredProducts],
  );

  return (
    <PageContainer>
      {/* HERO */}
      <Hero>
        <Navbar />
        <HeroImage
          src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1800&q=90"
          alt="Beauty products"
        />

        <HeroOverlay />

        <HeroContent>
          <HeroText>
            <HeroEyebrow>THE COLLECTION</HeroEyebrow>

            <HeroHeading>
              Beauty,
              <br />
              thoughtfully
              <br />
              curated.
            </HeroHeading>

            <p>
              Discover our collection of beauty essentials, carefully selected
              to make your everyday rituals feel a little more luxurious.
            </p>

            <HeroAction href="#products" whileHover={{ x: 6 }}>
              <span>Explore Products</span>
              <ArrowRight size={16} strokeWidth={1.5} />
            </HeroAction>
          </HeroText>
        </HeroContent>
      </Hero>

      <ShopContent>
        {/* CATEGORY NAV */}
        <CategorySection>
          <ShopHeader>
            <div>
              <ShopTitle>Shop the collection</ShopTitle>

              <p>
                Everyday essentials designed to elevate your beauty routine.
              </p>
            </div>

            <ShoppingBag size={22} strokeWidth={1.5} />
          </ShopHeader>

          <CategoryList>
            {categories.map((category) => (
              <CategoryButton
                key={category}
                $active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </CategoryButton>
            ))}
          </CategoryList>
        </CategorySection>

        {/* TOOLBAR */}
        <Toolbar>
          <ResultsHeader>
            <ResultsInfo>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </ResultsInfo>

            {activeCategory !== "All" && (
              <button type="button" onClick={() => setActiveCategory("All")}>
                {activeCategory}
                <X size={14} />
              </button>
            )}
          </ResultsHeader>

          <SearchBoxWrapper>
            <SearchBox>
              <Search size={18} />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </SearchBox>

            {/* SORT DROPDOWN */}
            <SortDropdown>
              <SortTrigger
                type="button"
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
                aria-expanded={mobileFiltersOpen}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <Filter />
                  {sort}
                </span>

                <ChevronDown
                  size={17}
                  strokeWidth={1.5}
                  className={mobileFiltersOpen ? "open" : ""}
                />
              </SortTrigger>

              {mobileFiltersOpen && (
                <SortMenu>
                  {[
                    "Featured",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Name",
                  ].map((option) => {
                    const isSelected = sort === option;

                    return (
                      <SortOption
                        key={option}
                        type="button"
                        $active={isSelected}
                        onClick={() => {
                          setSort(option);
                          setMobileFiltersOpen(false);
                        }}
                      >
                        <span>{option}</span>

                        {isSelected && <Check size={16} strokeWidth={1.8} />}
                      </SortOption>
                    );
                  })}
                </SortMenu>
              )}
            </SortDropdown>
          </SearchBoxWrapper>
        </Toolbar>

        {filteredProducts.length > 0 ? (
          <ProductSliderWrapper>
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".products-next",
                prevEl: ".products-prev",
              }}
              spaceBetween={30}
              onSlideChange={(swiper) => {
                // Keeps the navigation state handled by Swiper.
                // No additional pagination state is required.
                void swiper;
              }}
            >
              {productSlides.map((slide, slideIndex) => (
                <SwiperSlide key={`products-slide-${slideIndex}`}>
                  <ProductGrid>
                    {slide.map((product) => (
                      <ProductCard key={product.id}>
                        <ProductImage
                          onClick={() =>
                            navigate(PATHS.PRODUCT_DETAILS(product.id))
                          }
                        >
                          <img src={product.image} alt={product.name} />

                          {product.badge && (
                            <ProductBadge>{product.badge}</ProductBadge>
                          )}

                          <ProductActions>
                            <Button
                              type="button"
                              $variant="outline"
                              $size="sm"
                              $fullWidth
                            >
                              <ShoppingBag size={18} />
                              Add to bag
                            </Button>
                          </ProductActions>
                        </ProductImage>

                        <ProductInfo>
                          <ProductMeta>
                            <span>{product.category}</span>
                          </ProductMeta>

                          <ProductName>{product.name}</ProductName>

                          <ProductPrice>
                            {formatPrice(product.price)}
                          </ProductPrice>
                        </ProductInfo>
                      </ProductCard>
                    ))}
                  </ProductGrid>
                </SwiperSlide>
              ))}
            </Swiper>

            {productSlides.length > 1 && (
              <SliderControls>
                <SliderButton
                  type="button"
                  className="products-prev"
                  aria-label="Previous products"
                >
                  <ArrowLeft size={18} strokeWidth={1.5} />
                </SliderButton>

                <SliderButton
                  type="button"
                  className="products-next"
                  aria-label="Next products"
                >
                  <ArrowRight size={18} strokeWidth={1.5} />
                </SliderButton>
              </SliderControls>
            )}
          </ProductSliderWrapper>
        ) : (
          <EmptyState>
            <Filter size={28} strokeWidth={1.3} />

            <h3>No products found</h3>

            <p>Try changing your search or selecting another category.</p>

            <Button
              type="button"
              $fullWidth
              $size="sm"
              $variant="outline"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Clear filters
            </Button>
          </EmptyState>
        )}
      </ShopContent>
      <Footer />
    </PageContainer>
  );
};

export default Shop;

const ProductSliderWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 0 28px;

  .swiper {
    width: 100%;
    overflow: hidden;
  }

  .swiper-slide {
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 20px;
  }
`;

export const SliderControls = styled.div`
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  inset: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  pointer-events: none;
`;

export const SliderButton = styled.button`
  width: 46px;
  height: 46px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};

  box-shadow: ${({ theme }) => theme.shadows.md};

  cursor: pointer;

  pointer-events: auto;

  transition:
    background ${({ theme }) => theme.transitions.normal},
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal},
    transform ${({ theme }) => theme.transitions.fast};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brand.gold};
    background: ${({ theme }) => theme.colors.brand.gold};
    color: ${({ theme }) => theme.colors.neutral.white};

    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 40px;
    height: 40px;
  }
`;

const SortDropdown = styled.div`
  position: relative;
  width: 100%;
`;

const SortTrigger = styled.button`
  width: 100%;
  min-height: 52px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 0 16px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.sm};

  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.card};

  font: inherit;
  font-size: 0.82rem;
  font-weight: 500;

  cursor: pointer;

  transition:
    border-color ${({ theme }) => theme.transitions.normal},
    background ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.gold};
  }

  svg {
    flex-shrink: 0;
    transition: transform ${({ theme }) => theme.transitions.fast};

    &.open {
      transform: rotate(180deg);
    }
  }
`;

const SortMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;

  z-index: 50;

  overflow: hidden;

  padding: 6px;

  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.sm};

  background: ${({ theme }) => theme.colors.background.card};

  box-shadow: ${({ theme }) => theme.shadows.lg};

  animation: sortDropdownIn 160ms ease-out;

  @keyframes sortDropdownIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SortOption = styled.button<{ $active: boolean }>`
  width: 100%;

  min-height: 46px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  padding: 0 12px;

  border: 0;
  border-radius: ${({ theme }) => theme.radii.sm};

  color: ${({ $active, theme }) =>
    $active ? theme.colors.brand.gold : theme.colors.text.primary};

  background: ${({ $active, theme }) =>
    $active ? theme.colors.neutral.cream : "transparent"};

  font: inherit;
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};

  text-align: left;

  cursor: pointer;

  transition:
    background ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    background: ${({ theme }) => theme.colors.neutral.cream};
  }

  svg {
    flex-shrink: 0;
  }
`;

const SearchBoxWrapper = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const PageContainer = styled.main`
  width: 100%;
  background: ${({ theme }) => theme.colors.background.card};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Hero = styled.section`
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  width: 100%;
  height: min(78vh, 760px);
  overflow: hidden;

  @media (max-width: 768px) {
    height: 70vh;
    min-height: 560px;
    margin-bottom: 20rem;
  }
`;

export const HeroImage = styled.img`
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center;
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      90deg,
      rgba(20, 17, 15, 0.7) 0%,
      rgba(20, 17, 15, 0.38) 45%,
      rgba(20, 17, 15, 0.08) 100%
    ),
    linear-gradient(0deg, rgba(20, 17, 15, 0.3), transparent 40%);
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;

  width: min(1400px, calc(100% - 80px));
  height: 100%;

  margin: 0 auto;

  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    align-items: flex-end;
    padding-bottom: 70px;
  }
`;

const HeroAction = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  margin-top: 32px;
  padding-bottom: 8px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.45);

  color: ${({ theme }) => theme.colors.neutral.white};

  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-decoration: none;
  text-transform: uppercase;

  transition:
    color ${({ theme }) => theme.transitions.normal},
    border-color ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.gold};
    border-color: ${({ theme }) => theme.colors.brand.gold};
  }

  svg {
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover svg {
    transform: translateX(3px);
  }
`;

export const HeroText = styled.div`
  max-width: 650px;
  color: #fff;

  p {
    max-width: 520px;

    margin-top: 28px;

    font-size: 16px;
    line-height: 1.8;

    color: rgba(255, 255, 255, 0.82);
  }

  @media (max-width: 768px) {
    p {
      font-size: 14px;
      line-height: 1.7;
    }
  }
`;

export const HeroEyebrow = styled.span`
  display: inline-block;

  margin-bottom: 20px;

  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;

  color: rgba(255, 255, 255, 0.75);
`;

export const HeroHeading = styled.h1`
  margin: 0;

  font-size: clamp(48px, 7vw, 100px);
  line-height: 0.94;
  font-weight: 400;
  letter-spacing: -0.055em;

  font-family: ${({ theme }) => theme.fonts?.display || "inherit"};
`;

export const ShopContent = styled.div`
  width: min(1400px, calc(100% - 80px));

  margin: 0 auto;

  padding: 110px 0 140px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 75px 0 90px;
  }
`;

export const CategorySection = styled.section`
  margin-bottom: 75px;
`;

export const ShopHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 30px;

  padding-bottom: 42px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e7e2dc"};

  svg {
    opacity: 0.65;
  }

  p {
    margin: 15px 0 0;

    max-width: 560px;

    font-size: 15px;
    line-height: 1.7;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;

export const ShopTitle = styled.h2`
  margin: 0;

  font-size: clamp(34px, 4vw, 54px);
  line-height: 1;
  font-weight: 400;
  letter-spacing: -0.045em;
`;

export const CategoryList = styled.div`
  display: flex;
  gap: 12px;

  overflow-x: auto;

  padding: 28px 0 4px;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const CategoryButton = styled.button<{
  $active: boolean;
}>`
  flex-shrink: 0;

  padding: 12px 22px;

  border: 1px solid
    ${({ $active, theme }) =>
      $active
        ? theme.colors.text.primary
        : theme.colors.border?.light || "#ddd"};

  border-radius: 999px;

  background: ${({ $active }) => ($active ? "transparent" : "transparent")};

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 13px;

  cursor: pointer;

  transition:
    border-color 180ms ease,
    background 180ms ease,
    transform 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
    transform: translateY(-1px);
  }
`;

export const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
  //   border: 1px solid red;

  margin-bottom: 35px;

  > div:last-child {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;

    > div:last-child {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

export const ResultsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  button {
    display: flex;
    align-items: center;
    gap: 6px;

    padding: 6px 10px;

    border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};

    border-radius: 999px;

    background: transparent;

    color: ${({ theme }) => theme.colors.text.secondary};

    font: inherit;
    font-size: 12px;

    cursor: pointer;
  }
`;

export const ResultsInfo = styled.span`
  font-size: 13px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const SearchBox = styled.div`
  width: 100%;
  //   border: 1px solid red;

  display: flex;
  align-items: center;
  gap: 9px;

  padding: 11px 14px;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border?.gold || "#ddd"};

  svg {
    flex-shrink: 0;
  }

  input {
    width: 100%;

    border: none;
    outline: none;

    background: transparent;

    color: ${({ theme }) => theme.colors.text.primary};

    font: inherit;
    font-size: 13px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.text.secondary || "#888"};
    }

    @media (max-width: 700px) {
      width: 100%;
    }
  }

  button {
    display: flex;

    border: none;
    background: transparent;

    cursor: pointer;
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const SortButton = styled.button`
  display: flex;
  align-items: center;
  gap: 7px;

  padding: 11px 14px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 12px;

  cursor: pointer;

  svg:last-child {
    margin-left: 8px;
  }
`;

export const ProductGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 45px 22px;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 35px 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductCard = styled.article`
  min-width: 0;
`;

export const ProductBadge = styled.span`
  position: absolute;
  top: 15px;
  left: 15px;

  padding: 7px 10px;

  background: rgba(255, 255, 255, 0.92);

  font-size: 10px;
  font-weight: 600;

  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const ProductActions = styled.div`
  position: absolute;

  right: 15px;
  bottom: 15px;
  left: 15px;

  opacity: 0;

  transform: translateY(10px);

  transition:
    opacity 220ms ease,
    transform 220ms ease;

  button {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    padding: 14px;

    border: none;

    background: ${({ theme }) => theme.colors.background?.card || "#fff"};

    color: ${({ theme }) => theme.colors.text.primary};

    font: inherit;
    font-size: 12px;
    font-weight: 600;

    cursor: pointer;

    transition:
      background 180ms ease,
      color 180ms ease;

    &:hover {
      background: ${({ theme }) => theme.colors.text.primary};

      color: ${({ theme }) => theme.colors.background?.card || "#fff"};
    }
  }

  @media (max-width: 700px) {
    opacity: 1;
    transform: none;

    button {
      padding: 12px;
    }
  }
`;

export const ProductInfo = styled.div`
  padding-top: 18px;
`;

export const ProductMeta = styled.div`
  margin-bottom: 7px;

  span {
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    color: ${({ theme }) => theme.colors.text.secondary || "#888"};
  }
`;

export const ProductName = styled.h3`
  margin: 0;

  font-size: 16px;
  font-weight: 500;
  line-height: 1.3;
`;

export const ProductPrice = styled.p`
  margin: 9px 0 0;

  font-size: 14px;

  color: ${({ theme }) => theme.colors.text.secondary || "#666"};
`;

export const EmptyState = styled.div`
  min-height: 400px;
  max-width: 50vw;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;

  svg {
    margin-bottom: 20px;

    opacity: 0.55;
  }

  h3 {
    margin: 0;

    font-size: 25px;
    font-weight: 400;
  }

  p {
    max-width: 400px;

    margin: 12px 0 25px;

    font-size: 14px;
    line-height: 1.7;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;

export const ProductImage = styled.div`
  position: relative;

  aspect-ratio: 0.82;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background?.darkSoft || "#f2eee9"};

  img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    transition: transform 500ms cubic-bezier(0.2, 0.7, 0.2, 1);
  }

  &:hover img {
    transform: scale(1.045);
  }

  &:hover ${ProductActions} {
    opacity: 1;
    transform: translateY(0);
  }
`;
