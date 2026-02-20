import Link from "next/link";

export default function LeaseSuccessPage() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-3xl font-bold">Lease request submitted ✅</h1>
      <p className="mt-2 text-muted-foreground">SYM Motors will contact you after review.</p>
      <Link className="mt-6 inline-block text-primary" href="https://wa.me/254115182398?text=Hi%20SYM%20MOTORS,%20I%20just%20submitted%20a%20lease%20request." target="_blank">Send WhatsApp quick message</Link>
    </div>
  );
}
