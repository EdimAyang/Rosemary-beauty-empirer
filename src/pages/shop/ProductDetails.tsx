import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "@/router/paths";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/Button";
import { NotFound } from "../services/serviceDetails";

const products = [
  {
    id: "1",
    name: "Radiance Face Oil",
    category: "Skincare",
    price: 18500,
    badge: "Bestseller",
    description:
      "A nourishing facial oil designed to leave your skin soft, hydrated and naturally radiant.",
    longDescription:
      "Our Radiance Face Oil is a luxurious blend created to support soft, healthy-looking skin. Its lightweight texture absorbs beautifully while leaving your skin feeling nourished and naturally luminous.",
    images: [
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: "2",
    name: "Hydrating Body Butter",
    category: "Body Care",
    price: 14500,
    badge: "New",
    description:
      "A rich body butter formulated to deeply nourish dry skin and lock in moisture.",
    longDescription:
      "A rich, comforting body butter designed for moments when your skin needs extra care. Smooth it over the body after bathing for soft, supple and beautifully moisturised skin.",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: "3",
    name: "Silk Hair Treatment",
    category: "Haircare",
    price: 22000,
    description:
      "A luxurious treatment designed to restore softness, shine and manageability.",
    longDescription:
      "A nourishing hair treatment created to help restore softness and shine. Designed to become an effortless part of your weekly hair-care ritual.",
    images: [
      "https://images.unsplash.com/photo-1527799820374-dcf8e6d7f7b6?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=90",
    ],
  },
  {
    id: "4",
    name: "Daily Glow Cleanser",
    category: "Skincare",
    price: 12500,
    description:
      "A gentle daily cleanser that refreshes the skin without stripping away natural moisture.",
    longDescription:
      "A gentle cleanser made for everyday use. It refreshes the skin while helping maintain its comfortable, hydrated feel.",
    images: [
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=1200&q=90",
    ],
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = products.find((item) => item.id === productId);
  console.log(productId, product);

  if (!product) {
    return (
      <>
        <NotFound>
          <h1>Product not found</h1>

          <p style={{ marginBottom: "2rem" }}>
            The product you're looking for doesn't exist.
          </p>

          <Button
            type="button"
            $fullWidth
            $size="sm"
            $variant="outline"
            onClick={() => navigate(PATHS.SHOP)}
          >
            <ArrowLeft size={16} />
            Back to shop
          </Button>
        </NotFound>
      </>
    );
  }

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  return (
    <Container>
      <Breadcrumb>
        <BackButton type="button" onClick={() => navigate(PATHS.SHOP)}>
          <ArrowLeft size={17} />
          Back to shop
        </BackButton>

        <span>Shop / {product.name}</span>
      </Breadcrumb>

      <Details>
        {/* PRODUCT GALLERY */}
        <Gallery>
          <GalleryImage>
            {product.badge && <ProductBadge>{product.badge}</ProductBadge>}

            <img src={product.images[activeImage]} alt={product.name} />
          </GalleryImage>

          <div>
            {product.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setActiveImage(index)}
              >
                <img src={image} alt={`${product.name} ${index + 1}`} />
              </button>
            ))}
          </div>
        </Gallery>

        {/* PRODUCT INFORMATION */}
        <Info>
          <DetailsContent>
            <ProductMeta>{product.category}</ProductMeta>

            <DetailsHeader>
              <ProductName>{product.name}</ProductName>

              <DetailsPrice>{formatPrice(product.price)}</DetailsPrice>
            </DetailsHeader>

            <DetailsDescription>{product.description}</DetailsDescription>

            <ProductSection>
              <DetailsDescription>{product.longDescription}</DetailsDescription>
            </ProductSection>

            {/* QUANTITY */}
            <ProductSection>
              <DetailsCategory>Quantity</DetailsCategory>

              <QuantityControl>
                <QuantityButton
                  type="button"
                  onClick={decreaseQuantity}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </QuantityButton>

                <QuantityValue>{quantity}</QuantityValue>

                <QuantityButton
                  type="button"
                  onClick={increaseQuantity}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </QuantityButton>
              </QuantityControl>
            </ProductSection>

            {/* ADD TO BAG */}
            <Button
              type="button"
              $variant="outline"
              $size="sm"
              $fullWidth
              onClick={() => {
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    category: product.category,
                  },
                  quantity,
                );

                openCart();
              }}
            >
              <ShoppingBag size={18} />
              Add to bag
            </Button>
          </DetailsContent>
        </Info>
      </Details>

      <RelatedSection>
        <RelatedHeader>
          <span>YOU MAY ALSO LIKE</span>
          <h2>Complete your ritual.</h2>
        </RelatedHeader>
      </RelatedSection>
    </Container>
  );
};

export default ProductDetails;

export const Container = styled.main`
  width: min(1400px, calc(100% - 80px));
  margin: 0 auto;

  padding: 45px 0 130px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);
    padding: 30px 0 90px;
  }
`;

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;

  margin-bottom: 55px;

  font-size: 12px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};

  span {
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    margin-bottom: 35px;

    span {
      display: none;
    }
  }
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  border: none;
  background: transparent;

  padding: 0;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 12px;

  cursor: pointer;
`;

export const Details = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);

  gap: clamp(50px, 8vw, 120px);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;

    gap: 55px;
  }
`;

export const Gallery = styled.div`
  > div:last-child {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

    gap: 10px;

    margin-top: 10px;

    button {
      padding: 0;

      border: 1px solid transparent;

      background: transparent;

      cursor: pointer;

      overflow: hidden;

      &.active {
        border-color: ${({ theme }) => theme.colors.text.primary};
      }

      img {
        width: 100%;
        aspect-ratio: 1;

        display: block;

        object-fit: cover;
      }
    }
  }
`;

export const GalleryImage = styled.div`
  position: relative;

  width: 100%;
  aspect-ratio: 0.88;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background?.darkSoft || "#f3efea"};

  img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
  }
`;

export const ProductBadge = styled.span`
  position: absolute;

  top: 20px;
  left: 20px;

  z-index: 2;

  padding: 8px 12px;

  background: rgba(255, 255, 255, 0.94);

  font-size: 10px;
  font-weight: 600;

  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const Info = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 900px) {
    display: block;
  }
`;

export const DetailsContent = styled.div`
  width: 100%;

  max-width: 520px;
`;

export const ProductMeta = styled.span`
  display: block;

  margin-bottom: 18px;

  font-size: 11px;
  font-weight: 600;

  letter-spacing: 0.16em;
  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const DetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding-bottom: 28px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e4dfda"};
`;

export const ProductName = styled.h1`
  margin: 0;

  font-size: clamp(40px, 5vw, 65px);

  font-weight: 400;
  line-height: 0.98;

  letter-spacing: -0.055em;
`;

export const DetailsPrice = styled.div`
  font-size: 17px;

  color: ${({ theme }) => theme.colors.text.primary};
`;

export const DetailsDescription = styled.p`
  margin: 25px 0 0;

  font-size: 14px;
  line-height: 1.8;

  color: ${({ theme }) => theme.colors.text.secondary || "#6f6b67"};
`;

export const ProductSection = styled.div`
  margin-top: 38px;
  margin-bottom: 3rem;
`;

export const DetailsCategory = styled.h3`
  margin: 0 0 14px;

  font-size: 11px;
  font-weight: 600;

  letter-spacing: 0.14em;
  text-transform: uppercase;
`;

export const QuantityControl = styled.div`
  width: fit-content;

  display: flex;
  align-items: center;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};
`;

export const QuantityButton = styled.button`
  width: 44px;
  height: 44px;

  display: grid;
  place-items: center;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background.dark};

    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

export const QuantityValue = styled.span`
  width: 42px;

  text-align: center;

  font-size: 13px;
`;

export const AddToBagButton = styled.button`
  width: 100%;

  margin-top: 35px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 17px 24px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: transparent;

  color: ${({ theme }) => theme.colors.background?.darkSoft || "#fff"};

  font: inherit;
  font-size: 13px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 180ms ease,
    color 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.dark};

    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

export const RelatedSection = styled.section`
  margin-top: 150px;

  padding-top: 80px;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e4dfda"};

  @media (max-width: 768px) {
    margin-top: 100px;
    padding-top: 60px;
  }
`;

export const RelatedHeader = styled.div`
  span {
    display: block;

    margin-bottom: 15px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.18em;
    text-transform: uppercase;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }

  h2 {
    margin: 0;

    font-size: clamp(32px, 4vw, 52px);

    font-weight: 400;
    line-height: 1;

    letter-spacing: -0.045em;
  }
`;
