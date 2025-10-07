import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, MapPin, FileText, Phone, Globe, Volume2, User, Bell, ChevronRight, Scale, BookOpen, X, Mic, Send, Menu, ChevronDown, Sparkles, Camera, Image, AlertCircle, Clock, CheckCircle, ArrowLeft, ArrowRight, Play, Zap, Upload, ThumbsUp, ThumbsDown, Paperclip, Video, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Add TypeScript interfaces
interface TranslationKeys {
  appName: string;
  tagline: string;
  freeConsult: string;
  lawyerMatching: string;
  compatibility: string;
  calculators: string;
  kyc: string;
  bestLawyers: string;
  chatWithLawyer: string;
  talkToLawyer: string;
  legalMall: string;
  blogs: string;
  login: string;
  heroTitle: string;
  chatNow: string;
  askQuestion: string;
  findLawyer: string;
  bookPooja: string;
  complimentaryServices: string;
  freeKundli: string;
  kundliMatch: string;
  horoscope: string;
  panchang: string;
  activeRequests: string;
  viewAll: string;
  knowRights: string;
  learnRights: string;
  propertyRights: string;
  familyRights: string;
  workerRights: string;
  consumerRights: string;
  assistant: string;
  alwaysHelp: string;
  assistantMsg: string;
  typePlaceholder: string;
  listening: string;
  stopListening: string;
  uploadDoc: string;
  takePhoto: string;
  quickReplies: string;
  emergencyHelp: string;
  yourAddress?: string;
  state?: string;
  city?: string;
  address?: string;
  selectState?: string;
  enterAddress?: string;
  continue?: string;
  iAmA?: string;
  client?: string;
  lawyer?: string;
}

interface LegalForm {
  id: string;
  title: string;
  category: 'civil' | 'criminal' | 'family' | 'property' | 'corporate';
  jurisdiction: string[];
  language: string[];
  fileUrl: string;
  estimatedTime: number;
  requirements: string[];
}

interface Translations {
  English: TranslationKeys;
  "हिंदी": TranslationKeys;
  "తెలుగు": TranslationKeys;
}

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
  image?: string;
  category?: string;
  showOptions?: boolean;
  options?: any[];
  showLawyers?: boolean;
  lawyers?: any[];
  urgent?: boolean;
  showEmergencyOptions?: boolean;
  isLoading?: boolean;
  showButtons?: boolean;
}

interface Lawyer {
  name: string;
  image: string;
  rating: number;
  experience: string;
  cases: number;
  specialization: string;
  rate: string;
  location: string;
  languages: string[];
  availability: string;
}

interface QuickReplyOption {
  text: string;
  icon: string;
  category: string;
}

interface FollowUpOption {
  text: string;
  subCategory: string;
}

// Add window type declarations
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const translations: Translations = {
  English: {
    appName: "Nyaya Setu",
    tagline: "Your Legal Bridge",
    freeConsult: "Free Legal Consultation",
    lawyerMatching: "Lawyer Matching",
    compatibility: "Case Compatibility",
    calculators: "Calculators",
    kyc: "Know Your Rights",
    bestLawyers: "Best Lawyers",
    chatWithLawyer: "Chat with Lawyer",
    talkToLawyer: "Talk to Lawyer",
    legalMall: "Legal Mall",
    blogs: "Blogs",
    login: "Login",
    heroTitle: "Get Expert Legal Help",
    chatNow: "Chat Now",
    askQuestion: "Ask a Question",
    findLawyer: "Find a Lawyer",
    bookPooja: "Book Consultation",
    complimentaryServices: "COMPLIMENTARY LEGAL SERVICES",
    freeKundli: "Free Consultation",
    kundliMatch: "Case Matching",
    horoscope: "Legal Documents",
    panchang: "Legal Calendar",
    activeRequests: "Your Active Requests",
    viewAll: "View All",
    knowRights: "Know Your Rights",
    learnRights: "Hi! I'm Nyaya. Tap me to learn about your legal rights!",
    propertyRights: "Property Rights",
    familyRights: "Family Rights",
    workerRights: "Worker Rights",
    consumerRights: "Consumer Rights",
    assistant: "Legal Assistant",
    alwaysHelp: "Always here to help",
    assistantMsg: "Hello! I'm here to help you understand your legal rights. What would you like to know?",
    typePlaceholder: "Type or speak your question...",
    listening: "Listening...",
    stopListening: "Stop",
    uploadDoc: "Upload Document",
    takePhoto: "Take Photo",
    quickReplies: "Quick Replies",
    emergencyHelp: "Emergency Help",
    yourAddress: "Your Address",
    state: "State",
    city: "City",
    address: "Address",
    selectState: "Select State",
    enterAddress: "Enter your address",
    continue: "Continue",
    iAmA: "I am a",
    client: "Client",
    lawyer: "Lawyer"
  },
  "हिंदी": {
    appName: "न्याय सेतु",
    tagline: "आपका कानूनी सेतु",
    freeConsult: "मुफ्त कानूनी परामर्श",
    lawyerMatching: "वकील मिलान",
    compatibility: "मामला अनुकूलता",
    calculators: "कैलकुलेटर",
    kyc: "अपने अधिकार जानें",
    bestLawyers: "सर्वश्रेष्ठ वकील",
    chatWithLawyer: "वकील से चैट करें",
    talkToLawyer: "वकील से बात करें",
    legalMall: "कानूनी मॉल",
    blogs: "ब्लॉग",
    login: "लॉगिन",
    heroTitle: "विशेषज्ञ कानूनी सहायता प्राप्त करें",
    chatNow: "अब चैट करें",
    askQuestion: "प्रश्न पूछें",
    findLawyer: "वकील खोजें",
    bookPooja: "परामर्श बुक करें",
    complimentaryServices: "निःशुल्क कानूनी सेवाएं",
    freeKundli: "मुफ्त परामर्श",
    kundliMatch: "मामला मिलान",
    horoscope: "कानूनी दस्तावेज़",
    panchang: "कानूनी कैलेंडर",
    activeRequests: "आपके सक्रिय अनुरोध",
    viewAll: "सभी देखें",
    knowRights: "अपने अधिकार जानें",
    learnRights: "नमस्ते! मैं न्याय हूं। अपने कानूनी अधिकारों के बारे में जानने के लिए मुझे टैप करें!",
    propertyRights: "संपत्ति अधिकार",
    familyRights: "पारिवारिक अधिकार",
    workerRights: "श्रमिक अधिकार",
    consumerRights: "उपभोक्ता अधिकार",
    assistant: "कानूनी सहायक",
    alwaysHelp: "हमेशा मदद के लिए यहाँ",
    assistantMsg: "नमस्ते! मैं आपके कानूनी अधिकारों को समझने में मदद करने के लिए यहाँ हूँ। आप क्या जानना चाहते हैं?",
    typePlaceholder: "अपना सवाल टाइप या बोलें...",
    listening: "सुन रहा हूं...",
    stopListening: "रुकें",
    uploadDoc: "दस्तावेज़ अपलोड करें",
    takePhoto: "फोटो लें",
    quickReplies: "त्वरित जवाब",
    emergencyHelp: "आपातकालीन मदद",
    yourAddress: "आपका पता",
    state: "राज्य",
    city: "शहर",
    address: "पता",
    selectState: "राज्य चुनें",
    enterAddress: "अपना पता दर्ज करें",
    continue: "जारी रखें",
    iAmA: "मैं हूं",
    client: "ग्राहक",
    lawyer: "वकील"
  },
  "తెలుగు": {
    appName: "న్యాయ సేతు",
    tagline: "మీ చట్టపరమైన వంతెన",
    freeConsult: "ఉచిత చట్టపరమైన సలహా",
    lawyerMatching: "న్యాయవాది సరిపోలిక",
    compatibility: "కేసు అనుకూలత",
    calculators: "కాలిక్యులేటర్లు",
    kyc: "మీ హక్కులను తెలుసుకోండి",
    bestLawyers: "ఉత్తమ న్యాయవాదులు",
    chatWithLawyer: "న్యాయవాదితో చాట్ చేయండి",
    talkToLawyer: "న్యాయవాదితో మాట్లాడండి",
    legalMall: "లీగల్ మాల్",
    blogs: "బ్లాగులు",
    login: "లాగిన్",
    heroTitle: "నిపుణ చట్టపరమైన సహాయం పొందండి",
    chatNow: "ఇప్పుడు చాట్ చేయండి",
    askQuestion: "ప్రశ్న అడగండి",
    findLawyer: "న్యాయవాదిని కనుగొనండి",
    bookPooja: "సలహాను బుక్ చేయండి",
    complimentaryServices: "నిరుపయోగ చట్టపరమైన సేవలు",
    freeKundli: "ఉచిత సలహా",
    kundliMatch: "కేసు సరిపోలిక",
    horoscope: "చట్టపరమైన పత్రాలు",
    panchang: "చట్టపరమైన క్యాలెండర్",
    activeRequests: "మీ యాక్టివ్ అభ్యర్థనలు",
    viewAll: "అన్నీ చూడండి",
    knowRights: "మీ హక్కులను తెలుసుకోండి",
    learnRights: "నమస్కారం! నేను న్యాయ. మీ చట్టపరమైన హక్కుల గురించి తెలుసుకోవడానికి నన్ను టాప్ చేయండి!",
    propertyRights: "ఆస్తి హక్కులు",
    familyRights: "కుటుంబ హక్కులు",
    workerRights: "కార్మిక హక్కులు",
    consumerRights: "గ్రాహక హక్కులు",
    assistant: "చట్టపరమైన సహాయకుడు",
    alwaysHelp: "ఎల్లప్పుడూ సహాయానికి ఇక్కడ ఉన్నాము",
    assistantMsg: "నమస్కారం! మీ చట్టపరమైన హక్కులను అర్థం చేసుకోవడంలో మీకు సహాయం చేయడానికి నేను ఇక్కడ ఉన్నాను. మీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
    typePlaceholder: "మీ ప్రశ్నను టైప్ చేయండి లేదా మాట్లాడండి...",
    listening: "వింటున్నాను...",
    stopListening: "ఆపండి",
    uploadDoc: "పత్రాన్ని అప్‌లోడ్ చేయండి",
    takePhoto: "ఫోటో తీయండి",
    quickReplies: "త్వరిత సమాధానాలు",
    emergencyHelp: "అత్యవసర సహాయం",
    yourAddress: "మీ చిరునామా",
    state: "రాష్ట్రం",
    city: "నగరం",
    address: "చిరునామా",
    selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
    enterAddress: "మీ చిరునామాను నమోదు చేయండి",
    continue: "కొనసాగించు",
    iAmA: "నేను ఒక",
    client: "క్లయింట్",
    lawyer: "న్యాయవాది"
  }
};



const NyayaSetuDashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'English' | 'हिंदी' | 'తెలుగు'>('English');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showKYRAssistant, setShowKYRAssistant] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isContinuousListening, setIsContinuousListening] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [nyayaExpression, setNyayaExpression] = useState('smile');
  const [selectedLaw, setSelectedLaw] = useState<string | null>(null);
  const [urgencyLevel, setUrgencyLevel] = useState<'low' | 'normal' | 'high' | null>(null);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [lawyerChatMessages, setLawyerChatMessages] = useState<ChatMessage[]>([]);
  const [lawyerUserInput, setLawyerUserInput] = useState('');
  // Add this state
const [showDocScanner, setShowDocScanner] = useState(false);
const [scannedText, setScannedText] = useState('');

const [selectedForm, setSelectedForm] = useState<LegalForm | null>(null);
const [formTemplates, setFormTemplates] = useState<LegalForm[]>([]);
const [showFormBuilder, setShowFormBuilder] = useState(false);

 const navigate = useNavigate();

 const [showCaseTracker, setShowCaseTracker] = useState(false);
const [activeCases, setActiveCases] = useState([
  {
    id: 'CASE001',
    title: 'Property Dispute - Landlord Issue',
    lawyer: 'Adv. Rajesh Kumar',
    status: 'documents_submitted',
    statusText: 'Documents Submitted',
    progress: 60,
    lastUpdate: '2024-01-15',
    nextHearing: '2024-01-30',
    timeline: [
      { stage: 'Consultation', date: '2024-01-05', completed: true },
      { stage: 'Documents Submitted', date: '2024-01-15', completed: true },
      { stage: 'Case in Progress', date: '2024-01-30', completed: false },
      { stage: 'Resolved', date: '', completed: false }
    ]
  },
  {
    id: 'CASE002', 
    title: 'Consumer Complaint - Defective Product',
    lawyer: 'Adv. Priya Sharma',
    status: 'consultation',
    statusText: 'Under Consultation',
    progress: 25,
    lastUpdate: '2024-01-10',
    nextHearing: '2024-01-25',
    timeline: [
      { stage: 'Consultation', date: '2024-01-10', completed: true },
      { stage: 'Documents Submitted', date: '', completed: false },
      { stage: 'Case in Progress', date: '', completed: false },
      { stage: 'Resolved', date: '', completed: false }
    ]
  }
]);

const legalInfo: Record<string, { title: string; content: string }> = {
  propertyRights: {
    title: "Property Rights in India",
    content: "Property rights are fundamental legal rights that protect ownership and use of land and buildings. Here are key points:\n\n• Right to Own: Every citizen has the right to acquire, hold, and dispose of property\n• Inheritance Rights: Property can be inherited according to personal laws or will\n• Protection: The Constitution protects property rights under Article 300A\n• Land Records: Always verify land titles through official records\n• Registration: Property transactions must be registered under the Registration Act, 1908\n• Disputes: Property disputes can be resolved through civil courts\n• Women's Rights: Women have equal rights to inherit and own property\n• Illegal Encroachment: You can file an FIR and civil suit against illegal occupation\n\nImportant Documents:\n- Sale Deed\n- Property Tax Receipts\n- Encumbrance Certificate\n- Land Survey Records"
  },
  familyRights: {
    title: "Family Rights in India",
    content: "Family law governs relationships between family members. Key aspects include:\n\nMarriage Rights:\n• Legal age: 21 for men, 18 for women (as per new laws)\n• Registration: Marriage registration is mandatory in many states\n• Inter-faith marriages: Protected under Special Marriage Act, 1954\n\nDivorce Rights:\n• Mutual Consent: Both parties can divorce by mutual agreement\n• Grounds: Cruelty, adultery, desertion, mental illness\n• Maintenance: Wife can claim maintenance under Section 125 CrPC\n• Child Custody: Court decides based on child's welfare\n\nInheritance Rights:\n• Hindu Succession Act: Daughters have equal rights as sons\n• Muslim Personal Law: Governed by Shariat\n• Christian and Parsi: Governed by respective succession acts\n• Will: Anyone can make a will to distribute property\n\nDomestic Violence:\n• Protection of Women from Domestic Violence Act, 2005\n• Covers physical, emotional, economic abuse\n• Right to reside in shared household"
  },
  workerRights: {
  title: "Worker Rights in India",
  content: "Worker rights ensure fair treatment, safety, and proper compensation for employees. Key aspects include:\n\nWages and Working Hours:\n• Minimum Wages Act, 1948 – ensures fair pay for all workers\n• Equal pay for equal work – no gender discrimination allowed\n• Working hours: Generally 8 hours per day, 48 hours per week\n• Overtime: Must be paid double the regular rate\n\nJob Security:\n• Industrial Disputes Act, 1947 – safeguards against unfair dismissal\n• Notice or compensation required before termination\n• Right to form or join trade unions for collective bargaining\n\nHealth and Safety:\n• Factories Act, 1948 – mandates safety measures, clean environment, and first-aid facilities\n• Employees must be provided with protective gear and regular health checks\n\nSocial Security:\n• Employees’ Provident Fund (EPF) – retirement savings contribution by employer and employee\n• Employees’ State Insurance (ESI) – medical and maternity benefits\n• Maternity Benefit Act, 1961 – 26 weeks of paid leave for eligible women employees\n\nGrievance Redressal:\n• Labour courts and industrial tribunals handle worker disputes\n• Employees can approach Labour Commissioner for unresolved issues"
},
consumerRights: {
  title: "Consumer Rights in India",
  content: "Consumer rights protect individuals from unfair trade practices and ensure quality goods and services. Key aspects include:\n\nRight to Safety:\n• Protection against goods and services that are hazardous to life and health\n• Example: Electrical appliances, food, and medicines must meet safety standards\n\nRight to Information:\n• Consumers must be informed about the product’s ingredients, price, quantity, and manufacturing details\n• Misleading advertisements are punishable under the Consumer Protection Act, 2019\n\nRight to Choose:\n• Freedom to select from a variety of goods and services at fair prices\n• No seller can force you to buy a specific brand or package\n\nRight to be Heard:\n• Consumers can file complaints and expect their grievances to be addressed\n• Consumer helplines and online portals (e.g., National Consumer Helpline – 1800-11-4000)\n\nRight to Seek Redressal:\n• Consumers can approach District, State, or National Consumer Disputes Redressal Commissions\n• Compensation can be claimed for defective goods, poor services, or unfair trade practices\n\nRight to Consumer Education:\n• Awareness programs ensure consumers know their rights and responsibilities\n• Schools, NGOs, and media spread consumer education initiatives"
},
studentMentalHealth: {
  title: "Student Mental Health Rights in India",
  content: "Student mental health rights ensure educational institutions provide proper support and accommodations. Key aspects include:\n\nRight to Counseling Services:\n• Educational institutions must provide free counseling and mental health support\n• Confidential sessions with trained professionals available\n• Example: Colleges must have student wellness centers\n\nRight to Non-Discrimination:\n• No discrimination in admissions based on mental health conditions\n• Equal opportunities for academic and extracurricular activities\n• Protection from stigma and harassment\n\nRight to Academic Accommodations:\n• Flexible attendance during mental health treatment\n• Extra time for assignments and examinations during crises\n• Option for course reduction without penalty\n\nRight to Privacy:\n• Mental health records remain strictly confidential\n• Information cannot be shared without student's consent\n• Protection from unauthorized disclosure\n\nRight to Grievance Redressal:\n• Institutions must have mental health grievance committees\n• Quick resolution of mental health-related complaints\n• Access to ombudsman for unresolved issues\n\nRight to Suicide Prevention Support:\n• 24/7 helplines and crisis intervention services\n• Decriminalization of attempted suicide\n• Rehabilitation programs instead of punishment"
},
tribalProperty: {
  title: "Tribal Property & Forest Rights in India",
  content: "Tribal property rights protect indigenous communities' land and forest resources. Key aspects include:\n\nRight to Forest Land:\n• Individual Forest Rights for up to 4 hectares of forest land\n• Community Forest Rights for traditional forest areas\n• Protection from illegal eviction and displacement\n\nRight to Consent:\n• Gram Sabha consent mandatory for any land acquisition\n• Consultation required for development projects in tribal areas\n• Veto power over projects affecting tribal habitats\n\nRight to Traditional Resources:\n• Access to minor forest produce for livelihood\n• Rights over water bodies and grazing lands\n• Protection of traditional knowledge and cultural practices\n\nRight to Legal Protection:\n• Prohibition of land transfer to non-tribals\n• Special courts for tribal land dispute resolution\n• Legal aid for tribal communities\n\nRight to Development:\n• Equitable share in project benefits and compensation\n• Protection from forced relocation\n• Rehabilitation and resettlement rights\n\nRight to Cultural Preservation:\n• Protection of sacred groves and worship sites\n• Conservation of traditional habitats\n• Recognition of customary laws"
},

digitalPrivacy: {
  title: "Digital Privacy & Data Protection Rights in India",
  content: "Digital privacy rights protect personal information in the digital space under DPDP Act 2023. Key aspects include:\n\nRight to Consent:\n• Organizations must obtain clear consent before collecting personal data\n• Purpose limitation - data can only be used for specified purposes\n• Right to withdraw consent at any time\n\nRight to Information:\n• Clear notice about what data is collected and how it will be used\n• Information about third parties with whom data is shared\n• Transparency about data processing activities\n\nRight to Correction & Erasure:\n• Correction of inaccurate personal data\n• Updating incomplete information\n• Right to erase data when no longer necessary\n\nRight to Grievance Redressal:\n• Data Protection Board for complaint resolution\n• Compensation for data breaches and privacy violations\n• Time-bound resolution of complaints\n\nRight to Data Security:\n• Protection against unauthorized access and data breaches\n• Mandatory security safeguards by data processors\n• Notification of data breaches to individuals\n\nRight to Nomination:\n• Nominate someone to exercise rights in case of death or incapacity\n• Succession planning for digital assets and data\n• Inheritance of digital rights"
},

victimWitnessRights: {
  title: "Victim & Witness Rights in Gender-Based Violence Cases",
  content: "Victim and witness rights ensure protection and support during legal proceedings. Key aspects include:\n\nRight to Protection:\n• Protection from intimidation and threats\n• In-camera proceedings to maintain privacy\n• Identity protection in media reporting\n\nRight to Support Services:\n• Free legal aid and counseling\n• Medical examination and treatment\n• Shelter and rehabilitation facilities\n\nRight to Information:\n• Information about case progress and court dates\n• Copies of FIR and charge sheet\n• Details about accused's arrest and bail status\n\nRight to Participation:\n• Representation through advocate\n• Right to be heard during bail hearings\n• Participation in settlement discussions\n\nRight to Compensation:\n• Interim compensation during trial\n• Final compensation after conviction\n• Special compensation for rehabilitation\n\nRight to Witness Protection:\n• Separate waiting areas in court\n• Video conferencing for testimony\n• Witness protection program for high-risk cases"
},

criminalTrial: {
  title: "Criminal Trial Process & e-FIR Rights in India",
  content: "Criminal trial rights ensure fair and timely justice delivery. Key aspects include:\n\nRight to e-FIR:\n• Online FIR registration through state police portals\n• Zero FIR at any police station regardless of jurisdiction\n• Acknowledgement receipt with unique reference number\n\nRight to Speedy Trial:\n• Time-bound investigation and trial completion\n• Maximum 90 days for filing charge sheet\n• Fast-track courts for certain categories of cases\n\nRight to Legal Aid:\n• Free legal counsel if unable to afford lawyer\n• Legal Services Authorities at district and state levels\n• Duty lawyer available at police stations and courts\n\nRight to Bail:\n• Default bail if investigation not completed in specified time\n• Anticipatory bail for apprehension of arrest\n• Regular bail after arrest\n\nRight to Fair Trial:\n• Presumption of innocence until proven guilty\n• Cross-examination of prosecution witnesses\n• Production of defense evidence and witnesses\n\nRight to Appeal:\n• Appeal against conviction to higher courts\n• Revision petitions for procedural errors\n• Special leave petitions to Supreme Court"
},

mentalHealthRights: {
  title: "Mental Health Rights & Suicide Prevention in India",
  content: "Mental health rights ensure dignity and proper care for individuals with mental illness. Key aspects include:\n\nRight to Access Healthcare:\n• Affordable mental healthcare services\n• Emergency mental health services\n• Integration with general healthcare systems\n\nRight to Community Living:\n• Live in, be part of, and not be segregated from society\n• Access to community-based rehabilitation services\n• Protection from segregation in mental health establishments\n\nRight to Protection:\n• Protection from cruel, inhuman, or degrading treatment\n• Right to confidentiality of mental health information\n• Protection from physical restraint except exceptional circumstances\n\nRight to Legal Aid:\n• Free legal services for mental healthcare matters\n• Assistance in filing complaints and appeals\n• Representation in mental health review boards\n\nRight to Information:\n• Information about rights, treatment, and prognosis\n• Access to medical records and reports\n• Information about available support services\n\nRight to Suicide Prevention:\n• Decriminalization of attempted suicide\n• Access to emergency healthcare and counseling\n• Rehabilitation and follow-up care services"
}

};

// Add this component
{showDocScanner && (
  <div className="fixed inset-0 bg-black z-50 flex flex-col">
    <div className="bg-white p-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">AI Document Scanner</h2>
      <button onClick={() => setShowDocScanner(false)}>
        <X size={24} />
      </button>
    </div>
    <div className="flex-1 bg-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <Camera size={64} className="mx-auto mb-4" />
        <p className="text-lg">Point camera at legal document</p>
        <div className="w-64 h-80 border-2 border-green-400 rounded-lg mx-auto mt-4 relative">
          <div className="absolute inset-0 border-2 border-white rounded-lg m-2"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
            AI Scanning...
          </div>
        </div>
        <button className="mt-6 bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600">
          📸 Scan Document
        </button>
      </div>
    </div>
  </div>
)}
  
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = translations[selectedLanguage];

  const quickReplyOptions: QuickReplyOption[] = [
    { text: "Property dispute", icon: "🏠", category: "property" },
    { text: "Family matter", icon: "👨‍👩‍👧", category: "family" },
    { text: "Worker rights", icon: "💼", category: "worker" },
    { text: "Consumer complaint", icon: "🛒", category: "consumer" },
    { text: "Criminal case", icon: "⚖️", category: "criminal" },
    { text: "Business/Contract", icon: "📄", category: "business" },
    { text: "Cyber crime", icon: "💻", category: "cyber" },
    { text: "Tax issue", icon: "💰", category: "tax" },
    { text: "Immigration", icon: "✈️", category: "immigration" },
    { text: "Emergency help", icon: "🚨", category: "emergency" }
  ];

  const lawyerDatabase: Record<string, any> = {
    property: {
      inheritance: [
        {
          name: "Adv. Rajesh Kumar",
          image: "👨‍⚖️",
          rating: 4.8,
          experience: "15 years",
          cases: 350,
          specialization: "Property & Inheritance Law",
          rate: "₹3,500/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Kannada"],
          availability: "Available"
        },
        {
          name: "Adv. Priya Sharma",
          image: "👩‍⚖️",
          rating: 4.9,
          experience: "12 years",
          cases: 280,
          specialization: "Inheritance & Will Disputes",
          rate: "₹4,200/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Telugu"],
          availability: "Available"
        },
        {
          name: "Adv. Venkatesh Rao",
          image: "👨‍⚖️",
          rating: 4.7,
          experience: "18 years",
          cases: 420,
          specialization: "Property Rights & Succession",
          rate: "₹3,800/hr",
          location: "Bengaluru",
          languages: ["English", "Kannada", "Tamil"],
          availability: "Busy - Next slot tomorrow"
        }
      ],
      buying: [
        {
          name: "Adv. Meera Reddy",
          image: "👩‍⚖️",
          rating: 4.6,
          experience: "10 years",
          cases: 200,
          specialization: "Property Transactions",
          rate: "₹3,000/hr",
          location: "Bengaluru",
          languages: ["English", "Telugu", "Hindi"],
          availability: "Available"
        },
        {
          name: "Adv. Arun Patel",
          image: "👨‍⚖️",
          rating: 4.8,
          experience: "14 years",
          cases: 310,
          specialization: "Real Estate Law",
          rate: "₹4,000/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Gujarati"],
          availability: "Available"
        },
        {
          name: "Adv. Lakshmi Iyer",
          image: "👩‍⚖️",
          rating: 4.7,
          experience: "11 years",
          cases: 245,
          specialization: "Property Purchase & Sale",
          rate: "₹3,200/hr",
          location: "Bengaluru",
          languages: ["English", "Tamil", "Kannada"],
          availability: "Available"
        }
      ],
      dispute: [
        {
          name: "Adv. Kavitha Singh",
          image: "👩‍⚖️",
          rating: 4.9,
          experience: "16 years",
          cases: 380,
          specialization: "Property Disputes & Litigation",
          rate: "₹4,500/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Kannada"],
          availability: "Available"
        },
        {
          name: "Adv. Suresh Menon",
          image: "👨‍⚖️",
          rating: 4.7,
          experience: "13 years",
          cases: 290,
          specialization: "Land Disputes",
          rate: "₹3,500/hr",
          location: "Bengaluru",
          languages: ["English", "Malayalam", "Hindi"],
          availability: "Available"
        },
        {
          name: "Adv. Ramesh Babu",
          image: "👨‍⚖️",
          rating: 4.8,
          experience: "17 years",
          cases: 405,
          specialization: "Boundary & Title Disputes",
          rate: "₹4,100/hr",
          location: "Bengaluru",
          languages: ["English", "Telugu", "Kannada"],
          availability: "Available"
        }
      ]
    },
    family: {
      divorce: [
        {
          name: "Adv. Anjali Desai",
          image: "👩‍⚖️",
          rating: 4.9,
          experience: "14 years",
          cases: 320,
          specialization: "Divorce & Custody",
          rate: "₹4,000/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Marathi"],
          availability: "Available"
        }
      ],
      custody: [
        {
          name: "Adv. Deepa Iyer",
          image: "👩‍⚖️",
          rating: 4.8,
          experience: "11 years",
          cases: 240,
          specialization: "Child Custody",
          rate: "₹3,800/hr",
          location: "Bengaluru",
          languages: ["English", "Tamil", "Hindi"],
          availability: "Available"
        }
      ]
    },
    worker: {
      salary: [
        {
          name: "Adv. Vikram Joshi",
          image: "👨‍⚖️",
          rating: 4.6,
          experience: "9 years",
          cases: 180,
          specialization: "Labour & Employment Law",
          rate: "₹2,800/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Marathi"],
          availability: "Available"
        }
      ]
    },
    consumer: {
      defective: [
        {
          name: "Adv. Sneha Kapoor",
          image: "👩‍⚖️",
          rating: 4.7,
          experience: "8 years",
          cases: 160,
          specialization: "Consumer Protection",
          rate: "₹2,500/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Punjabi"],
          availability: "Available"
        }
      ]
    },
    criminal: {
      general: [
        {
          name: "Adv. Ravi Shankar",
          image: "👨‍⚖️",
          rating: 4.9,
          experience: "2 years",
          cases: 50,
          specialization: "Criminal Defense & Litigation",
          rate: "₹5,000/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Kannada"],
          availability: "Available"
        }
      ]
    },
    business: {
      general: [
        {
          name: "Adv. Ashok Reddy",
          image: "👨‍⚖️",
          rating: 4.8,
          experience: "5 years",
          cases: 340,
          specialization: "Corporate & Contract Law",
          rate: "₹4,500/hr",
          location: "Bengaluru",
          languages: ["English", "Telugu", "Hindi"],
          availability: "Available"
        }
      ]
    },
    cyber: {
      general: [
        {
          name: "Adv. Rohan Verma",
          image: "👨‍⚖️",
          rating: 4.8,
          experience: "8 years",
          cases: 150,
          specialization: "Cyber Crime & Digital Fraud",
          rate: "₹4,000/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Punjabi"],
          availability: "Available"
        }
      ]
    },
    tax: {
      general: [
        {
          name: "Adv. Narendra Bhat",
          image: "👨‍⚖️",
          rating: 4.9,
          experience: "8 years",
          cases: 69,
          specialization: "Tax Law & GST",
          rate: "₹5,500/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Kannada"],
          availability: "Available"
        }
      ]
    },
    immigration: {
      general: [
        {
          name: "Adv. Pradeep Malhotra",
          image: "👨‍⚖️",
          rating: 4.8,
          experience: "2 years",
          cases: 28,
          specialization: "Immigration & Visa Law",
          rate: "₹4,200/hr",
          location: "Bengaluru",
          languages: ["English", "Hindi", "Punjabi"],
          availability: "Available"
        }
      ]
    }
  };

  


  const playAudio = (text: string) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage === 'हिंदी' ? 'hi-IN' : selectedLanguage === 'తెలుగు' ? 'te-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const startContinuousListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      if (recognitionRef.current) {
        recognitionRef.current.lang = selectedLanguage === 'हिंदी' ? 'hi-IN' : selectedLanguage === 'తెలుగు' ? 'te-IN' : 'en-US';
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;

        recognitionRef.current.onstart = () => {
          setIsListening(true);
          setIsContinuousListening(true);
          playAudio("I'm listening");
        };

        recognitionRef.current.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            } else {
              interimTranscript += transcript;
            }
          }

          if (finalTranscript) {
            setUserInput(prev => (prev + ' ' + finalTranscript).trim());
          }
          
          if (interimTranscript) {
            const currentInput = userInput || '';
            const displayText = currentInput + ' ' + interimTranscript;
            const inputElement = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (inputElement) {
              inputElement.value = displayText.trim();
            }
          }
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          if (event.error === 'no-speech') {
            if (isContinuousListening) {
              setTimeout(() => {
                if (recognitionRef.current && isContinuousListening) {
                  try {
                    recognitionRef.current.start();
                  } catch (error) {
                    console.error('Failed to restart recognition:', error);
                  }
                }
              }, 100);
            }
          } else if (event.error === 'aborted') {
            stopListening();
          } else {
            stopListening();
            alert(`Voice recognition error: ${event.error}. Please try again.`);
          }
        };

        recognitionRef.current.onend = () => {
          if (isContinuousListening) {
            setTimeout(() => {
              if (recognitionRef.current && isContinuousListening) {
                try {
                  recognitionRef.current.start();
                } catch (error) {
                  console.error('Failed to restart recognition:', error);
                }
              }
            }, 100);
          }
        };

        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Failed to start recognition:', error);
          alert('Could not start voice recognition. Please check microphone permissions.');
          setIsListening(false);
          setIsContinuousListening(false);
        }
      }
    } else {
      alert('Voice recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const stopListening = () => {
    setIsContinuousListening(false);
    setIsListening(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
      recognitionRef.current = null;
    }
  };

  const handleEmergencyConnect = () => {
    setChatMessages(prev => [...prev, { 
      type: 'user', 
      text: 'Connect with Emergency Lawyer' 
    }]);
    
    setChatMessages(prev => [...prev, { 
      type: 'bot', 
      text: '🚨 Connecting you with emergency lawyers available RIGHT NOW...',
      isLoading: true
    }]);

    setTimeout(() => {
      const emergencyLawyers = [
        {
          name: "Adv. Emergency Response",
          image: "🚨",
          rating: 4.3,
          experience: "2 years",
          cases: 42,
          specialization: "Emergency Legal Aid",
          rate: "₹2,500/hr",
          location: "Emergency Response",
          languages: ["English", "Hindi", "Local"],
          availability: "Available NOW",
          responseTime: "Immediate",
          emergency: true
        },
        {
          name: "Adv. Crisis Legal",
          image: "⚡",
          rating: 4.8,
          experience: "1 years",
          cases: 38,
          specialization: "Crisis Management",
          rate: "₹2,800/hr",
          location: "24/7 Helpline",
          languages: ["English", "Hindi", "Regional"],
          availability: "Online Now",
          responseTime: "< 2 mins",
          emergency: true
        }
      ];

      setChatMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, { 
          type: 'bot', 
          text: '✅ EMERGENCY LAWYERS AVAILABLE - Immediate Response Guaranteed',
          showLawyers: true,
          lawyers: emergencyLawyers,
          urgent: true
        }];
      });
    }, 1500);
  };

  const clearChat = () => {
    setChatMessages([]);
    setShowQuickReplies(true);
    setUrgencyLevel(null);
    setUserInput('');
    playAudio('Chat cleared');
  };

  const sendLawyerMessage = () => {
    if (lawyerUserInput.trim()) {
      const newMessage: ChatMessage = { 
        type: 'user', 
        text: lawyerUserInput 
      };
      
      setLawyerChatMessages(prev => [...prev, newMessage]);
      setLawyerUserInput('');

      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me provide some guidance on this matter.",
          "Based on my experience with similar cases, I recommend the following approach...",
          "That's a common issue. Here's what you can do to protect your rights...",
          "I'd be happy to review your documents. You can upload them using the attachment button.",
          "For this type of case, the typical process involves..."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        setLawyerChatMessages(prev => [...prev, { 
          type: 'bot', 
          text: randomResponse 
        }]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const connectWithLawyer = (lawyer: any) => {
    setSelectedLawyer(lawyer);
    setLawyerChatMessages([]);
    setLawyerUserInput('');
  };

  const askFollowUpQuestion = (category: string) => {
    const followUps: Record<string, { text: string; options: FollowUpOption[] }> = {
      property: {
        text: "I understand you have a property issue. Can you tell me more? Please select:",
        options: [
          { text: "Inheritance", subCategory: "inheritance" },
          { text: "Buying/Selling", subCategory: "buying" },
          { text: "Dispute with neighbor", subCategory: "dispute" },
          { text: "Illegal occupation", subCategory: "dispute" }
        ]
      },
      family: {
        text: "I'm here to help with your family matter. What specifically do you need help with?",
        options: [
          { text: "Divorce", subCategory: "divorce" },
          { text: "Child custody", subCategory: "custody" },
          { text: "Maintenance", subCategory: "divorce" },
          { text: "Marriage registration", subCategory: "divorce" }
        ]
      },
      worker: {
        text: "Let me help you with your worker rights. What's your concern?",
        options: [
          { text: "Salary not paid", subCategory: "salary" },
          { text: "Wrongful termination", subCategory: "salary" },
          { text: "Working conditions", subCategory: "salary" },
          { text: "Leave issues", subCategory: "salary" }
        ]
      },
      consumer: {
        text: "I can help with consumer issues. What happened?",
        options: [
          { text: "Defective product", subCategory: "defective" },
          { text: "Poor service", subCategory: "defective" },
          { text: "Overcharging", subCategory: "defective" },
          { text: "Online fraud", subCategory: "defective" }
        ]
      },
      criminal: {
  text: "I can help with criminal matters. What kind of issue are you facing?",
  options: [
    { text: "FIR or police complaint", subCategory: "criminal" },
    { text: "Bail application", subCategory: "criminal" },
    { text: "False accusation", subCategory: "criminal" },
    { text: "Theft, assault, or fraud case", subCategory: "criminal" }
  ]
},

businessContract: {
  text: "I can help with business or contract issues. What happened?",
  options: [
    { text: "Breach of contract", subCategory: "business" },
    { text: "Partnership dispute", subCategory: "business" },
    { text: "Non-payment or delayed payment", subCategory: "business" },
    { text: "Legal documentation or agreement", subCategory: "business" }
  ]
},

cyberCrime: {
  text: "I can assist with cybercrime-related issues. What kind of problem are you facing?",
  options: [
    { text: "Online fraud or scam", subCategory: "cyber" },
    { text: "Social media harassment", subCategory: "cyber" },
    { text: "Data theft or hacking", subCategory: "cyber" },
    { text: "Phishing or identity theft", subCategory: "cyber" }
  ]
},

taxIssue: {
  text: "I can help with tax-related concerns. What issue are you facing?",
  options: [
    { text: "Income tax filing issue", subCategory: "tax" },
    { text: "GST or business tax dispute", subCategory: "tax" },
    { text: "Tax notice from authorities", subCategory: "tax" },
    { text: "Refund or deduction issue", subCategory: "tax" }
  ]
},

immigration: {
  text: "I can guide you on immigration matters. What do you need help with?",
  options: [
    { text: "Visa rejection or delay", subCategory: "immigration" },
    { text: "Work or study permit issue", subCategory: "immigration" },
    { text: "Citizenship or PR process", subCategory: "immigration" },
    { text: "Deportation or appeal help", subCategory: "immigration" }
  ]
}


    };

    const categoryData = followUps[category] || {
      text: "Tell me more about your issue",
      options: []
    };

    setChatMessages(prev => [...prev, { 
      type: 'bot', 
      text: categoryData.text,
      showOptions: true,
      options: categoryData.options,
      category: category
    }]);
  };

  const handleSubCategorySelection = (category: string, subCategory: string, optionText: string) => {
    setChatMessages(prev => [...prev, { type: 'user', text: optionText }]);
    
    setChatMessages(prev => [...prev, { 
      type: 'bot', 
      text: '🔍 Connecting you to the best lawyers for your case...',
      isLoading: true
    }]);

    setTimeout(() => {
      const lawyers = lawyerDatabase[category]?.[subCategory] || [];
      
      if (lawyers.length > 0) {
        setChatMessages(prev => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, { 
            type: 'bot', 
            text: `✅ Found ${lawyers.length} expert lawyers for you! Here are the best matches:`,
            showLawyers: true,
            lawyers: lawyers
          }];
        });
      } else {
        setChatMessages(prev => {
          const filtered = prev.filter(msg => !msg.isLoading);
          return [...filtered, { 
            type: 'bot', 
            text: 'I can connect you with general lawyers. Please call our helpline: 1800-XXX-XXXX'
          }];
        });
      }
    }, 2000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImage(event.target.result as string);
          setChatMessages(prev => [...prev, { 
            type: 'user', 
            text: '📎 Document uploaded',
            image: event.target?.result as string
          }]);
          setTimeout(() => {
            setChatMessages(prev => [...prev, { 
              type: 'bot', 
              text: '✓ I have received your document. Let me analyze it... This appears to be a legal document. Would you like me to explain it in simple terms?',
              showButtons: true
            }]);
          }, 1500);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      setChatMessages([...chatMessages, { type: 'user', text: userInput }]);
      
      setTimeout(() => {
        const response = analyzeUserQuery(userInput);
        setChatMessages(prev => [...prev, { type: 'bot', text: response, showButtons: false }]);
      }, 1000);
      
      setUserInput('');
    }
  };

  const analyzeUserQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('urgent') || lowerQuery.includes('emergency') || lowerQuery.includes('help')) {
      setUrgencyLevel('high');
      return '🚨 I understand this is urgent. Based on your situation, I recommend:\n\n1. Contact emergency legal helpline: 1800-XXX-XXXX\n2. File a police complaint if needed\n3. I can connect you with a lawyer immediately\n\nShall I proceed with option 3?';
    }
    
    if (lowerQuery.includes('property') || lowerQuery.includes('land') || lowerQuery.includes('house')) {
      return 'I can help with property matters. In Bengaluru, property disputes are common. Here is what you can do:\n\n• Verify property documents at Sub-Registrar office\n• Check encumbrance certificate\n• Consult with a property lawyer\n\nWould you like me to find property lawyers near you?';
    }
    
    return 'I understand your concern. To help you better, could you provide more details? You can:\n\n• Type more information\n• Upload relevant documents\n• Speak your concern\n\nI am here to guide you step by step.';
  };

  const handleNyayaClick = () => {
    setNyayaExpression('talking');
    playAudio(t.knowRights);
    setTimeout(() => setNyayaExpression('smile'), 2000);
  };

  const handleLawClick = (lawType: string) => {
    setSelectedLaw(lawType);
    playAudio(`Learning about ${lawType}`);
  };

  const handleQuickReply = (option: QuickReplyOption) => {
    const message = option.text;
    setShowQuickReplies(false);
    setChatMessages([...chatMessages, { type: 'user', text: message, category: option.category }]);
    
    if (option.category === 'emergency') {
      setUrgencyLevel('high');
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          text: '🚨 **EMERGENCY LEGAL ASSISTANCE**\n\nI understand this is urgent. Here is immediate help:',
          urgent: true,
          showEmergencyOptions: true
        }]);
      }, 500);
    } else {
      setUrgencyLevel('normal');
      setTimeout(() => {
        askFollowUpQuestion(option.category);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
              <Scale className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{t.appName}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <button 
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                <Globe size={18} />
                {selectedLanguage === 'English' ? 'Eng' : selectedLanguage === 'हिंदी' ? 'हिं' : 'తెలు'}
              </button>
              {showLanguageMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[140px] overflow-hidden z-50">
                  {Object.keys(translations).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang as 'English' | 'हिंदी' | 'తెలుగు');
                        setShowLanguageMenu(false);
                        playAudio(`Language changed to ${lang}`);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm ${
                        selectedLanguage === lang ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              {t.login}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-6 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.heroTitle}</h2>
              <p className="text-blue-100 text-lg mb-6">Connect with expert lawyers instantly. Get free legal advice in your language.</p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2">
                  <MessageCircle size={20} />
                  {t.chatNow}
                </button>
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors flex items-center gap-2">
                  <Phone size={20} />
                  {t.talkToLawyer}
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-6xl mb-4">⚖️</div>
                    <p className="font-semibold">Justice at Your Fingertips</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Aid Hero Card - Add this RIGHT AFTER the header */}
<div 
  onClick={() => navigate('/legalaid')}
  className="relative bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl p-8 text-white mb-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl group overflow-hidden"
>
  {/* Background Pattern */}
  <div className="absolute inset-0 bg-black/10"></div>
  <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
  <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
  
  <div className="relative z-10">
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="flex-1 mb-6 md:mb-0">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30">
            <Scale className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Free Legal Aid Application</h2>
            <p className="text-orange-100 text-lg">Government-supported legal assistance for eligible citizens</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <div className="text-2xl mb-1">⚖️</div>
            <p className="text-sm font-semibold">Income-Based</p>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <div className="text-2xl mb-1">💰</div>
            <p className="text-sm font-semibold">Zero Cost</p>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <div className="text-2xl mb-1">🏛️</div>
            <p className="text-sm font-semibold">Govt. Approved</p>
          </div>
          <div className="text-center bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
            <div className="text-2xl mb-1">📋</div>
            <p className="text-sm font-semibold">Easy Process</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
              <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
            </div>
            <span className="text-orange-100 text-sm font-medium">500+ applications approved this month</span>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block">
        <div className="relative">
          <div className="w-40 h-40 bg-white/10 rounded-2xl rotate-12 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="text-center -rotate-12">
              <div className="text-4xl mb-2">🛡️</div>
              <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">ELIGIBILITY CHECK</div>
            </div>
          </div>
          <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <span className="text-xs font-bold text-gray-800">FREE</span>
          </div>
        </div>
      </div>
    </div>

    {/* CTA Button */}
    <div className="mt-6 flex justify-between items-center">
      <div className="flex items-center gap-2 text-orange-200">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-sm">Eligibility: Annual income below ₹3 Lakhs</span>
      </div>
      
      <div className="flex items-center gap-3 bg-white text-red-600 px-6 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 group-hover:scale-105 shadow-lg">
        <span>Check Eligibility & Apply</span>
        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
      </div>
    </div>
  </div>
</div>

      {/* Quick Actions Grid - FIXED VERSION */}
<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
  {[
    { 
      icon: <MessageCircle size={24} />, 
      label: t.freeConsult 
    },
    { 
      icon: <User size={24} />, 
      label: t.lawyerMatching 
    },
    { 
      icon: <Scale size={24} />, 
      label: t.compatibility 
    },
    { 
      icon: <FileText size={24} />, 
      label: 'Case Tracker' 
    }, // REMOVED onClick from here
    { 
      icon: <BookOpen size={24} />, 
      label: t.kyc 
    },
    { 
      icon: <Sparkles size={24} />, 
      label: t.bestLawyers 
    }
  ].map((item, index) => (
    <button 
      key={index} 
      onClick={() => {
        // ADD onClick HANDLER HERE
        if (item.label === 'Case Tracker') {
          setShowCaseTracker(true);
        }
        // Add other button actions if needed
      }}
      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
    >
      <div className="flex justify-center mb-2 text-blue-600">{item.icon}</div>
      <span className="text-sm font-medium text-gray-700">{item.label}</span>
    </button>
  ))}
</div>

                {/* Legal Forms Card - ADD THIS NEW SECTION */}
        <div 
          onClick={() => navigate('/legalforms')}
          className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl p-6 text-white mb-8 cursor-pointer transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Legal Form Templates</h3>
                  <p className="text-purple-100">Ready-to-use legal documents</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl mb-1">📝</div>
                  <p className="text-sm text-purple-100">Affidavits</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">🏠</div>
                  <p className="text-sm text-purple-100">Property</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl mb-1">👨‍👩‍👧</div>
                  <p className="text-sm text-purple-100">Family</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-green-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-red-400 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-purple-200 text-sm">500+ downloads today</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full group-hover:bg-white/30 transition-colors">
                  <span className="font-semibold">Get Started</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-32 h-32 bg-white/10 rounded-2xl rotate-12 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center -rotate-12">
                    <div className="text-4xl mb-2">⚡</div>
                    <div className="text-xs bg-white/20 px-2 py-1 rounded-full">12+ Templates</div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">NEW</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">OUR LAWYERS</h2>
            <p className="text-lg text-gray-600">
              13000+ Best Lawyers from India for Online Consultation
            </p>
          </div>

          <div className="relative">
            <button className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {[
                { name: "Adv. Heena Sharma", spec: "Property Law", initials: "HS", color: "from-yellow-500 to-amber-600", rating: 4.9, cases: 50 },
                { name: "Adv. Jayant Kumar", spec: "Criminal Law", initials: "JK", color: "from-amber-500 to-orange-600", rating: 4.8, cases: 65 },
                { name: "Adv. Anjali Mehta", spec: "Family Law", initials: "AM", color: "from-yellow-400 to-lime-500", rating: 4.7, cases: 45 },
                { name: "Adv. Rajesh Nair", spec: "Corporate Law", initials: "RN", color: "from-amber-400 to-yellow-500", rating: 4.9, cases: 60 },
                { name: "Adv. Sunita Patel", spec: "Labour Law", initials: "SP", color: "from-yellow-500 to-amber-500", rating: 4.6, cases: 38 },
                { name: "Adv. Vikas Kumar", spec: "Cyber Law", initials: "VK", color: "from-amber-600 to-orange-500", rating: 4.8, cases: 52 }
              ].map((lawyer, idx) => (
                <div key={idx} className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-yellow-200 min-w-[320px] flex-shrink-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${lawyer.color} rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                      {lawyer.initials}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">{lawyer.name}</h3>
                      <p className="text-amber-600 font-medium">{lawyer.spec}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-gray-800">{lawyer.rating}</span>
                      <span className="text-gray-500 text-sm ml-2">{lawyer.cases}+ cases</span>
                    </div>
                  </div>
                  <button className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold hover:bg-amber-600 transition-colors">
                    Consult Now
                  </button>
                </div>
              ))}
            </div>

            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
              <ArrowRight size={20} className="text-gray-600" />
            </button>
          </div>

          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{t.activeRequests}</h3>
            <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
              {t.viewAll} <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Property Dispute Case</p>
                    <p className="text-sm text-gray-500">Updated 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Lawyers Online Now</h2>
            <div className="flex items-center gap-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Adv. Priya Sharma", exp: "1 year", spec: "Family Law", rate: "₹900/hr", rating: 4.3, time: "2 min", initials: "PS", color: "from-pink-500 to-rose-500" },
              { name: "Adv. Ravi Kumar", exp: "6 months", spec: "Property Law", rate: "₹1,200/hr", rating: 4.2, time: "5 min", initials: "RK", color: "from-blue-500 to-cyan-500" },
              { name: "Adv. Meera Desai", exp: "2 years", spec: "Consumer Law", rate: "₹1,500/hr", rating: 4.5, time: "3 min", initials: "MD", color: "from-purple-500 to-indigo-500" },
              { name: "Adv. Arjun Nair", exp: "1.5 years", spec: "Criminal Law", rate: "₹1,100/hr", rating: 4.4, time: "4 min", initials: "AN", color: "from-orange-500 to-red-500" },
              { name: "Adv. Sneha Kapoor", exp: "8 months", spec: "Worker Rights", rate: "₹800/hr", rating: 4.1, time: "6 min", initials: "SK", color: "from-teal-500 to-green-500" },
              { name: "Adv. Vikram Joshi", exp: "2 years", spec: "Business Law", rate: "₹1,800/hr", rating: 4.6, time: "2 min", initials: "VJ", color: "from-indigo-500 to-blue-500" }
            ].map((lawyer, idx) => (
              <div key={idx} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-r ${lawyer.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                        {lawyer.initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{lawyer.name}</h3>
                      <p className="text-gray-500 text-sm">{lawyer.exp} • {lawyer.spec}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-gray-800">{lawyer.rate}</span>
                  <span className="text-green-600 text-sm font-medium">● {lawyer.time}</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-800">{lawyer.rating}</span>
                  </div>
                </div>
                <button 
                  onClick={() => connectWithLawyer(lawyer)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t.knowRights}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { type: 'propertyRights', label: t.propertyRights, color: 'bg-blue-500' },
              { type: 'familyRights', label: t.familyRights, color: 'bg-purple-500' },
              { type: 'workerRights', label: t.workerRights, color: 'bg-green-500' },
              { type: 'consumerRights', label: t.consumerRights, color: 'bg-orange-500' },
              { type: 'studentMentalHealth', label: 'Student Mental Health', color: 'bg-pink-500' },
              { type: 'tribalProperty', label: 'Tribal Property Rights', color: 'bg-teal-500' },
              { type: 'digitalPrivacy', label: 'Digital Privacy', color: 'bg-indigo-500' },
              { type: 'victimWitnessRights', label: 'Victim & Witness Rights', color: 'bg-red-500' },
              { type: 'criminalTrial', label: 'Criminal Trial Process', color: 'bg-gray-600' },
              { type: 'mentalHealthRights', label: 'Mental Health Rights', color: 'bg-yellow-500' }
            ].map((right) => (
              <button
                key={right.type}
                onClick={() => handleLawClick(right.type)}
                className={`${right.color} text-white p-4 rounded-lg text-center hover:opacity-90 transition-opacity`}
              >
                <div className="text-2xl mb-2">⚖️</div>
                <span className="font-medium">{right.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowKYRAssistant(true)}
        className="fixed bottom-8 right-8 w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 flex items-center justify-center z-50 group"
      >
        <div className="relative">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <MessageCircle className="text-white" size={28} />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-3 border-white rounded-full animate-pulse"></div>
          <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-ping opacity-20"></div>
        </div>
        
        <div className="absolute -top-16 right-0 bg-white text-gray-800 px-4 py-2 rounded-2xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-semibold border border-gray-200">
          💬 Need legal help?
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
        </div>
      </button>

      {showKYRAssistant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl h-[90vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-t-2xl">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="text-white" size={28} />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Nyaya-Legal Assistant</h3>
                  <p className="text-blue-100">Always here to help you 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearChat}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                  title="Clear Chat"
                >
                  <Sparkles size={20} />
                </button>
                <button
                  onClick={() => setShowKYRAssistant(false)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-yellow-600 flex-shrink-0 mt-1" size={20} />
                  <div className="flex-1">
                    <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Notice</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• <strong>We are matchmakers:</strong> All suggestions are for guidance only. Final decisions require real lawyer approval.</li>
                      <li>• <strong>End-to-End Encrypted:</strong> Your conversations are private and secure.</li>
                      <li>• <strong>Not Legal Advice:</strong> This is an AI assistant. Always consult a qualified lawyer for legal matters.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none p-6 shadow-sm border border-gray-200 max-w-[80%]">
                  <div className="flex items-center gap-2 mb-2 text-green-600">
                    <Shield size={16} />
                    <span className="text-xs font-semibold">End-to-End Encrypted</span>
                  </div>
                  <p className="text-gray-800 text-lg leading-relaxed">{t.assistantMsg}</p>
                </div>
              </div>

              {showQuickReplies && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Zap size={16} className="text-yellow-500" />
                    <p className="text-sm font-medium">Quick options:</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {quickReplyOptions.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickReply(option)}
                        className="bg-white border border-gray-300 rounded-xl p-4 text-left hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="text-sm font-semibold text-gray-800">{option.text}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    message.type === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-600'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User className="text-white" size={20} />
                      ) : (
                        <MessageCircle className="text-white" size={20} />
                      )}
                    </div>
                  </div>
                  <div
                    className={`rounded-2xl p-6 max-w-[80%] shadow-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-tr-none'
                        : message.urgent
                        ? 'bg-red-50 border border-red-200 rounded-tl-none'
                        : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}
                  >
                    {message.image && (
                      <div className="mb-4">
                        <img
                          src={message.image}
                          alt="Uploaded document"
                          className="w-48 h-48 object-cover rounded-xl border-2 border-gray-300 shadow-sm"
                        />
                      </div>
                    )}
                    <p className="whitespace-pre-line text-base leading-relaxed">{message.text}</p>
                    
                    {message.showOptions && message.options && (
                      <div className="mt-4 space-y-3">
                        <p className="text-sm text-gray-600 mb-2">Please choose an option:</p>
                        {message.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => handleSubCategorySelection(message.category!, option.subCategory, option.text)}
                            className="block w-full text-left bg-white border border-gray-300 rounded-xl p-4 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 text-sm font-medium text-gray-800 shadow-sm"
                          >
                            {option.text}
                          </button>
                        ))}
                      </div>
                    )}

                    {message.showLawyers && message.lawyers && (
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-2 text-green-600">
                          <CheckCircle size={16} />
                          <p className="font-semibold">Found {message.lawyers.length} expert lawyers</p>
                        </div>
                        {message.lawyers.map((lawyer, lawyerIndex) => (
                          <div key={lawyerIndex} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-4">
                              <div className="text-3xl">{lawyer.image}</div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                  <div>
                                    <h4 className="font-bold text-gray-800 text-lg">{lawyer.name}</h4>
                                    <p className="text-blue-600 font-semibold">{lawyer.specialization}</p>
                                  </div>
                                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-semibold">
                                    {lawyer.rating} ★
                                  </span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                  <div className="flex items-center gap-1">
                                    <Clock size={14} />
                                    <span>{lawyer.experience}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <FileText size={14} />
                                    <span>{lawyer.cases} cases</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    <span>{lawyer.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Globe size={14} />
                                    <span>{lawyer.languages.join(', ')}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-blue-600 text-lg">{lawyer.rate}</span>
                                  <div className="flex items-center gap-2">
                                    <span className={`text-sm font-medium ${
                                      lawyer.availability.includes('Available') ? 'text-green-600' : 'text-orange-600'
                                    }`}>
                                      {lawyer.availability}
                                    </span>
                                    <button 
                                      onClick={() => connectWithLawyer(lawyer)}
                                      className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm"
                                    >
                                      Consult Now
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {message.showEmergencyOptions && (
                      <div className="mt-4 space-y-3">
                        <button 
                          onClick={handleEmergencyConnect}
                          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-base"
                        >
                          <AlertCircle size={20} />
                          🚨 Connect with Emergency Lawyer
                        </button>
                        
                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                          <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
                            <Phone size={18} />
                            Emergency Helpline Numbers (India)
                          </h4>
                          <div className="space-y-2 text-sm">
                            <a href="tel:100" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">🚓 Police Emergency</span>
                              <span className="font-bold text-red-600">100</span>
                            </a>
                            <a href="tel:1091" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">👮 Women Helpline</span>
                              <span className="font-bold text-red-600">1091</span>
                            </a>
                            <a href="tel:1098" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">👶 Child Helpline</span>
                              <span className="font-bold text-red-600">1098</span>
                            </a>
                            <a href="tel:15100" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">⚖️ National Legal Services Authority</span>
                              <span className="font-bold text-red-600">15100</span>
                            </a>
                            <a href="tel:181" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">🆘 Women in Distress</span>
                              <span className="font-bold text-red-600">181</span>
                            </a>
                            <a href="tel:1800-11-1-6111" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">📞 Senior Citizen Helpline</span>
                              <span className="font-bold text-red-600">1800-11-1-6111</span>
                            </a>
                            <a href="tel:112" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">🚨 National Emergency Number</span>
                              <span className="font-bold text-red-600">112</span>
                            </a>
                            <a href="tel:1800-180-5522" className="flex justify-between items-center bg-white p-2 rounded-lg hover:bg-red-100 transition-colors">
                              <span className="text-gray-700">⚖️ Cyber Crime Helpline</span>
                              <span className="font-bold text-red-600">1800-180-5522</span>
                            </a>
                          </div>
                        </div>

                        <a 
                          href="tel:1800-XXX-XXXX"
                          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-base"
                        >
                          <Phone size={20} />
                          📞 Call Legal Aid Helpline Now
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t bg-white p-6 rounded-b-2xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={t.typePlaceholder}
                  className="flex-1 border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors shadow-sm"
                  title={t.uploadDoc}
                >
                  <Image size={24} className="text-gray-600" />
                </button>
                <button
                  onClick={isListening ? stopListening : startContinuousListening}
                  className={`p-4 rounded-xl transition-colors shadow-sm ${
                    isListening 
                      ? 'bg-red-500 text-white hover:bg-red-600' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                  title={isListening ? t.stopListening : t.typePlaceholder}
                >
                  <Mic size={24} />
                </button>
                <button
                  onClick={sendMessage}
                  className="p-4 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-sm"
                >
                  <Send size={24} />
                </button>
              </div>
              
              {isListening && (
                <div className="mt-3 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-700 font-semibold text-sm">{t.listening}</span>
                  </div>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="w-1 h-4 bg-red-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-6 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-4 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <button
                    onClick={stopListening}
                    className="text-red-700 text-sm font-semibold hover:text-red-800"
                  >
                    Stop
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedLaw && legalInfo[selectedLaw] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold text-gray-800">{legalInfo[selectedLaw].title}</h3>
              <button
                onClick={() => setSelectedLaw(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                {legalInfo[selectedLaw].content}
              </p>
            </div>
            <div className="border-t p-4 flex justify-end">
              <button
                onClick={() => setSelectedLaw(null)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedLawyer && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          <div className="bg-blue-500 text-white p-4 shadow-lg">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setSelectedLawyer(null)}
                className="p-2 hover:bg-blue-400 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 font-bold text-lg">
                  {selectedLawyer.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{selectedLawyer.name}</h3>
                  <p className="text-blue-100 text-sm">Online • {selectedLawyer.specialization}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-blue-400 rounded-full transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 hover:bg-blue-400 rounded-full transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 hover:bg-blue-400 rounded-full transition-colors">
                  <Menu size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border-b border-yellow-200 p-3">
            <div className="flex items-start gap-2 text-yellow-800 text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">⚠️ Important: We are matchmakers connecting you with lawyers</p>
                <p className="text-xs mt-1">• Free consultation: 10 minutes • Further charges: {selectedLawyer.rate} • <strong>All advice subject to real lawyer verification</strong> • <Shield size={12} className="inline" /> End-to-end encrypted</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
            <div className="flex justify-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
                Today {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            <div className="flex justify-center">
              <div className="bg-white border border-gray-200 rounded-2xl p-4 max-w-md shadow-sm">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                  <CheckCircle size={16} />
                  <span className="font-semibold">Chat Started</span>
                </div>
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                  <Shield size={16} />
                  <span className="font-semibold text-xs">End-to-End Encrypted</span>
                </div>
                <p className="text-gray-700 text-sm mb-2">
                  You're now connected with {selectedLawyer.name}. This chat is secure and free for the first 10 minutes.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 mt-2">
                  <p className="text-yellow-800 text-xs">
                    <strong>⚠️ Disclaimer:</strong> We are matchmakers. All advice is for guidance only and subject to real lawyer verification.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {selectedLawyer.image}
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-4 shadow-sm max-w-md">
                <p className="text-gray-800">
                  Hello! I'm {selectedLawyer.name.split(' ')[1]}. I specialize in {selectedLawyer.specialization}. How can I help you today?
                </p>
                <p className="text-gray-500 text-xs mt-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            {lawyerChatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.type !== 'user' && (
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mr-2">
                    {selectedLawyer.image}
                  </div>
                )}
                <div className={`rounded-2xl p-4 shadow-sm max-w-md ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 rounded-bl-none'
                }`}>
                  <p className="whitespace-pre-line">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.type === 'user' && (
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ml-2">
                    You
                  </div>
                )}
              </div>
            ))}
          </div>

         

          <div className="border-t bg-white p-4">
            <div className="flex items-end gap-3">
              <button className="p-3 text-gray-500 hover:text-gray-700 transition-colors">
                <Paperclip size={20} />
              </button>
              
              <button 
                onClick={startContinuousListening}
                className="p-3 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Mic size={20} />
              </button>

              <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
                <textarea
                  value={lawyerUserInput}
                  onChange={(e) => setLawyerUserInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-transparent border-none outline-none resize-none text-gray-800 placeholder-gray-500 max-h-32"
                  rows={1}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendLawyerMessage();
                    }
                  }}
                />
              </div>

              <button
                onClick={sendLawyerMessage}
                disabled={!lawyerUserInput.trim()}
                className={`p-3 rounded-full transition-colors ${
                  lawyerUserInput.trim() 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Send size={20} />
              </button>
            </div>

            <div className="flex gap-2 mt-3 overflow-x-auto">
              {[
                "Tell me about your experience",
                "What's your success rate?",
                "Can you review my documents?",
                "What are the next steps?"
              ].map((text, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setLawyerUserInput(text);
                    setTimeout(() => {
                      sendLawyerMessage();
                    }, 100);
                  }}
                  className="bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

       {/* Case Tracker Modal */}
{showCaseTracker && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="flex items-center gap-3">
          <FileText size={24} />
          <div>
            <h3 className="text-xl font-bold">Case Status Tracker</h3>
            <p className="text-blue-100">Monitor your legal cases in real-time</p>
          </div>
        </div>
        <button
          onClick={() => setShowCaseTracker(false)}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Cases List */}
      <div className="p-6 overflow-y-auto max-h-[70vh]">
        {activeCases.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Cases</h3>
            <p className="text-gray-500">Start a consultation to track your case progress</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeCases.map((caseItem) => (
              <div key={caseItem.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                {/* Case Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{caseItem.title}</h4>
                    <p className="text-gray-600">Lawyer: {caseItem.lawyer}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caseItem.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      caseItem.status === 'case_in_progress' ? 'bg-blue-100 text-blue-800' :
                      caseItem.status === 'documents_submitted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {caseItem.statusText}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">Case ID: {caseItem.id}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{caseItem.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${caseItem.progress}%` }}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-gray-800 mb-3">Case Timeline</h5>
                  <div className="space-y-3">
                    {caseItem.timeline.map((stage, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          stage.completed ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                        }`}>
                          {stage.completed ? '✓' : index + 1}
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium ${
                            stage.completed ? 'text-green-600' : 'text-gray-600'
                          }`}>
                            {stage.stage}
                          </span>
                          {stage.date && (
                            <p className="text-sm text-gray-500">Completed: {stage.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Steps */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock size={16} />
                    <span className="font-medium">Next Hearing: {caseItem.nextHearing}</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">Last updated: {caseItem.lastUpdate}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t p-4 bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {activeCases.length} active case{activeCases.length !== 1 ? 's' : ''}
        </span>
        <button
          onClick={() => setShowCaseTracker(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Close Tracker
        </button>
      </div>
    </div>
  </div>
)}

      

    </div>
  );
};


export default NyayaSetuDashboard;