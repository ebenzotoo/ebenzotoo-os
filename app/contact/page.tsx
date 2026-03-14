import { createClient } from "@supabase/supabase-js";
import ContactClient from "./ContactClient";

const DEFAULT_CONFIG = {
  availability_status: "Available for freelance work",
  available: true,
  email: "contact@ebenzotoo.com",
  phone: "+233 20 001 2873",
  location: "Mile 7, Accra, Ghana",
};

export default async function ContactPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data } = await supabase
    .from("system_config")
    .select("availability_status, available, email, phone, location")
    .eq("id", 1)
    .single();

  const config = data ?? DEFAULT_CONFIG;

  return <ContactClient config={config} />;
}
