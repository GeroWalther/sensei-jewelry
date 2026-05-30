import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from "@react-email/components";

type Item = {
  name: string;
  quantity: number;
  priceInCents: number;
  imageUrl?: string | null;
};

type Props = {
  customerName?: string;
  orderId: string;
  items: Item[];
  totalInCents: number;
  siteUrl: string;
};

const fmt = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export default function OrderReceiptEmail({
  customerName = "there",
  orderId,
  items,
  totalInCents,
  siteUrl,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your Sensei order is confirmed — #{orderId.slice(-8)}</Preview>
      <Body style={{ backgroundColor: "#fafafa", fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "32px 24px", backgroundColor: "#ffffff" }}>
          <Heading style={{ fontSize: 22, fontWeight: 600, margin: 0, color: "#111" }}>
            Thanks for your order, {customerName}.
          </Heading>
          <Text style={{ color: "#666", marginTop: 8 }}>
            We&apos;ve received your order and will let you know when it ships.
          </Text>
          <Text style={{ color: "#999", fontSize: 12, marginTop: 4 }}>Order #{orderId.slice(-8)}</Text>

          <Hr style={{ borderColor: "#eee", margin: "24px 0" }} />

          <Section>
            {items.map((item, i) => (
              <Row key={i} style={{ marginBottom: 16 }}>
                <Column style={{ width: 64 }}>
                  {item.imageUrl && (
                    <Img
                      src={item.imageUrl}
                      width={56}
                      height={56}
                      alt={item.name}
                      style={{ borderRadius: 6, objectFit: "cover", border: "1px solid #eee" }}
                    />
                  )}
                </Column>
                <Column>
                  <Text style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#111" }}>
                    {item.name}
                  </Text>
                  <Text style={{ margin: 0, fontSize: 12, color: "#666" }}>
                    Qty {item.quantity}
                  </Text>
                </Column>
                <Column style={{ textAlign: "right", fontSize: 14, color: "#111" }}>
                  {fmt(item.priceInCents * item.quantity)}
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={{ borderColor: "#eee", margin: "24px 0" }} />

          <Row>
            <Column style={{ fontSize: 14, color: "#666" }}>Total</Column>
            <Column style={{ textAlign: "right", fontSize: 16, fontWeight: 600, color: "#111" }}>
              {fmt(totalInCents)}
            </Column>
          </Row>

          <Hr style={{ borderColor: "#eee", margin: "24px 0" }} />

          <Text style={{ fontSize: 12, color: "#999" }}>
            Questions? Reply to this email or visit{" "}
            <a href={siteUrl} style={{ color: "#111" }}>{siteUrl}</a>.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
