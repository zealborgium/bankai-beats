import { useState, useRef, useEffect } from "react";

interface Country {
  name: string;
  code: string;
  dial: string;
  digits: number;
}

const countries: Country[] = [
  { name: "India", code: "IN", dial: "+91", digits: 10 },
  { name: "South Korea", code: "KR", dial: "+82", digits: 10 },
  { name: "Japan", code: "JP", dial: "+81", digits: 10 },
  { name: "USA", code: "US", dial: "+1", digits: 10 },
  { name: "UK", code: "GB", dial: "+44", digits: 10 },
  { name: "Australia", code: "AU", dial: "+61", digits: 9 },
  { name: "Canada", code: "CA", dial: "+1", digits: 10 },
  { name: "UAE", code: "AE", dial: "+971", digits: 9 },
  { name: "Singapore", code: "SG", dial: "+65", digits: 8 },
  { name: "Germany", code: "DE", dial: "+49", digits: 10 },
  { name: "France", code: "FR", dial: "+33", digits: 9 },
  { name: "Italy", code: "IT", dial: "+39", digits: 10 },
  { name: "Spain", code: "ES", dial: "+34", digits: 9 },
  { name: "Brazil", code: "BR", dial: "+55", digits: 11 },
  { name: "Mexico", code: "MX", dial: "+52", digits: 10 },
  { name: "China", code: "CN", dial: "+86", digits: 11 },
  { name: "Indonesia", code: "ID", dial: "+62", digits: 10 },
  { name: "Pakistan", code: "PK", dial: "+92", digits: 10 },
  { name: "Bangladesh", code: "BD", dial: "+880", digits: 10 },
  { name: "Sri Lanka", code: "LK", dial: "+94", digits: 9 },
  { name: "Nepal", code: "NP", dial: "+977", digits: 10 },
  { name: "Malaysia", code: "MY", dial: "+60", digits: 9 },
  { name: "Thailand", code: "TH", dial: "+66", digits: 9 },
  { name: "Philippines", code: "PH", dial: "+63", digits: 10 },
  { name: "Vietnam", code: "VN", dial: "+84", digits: 9 },
  { name: "Saudi Arabia", code: "SA", dial: "+966", digits: 9 },
  { name: "Qatar", code: "QA", dial: "+974", digits: 8 },
  { name: "Kuwait", code: "KW", dial: "+965", digits: 8 },
  { name: "South Africa", code: "ZA", dial: "+27", digits: 9 },
  { name: "Nigeria", code: "NG", dial: "+234", digits: 10 },
  { name: "Kenya", code: "KE", dial: "+254", digits: 9 },
  { name: "New Zealand", code: "NZ", dial: "+64", digits: 9 },
  { name: "Netherlands", code: "NL", dial: "+31", digits: 9 },
  { name: "Sweden", code: "SE", dial: "+46", digits: 9 },
  { name: "Norway", code: "NO", dial: "+47", digits: 8 },
  { name: "Denmark", code: "DK", dial: "+45", digits: 8 },
  { name: "Switzerland", code: "CH", dial: "+41", digits: 9 },
  { name: "Poland", code: "PL", dial: "+48", digits: 9 },
  { name: "Turkey", code: "TR", dial: "+90", digits: 10 },
  { name: "Russia", code: "RU", dial: "+7", digits: 10 },
  { name: "Argentina", code: "AR", dial: "+54", digits: 10 },
  { name: "Colombia", code: "CO", dial: "+57", digits: 10 },
  { name: "Egypt", code: "EG", dial: "+20", digits: 10 },
  { name: "Israel", code: "IL", dial: "+972", digits: 9 },
  { name: "Portugal", code: "PT", dial: "+351", digits: 9 },
  { name: "Greece", code: "GR", dial: "+30", digits: 10 },
  { name: "Czech Republic", code: "CZ", dial: "+420", digits: 9 },
  { name: "Hungary", code: "HU", dial: "+36", digits: 9 },
  { name: "Romania", code: "RO", dial: "+40", digits: 9 },
];

interface PhoneInputProps {
  value: string;
  onChange: (value: string, dialCode: string) => void;
  required?: boolean;
  inputClasses: string;
}

const PhoneInput = ({ value, onChange, required, inputClasses }: PhoneInputProps) => {
  const [selected, setSelected] = useState<Country>(countries[0]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = countries.filter(c =>
    c.name.toLowerCase().startsWith(search.toLowerCase()) ||
    c.code.toLowerCase().startsWith(search.toLowerCase()) ||
    c.dial.startsWith(search)
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  const select = (country: Country) => {
    setSelected(country);
    onChange("", country.dial);
    setOpen(false);
    setSearch("");
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, selected.digits);
    onChange(digits, selected.dial);
  };

  return (
    <div className="flex gap-2">
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="bg-muted border-2 border-border rounded-full px-3 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all font-body w-24 flex items-center justify-between gap-1"
        >
          <span>{selected.dial} {selected.code}</span>
          <svg className={`w-3 h-3 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>

        {open && (
          <div className="absolute top-full left-0 mt-1 z-50 w-56 rounded-2xl overflow-hidden shadow-xl" style={{ background: 'hsla(0,0%,10%,0.97)', border: '1px solid hsla(0,0%,100%,0.12)', backdropFilter: 'blur(16px)' }}>
            <div className="p-2">
              <input
                ref={searchRef}
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search country..."
                className="w-full bg-muted border border-border rounded-full px-3 py-2 text-xs text-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-3">No results</p>
              ) : filtered.map(c => (
                <button
                  key={c.code + c.dial}
                  type="button"
                  onClick={() => select(c)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors hover:bg-white/10 ${selected.code === c.code && selected.dial === c.dial ? "text-primary" : "text-white/80"}`}
                >
                  <span className="font-mono w-12 shrink-0">{c.dial}</span>
                  <span className="font-mono text-xs text-white/50 w-8 shrink-0">{c.code}</span>
                  <span className="text-xs truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <input
        type="tel"
        required={required}
        value={value}
        onChange={handlePhoneChange}
        className={inputClasses}
        placeholder={`${selected.digits} digits`}
        maxLength={selected.digits}
        pattern={`\\d{${selected.digits}}`}
        title={`Please enter a ${selected.digits}-digit phone number`}
      />
    </div>
  );
};

export default PhoneInput;
export { countries };
export type { Country };
