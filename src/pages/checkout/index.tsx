import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  //   Check,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styled from "styled-components";
import { Button } from "@/components/ui/Button";

const WHATSAPP_NUMBER = "2348000000000";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const Checkout = () => {
  const navigate = useNavigate();

  const { items, increaseQuantity, decreaseQuantity, getSubtotal } =
    useCartStore();

  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">(
    "delivery",
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    note: "",
  });

  const subtotal = getSubtotal();

  const deliveryFee = deliveryMethod === "delivery" ? 2500 : 0;

  const total = subtotal + deliveryFee;

  const isFormValid = useMemo(() => {
    const requiredFields = [form.firstName, form.lastName, form.phone];

    if (deliveryMethod === "delivery") {
      requiredFields.push(form.address, form.city);
    }

    return requiredFields.every((value) => value.trim().length > 0);
  }, [form, deliveryMethod]);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const createWhatsAppMessage = () => {
    const itemLines = items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} — ${formatPrice(
            item.price * item.quantity,
          )}`,
      )
      .join("\n");

    const deliveryDetails =
      deliveryMethod === "delivery"
        ? [`Delivery Address: ${form.address}`, `City: ${form.city}`].join("\n")
        : "Pickup: Yes";

    return `Hello, I would like to place an order.

*ORDER DETAILS*
${itemLines}

*ORDER SUMMARY*
Subtotal: ${formatPrice(subtotal)}
Delivery: ${deliveryFee === 0 ? "Free / Pickup" : formatPrice(deliveryFee)}
Total: ${formatPrice(total)}

*CUSTOMER DETAILS*
Name: ${form.firstName} ${form.lastName}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}
${deliveryDetails}

${form.note ? `Note: ${form.note}\n` : ""}
Thank you.`;
  };

  const handleWhatsAppCheckout = () => {
    if (!isFormValid || items.length === 0) return;

    const message = createWhatsAppMessage();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (items.length === 0) {
    return (
      <EmptyCheckout>
        <EmptyCheckoutIcon>
          <ShoppingBag size={30} />
        </EmptyCheckoutIcon>

        <h1>Your bag is empty</h1>

        <p>
          There are no products in your bag yet. Explore our collection and find
          something beautiful.
        </p>

        <ContinueShoppingButton type="button" onClick={() => navigate("/shop")}>
          Continue shopping
          <ArrowRight size={17} />
        </ContinueShoppingButton>
      </EmptyCheckout>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <BackButton type="button" onClick={() => navigate("/shop")}>
          <ArrowLeft size={17} />
          Continue shopping
        </BackButton>

        <CheckoutIntro>
          <span>YOUR ORDER</span>

          <CheckoutTitle>Complete your order.</CheckoutTitle>

          <p>
            Tell us where to send your order and we'll confirm everything with
            you on WhatsApp.
          </p>
        </CheckoutIntro>
      </CheckoutHeader>

      <CheckoutLayout>
        <CheckoutGrid>
          {/* CUSTOMER DETAILS */}
          <ContactCard>
            <CardTitle>
              <User size={18} />
              Your details
            </CardTitle>

            <FieldGrid>
              <Field>
                <FieldLabel>First name *</FieldLabel>

                <FieldInput
                  value={form.firstName}
                  onChange={(event) =>
                    updateField("firstName", event.target.value)
                  }
                  placeholder="First name"
                />
              </Field>

              <Field>
                <FieldLabel>Last name *</FieldLabel>

                <FieldInput
                  value={form.lastName}
                  onChange={(event) =>
                    updateField("lastName", event.target.value)
                  }
                  placeholder="Last name"
                />
              </Field>
            </FieldGrid>

            <Field>
              <FieldLabel>Phone number *</FieldLabel>

              <FieldInput
                type="tel"
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="0800 000 0000"
              />
            </Field>

            <Field>
              <FieldLabel>Email address</FieldLabel>

              <FieldInput
                type="email"
                value={form.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="you@example.com"
              />
            </Field>
          </ContactCard>

          {/* DELIVERY */}
          <ContactCard>
            <CardTitle>
              <MapPin size={18} />
              Delivery
            </CardTitle>

            <DeliveryOptions>
              <DeliveryOption
                $active={deliveryMethod === "delivery"}
                onClick={() => setDeliveryMethod("delivery")}
              >
                <DeliveryRadio $active={deliveryMethod === "delivery"} />

                <DeliveryOptionContent>
                  <DeliveryOptionTitle>Home delivery</DeliveryOptionTitle>

                  <DeliveryOptionDescription>
                    Delivered to your preferred address.
                  </DeliveryOptionDescription>
                </DeliveryOptionContent>

                <strong>₦2,500</strong>
              </DeliveryOption>

              <DeliveryOption
                $active={deliveryMethod === "pickup"}
                onClick={() => setDeliveryMethod("pickup")}
              >
                <DeliveryRadio $active={deliveryMethod === "pickup"} />

                <DeliveryOptionContent>
                  <DeliveryOptionTitle>Pickup</DeliveryOptionTitle>

                  <DeliveryOptionDescription>
                    Collect your order from us.
                  </DeliveryOptionDescription>
                </DeliveryOptionContent>

                <strong>Free</strong>
              </DeliveryOption>
            </DeliveryOptions>

            {deliveryMethod === "delivery" && (
              <>
                <Field>
                  <FieldLabel>Delivery address *</FieldLabel>

                  <FieldTextarea
                    value={form.address}
                    onChange={(event) =>
                      updateField("address", event.target.value)
                    }
                    placeholder="House number, street, landmark..."
                    rows={3}
                  />
                </Field>

                <Field>
                  <FieldLabel>City *</FieldLabel>

                  <FieldInput
                    value={form.city}
                    onChange={(event) =>
                      updateField("city", event.target.value)
                    }
                    placeholder="City"
                  />
                </Field>
              </>
            )}

            <Field>
              <FieldLabel>Order note</FieldLabel>

              <FieldTextarea
                value={form.note}
                onChange={(event) => updateField("note", event.target.value)}
                placeholder="Anything you'd like us to know?"
                rows={3}
              />
            </Field>
          </ContactCard>
        </CheckoutGrid>

        {/* ORDER SUMMARY */}
        <OrderCard>
          <OrderHeader>
            <div>
              <span>ORDER SUMMARY</span>
              <h2>Your bag</h2>
            </div>

            <ShoppingBag size={20} />
          </OrderHeader>

          <OrderItems>
            {items.map((item) => (
              <OrderItem key={item.id}>
                <OrderItemImage>
                  <img src={item.image} alt={item.name} />
                </OrderItemImage>

                <OrderItemInfo>
                  <OrderItemName>{item.name}</OrderItemName>

                  <OrderItemMeta>{formatPrice(item.price)}</OrderItemMeta>

                  <QuantityControl>
                    <QuantityButton
                      type="button"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus size={13} />
                    </QuantityButton>

                    <QuantityValue>{item.quantity}</QuantityValue>

                    <QuantityButton
                      type="button"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus size={13} />
                    </QuantityButton>
                  </QuantityControl>
                </OrderItemInfo>

                <OrderItemPrice>
                  {formatPrice(item.price * item.quantity)}
                </OrderItemPrice>
              </OrderItem>
            ))}
          </OrderItems>

          <Summary>
            <SummaryRow>
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </SummaryRow>

            <SummaryRow>
              <span>Delivery</span>

              <span>
                {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
              </span>
            </SummaryRow>

            <TotalRow>
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </TotalRow>
          </Summary>

          <Notice>
            <MessageCircle size={16} />

            <span>
              You'll be redirected to WhatsApp to confirm your order and payment
              details with us.
            </span>
          </Notice>

          <Button
            $fullWidth
            $size="lg"
            $variant="outline"
            type="button"
            disabled={!isFormValid}
            onClick={handleWhatsAppCheckout}
          >
            <MessageCircle size={19} />
            Order via WhatsApp
            <ArrowRight size={17} />
          </Button>
        </OrderCard>
      </CheckoutLayout>
    </CheckoutContainer>
  );
};

export default Checkout;

export const CheckoutContainer = styled.main`
  width: min(1250px, calc(100% - 80px));

  margin: 0 auto;

  padding: 45px 0 130px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);

    padding: 30px 0 90px;
  }
`;

export const CheckoutHeader = styled.header`
  margin-bottom: 70px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 0;
  margin-bottom: 65px;

  border: none;
  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 12px;

  cursor: pointer;
`;

export const CheckoutIntro = styled.div`
  max-width: 700px;

  span {
    display: block;

    margin-bottom: 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.18em;
  }

  p {
    max-width: 540px;

    margin: 20px 0 0;

    font-size: 14px;
    line-height: 1.8;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;

export const CheckoutTitle = styled.h1`
  margin: 0;

  font-size: clamp(42px, 6vw, 72px);

  font-weight: 400;
  line-height: 0.98;

  letter-spacing: -0.055em;
`;

export const CheckoutLayout = styled.div`
  display: grid;

  grid-template-columns: minmax(0, 1fr) 410px;

  gap: 80px;

  align-items: start;

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    gap: 55px;
  }
`;

export const CheckoutGrid = styled.div`
  display: flex;
  flex-direction: column;

  gap: 25px;
`;

export const ContactCard = styled.section`
  padding: 30px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  @media (max-width: 500px) {
    padding: 22px;
  }
`;

export const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;

  margin: 0 0 28px;

  font-size: 18px;
  font-weight: 400;
`;

export const FieldGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 15px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;

  gap: 8px;

  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FieldLabel = styled.span`
  font-size: 11px;
  font-weight: 600;

  letter-spacing: 0.05em;
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 14px 15px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};

  offset: 2rem;

  outline: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 13px;

  transition: border-color 180ms ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary || "#999"};
  }
`;

export const FieldTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;

  resize: vertical;

  padding: 14px 15px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};

  outline: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 13px;
  line-height: 1.6;

  &:focus {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary || "#999"};
  }
`;

export const DeliveryOptions = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  margin-bottom: 30px;
`;

export const DeliveryOption = styled.button<{
  $active: boolean;
}>`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 17px;

  border: 1px solid
    ${({ $active, theme }) =>
      $active
        ? theme.colors.text.primary
        : theme.colors.border?.light || "#ddd"};

  background: transparent;

  text-align: left;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;

  cursor: pointer;

  > strong {
    margin-left: auto;

    font-size: 12px;
    font-weight: 500;
  }
`;

export const DeliveryRadio = styled.span<{
  $active: boolean;
}>`
  width: 17px;
  height: 17px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  border-radius: 50%;

  &::after {
    content: "";

    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: ${({ $active, theme }) =>
      $active ? theme.colors.text.primary : "transparent"};
  }
`;

export const DeliveryOptionContent = styled.div`
  min-width: 0;
`;

export const DeliveryOptionTitle = styled.div`
  font-size: 13px;
  font-weight: 500;
`;

export const DeliveryOptionDescription = styled.div`
  margin-top: 4px;

  font-size: 11px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const OrderCard = styled.aside`
  position: sticky;
  top: 30px;

  padding: 30px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  @media (max-width: 1000px) {
    position: static;
  }

  @media (max-width: 500px) {
    padding: 22px;
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  padding-bottom: 24px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  span {
    display: block;

    margin-bottom: 7px;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.16em;
  }

  h2 {
    margin: 0;

    font-size: 24px;
    font-weight: 400;
  }
`;

export const OrderItems = styled.div`
  padding: 20px 0;
`;

export const OrderItem = styled.article`
  display: grid;

  grid-template-columns: 65px 1fr auto;

  gap: 12px;

  padding: 15px 0;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#eee"};

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const OrderItemImage = styled.div`
  width: 65px;
  height: 75px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background?.primary || "#f3f0ec"};

  img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
  }
`;

export const OrderItemInfo = styled.div`
  min-width: 0;
`;

export const OrderItemName = styled.h3`
  margin: 0 0 5px;

  font-size: 12px;
  font-weight: 500;
`;

export const OrderItemMeta = styled.span`
  font-size: 11px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const OrderItemPrice = styled.span`
  font-size: 12px;
  white-space: nowrap;
`;

export const QuantityControl = styled.div`
  width: fit-content;

  display: flex;
  align-items: center;

  margin-top: 10px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};
`;

export const QuantityButton = styled.button`
  width: 25px;
  height: 25px;

  display: grid;
  place-items: center;

  border: none;

  background: transparent;

  cursor: pointer;
`;

export const QuantityValue = styled.span`
  width: 25px;

  text-align: center;

  font-size: 10px;
`;

export const Summary = styled.div`
  padding-top: 20px;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 13px;

  font-size: 12px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 22px;
  padding-top: 18px;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  span {
    font-size: 13px;
  }

  strong {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const Notice = styled.div`
  display: flex;
  gap: 10px;

  margin: 22px 0;

  padding: 13px;

  background: ${({ theme }) => theme.colors.background?.primary || "#f4f1ed"};

  font-size: 10px;
  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary || "#666"};

  svg {
    flex-shrink: 0;
    margin-top: 1px;
  }
`;

export const WhatsAppButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;

  padding: 16px 20px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: ${({ theme }) => theme.colors.text.primary};

  color: ${({ theme }) => theme.colors.background?.primary || "#fff"};

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: all 180ms ease;

  svg:last-child {
    margin-left: 4px;
  }

  &:hover:not(:disabled) {
    background: transparent;

    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:disabled {
    opacity: 0.35;

    cursor: not-allowed;
  }
`;

export const EmptyCheckout = styled.main`
  min-height: 70vh;

  width: min(600px, calc(100% - 40px));

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

export const EmptyCheckoutIcon = styled.div`
  width: 75px;
  height: 75px;

  display: grid;
  place-items: center;

  margin-bottom: 25px;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background?.primary || "#f2efeb"};
`;

export const ContinueShoppingButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  padding: 14px 22px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;
`;
