export type Service = {
  slug: string;
  name: string;
  icon: string;
  description: string;
};

export const services: Service[] = [
  {
    slug: "uae-embassy-attestation",
    name: "UAE Embassy Attestation",
    icon: "building",
    description: "UAE Embassy attestation of your documents in the country of origin — a required step before UAE MOFA stamping and final acceptance.",
  },
  {
    slug: "mofa-attestation",
    name: "MOFA Attestation",
    icon: "stamp",
    description: "Official UAE Ministry of Foreign Affairs (MOFA) stamping for documents previously attested by the relevant embassy, making them legally valid across the UAE.",
  },
  {
    slug: "apostille-services",
    name: "Apostille Services",
    icon: "globe",
    description: "Apostille attestation under the 1961 Hague Convention for documents destined for member countries, removing the need for multi-step embassy attestation.",
  },
  {
    slug: "police-clearance-certificate",
    name: "Police Clearance Certificate",
    icon: "shield",
    description: "End-to-end PCC application, processing, and attestation for employment, residency permits, and immigration visa requirements.",
  },
  {
    slug: "certificate-attestation",
    name: "Certificate Attestation",
    icon: "certificate",
    description: "Complete multi-stage attestation for all certificate types including educational degrees, personal documents, and corporate papers for use in the UAE.",
  },
  {
    slug: "degree-certificate-attestation",
    name: "Degree Certificate",
    icon: "graduation-cap",
    description: "Full attestation of undergraduate, postgraduate, and doctoral certificates for UAE employment visa issuance, professional licensing, and educational enrollment.",
  },
  {
    slug: "birth-certificate-attestation",
    name: "Birth Certificate",
    icon: "baby",
    description: "Birth certificate attestation for UAE family visa sponsorship, dependent residency applications, and school enrollment — handled door to door.",
  },
  {
    slug: "marriage-certificate-attestation",
    name: "Marriage Certificate",
    icon: "rings",
    description: "Marriage certificate attestation for spouse sponsorship, UAE family visa processing, and all other official legal requirements across the Emirates.",
  },
  {
    slug: "commercial-documents-attestation",
    name: "Commercial Documents",
    icon: "briefcase",
    description: "Attestation of commercial documents including Memorandum of Association, Articles of Association, trade invoices, and board resolutions for UAE business operations.",
  },
  {
    slug: "translation-services",
    name: "Translation Services",
    icon: "translate",
    description: "Government-approved certified legal translation into Arabic and other languages, accepted by all UAE ministries, courts, and official authorities.",
  },
  {
    slug: "family-visa-services",
    name: "Family Visa",
    icon: "users",
    description: "Professional document preparation, attestation, and submission support to help you successfully sponsor family members for UAE residency visas.",
  },
  {
    slug: "golden-visa-services",
    name: "Golden Visa",
    icon: "star",
    description: "Comprehensive documentation support and attestation assistance for UAE Golden Visa eligibility assessment and application processing.",
  },
];

export type OtherService = {
  slug: string;
  name: string;
  description: string;
};

export const otherServices: OtherService[] = [
  { slug: "mofa-attestation", name: "MOFA Attestation", description: "Ministry of Foreign Affairs legalization in home country & UAE." },
  { slug: "embassy-attestation", name: "Embassy Attestation", description: "Attestation from the relevant embassy or consulate." },
  { slug: "apostille", name: "Apostille", description: "Hague apostille for Hague Convention member countries." },
  { slug: "translation", name: "Translation", description: "Certified, government-approved legal translation." },
  { slug: "certified-true-copy", name: "Certified True Copy", description: "Notarized true copies of original documents." },
  { slug: "equivalency", name: "Equivalency", description: "Educational equivalency certification for degrees & diplomas." },
  { slug: "family-visa", name: "Family Visa", description: "Support documentation for UAE family visa applications." },
  { slug: "golden-visa", name: "Golden Visa", description: "Documentation support for UAE Golden Visa applications." },
  { slug: "poa", name: "Power of Attorney (POA)", description: "Drafting and attestation of power of attorney documents." },
  { slug: "pcc", name: "Police Clearance Certificate (PCC)", description: "PCC application and attestation processing." },
];

export type Branch = {
  slug: string;
  city: string;
  address: string;
  phone: string;
  email: string;
};

export const branches: Branch[] = [
  {
    slug: "dubai",
    city: "Dubai (Head Office)",
    address: "Al Muteena, Next to Fish Roundabout, Dubai, UAE",
    phone: "+971 55 431 6535",
    email: "Info@amerattestation.ae",
  },
];

export type Country = {
  name: string;
  code: string;
};

export const featuredCountries: Country[] = [
  { name: "India", code: "IN" },
  { name: "Pakistan", code: "PK" },
  { name: "Philippines", code: "PH" },
  { name: "Nepal", code: "NP" },
  { name: "Egypt", code: "EG" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Canada", code: "CA" },
  { name: "Italy", code: "IT" },
  { name: "Russia", code: "RU" },
  { name: "Spain", code: "ES" },
  { name: "Portugal", code: "PT" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "France", code: "FR" },
  { name: "Australia", code: "AU" },
  { name: "Lebanon", code: "LB" },
  { name: "British Virgin Islands", code: "VG" },
  { name: "Germany", code: "DE" },
];

export const countries: Country[] = [
  { name: "Afghanistan", code: "AF" },
  { name: "Albania", code: "AL" },
  { name: "Algeria", code: "DZ" },
  { name: "Argentina", code: "AR" },
  { name: "Armenia", code: "AM" },
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Azerbaijan", code: "AZ" },
  { name: "Bahrain", code: "BH" },
  { name: "Bangladesh", code: "BD" },
  { name: "Belarus", code: "BY" },
  { name: "Belgium", code: "BE" },
  { name: "Bosnia and Herzegovina", code: "BA" },
  { name: "Brazil", code: "BR" },
  { name: "British Virgin Islands", code: "VG" },
  { name: "Bulgaria", code: "BG" },
  { name: "Cambodia", code: "KH" },
  { name: "Cameroon", code: "CM" },
  { name: "Canada", code: "CA" },
  { name: "Chile", code: "CL" },
  { name: "China", code: "CN" },
  { name: "Colombia", code: "CO" },
  { name: "Croatia", code: "HR" },
  { name: "Cyprus", code: "CY" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Denmark", code: "DK" },
  { name: "Egypt", code: "EG" },
  { name: "Ethiopia", code: "ET" },
  { name: "Fiji", code: "FJ" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Georgia", code: "GE" },
  { name: "Germany", code: "DE" },
  { name: "Ghana", code: "GH" },
  { name: "Greece", code: "GR" },
  { name: "Hong Kong", code: "HK" },
  { name: "Hungary", code: "HU" },
  { name: "Iceland", code: "IS" },
  { name: "India", code: "IN" },
  { name: "Indonesia", code: "ID" },
  { name: "Iran", code: "IR" },
  { name: "Iraq", code: "IQ" },
  { name: "Ireland", code: "IE" },
  { name: "Israel", code: "IL" },
  { name: "Italy", code: "IT" },
  { name: "Jamaica", code: "JM" },
  { name: "Japan", code: "JP" },
  { name: "Jordan", code: "JO" },
  { name: "Kazakhstan", code: "KZ" },
  { name: "Kenya", code: "KE" },
  { name: "Kuwait", code: "KW" },
  { name: "Kyrgyzstan", code: "KG" },
  { name: "Latvia", code: "LV" },
  { name: "Lebanon", code: "LB" },
  { name: "Libya", code: "LY" },
  { name: "Lithuania", code: "LT" },
  { name: "Luxembourg", code: "LU" },
  { name: "Malaysia", code: "MY" },
  { name: "Maldives", code: "MV" },
  { name: "Malta", code: "MT" },
  { name: "Mauritius", code: "MU" },
  { name: "Mexico", code: "MX" },
  { name: "Moldova", code: "MD" },
  { name: "Monaco", code: "MC" },
  { name: "Mongolia", code: "MN" },
  { name: "Montenegro", code: "ME" },
  { name: "Morocco", code: "MA" },
  { name: "Myanmar", code: "MM" },
  { name: "Nepal", code: "NP" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Nigeria", code: "NG" },
  { name: "North Macedonia", code: "MK" },
  { name: "Norway", code: "NO" },
  { name: "Oman", code: "OM" },
  { name: "Pakistan", code: "PK" },
  { name: "Palestine", code: "PS" },
  { name: "Panama", code: "PA" },
  { name: "Peru", code: "PE" },
  { name: "Philippines", code: "PH" },
  { name: "Poland", code: "PL" },
  { name: "Portugal", code: "PT" },
  { name: "Qatar", code: "QA" },
  { name: "Romania", code: "RO" },
  { name: "Russia", code: "RU" },
  { name: "Rwanda", code: "RW" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Senegal", code: "SN" },
  { name: "Serbia", code: "RS" },
  { name: "Seychelles", code: "SC" },
  { name: "Singapore", code: "SG" },
  { name: "Slovakia", code: "SK" },
  { name: "Slovenia", code: "SI" },
  { name: "Somalia", code: "SO" },
  { name: "South Africa", code: "ZA" },
  { name: "South Korea", code: "KR" },
  { name: "Spain", code: "ES" },
  { name: "Sri Lanka", code: "LK" },
  { name: "Sudan", code: "SD" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "Syria", code: "SY" },
  { name: "Taiwan", code: "TW" },
  { name: "Tajikistan", code: "TJ" },
  { name: "Tanzania", code: "TZ" },
  { name: "Thailand", code: "TH" },
  { name: "Tunisia", code: "TN" },
  { name: "Turkey", code: "TR" },
  { name: "Turkmenistan", code: "TM" },
  { name: "Uganda", code: "UG" },
  { name: "Ukraine", code: "UA" },
  { name: "United Arab Emirates", code: "AE" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "Uruguay", code: "UY" },
  { name: "Uzbekistan", code: "UZ" },
  { name: "Venezuela", code: "VE" },
  { name: "Vietnam", code: "VN" },
  { name: "Yemen", code: "YE" },
  { name: "Zambia", code: "ZM" },
  { name: "Zimbabwe", code: "ZW" },
];

export type Testimonial = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rajan Menon",
    location: "Dubai",
    rating: 5,
    text: "I had my India degree certificate attested for a UAE work visa and the entire process was handled without me lifting a finger. Same-day pickup, WhatsApp updates throughout, and the stamped document was back in my hands within 3 days. Absolutely brilliant service.",
  },
  {
    name: "Amna Al Hashimi",
    location: "Abu Dhabi",
    rating: 5,
    text: "I needed MOFA attestation and UAE Embassy stamping for my marriage certificate to sponsor my husband. Zara was incredibly helpful, explained every step in advance, and the whole process was smooth. Highly recommend Amer Attestation to anyone in Abu Dhabi.",
  },
  {
    name: "Daniel Fernandez",
    location: "Sharjah",
    rating: 5,
    text: "Needed a UK apostille urgently for a legal matter in Sharjah. The team was upfront about costs, moved extremely fast, and delivered the document to my office the next day. No stress, no surprises. Will definitely use them again.",
  },
  {
    name: "Sana Mirza",
    location: "Ajman",
    rating: 5,
    text: "Getting my Pakistan nursing degree attested for DHA was something I was dreading. Amer handled everything — notary, MOFA, embassy, and UAE MOFA — in one go. Professional, reliable, and great value for money. Thank you!",
  },
  {
    name: "Omar Al Rashid",
    location: "Ras Al Khaimah",
    rating: 5,
    text: "We needed bulk attestation for 15 employee certificates as part of a company expansion. Amer assigned a dedicated advisor who tracked every single document and delivered all of them on time. Outstanding corporate service.",
  },
];

export type Faq = {
  question: string;
  answer: string;
};

export const faqs: Faq[] = [
  {
    question: "What exactly is document attestation?",
    answer:
      "Document attestation is an official verification process where government authorities validate the authenticity of your certificate or document, making it legally recognised and acceptable for use in a foreign country like the UAE.",
  },
  {
    question: "What is an Apostille certificate?",
    answer:
      "An Apostille is a standardized authentication certificate issued under the 1961 Hague Convention. It validates a public document for recognition in any of the 120+ Hague member countries, eliminating the need for traditional embassy-to-embassy legalization between those nations.",
  },
  {
    question: "How do I know if I need an Apostille or full Attestation?",
    answer:
      "If both your document's country of origin and the UAE are signatories to the Hague Convention, an Apostille is typically sufficient. Since the UAE only recently joined, most cases still require full multi-stage attestation (Notary → Home MOFA → UAE Embassy → UAE MOFA). Our advisors will assess your specific case for free.",
  },
  {
    question: "How safe are my original documents with you?",
    answer:
      "Document security is our highest priority. Every original is registered in our system upon collection, tracked at every processing stage, and handled exclusively by trained specialists. We provide real-time status updates and use insured, secure courier services for all pickups and deliveries.",
  },
  {
    question: "Can laminated certificates be attested?",
    answer:
      "In most cases, yes. However, some issuing countries or authorities require delamination before stamping is possible. Your dedicated advisor will clarify the exact requirements based on your document's country of origin at no extra charge.",
  },
  {
    question: "Can I monitor the progress of my attestation?",
    answer:
      "Absolutely. Your personal advisor will proactively send you status updates via WhatsApp and email at every key milestone — from initial collection, through each attestation stage, right up to final delivery at your location.",
  },
  {
    question: "Do you provide document pickup and delivery?",
    answer:
      "Yes, we offer completely free and secure door-to-door document collection and delivery service across Dubai, Abu Dhabi, Sharjah, Ajman, and all other UAE Emirates.",
  },
  {
    question: "Why is getting your documents attested important?",
    answer:
      "UAE government and corporate authorities require attested documents to verify they are genuine. Without attestation, your certificates will not be accepted for employment visa processing, family sponsorship, business licensing, academic enrollment, or court submissions.",
  },
  {
    question: "How much does attestation cost in the UAE?",
    answer:
      "Attestation fees vary based on the document category, its country of issue, and the specific stages required. Our services begin from AED 250, which includes complimentary pickup and delivery. Contact us for a precise, obligation-free quote tailored to your documents.",
  },
  {
    question: "What are the stages of the attestation process?",
    answer:
      "The standard UAE attestation chain is: Notary Public → Home State/HRD Verification → Origin Country Ministry of Foreign Affairs → UAE Embassy Attestation → UAE Ministry of Foreign Affairs (MOFA) final stamp. Amer manages every single stage on your behalf.",
  },
];

export const documentCategories = [
  {
    title: "Educational",
    items: ["Degree", "Diploma", "Marksheet", "Transcript", "Nursing", "Engineering", "School Certificate"],
  },
  {
    title: "Personal",
    items: ["Birth Certificate", "Marriage Certificate", "Divorce Certificate", "Death Certificate", "Medical Certificate", "Transfer Certificate"],
  },
  {
    title: "Commercial",
    items: ["MOA", "AOA", "POA", "Invoices", "Incorporation Certificate", "Board Resolution"],
  },
  {
    title: "Other Legalization",
    items: ["Police Clearance Certificate", "Family Visa", "Certified True Copy", "Embassy Attestation", "MOFA Attestation", "MOJ Attestation", "Translation"],
  },
];

export const whyAmer = [
  { label: "Trusted Attestation Services", icon: "badge" },
  { label: "4000+ Attestations / Month", icon: "chart" },
  { label: "Free Pickup & Delivery", icon: "truck" },
  { label: "Secure & Confidential", icon: "lock" },
  { label: "15+ Years of Experience", icon: "clock" },
  { label: "24/7 Customer Support", icon: "headset" },
];

export const stats = [
  { value: "1,000+", label: "Documents Attested" },
  { value: "20+", label: "Professionals" },
  { value: "500+", label: "Customer Reviews" },
  { value: "1,000+", label: "Happy Clients" },
];

export const whyRankNo1 = [
  {
    title: "Personalized Attestation Expert",
    description: "You're assigned a dedicated legalization specialist who handles your documents from collection to final delivery, ensuring total peace of mind.",
  },
  {
    title: "Bespoke Processing Solutions",
    description: "We excel at managing complex, urgent, or multi-jurisdictional attestation requirements with strategies customized for your specific timeline.",
  },
  {
    title: "All-in-One Legalization Hub",
    description: "From certified translation and apostille services to MOFA and Embassy approvals, we offer a complete suite of services to save you time and money.",
  },
];

export const partnerLogos = ["Fly Dubai", "Heriot-Watt", "ACCA", "Hult", "Deloitte"];

export const howItWorks = [
  { step: 1, title: "Request a Free Quote", description: "Submit your document details online or via WhatsApp for an immediate, transparent cost estimate." },
  { step: 2, title: "Consultation & Strategy", description: "Our experts review your requirements, confirm the exact procedures, and set a clear timeline." },
  { step: 3, title: "Complimentary Collection", description: "We securely pick up your original documents from your home or office anywhere in the UAE." },
  { step: 4, title: "Processing & Safe Return", description: "We manage the entire attestation process and deliver your legalized documents right back to your door." },
];

export const aboutIntro = [
  "Established in the heart of Dubai, Amer Attestation Services was built with a singular vision: to transform the complex, bureaucratic process of document legalization into a seamless, hassle-free experience for expats, families, and corporations across the UAE.",
  "As a premier, trusted attestation agency, we interface directly with global notaries, foreign ministries, UAE Embassies worldwide, and the UAE Ministry of Foreign Affairs (MOFA). We ensure that every document we process strictly adheres to international diplomatic protocols, guaranteeing 100% compliance and acceptance.",
  "With over 15 years of deep industry expertise, our team has successfully legalized thousands of critical documents—ranging from educational degrees and marriage certificates to complex commercial dossiers—originating from more than 120 countries.",
  "Our proprietary, highly transparent workflow eliminates the uncertainty typically associated with document attestation. By assigning a dedicated specialist to every case, we provide accurate updates, secure handling, and unparalleled efficiency, ensuring you never miss a deadline.",
];

export const authoritiesWeWorkWith = [
  "UAE Ministry of Foreign Affairs (MOFA)",
  "UAE Embassies & Consulates abroad",
  "Home country Ministries of Foreign Affairs",
  "Ministry of Justice (MOJ) & Notary Public",
  "Home State / HRD attestation departments",
  "Hague Convention apostille authorities",
  "Chambers of Commerce (for commercial documents)",
  "Certified legal translation authorities",
];

export const easyBenefits = [
  "Skip the queues and government office visits entirely",
  "Complimentary VIP pickup and delivery across all Emirates",
  "Real-time tracking and status alerts via WhatsApp",
  "Guaranteed flat-rate pricing with zero hidden costs",
  "Comprehensive start-to-finish support and document insurance",
];

export const missionVision = {
  vision: "To set the benchmark for document legalization in the Middle East by delivering the fastest, most secure, and most transparent attestation services globally.",
  mission: "To empower individuals and businesses in the UAE by simplifying global document attestation through expert guidance, innovative processes, and an unwavering commitment to customer satisfaction.",
};

export const whyChooseCards = [
  { title: "Complimentary Logistics", description: "Enjoy free, secure courier pickup and delivery straight from your location.", icon: "truck" },
  { title: "Expert Account Managers", description: "Get assigned a dedicated specialist for one-on-one personalized support.", icon: "headset" },
  { title: "Uncompromising Security", description: "Your sensitive documents are tracked and protected at every single stage.", icon: "lock" },
  { title: "Honest, Flat Pricing", description: "Receive crystal-clear quotes upfront. What you see is exactly what you pay.", icon: "badge" },
];

export const contactNumbers = {
  dubai: "+971 55 431 6535",
  tollFree: "+971 55 431 6535",
  landlineDubai: "+971 55 431 6535",
  emailDubai: "Info@amerattestation.ae",
};
