import { createSupabaseServerClient } from "@/lib/supabase-server";
import { updateConfig } from "../actions";

export default async function AdminConfigPage() {
  const supabase = await createSupabaseServerClient();
  const { data: config } = await supabase
    .from("system_config")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.2em] text-[#D4AF37]/60 uppercase mb-1">
          system
        </p>
        <h1 className="text-2xl font-bold text-white/90">Site Configuration</h1>
        <p className="text-sm text-white/30 mt-1">
          Changes here update live across the entire portfolio instantly.
        </p>
      </div>

      <form action={updateConfig} className="max-w-lg space-y-6">
        {/* Availability */}
        <div className="bg-[#0A0F1C]/60 border border-white/10 rounded-xl p-5 backdrop-blur-xl space-y-4">
          <p className="text-xs tracking-[0.15em] text-white/30 uppercase">Availability</p>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="available"
              id="available"
              defaultChecked={config?.available ?? true}
              value="true"
              className="w-4 h-4 accent-[#D4AF37]"
            />
            <label htmlFor="available" className="text-sm text-white/70 cursor-pointer">
              Currently available for work
            </label>
          </div>

          <div>
            <label className="block text-xs text-white/40 mb-1.5 tracking-wide">
              Status Message
            </label>
            <input
              type="text"
              name="availability_status"
              defaultValue={config?.availability_status}
              placeholder="Open to collaborating on digital product and platform development projects"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
            />
            <p className="text-xs text-white/25 mt-1">
              Shown in the Contact page JSON block and home page.
            </p>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-[#0A0F1C]/60 border border-white/10 rounded-xl p-5 backdrop-blur-xl space-y-4">
          <p className="text-xs tracking-[0.15em] text-white/30 uppercase">Contact Details</p>

          {[
            { label: "Email", name: "email", defaultValue: config?.email, placeholder: "you@example.com" },
            { label: "Phone", name: "phone", defaultValue: config?.phone, placeholder: "+233 20 000 0000" },
            { label: "Location", name: "location", defaultValue: config?.location, placeholder: "City, Country" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-xs text-white/40 mb-1.5 tracking-wide">{f.label}</label>
              <input
                type="text"
                name={f.name}
                defaultValue={f.defaultValue}
                placeholder={f.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/90 placeholder:text-white/20 focus:outline-none focus:border-[#D4AF37]/40 transition-colors"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-[#050810] text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
        >
          Save Configuration
        </button>
      </form>
    </div>
  );
}
