import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  MessageCircle,
  User,
  ChevronDown,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  image: string;
}

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
}

interface CustomDropdownProps {
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
  icon: React.ReactNode;
}

const CustomDropdown = ({
  value,
  placeholder,
  options,
  onChange,
  icon,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <CustomDropdownWrapper ref={dropdownRef}>
      <CustomDropdownButton
        type="button"
        $open={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <CustomDropdownButtonLeft>
          <CustomDropdownIcon>{icon}</CustomDropdownIcon>

          <CustomDropdownValue>
            {selectedOption ? (
              <>
                <CustomDropdownLabel>
                  {selectedOption.label}
                </CustomDropdownLabel>

                {selectedOption.description && (
                  <CustomDropdownDescription>
                    {selectedOption.description}
                  </CustomDropdownDescription>
                )}
              </>
            ) : (
              <CustomDropdownPlaceholder>
                {placeholder}
              </CustomDropdownPlaceholder>
            )}
          </CustomDropdownValue>
        </CustomDropdownButtonLeft>

        <CustomDropdownChevron $open={isOpen}>
          <ChevronDown size={17} />
        </CustomDropdownChevron>
      </CustomDropdownButton>

      {isOpen && (
        <CustomDropdownMenu>
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <CustomDropdownOption
                key={option.value}
                type="button"
                $selected={selected}
                onClick={() => handleSelect(option.value)}
              >
                <CustomDropdownOptionContent>
                  <CustomDropdownOptionLabel>
                    {option.label}
                  </CustomDropdownOptionLabel>

                  {option.description && (
                    <CustomDropdownOptionDescription>
                      {option.description}
                    </CustomDropdownOptionDescription>
                  )}
                </CustomDropdownOptionContent>

                <CustomDropdownCheck $selected={selected}>
                  {selected && <Check size={13} />}
                </CustomDropdownCheck>
              </CustomDropdownOption>
            );
          })}
        </CustomDropdownMenu>
      )}
    </CustomDropdownWrapper>
  );
};

const services: Service[] = [
  {
    id: "facial",
    name: "Signature Facial",
    description:
      "A deeply relaxing facial ritual designed to cleanse, hydrate and restore your natural glow.",
    duration: "60 min",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "massage",
    name: "Relaxation Massage",
    description:
      "A calming full-body massage created to release tension and leave you feeling completely restored.",
    duration: "60 min",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "manicure",
    name: "Luxury Manicure",
    description:
      "A complete nail-care experience with careful shaping, cuticle care and a beautiful finish.",
    duration: "45 min",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=90",
  },
  {
    id: "pedicure",
    name: "Luxury Pedicure",
    description:
      "A relaxing foot-care ritual combining exfoliation, hydration and professional nail care.",
    duration: "60 min",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=90",
  },
];

const times = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

const getAvailableDates = () => {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);

    date.setDate(today.getDate() + i);

    dates.push(date);
  }

  return dates;
};

const formatDateValue = (date: Date) => date.toISOString().split("T")[0];

const Booking = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialService = searchParams.get("service") || "";

  const [selectedService, setSelectedService] =
    useState<string>(initialService);

  const availableDates = useMemo(() => getAvailableDates(), []);

  const [selectedDate, setSelectedDate] = useState<string>("");

  const [selectedTime, setSelectedTime] = useState<string>("");

  const dateOptions = useMemo<DropdownOption[]>(
    () =>
      availableDates.map((date) => {
        const value = formatDateValue(date);

        return {
          value,
          label: date.toLocaleDateString("en-NG", {
            weekday: "long",
            day: "numeric",
            month: "long",
          }),
          description: date.toLocaleDateString("en-NG", {
            year: "numeric",
          }),
        };
      }),
    [availableDates],
  );

  const timeOptions: DropdownOption[] = times.map((time) => ({
    value: time,
    label: time,
    description: "Available appointment time",
  }));

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    note: "",
  });

  const service = services.find((item) => item.id === selectedService);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const formattedSelectedDate = selectedDate
    ? new Date(`${selectedDate}T12:00:00`).toLocaleDateString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const isComplete =
    Boolean(service) &&
    Boolean(selectedDate) &&
    Boolean(selectedTime) &&
    Boolean(form.firstName.trim()) &&
    Boolean(form.lastName.trim()) &&
    Boolean(form.phone.trim());

  const createWhatsAppMessage = () => {
    if (!service) return "";

    return `Hello, I would like to book an appointment.

*BOOKING DETAILS*

Service: ${service.name}
Duration: ${service.duration}
Price: ${formatPrice(service.price)}

Date: ${formattedSelectedDate}
Time: ${selectedTime}

*CUSTOMER DETAILS*

Name: ${form.firstName} ${form.lastName}
Phone: ${form.phone}
${form.email ? `Email: ${form.email}\n` : ""}${
      form.note ? `Note: ${form.note}\n` : ""
    }
Thank you.`;
  };

  const handleBooking = () => {
    if (!isComplete) return;

    const message = createWhatsAppMessage();

    const whatsappNumber = "2348000000000";

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <BookingContainer>
      <BookingHeader>
        <BackButton type="button" onClick={() => navigate("/services")}>
          <ArrowLeft size={17} />
          Back to services
        </BackButton>

        <BookingIntro>
          <span>BOOK AN APPOINTMENT</span>

          <BookingTitle>
            Make time
            <br />
            for yourself.
          </BookingTitle>

          <p>
            Choose your treatment, preferred time and provide your details.
            We'll confirm your appointment with you on WhatsApp.
          </p>
        </BookingIntro>
      </BookingHeader>

      <BookingLayout>
        <BookingMain>
          {/* SERVICE */}
          <BookingCard>
            <CardHeader>
              <CardIcon>
                <Check size={17} />
              </CardIcon>

              <div>
                <CardTitle>Choose a service</CardTitle>

                <CardDescription>
                  Select the treatment you'd like to book.
                </CardDescription>
              </div>
            </CardHeader>

            <ServiceGrid>
              {services.map((item) => {
                const selected = selectedService === item.id;

                return (
                  <ServiceOption
                    key={item.id}
                    type="button"
                    $selected={selected}
                    onClick={() => setSelectedService(item.id)}
                  >
                    <ServiceImage>
                      <img src={item.image} alt={item.name} />
                    </ServiceImage>

                    <ServiceContent>
                      <ServiceName>{item.name}</ServiceName>

                      <ServiceDescription>
                        {item.description}
                      </ServiceDescription>

                      <ServiceMeta>
                        <span>{item.duration}</span>
                        <span>{formatPrice(item.price)}</span>
                      </ServiceMeta>
                    </ServiceContent>

                    <SelectedIndicator $selected={selected}>
                      {selected && <Check size={12} />}
                    </SelectedIndicator>
                  </ServiceOption>
                );
              })}
            </ServiceGrid>
          </BookingCard>

          {/* DATE */}
          <BookingCard>
            <CardHeader>
              <CardIcon>
                <CalendarDays size={17} />
              </CardIcon>

              <div>
                <CardTitle>Choose a date</CardTitle>

                <CardDescription>
                  Select a day that works for you.
                </CardDescription>
              </div>
            </CardHeader>

            <CustomDropdown
              value={selectedDate}
              placeholder="Select your preferred date"
              options={dateOptions}
              onChange={setSelectedDate}
              icon={<CalendarDays size={17} />}
            />
          </BookingCard>

          {/* TIME */}
          <BookingCard>
            <CardHeader>
              <CardIcon>
                <Clock3 size={17} />
              </CardIcon>

              <div>
                <CardTitle>Choose a time</CardTitle>

                <CardDescription>
                  Select your preferred appointment time.
                </CardDescription>
              </div>
            </CardHeader>

            <CustomDropdown
              value={selectedTime}
              placeholder="Select your preferred time"
              options={timeOptions}
              onChange={setSelectedTime}
              icon={<Clock3 size={17} />}
            />
          </BookingCard>

          {/* CUSTOMER DETAILS */}
          <BookingCard>
            <CardHeader>
              <CardIcon>
                <User size={17} />
              </CardIcon>

              <div>
                <CardTitle>Your details</CardTitle>

                <CardDescription>
                  We'll use these details to confirm your appointment.
                </CardDescription>
              </div>
            </CardHeader>

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

            <Field>
              <FieldLabel>Anything we should know?</FieldLabel>

              <FieldTextarea
                value={form.note}
                onChange={(event) => updateField("note", event.target.value)}
                placeholder="Tell us anything that may help us prepare for your appointment..."
                rows={4}
              />
            </Field>
          </BookingCard>
        </BookingMain>

        {/* SUMMARY */}
        <SummaryCard>
          <SummaryHeader>
            <span>YOUR APPOINTMENT</span>

            <h2>Booking summary</h2>
          </SummaryHeader>

          {service ? (
            <SummaryService>
              <SummaryServiceImage>
                <img src={service.image} alt={service.name} />
              </SummaryServiceImage>

              <SummaryServiceInfo>
                <SummaryServiceName>{service.name}</SummaryServiceName>

                <span>{service.duration}</span>

                <strong>{formatPrice(service.price)}</strong>
              </SummaryServiceInfo>
            </SummaryService>
          ) : (
            <EmptyState>
              <span>Select a service</span>
            </EmptyState>
          )}

          <SummaryDivider />

          <SummaryRow>
            <span>Date</span>

            <strong>{formattedSelectedDate || "Not selected"}</strong>
          </SummaryRow>

          <SummaryRow>
            <span>Time</span>

            <strong>{selectedTime || "Not selected"}</strong>
          </SummaryRow>

          <SummaryRow>
            <span>Client</span>

            <strong>
              {form.firstName
                ? `${form.firstName} ${form.lastName}`
                : "Not provided"}
            </strong>
          </SummaryRow>

          <SummaryTotal>
            <span>Estimated total</span>

            <strong>{service ? formatPrice(service.price) : "—"}</strong>
          </SummaryTotal>

          <Notice>
            <MessageCircle size={16} />

            <span>
              Your booking isn't confirmed until we respond to your WhatsApp
              message.
            </span>
          </Notice>

          <Button
            type="button"
            $size="sm"
            $variant="outline"
            $fullWidth
            disabled={!isComplete}
            onClick={handleBooking}
          >
            <MessageCircle size={18} />
            Request appointment
            <ArrowRight size={17} />
          </Button>
        </SummaryCard>
      </BookingLayout>
    </BookingContainer>
  );
};

export default Booking;

import styled from "styled-components";
import { Button } from "@/components/ui/Button";

export const CustomDropdownWrapper = styled.div`
  position: relative;

  width: 100%;
`;

export const CustomDropdownButton = styled.button<{
  $open: boolean;
}>`
  width: 100%;

  min-height: 68px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  padding: 14px 16px;

  border: 1px solid
    ${({ $open, theme }) =>
      $open ? theme.colors.text.primary : theme.colors.border?.light || "#ddd"};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;

  text-align: left;

  cursor: pointer;

  transition:
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const CustomDropdownButtonLeft = styled.div`
  min-width: 0;

  display: flex;
  align-items: center;

  gap: 13px;
`;

export const CustomDropdownIcon = styled.span`
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background?.secondary || "#f2efeb"};
`;

export const CustomDropdownValue = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 3px;
`;

export const CustomDropdownLabel = styled.span`
  display: block;

  overflow: hidden;

  font-size: 13px;
  font-weight: 500;

  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const CustomDropdownPlaceholder = styled.span`
  font-size: 12px;

  color: ${({ theme }) => theme.colors.text.secondary || "#888"};
`;

export const CustomDropdownDescription = styled.span`
  font-size: 10px;

  color: ${({ theme }) => theme.colors.text.secondary || "#888"};
`;

export const CustomDropdownChevron = styled.span<{
  $open: boolean;
}>`
  display: grid;
  place-items: center;

  flex-shrink: 0;

  transition: transform 180ms ease;

  transform: ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0deg)")};
`;

export const CustomDropdownMenu = styled.div`
  position: absolute;

  z-index: 30;

  top: calc(100% + 8px);

  left: 0;
  right: 0;

  max-height: 310px;

  overflow-y: auto;

  padding: 7px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};

  background: ${({ theme }) => theme.colors.background?.primary || "#fff"};

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.08);

  animation: dropdownIn 140ms ease-out;

  @keyframes dropdownIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  scrollbar-width: thin;
`;

export const CustomDropdownOption = styled.button<{
  $selected: boolean;
}>`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;

  padding: 13px 12px;

  border: none;

  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.background?.secondary || "#f5f2ee" : "transparent"};

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;

  text-align: left;

  cursor: pointer;

  transition: background 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background?.secondary || "#f5f2ee"};
  }
`;

export const CustomDropdownOptionContent = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 3px;
`;

export const CustomDropdownOptionLabel = styled.span`
  font-size: 12px;

  font-weight: 500;
`;

export const CustomDropdownOptionDescription = styled.span`
  font-size: 10px;

  color: ${({ theme }) => theme.colors.text.secondary || "#888"};
`;

export const CustomDropdownCheck = styled.span<{
  $selected: boolean;
}>`
  width: 22px;
  height: 22px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  border-radius: 50%;

  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.text.primary : "transparent"};

  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background?.primary || "#fff" : "transparent"};
`;

export const BookingContainer = styled.main`
  width: min(1250px, calc(100% - 80px));

  margin: 0 auto;

  padding: 45px 0 140px;

  @media (max-width: 768px) {
    width: calc(100% - 40px);

    padding: 30px 0 90px;
  }
`;

export const BookingHeader = styled.header`
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

export const BookingIntro = styled.div`
  max-width: 700px;

  > span {
    display: block;

    margin-bottom: 16px;

    font-size: 10px;
    font-weight: 600;

    letter-spacing: 0.18em;
  }

  p {
    max-width: 560px;

    margin: 22px 0 0;

    font-size: 14px;
    line-height: 1.8;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }
`;

export const BookingTitle = styled.h1`
  margin: 0;

  font-size: clamp(44px, 6vw, 76px);

  font-weight: 400;
  line-height: 0.96;

  letter-spacing: -0.06em;
`;

export const BookingLayout = styled.div`
  display: grid;

  grid-template-columns: minmax(0, 1fr) 390px;

  gap: 70px;

  align-items: start;

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;

    gap: 50px;
  }
`;

export const BookingMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
`;

export const BookingCard = styled.section`
  padding: 30px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  @media (max-width: 600px) {
    padding: 22px;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 14px;

  margin-bottom: 28px;
`;

export const CardIcon = styled.div`
  width: 34px;
  height: 34px;

  flex-shrink: 0;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: ${({ theme }) => theme.colors.background?.card || "#f2efeb"};
`;

export const CardTitle = styled.h2`
  margin: 0;

  font-size: 18px;
  font-weight: 400;
`;

export const CardDescription = styled.p`
  margin: 5px 0 0;

  font-size: 12px;
  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const ServiceGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 14px;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
  }
`;

export const ServiceOption = styled.button<{
  $selected: boolean;
}>`
  position: relative;

  display: grid;

  grid-template-columns: 85px 1fr;

  gap: 14px;

  padding: 10px;

  border: 1px solid
    ${({ $selected, theme }) =>
      $selected
        ? theme.colors.text.primary
        : theme.colors.border?.light || "#ddd"};

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  text-align: left;

  cursor: pointer;

  transition: border-color 180ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.text.primary};
  }
`;

export const ServiceImage = styled.div`
  width: 85px;
  height: 105px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.background?.darkSoft || "#f2efeb"};

  img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
  }
`;

export const ServiceContent = styled.div`
  min-width: 0;

  padding: 5px 20px 5px 0;
`;

export const ServiceName = styled.h3`
  margin: 0;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
`;

export const ServiceDescription = styled.p`
  margin: 8px 0;

  font-size: 10px;
  line-height: 1.55;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const ServiceMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 12px;

  font-size: 10px;

  span:last-child {
    font-weight: 600;
  }
`;

export const SelectedIndicator = styled.span<{
  $selected: boolean;
}>`
  position: absolute;

  top: 10px;
  right: 10px;

  width: 22px;
  height: 22px;

  display: grid;
  place-items: center;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  border-radius: 50%;

  background: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.text.primary
      : theme.colors.background?.primary || "#fff"};

  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.background?.primary || "#fff" : "transparent"};
`;

export const DateGrid = styled.div`
  display: flex;
  gap: 9px;

  overflow-x: auto;

  padding-bottom: 4px;

  scrollbar-width: thin;
`;

export const DateOption = styled.button<{
  $selected: boolean;
}>`
  min-width: 72px;

  padding: 13px 10px;

  border: 1px solid
    ${({ $selected, theme }) =>
      $selected
        ? theme.colors.text.primary
        : theme.colors.border?.light || "#ddd"};

  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.text.primary : "transparent"};

  color: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.background?.primary || "#fff"
      : theme.colors.text.primary};

  cursor: pointer;
`;

export const DateDay = styled.span`
  display: block;

  margin-bottom: 7px;

  font-size: 10px;
  text-transform: uppercase;
`;

export const DateNumber = styled.strong`
  display: block;

  font-size: 23px;
  font-weight: 400;
`;

export const DateMonth = styled.span`
  display: block;

  margin-top: 3px;

  font-size: 10px;
`;

export const TimeGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 9px;

  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const TimeOption = styled.button<{
  $selected: boolean;
}>`
  padding: 12px 8px;

  border: 1px solid
    ${({ $selected, theme }) =>
      $selected
        ? theme.colors.text.primary
        : theme.colors.border?.light || "#ddd"};

  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.text.primary : "transparent"};

  color: ${({ $selected, theme }) =>
    $selected
      ? theme.colors.background?.primary || "#fff"
      : theme.colors.text.primary};

  font: inherit;
  font-size: 11px;

  cursor: pointer;
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
`;

export const FieldLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
`;

export const FieldInput = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 14px 15px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#ddd"};

  outline: none;

  background: transparent;

  color: ${({ theme }) => theme.colors.text.primary};

  font: inherit;
  font-size: 13px;

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
`;

export const SummaryCard = styled.aside`
  position: sticky;

  top: 30px;

  padding: 30px;

  border: 1px solid ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  @media (max-width: 1050px) {
    position: static;
  }

  @media (max-width: 600px) {
    padding: 22px;
  }
`;

export const SummaryHeader = styled.div`
  padding-bottom: 24px;

  border-bottom: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  span {
    display: block;

    margin-bottom: 7px;

    font-size: 9px;
    font-weight: 600;

    letter-spacing: 0.17em;
  }

  h2 {
    margin: 0;

    font-size: 24px;
    font-weight: 400;
  }
`;

export const SummaryService = styled.div`
  display: flex;

  gap: 14px;

  padding: 24px 0;
`;

export const SummaryServiceImage = styled.div`
  width: 70px;
  height: 85px;

  flex-shrink: 0;

  overflow: hidden;

  img {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;
  }
`;

export const SummaryServiceInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 5px;

  span {
    font-size: 10px;

    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }

  strong {
    margin-top: 5px;

    font-size: 12px;
    font-weight: 500;
  }
`;

export const SummaryServiceName = styled.h3`
  margin: 0;

  font-size: 14px;
  font-weight: 500;
`;

export const EmptyState = styled.div`
  padding: 40px 0;

  text-align: center;

  font-size: 12px;

  color: ${({ theme }) => theme.colors.text.secondary || "#777"};
`;

export const SummaryDivider = styled.div`
  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;

  padding: 13px 0;

  font-size: 11px;

  span {
    color: ${({ theme }) => theme.colors.text.secondary || "#777"};
  }

  strong {
    text-align: right;

    font-weight: 500;
  }
`;

export const SummaryTotal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 15px;
  padding-top: 20px;

  border-top: 1px solid
    ${({ theme }) => theme.colors.border?.light || "#e5e0db"};

  span {
    font-size: 12px;
  }

  strong {
    font-size: 19px;
    font-weight: 500;
  }
`;

export const Notice = styled.div`
  display: flex;
  align-items: flex-start;

  gap: 9px;

  margin: 22px 0;

  padding: 13px;

  background: ${({ theme }) => theme.colors.background?.darkSoft || "#f3f0ec"};

  font-size: 10px;
  line-height: 1.6;

  color: ${({ theme }) => theme.colors.text.secondary || "#666"};

  svg {
    flex-shrink: 0;
  }
`;

export const WhatsAppButton = styled.button`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  padding: 16px;

  border: 1px solid ${({ theme }) => theme.colors.text.primary};

  background: ${({ theme }) => theme.colors.text.primary};

  color: ${({ theme }) => theme.colors.background?.primary || "#fff"};

  font: inherit;
  font-size: 12px;
  font-weight: 600;

  cursor: pointer;

  transition: all 180ms ease;

  svg:last-child {
    margin-left: 3px;
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
