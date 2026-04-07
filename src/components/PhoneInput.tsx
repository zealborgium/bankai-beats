import { useState } from "react";

interface Country {
  name: string;
  code: string;
  dial: string;
  digits: number;
}

const countries: Country[] = [
  { name: "India", code: "IN", dial: "+91", digits: 10 },
  { name: "USA", code: "US", dial: "+1", digits: 10 },
  { name: "UK", code: "GB", dial: "+44", digits: 10 },
  { name: "Australia", code: "AU", dial: "+61", digits: 9 },
  { name: "Canada", code: "CA", dial: "+1", digits: 10 },
  { name: "UAE", code: "AE", dial: "+971", digits: 9 },
  { name: "Singapore", code: "SG", dial: "+65", digits: 8 },
  { name: "Japan", code: "JP", dial: "+81", digits: 10 },
  { name: "South Korea", code: "KR", dial: "+82", digits: 10 },
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

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.code === e.target.value) || countries[0];
    setSelected(country);
    onChange("", country.dial);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, selected.digits);
    onChange(digits, selected.dial);
  };

  return (
    <div className="flex gap-2">
      <select
        value={selected.code}
        onChange={handleCountryChange}
        className="bg-muted border-2 border-border rounded-full px-3 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-all font-body w-20 shrink-0"
      >
        {countries.map(c => (
          <option key={c.code + c.dial} value={c.code}>
            {c.dial}
          </option>
        ))}
      </select>
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
