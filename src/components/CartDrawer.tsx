import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

import { useCartStore } from "@/store/cartStore";
import { PATHS } from "@/router/paths";
import { Button } from "./ui/Button";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const CartDrawer = () => {
  const navigate = useNavigate();

  const {
    items,
    isCartOpen,
    closeCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    getSubtotal,
  } = useCartStore();

  const subtotal = getSubtotal();

  const handleCheckout = () => {
    closeCart();

    navigate(PATHS.CHECKOUT);
  };

  if (!isCartOpen) {
    return null;
  }

  return (
    <>
      <Backdrop onClick={closeCart} />

      <CartDrawerWrapper>
        <CartHeader>
          <CartTitle>
            Your bag
            <span>{items.length}</span>
          </CartTitle>

          <CloseButton
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
          >
            <X size={20} />
          </CloseButton>
        </CartHeader>

        {items.length === 0 ? (
          <EmptyCart>
            <EmptyCartIcon>
              <ShoppingBag size={28} />
            </EmptyCartIcon>

            <EmptyCartText>
              <h3>Your bag is empty</h3>

              <p>Discover something beautiful for your everyday ritual.</p>
            </EmptyCartText>

            <Button
              type="button"
              $variant="outline"
              $size="sm"
              $fullWidth
              onClick={() => {
                closeCart();
                navigate(PATHS.SHOP);
              }}
            >
              Continue shopping
              <ArrowRight size={17} />
            </Button>
          </EmptyCart>
        ) : (
          <>
            <Items>
              {items.map((item) => (
                <Item key={item.id}>
                  <ItemImage>
                    <img src={item.image} alt={item.name} />
                  </ItemImage>

                  <ItemInfo>
                    <ItemName>{item.name}</ItemName>

                    <ItemPrice>{formatPrice(item.price)}</ItemPrice>

                    <ItemQuantity>
                      <QuantityButton
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus size={13} />
                      </QuantityButton>

                      <QuantityValue>{item.quantity}</QuantityValue>

                      <QuantityButton
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus size={13} />
                      </QuantityButton>
                    </ItemQuantity>
                  </ItemInfo>

                  <RemoveButton
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 size={15} />
                  </RemoveButton>
                </Item>
              ))}
            </Items>

            <Footer>
              <FooterRow>
                <span>Subtotal</span>

                <Subtotal>{formatPrice(subtotal)}</Subtotal>
              </FooterRow>

              <p>
                Delivery fees and final order details will be confirmed at
                checkout.
              </p>

              <Button
                type="button"
                $variant="outline"
                $size="sm"
                $fullWidth
                onClick={handleCheckout}
              >
                Continue to checkout
                <ArrowRight size={17} />
              </Button>
            </Footer>
          </>
        )}
      </CartDrawerWrapper>
    </>
  );
};

export default CartDrawer;

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;

  z-index: 1000;

  background: rgba(20, 17, 15, 0.42);

  animation: fadeIn 200ms ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export const CartDrawerWrapper = styled.aside`
  position: fixed;

  top: 0;
  right: 0;

  z-index: 1001;

  width: min(470px, 100%);
  height: 100dvh;

  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.background?.primary || "#fff"};

  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.08);

  animation: slideIn 300ms cubic-bezier(0.22, 1, 0.36, 1);

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }

    to {
      transform: translateX(0);
    }
  }
`;

export const CartHeader = styled.header`
  min-height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 30px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e6e1dc"};
`;

export const CartTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;

  margin: 0;

  font-size: 23px;
  font-weight: 400;

  span {
    display: grid;
    place-items: center;

    min-width: 20px;
    height: 20px;

    padding: 0 5px;

    border-radius: 50%;

    background: ${({ theme }) => theme.colors.background?.primary || "#f1eee9"};

    font-size: 10px;
  }
`;

export const CloseButton = styled.button`
  width: 38px;
  height: 38px;

  display: grid;
  place-items: center;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.background?.primary || "#f3f0ec"};
  }
`;

export const Items = styled.div`
  flex: 1;

  overflow-y: auto;

  padding: 25px 30px;
`;

export const Item = styled.article`
  position: relative;

  display: grid;
  grid-template-columns: 82px 1fr auto;

  gap: 15px;

  padding: 0 0 22px;
  margin-bottom: 22px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#eee9e4"};
`;

export const ItemImage = styled.div`
  width: 82px;
  height: 100px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background?.primary || "#f3f0ec"};

  img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
  }
`;

export const ItemInfo = styled.div`
  min-width: 0;
`;

export const ItemName = styled.h3`
  margin: 2px 0 7px;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
`;

export const ItemPrice = styled.p`
  margin: 0;

  font-size: 13px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const ItemQuantity = styled.div`
  width: fit-content;

  display: flex;
  align-items: center;

  margin-top: 16px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};
`;

export const QuantityButton = styled.button`
  width: 29px;
  height: 29px;

  display: grid;
  place-items: center;

  border: none;

  background: transparent;

  cursor: pointer;
`;

export const QuantityValue = styled.span`
  width: 30px;

  text-align: center;

  font-size: 11px;
`;

export const RemoveButton = styled.button`
  width: 30px;
  height: 30px;

  display: grid;
  place-items: center;

  border: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.secondary || "#888"};

  cursor: pointer;

  &:hover {
    color: #a33;
  }
`;

export const Footer = styled.footer`
  padding: 25px 30px 30px;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e6e1dc"};

  p {
    margin: 12px 0 22px;

    font-size: 11px;
    line-height: 1.6;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;

export const FooterRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 13px;
`;

export const Subtotal = styled.strong`
  font-size: 18px;
  font-weight: 500;
`;

export const CheckoutButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 16px 20px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: transparent;

  color: ${({ theme }) => theme.colors.black[900] || "#fff"};

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: all 180ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.dark};

    color: ${({ theme }) => theme.colors.text.inverse};
  }
`;

export const EmptyCart = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 40px;

  text-align: center;
`;

export const EmptyCartIcon = styled.div`
  width: 70px;
  height: 70px;

  display: grid;
  place-items: center;

  margin-bottom: 25px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background?.primary || "#f2efeb"};
`;

export const EmptyCartText = styled.div`
  h3 {
    margin: 0;

    font-size: 22px;
    font-weight: 400;
  }

  p {
    max-width: 300px;

    margin: 12px auto 30px;

    font-size: 13px;
    line-height: 1.7;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;
