import { redirect } from "next/navigation";

export default function LegacyInventoryRedirect() {
  redirect("/cars-for-sale");
}
