import Link from "next/link";

export default function SellSuccessPage() {
  return (
    <div className="container py-24 text-center">
      <h1 className="text-3xl font-bold">Submission received 🎉</h1>
      <p className="mt-2 text-muted-foreground">Our team will review and contact you soon.</p>
      <Link className="mt-6 inline-block text-primary" href="https://wa.me/254115182398?text=Hi%20SYM%20MOTORS,%20I%20just%20submitted%20my%20car%20for%20sale." target="_blank">Send WhatsApp quick message</Link>
    </div>
  );
}
