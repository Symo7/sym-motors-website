export function SiteFooter() {
  return (
    <footer className="mt-20 border-t py-10">
      <div className="container grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
        <div>
          <p className="font-semibold text-foreground">SYM MOTORS</p>
          <p>Phone: 0115 182 398</p>
        </div>
        <div className="md:text-right">
          <p>Instagram/Facebook/TikTok: @symmotors</p>
          <p>Serving Nairobi, Nakuru, Kisii, Kisumu</p>
        </div>
      </div>
    </footer>
  );
}
