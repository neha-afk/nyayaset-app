import React, { useState, useEffect } from 'react';
import { Scale, Check, User, Briefcase, MapPin, Phone, Mail, FileText, Award, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Define interfaces for type safety
interface LawyerData {
  name: string;
  phone: string;
  email: string;
  otp: string;
  llbCert: File | null;
  class10: File | null;
  class12: File | null;
  school: string;
  college: string;
  aadhar: File | null;
  pan: string;
  photo: File | null;
  barCert: File | null;
  expertise: string[];
  experience: string;
}

interface AddressData {
  state: string;
  city: string;
  address: string;
}

interface ClientData {
  phone: string;
  otp: string;
}

interface Translation {
  [key: string]: string;
}

interface Translations {
  [key: string]: Translation;
}

interface Cities {
  [key: string]: string[];
}

const NyayaSetu = () => {
  const navigate = useNavigate();
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userType, setUserType] = useState('');
  const [clientData, setClientData] = useState<ClientData>({ phone: '', otp: '' });
  const [lawyerData, setLawyerData] = useState<LawyerData>({
    name: '', phone: '', email: '', otp: '',
    llbCert: null, class10: null, class12: null,
    school: '', college: '',
    aadhar: null, pan: '', photo: null,
    barCert: null,
    expertise: [],
    experience: ''
  });
  const [addressData, setAddressData] = useState<AddressData>({ state: '', city: '', address: '' });
  const [lawyerStep, setLawyerStep] = useState(1);
  const [showContent, setShowContent] = useState(false);

  // Auto-redirect after animation
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  // Translation object
  const translations: Translations = {
    'English': {
      appName: 'Nyaya Setu',
      tagline: 'Connect with Justice',
      getStarted: 'Get Started',
      selectLanguage: 'Select Language',
      iAmA: 'I am a',
      client: 'Client',
      lawyer: 'Lawyer',
      clientLogin: 'Client Login',
      mobileNumber: 'Mobile Number',
      enterMobile: 'Enter 10-digit mobile number',
      enterOTP: 'Enter OTP',
      sampleOTP: 'Sample OTP: 1234',
      login: 'Login',
      yourAddress: 'Your Address',
      state: 'State',
      selectState: 'Select State',
      city: 'City',
      enterCity: 'Enter city',
      address: 'Address',
      enterAddress: 'Enter complete address',
      continue: 'Continue',
      welcome: 'Welcome to Nyaya Setu!',
      clientWelcome: 'You are now logged in as a client',
      lawyerRegistration: 'Lawyer Registration',
      step: 'Step',
      of: 'of',
      basicInfo: 'Basic Information',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      email: 'Email',
      next: 'Next',
      back: 'Back',
      educationalDetails: 'Educational Details',
      uploadCertificates: 'Upload certificates & marksheets',
      llbDegree: 'LLB Degree Certificate',
      marksheet10: '10th Marksheet',
      marksheet12: '12th Marksheet',
      schoolName: 'School Name',
      collegeName: 'College Name',
      kycVerification: 'KYC Verification',
      identityVerification: 'Identity verification',
      aadharCard: 'Aadhar Card',
      panNumber: 'PAN Card Number',
      enterPAN: 'Enter PAN number',
      profilePhoto: 'Profile Photo',
      barCertificate: 'Bar Certificate',
      aibeCertificate: 'All India Bar Examination Certificate',
      uploadAIBE: 'Upload your AIBE certificate in PDF or image format',
      expertise: 'Area of Expertise',
      selectCaseTypes: 'Select one or more case types',
      experienceAndAddress: 'Experience & Address',
      finalDetails: 'Final details',
      professionalExperience: 'Professional Experience',
      experiencePlaceholder: 'Describe your experience, cases handled, years of practice, etc.',
      officeAddress: 'Office Address',
      submit: 'Submit',
      profileUnderReview: 'Profile Under Review',
      thankYouMessage: 'Thank you for registering with Nyaya Setu! Your profile is currently under verification process.',
      whatNext: 'What happens next?',
      verifyDocs: '• Our team will verify your documents',
      processTime: '• This process typically takes 2-3 business days',
      emailNotification: '• You\'ll receive an email once verified',
      checkEmail: '• Check your registered email regularly',
      backToHome: 'Back to Home'
    },
    'हिंदी (Hindi)': {
      appName: 'न्याय सेतु',
      tagline: 'न्याय से जुड़ें',
      getStarted: 'शुरू करें',
      selectLanguage: 'भाषा चुनें',
      iAmA: 'मैं हूँ',
      client: 'ग्राहक',
      lawyer: 'वकील',
      clientLogin: 'ग्राहक लॉगिन',
      mobileNumber: 'मोबाइल नंबर',
      enterMobile: '10 अंकों का मोबाइल नंबर दर्ज करें',
      enterOTP: 'OTP दर्ज करें',
      sampleOTP: 'नमूना OTP: 1234',
      login: 'लॉगिन',
      yourAddress: 'आपका पता',
      state: 'राज्य',
      selectState: 'राज्य चुनें',
      city: 'शहर',
      enterCity: 'शहर दर्ज करें',
      address: 'पता',
      enterAddress: 'पूरा पता दर्ज करें',
      continue: 'जारी रखें',
      welcome: 'न्याय सेतु में आपका स्वागत है!',
      clientWelcome: 'आप अब ग्राहक के रूप में लॉग इन हैं',
      lawyerRegistration: 'वकील पंजीकरण',
      step: 'चरण',
      of: 'का',
      basicInfo: 'बुनियादी जानकारी',
      fullName: 'पूरा नाम',
      phoneNumber: 'फ़ोन नंबर',
      email: 'ईमेल',
      next: 'आगे',
      back: 'पीछे',
      educationalDetails: 'शैक्षणिक विवरण',
      uploadCertificates: 'प्रमाणपत्र और मार्कशीट अपलोड करें',
      llbDegree: 'एलएलबी डिग्री प्रमाणपत्र',
      marksheet10: '10वीं मार्कशीट',
      marksheet12: '12वीं मार्कशीट',
      schoolName: 'स्कूल का नाम',
      collegeName: 'कॉलेज का नाम',
      kycVerification: 'केवाईसी सत्यापन',
      identityVerification: 'पहचान सत्यापन',
      aadharCard: 'आधार कार्ड',
      panNumber: 'पैन कार्ड नंबर',
      enterPAN: 'पैन नंबर दर्ज करें',
      profilePhoto: 'प्रोफ़ाइल फ़ोटो',
      barCertificate: 'बार प्रमाणपत्र',
      aibeCertificate: 'अखिल भारतीय बार परीक्षा प्रमाणपत्र',
      uploadAIBE: 'अपना AIBE प्रमाणपत्र PDF या छवि प्रारूप में अपलोड करें',
      expertise: 'विशेषज्ञता का क्षेत्र',
      selectCaseTypes: 'एक या अधिक मामले प्रकार चुनें',
      experienceAndAddress: 'अनुभव और पता',
      finalDetails: 'अंतिम विवरण',
      professionalExperience: 'व्यावसायिक अनुभव',
      experiencePlaceholder: 'अपने अनुभव, संभाले गए मामलों, अभ्यास के वर्षों आदि का वर्णन करें',
      officeAddress: 'कार्यालय का पता',
      submit: 'जमा करें',
      profileUnderReview: 'प्रोफ़ाइल समीक्षाधीन',
      thankYouMessage: 'न्याय सेतु के साथ पंजीकरण के लिए धन्यवाद! आपकी प्रोफ़ाइल वर्तमान में सत्यापन प्रक्रिया में है।',
      whatNext: 'आगे क्या होगा?',
      verifyDocs: '• हमारी टीम आपके दस्तावेजों को सत्यापित करेगी',
      processTime: '• इस प्रक्रिया में आमतौर पर 2-3 व्यावसायिक दिन लागते हैं',
      emailNotification: '• सत्यापित होने पर आपको एक ईमेल प्राप्त होगा',
      checkEmail: '• अपने पंजीकृत ईमेल को नियमित रूप से जांचें',
      backToHome: 'होम पर वापस जाएं'
    },
    'বাংলা (Bengali)': {
      appName: 'ন্যায় সেতু',
      tagline: 'ন্যায়ের সাথে সংযুক্ত হন',
      getStarted: 'শুরু করুন',
      selectLanguage: 'ভাষা নির্বাচন করুন',
      iAmA: 'আমি',
      client: 'ক্লায়েন্ট',
      lawyer: 'আইনজীবী',
      clientLogin: 'ক্লায়েন্ট লগইন',
      mobileNumber: 'মোবাইল নম্বর',
      enterMobile: '১০ সংখ্যার মোবাইল নম্বর লিখুন',
      enterOTP: 'OTP লিখুন',
      sampleOTP: 'নমুনা OTP: 1234',
      login: 'লগইন',
      yourAddress: 'আপনার ঠিকানা',
      state: 'রাজ্য',
      selectState: 'রাজ্য নির্বাচন করুন',
      city: 'শহর',
      enterCity: 'শহর লিখুন',
      address: 'ঠিকানা',
      enterAddress: 'সম্পূর্ণ ঠিকানা লিখুন',
      continue: 'চালিয়ে যান',
      welcome: 'ন্যায় সেতুতে স্বাগতম!',
      clientWelcome: 'আপনি এখন ক্লায়েন্ট হিসাবে লগইন করেছেন',
      lawyerRegistration: 'আইনজীবী নিবন্ধন',
      step: 'ধাপ',
      of: 'এর',
      basicInfo: 'মৌলিক তথ্য',
      fullName: 'পূর্ণ নাম',
      phoneNumber: 'ফোন নম্বর',
      email: 'ইমেইল',
      next: 'পরবর্তী',
      back: 'পিছনে',
      educationalDetails: 'শিক্ষাগত বিবরণ',
      uploadCertificates: 'সার্টিফিকেট এবং মার্কশীট আপলোড করুন',
      llbDegree: 'এলএলবি ডিগ্রি সার্টিফিকেট',
      marksheet10: '১০ম মার্কশীট',
      marksheet12: '১২ম মার্কশীট',
      schoolName: 'স্কুলের নাম',
      collegeName: 'কলেজের নাম',
      kycVerification: 'KYC যাচাইকরণ',
      identityVerification: 'পরিচয় যাচাইকরণ',
      aadharCard: 'আধার কার্ড',
      panNumber: 'প্যান কার্ড নম্বর',
      enterPAN: 'প্যান নম্বর লিখুন',
      profilePhoto: 'প্রোফাইল ছবি',
      barCertificate: 'বার সার্টিফিকেট',
      aibeCertificate: 'অল ইন্ডিয়া বার এক্সামিনেশন সার্টিফিকেট',
      uploadAIBE: 'আপনার AIBE সার্টিফিকেট PDF বা ছবি ফর্ম্যাটে আপলোড করুন',
      expertise: 'দক্ষতার ক্ষেত্র',
      selectCaseTypes: 'এক বা একাধিক কেস প্রকার নির্বাচন করুন',
      experienceAndAddress: 'অভিজ্ঞতা এবং ঠিকানা',
      finalDetails: 'চূড়ান্ত বিবরণ',
      professionalExperience: 'পেশাগত অভিজ্ঞতা',
      experiencePlaceholder: 'আপনার অভিজ্ঞতা, পরিচালিত মামলা, অনুশীলনের বছর ইত্যাদি বর্ণনা করুন',
      officeAddress: 'অফিসের ঠিকানা',
      submit: 'জমা দিন',
      profileUnderReview: 'প্রোফাইল পর্যালোচনাধীন',
      thankYouMessage: 'ন্যায় সেতুতে নিবন্ধনের জন্য ধন্যবাদ! আপনার প্রোফাইল বর্তমানে যাচাইকরণ প্রক্রিয়াধীন আছে।',
      whatNext: 'পরবর্তী কি হবে?',
      verifyDocs: '• আমাদের দল আপনার নথি যাচাই করবে',
      processTime: '• এই প্রক্রিয়াটি সাধারণত ২-৩ কার্যদিবস সময় নেয়',
      emailNotification: '• যাচাইকৃত হলে আপনি একটি ইমেইল পাবেন',
      checkEmail: '• নিয়মিত আপনার নিবন্ধিত ইমেইল পরীক্ষা করুন',
      backToHome: 'হোমে ফিরে যান'
    },
    'తెలుగు (Telugu)': {
      appName: 'న్యాయ సేతు',
      tagline: 'న్యాయంతో కనెక్ట్ అవ్వండి',
      getStarted: 'ప్రారంభించండి',
      selectLanguage: 'భాషను ఎంచుకోండి',
      iAmA: 'నేను',
      client: 'క్లయింట్',
      lawyer: 'న్యాయవాది',
      clientLogin: 'క్లయింట్ లాగిన్',
      mobileNumber: 'మొబైల్ నంబర్',
      enterMobile: '10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి',
      enterOTP: 'OTP నమోదు చేయండి',
      sampleOTP: 'నమూనా OTP: 1234',
      login: 'లాగిన్',
      yourAddress: 'మీ చిరునామా',
      state: 'రాష్ట్రం',
      selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
      city: 'నగరం',
      enterCity: 'నగరం నమోదు చేయండి',
      address: 'చిరునామా',
      enterAddress: 'పూర్తి చిరునామా నమోదు చేయండి',
      continue: 'కొనసాగించండి',
      welcome: 'న్యాయ సేతుకు స్వాగతం!',
      clientWelcome: 'మీరు ఇప్పుడు క్లయింట్‌గా లాగిన్ అయ్యారు',
      lawyerRegistration: 'న్యాయవాది నమోదు',
      step: 'దశ',
      of: 'యొక్క',
      basicInfo: 'ప్రాథమిక సమాచారం',
      fullName: 'పూర్తి పేరు',
      phoneNumber: 'ఫోన్ నంబర్',
      email: 'ఇమెయిల్',
      next: 'తదుపరి',
      back: 'వెనుకకు',
      educationalDetails: 'విద్యా వివరాలు',
      uploadCertificates: 'ప్రమాణపత్రాలు మరియు మార్క్‌షీట్లను అప్‌లోడ్ చేయండి',
      llbDegree: 'LLB డిగ్రీ సర్టిఫికేట్',
      marksheet10: '10వ మార్క్‌షీట్',
      marksheet12: '12వ మార్క్‌షీట్',
      schoolName: 'పాఠశాల పేరు',
      collegeName: 'కళాశాల పేరు',
      kycVerification: 'KYC ధృవీకరణ',
      identityVerification: 'గుర్తింపు ధృవీకరణ',
      aadharCard: 'ఆధార్ కార్డ్',
      panNumber: 'పాన్ కార్డ్ నంబర్',
      enterPAN: 'పాన్ నంబర్ నమోదు చేయండి',
      profilePhoto: 'ప్రొఫైల్ ఫోటో',
      barCertificate: 'బార్ సర్టిఫికేట్',
      aibeCertificate: 'ఆల్ ఇండియా బార్ ఎగ్జామినేషన్ సర్టిఫికేట్',
      uploadAIBE: 'మీ AIBE సర్టిఫికేట్‌ను PDF లేదా చిత్ర ఆకృతిలో అప్‌లోడ్ చేయండి',
      expertise: 'నైపుణ్యం రంగం',
      selectCaseTypes: 'ఒకటి లేదా అంతకంటే ఎక్కువ కేసు రకాలను ఎంచుకోండి',
      experienceAndAddress: 'అనుభవం మరియు చిరునామా',
      finalDetails: 'చివరి వివరాలు',
      professionalExperience: 'వృత్తిపరమైన అనుభవం',
      experiencePlaceholder: 'మీ అనుభవం, నిర్వహించిన కేసులు, అభ్యాస సంవత్సరాలు మొదలైనవి వివరించండి',
      officeAddress: 'కార్యాలయ చిరునామా',
      submit: 'సమర్పించండి',
      profileUnderReview: 'ప్రొఫైల్ సమీక్షలో ఉంది',
      thankYouMessage: 'న్యాయ సేతుతో నమోదు చేసినందుకు ధన్యవాదాలు! మీ ప్రొఫైల్ ప్రస్తుతం ధృవీకరణ ప్రక్రియలో ఉంది।',
      whatNext: 'తదుపరి ఏమి జరుగుతుంది?',
      verifyDocs: '• మా బృందం మీ పత్రాలను ధృవీకరిస్తుంది',
      processTime: '• ఈ ప్రక్రియ సాధారణంగా 2-3 వ్యాపార దినాలు పడుతుంది',
      emailNotification: '• ధృవీకరించబడిన తర్వాత మీరు ఇమెయిల్ అందుకుంటారు',
      checkEmail: '• మీ నమోదిత ఇమెయిల్‌ను క్రమం తప్పకుండా తనిఖీ చేయండి',
      backToHome: 'హోమ్‌కు తిరిగి వెళ్ళండి'
    },
    'मराठी (Marathi)': {
      appName: 'न्याय सेतू',
      tagline: 'न्यायाशी जुडा',
      getStarted: 'सुरू करा',
      selectLanguage: 'भाषा निवडा',
      iAmA: 'मी आहे',
      client: 'क्लायंट',
      lawyer: 'वकील',
      clientLogin: 'क्लायंट लॉगिन',
      mobileNumber: 'मोबाइल नंबर',
      enterMobile: '10 अंकी मोबाइल नंबर प्रविष्ट करा',
      enterOTP: 'OTP प्रविष्ट करा',
      sampleOTP: 'नमुना OTP: 1234',
      login: 'लॉगिन',
      yourAddress: 'तुमचा पत्ता',
      state: 'राज्य',
      selectState: 'राज्य निवडा',
      city: 'शहर',
      enterCity: 'शहर प्रविष्ट करा',
      address: 'पत्ता',
      enterAddress: 'संपूर्ण पत्ता प्रविष्ट करा',
      continue: 'सुरू ठेवा',
      welcome: 'न्याय सेतूमध्ये आपले स्वागत आहे!',
      clientWelcome: 'तुम्ही आता क्लायंट म्हणून लॉगिन केले आहे',
      lawyerRegistration: 'वकील नोंदणी',
      step: 'चरण',
      of: 'चा',
      basicInfo: 'मूलभूत माहिती',
      fullName: 'पूर्ण नाव',
      phoneNumber: 'फोन नंबर',
      email: 'ईमेल',
      next: 'पुढे',
      back: 'मागे',
      educationalDetails: 'शैक्षणिक तपशील',
      uploadCertificates: 'प्रमाणपत्रे आणि मार्कशीट अपलोड करा',
      llbDegree: 'LLB पदवी प्रमाणपत्र',
      marksheet10: '10 वी मार्कशीट',
      marksheet12: '12 वी मार्कशीट',
      schoolName: 'शाळेचे नाव',
      collegeName: 'महाविद्यालयाचे नाव',
      kycVerification: 'KYC पडताळणी',
      identityVerification: 'ओळख पडताळणी',
      aadharCard: 'आधार कार्ड',
      panNumber: 'पॅन कार्ड नंबर',
      enterPAN: 'पॅन नंबर प्रविष्ट करा',
      profilePhoto: 'प्रोफाइल फोटो',
      barCertificate: 'बार प्रमाणपत्र',
      aibeCertificate: 'अखिल भारतीय बार परीक्षा प्रमाणपत्र',
      uploadAIBE: 'तुमचे AIBE प्रमाणपत्र PDF किंवा प्रतिमा स्वरूपात अपलोड करा',
      expertise: 'कौशल्याचे क्षेत्र',
      selectCaseTypes: 'एक किंवा अधिक केस प्रकार निवडा',
      experienceAndAddress: 'अनुभव आणि पत्ता',
      finalDetails: 'अंतिम तपशील',
      professionalExperience: 'व्यावसायिक अनुभव',
      experiencePlaceholder: 'तुमचा अनुभव, हाताळलेली प्रकरणे, सराव वर्षे इत्यादींचे वर्णन करा',
      officeAddress: 'कार्यालयाचा पत्ता',
      submit: 'सबमिट करा',
      profileUnderReview: 'प्रोफाइल पुनरावलोकनाधीन',
      thankYouMessage: 'न्याय सेतूमध्ये नोंदणी केल्याबद्दल धन्यवाद! तुमची प्रोफाइल सध्या पडताळणी प्रक्रियेत आहे।',
      whatNext: 'पुढे काय होते?',
      verifyDocs: '• आमची टीम तुमच्या कागदपत्रांची पडताळणी करेल',
      processTime: '• या प्रक्रियेला साधारणपणे 2-3 व्यावसायिक दिवस लागतात',
      emailNotification: '• पडताळणी झाल्यावर तुम्हाला एक ईमेल मिळेल',
      checkEmail: '• तुमचा नोंदणीकृत ईमेल नियमितपणे तपासा',
      backToHome: 'होमवर परत जा'
    },
    'தமிழ் (Tamil)': {
      appName: 'நியாய சேது',
      tagline: 'நீதியுடன் இணையுங்கள்',
      getStarted: 'தொடங்கவும்',
      selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      iAmA: 'நான்',
      client: 'வாடிக்கையாளர்',
      lawyer: 'வழக்கறிஞர்',
      clientLogin: 'வாடிக்கையாளர் உள்நுழைவு',
      mobileNumber: 'மொபைல் எண்',
      enterMobile: '10 இலக்க மொபைல் எண்ணை உள்ளிடவும்',
      enterOTP: 'OTP ஐ உள்ளிடவும்',
      sampleOTP: 'மாதிரி OTP: 1234',
      login: 'உள்நுழைவு',
      yourAddress: 'உங்கள் முகவரி',
      state: 'மாநிலம்',
      selectState: 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்',
      city: 'நகரம்',
      enterCity: 'நகரத்தை உள்ளிடவும்',
      address: 'முகவரி',
      enterAddress: 'முழு முகவரியை உள்ளிடவும்',
      continue: 'தொடரவும்',
      welcome: 'நியாய சேதுவுக்கு வரவேற்கிறோம்!',
      clientWelcome: 'நீங்கள் இப்போது வாடிக்கையாளராக உள்நுழைந்துள்ளீர்கள்',
      lawyerRegistration: 'வழக்கறிஞர் பதிவு',
      step: 'படி',
      of: 'இன்',
      basicInfo: 'அடிப்படை தகவல்',
      fullName: 'முழு பெயர்',
      phoneNumber: 'தொலைபேசி எண்',
      email: 'மின்னஞ்சல்',
      next: 'அடுத்தது',
      back: 'பின்',
      educationalDetails: 'கல்வி விவரங்கள்',
      uploadCertificates: 'சான்றிதழ்கள் மற்றும் மதிப்பெண் பட்டியல்களைப் பதிவேற்றவும்',
      llbDegree: 'LLB பட்டச் சான்றிதழ்',
      marksheet10: '10வது மதிப்பெண் பட்டியல்',
      marksheet12: '12வது மதிப்பெண் பட்டியல்',
      schoolName: 'பள்ளியின் பெயர்',
      collegeName: 'கல்லூரியின் பெயர்',
      kycVerification: 'KYC சரிபார்ப்பு',
      identityVerification: 'அடையாள சரிபார்ப்பு',
      aadharCard: 'ஆதார் அட்டை',
      panNumber: 'பான் அட்டை எண்',
      enterPAN: 'பான் எண்ணை உள்ளிடவும்',
      profilePhoto: 'சுயவிவரப் புகைப்படம்',
      barCertificate: 'பார் சான்றிதழ்',
      aibeCertificate: 'அகில இந்திய பார் தேர்வு சான்றிதழ்',
      uploadAIBE: 'உங்கள் AIBE சான்றிதழை PDF அல்லது படத்தில் பதிவேற்றவும்',
      expertise: 'நிபுணத்துவப் பகுதி',
      selectCaseTypes: 'ஒன்று அல்லது அதற்கு மேற்பட்ட வழக்கு வகைகளைத் தேர்ந்தெடுக்கவும்',
      experienceAndAddress: 'அனுபவம் மற்றும் முகவரி',
      finalDetails: 'இறுதி விவரங்கள்',
      professionalExperience: 'தொழில்முறை அனுபவம்',
      experiencePlaceholder: 'உங்கள் அனுபவம், கையாண்ட வழக்குகள், பயிற்சி ஆண்டுகள் போன்றவற்றை விவரிக்கவும்',
      officeAddress: 'அலுவலக முகவரி',
      submit: 'சமர்ப்பிக்கவும்',
      profileUnderReview: 'சுயவிவரம் மதிப்பாய்வில்',
      thankYouMessage: 'நியாய சேதுவில் பதிவு செய்ததற்கு நன்றி! உங்கள் சுயவிவரம் தற்போது சரிபார்ப்பு செயல்பாட்டில் உள்ளது।',
      whatNext: 'அடுத்து என்ன நடக்கும்?',
      verifyDocs: '• எங்கள் குழு உங்கள் ஆவணங்களைச் சரிபார்க்கும்',
      processTime: '• இந்த செயல்முறை பொதுவாக 2-3 வணிக நாட்களை எடுக்கும்',
      emailNotification: '• சரிபார்க்கப்பட்டவுடன் உங்களுக்கு மின்னஞ்சல் கிடைக்கும்',
      checkEmail: '• உங்கள் பதிவு செய்யப்பட்ட மின்னஞ்சலை தவறாமல் சரிபார்க்கவும்',
      backToHome: 'முகப்புக்குத் திரும்பவும்'
    },
    'ગુજરાતી (Gujarati)': {
      appName: 'ન્યાય સેતુ',
      tagline: 'ન્યાય સાથે જોડાઓ',
      getStarted: 'શરૂ કરો',
      selectLanguage: 'ભાષા પસંદ કરો',
      iAmA: 'હું છું',
      client: 'ક્લાયંટ',
      lawyer: 'વકીલ',
      clientLogin: 'ક્લાયંટ લોગિન',
      mobileNumber: 'મોબાઇલ નંબર',
      enterMobile: '10 અંકનો મોબાઇલ નંબર દાખલ કરો',
      enterOTP: 'OTP દાખલ કરો',
      sampleOTP: 'નમૂના OTP: 1234',
      login: 'લોગિન',
      yourAddress: 'તમારું સરનામું',
      state: 'રાજ્ય',
      selectState: 'રાજ્ય પસંદ કરો',
      city: 'શહેર',
      enterCity: 'શહેર દાખલ કરો',
      address: 'સરનામું',
      enterAddress: 'સંપૂર્ણ સરનામું દાખલ કરો',
      continue: 'ચાલુ રાખો',
      welcome: 'ન્યાય સેતુમાં આપનું સ્વાગત છે!',
      clientWelcome: 'તમે હવે ક્લાયંટ તરીકે લોગિન થયા છો',
      lawyerRegistration: 'વકીલ નોંધણી',
      step: 'પગલું',
      of: 'નું',
      basicInfo: 'મૂળભૂત માહિતી',
      fullName: 'પૂરું નામ',
      phoneNumber: 'ફોન નંબર',
      email: 'ઇમેઇલ',
      next: 'આગળ',
      back: 'પાછળ',
      educationalDetails: 'શૈક્ષણિક વિગતો',
      uploadCertificates: 'પ્રમાણપત્રો અને માર્કશીટ અપલોડ કરો',
      llbDegree: 'LLB ડિગ્રી પ્રમાણપત્ર',
      marksheet10: '10મી માર્કશીટ',
      marksheet12: '12મી માર્કશીટ',
      schoolName: 'શાળાનું નામ',
      collegeName: 'કોલેજનું નામ',
      kycVerification: 'KYC ચકાસણી',
      identityVerification: 'ઓળખ ચકાસણી',
      aadharCard: 'આધાર કાર્ડ',
      panNumber: 'પાન કાર્ડ નંબર',
      enterPAN: 'પાન નંબર દાખલ કરો',
      profilePhoto: 'પ્રોફાઇલ ફોટો',
      barCertificate: 'બાર પ્રમાણપત્ર',
      aibeCertificate: 'ઓલ ઇન્ડિયા બાર એક્ઝામિનેશન પ્રમાણપત્ર',
      uploadAIBE: 'તમારું AIBE પ્રમાણપત્ર PDF અથવા છબી ફોર્મેટમાં અપલોડ કરો',
      expertise: 'નિપુણતાનો વિસ્તાર',
      selectCaseTypes: 'એક અથવા વધુ કેસ પ્રકારો પસંદ કરો',
      experienceAndAddress: 'અનુભવ અને સરનામું',
      finalDetails: 'અંતિમ વિગતો',
      professionalExperience: 'વ્યાવસાયિક અનુભવ',
      experiencePlaceholder: 'તમારો અનુભવ, હાથ ધરેલા કેસો, પ્રેક્ટિસના વર્ષો વગેરે વર્ણવો',
      officeAddress: 'ઓફિસ સરનામું',
      submit: 'સબમિટ કરો',
      profileUnderReview: 'પ્રોફાઇલ સમીક્ષા હેઠળ',
      thankYouMessage: 'ન્યાય સેતુ સાથે નોંધણી માટે આભાર! તમારી પ્રોફાઇલ હાલમાં ચકાસણી પ્રક્રિયામાં છે।',
      whatNext: 'આગળ શું થશે?',
      verifyDocs: '• અમારી ટીમ તમારા દસ્તાવેજોની ચકાસણી કરશે',
      processTime: '• આ પ્રક્રિયામાં સામાન્ય રીતે 2-3 કામકાજના દિવસો લાગે છે',
      emailNotification: '• ચકાસણી થયા પછી તમને ઇમેઇલ મળશે',
      checkEmail: '• તમારા નોંધાયેલ ઇમેઇલને નિયમિત તપાસો',
      backToHome: 'હોમ પર પાછા જાઓ'
    },
    'ಕನ್ನಡ (Kannada)': {
      appName: 'ನ್ಯಾಯ ಸೇತು',
      tagline: 'ನ್ಯಾಯದೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ',
      getStarted: 'ಪ್ರಾರಂಭಿಸಿ',
      selectLanguage: 'ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ',
      iAmA: 'ನಾನು',
      client: 'ಕ್ಲೈಂಟ್',
      lawyer: 'ವಕೀಲ',
      clientLogin: 'ಕ್ಲೈಂಟ್ ಲಾಗಿನ್',
      mobileNumber: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ',
      enterMobile: '10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
      enterOTP: 'OTP ನಮೂದಿಸಿ',
      sampleOTP: 'ಮಾದರಿ OTP: 1234',
      login: 'ಲಾಗಿನ್',
      yourAddress: 'ನಿಮ್ಮ ವಿಳಾಸ',
      state: 'ರಾಜ್ಯ',
      selectState: 'ರಾಜ್ಯ ಆಯ್ಕೆಮಾಡಿ',
      city: 'ನಗರ',
      enterCity: 'ನಗರ ನಮೂದಿಸಿ',
      address: 'ವಿಳಾಸ',
      enterAddress: 'ಸಂಪೂರ್ಣ ವಿಳಾಸ ನಮೂದಿಸಿ',
      continue: 'ಮುಂದುವರಿಸಿ',
      welcome: 'ನ್ಯಾಯ ಸೇತುಗೆ ಸ್ವಾಗತ!',
      clientWelcome: 'ನೀವು ಈಗ ಕ್ಲೈಂಟ್ ಆಗಿ ಲಾಗಿನ್ ಆಗಿದ್ದೀರಿ',
      lawyerRegistration: 'ವಕೀಲ ನೋಂದಣಿ',
      step: 'ಹಂತ',
      of: 'ರ',
      basicInfo: 'ಮೂಲ ಮಾಹಿತಿ',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು',
      phoneNumber: 'ಫೋನ್ ಸಂಖ್ಯೆ',
      email: 'ಇಮೇಲ್',
      next: 'ಮುಂದೆ',
      back: 'ಹಿಂದೆ',
      educationalDetails: 'ಶೈಕ್ಷಣಿಕ ವಿವರಗಳು',
      uploadCertificates: 'ಪ್ರಮಾಣಪತ್ರಗಳು ಮತ್ತು ಮಾರ್ಕ್‌ಶೀಟ್‌ಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      llbDegree: 'LLB ಪದವಿ ಪ್ರಮಾಣಪತ್ರ',
      marksheet10: '10ನೇ ಮಾರ್ಕ್‌ಶೀಟ್',
      marksheet12: '12ನೇ ಮಾರ್ಕ್‌ಶೀಟ್',
      schoolName: 'ಶಾಲೆಯ ಹೆಸರು',
      collegeName: 'ಕಾಲೇಜಿನ ಹೆಸರು',
      kycVerification: 'KYC ಪರಿಶೀಲನೆ',
      identityVerification: 'ಗುರುತು ಪರಿಶೀಲನೆ',
      aadharCard: 'ಆಧಾರ್ ಕಾರ್ಡ್',
      panNumber: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್ ಸಂಖ್ಯೆ',
      enterPAN: 'ಪ್ಯಾನ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ',
      profilePhoto: 'ಪ್ರೊಫೈಲ್ ಫೋಟೋ',
      barCertificate: 'ಬಾರ್ ಪ್ರಮಾಣಪತ್ರ',
      aibeCertificate: 'ಆಲ್ ಇಂಡಿಯಾ ಬಾರ್ ಎಗ್ಜಾಮಿನೇಶನ್ ಪ್ರಮಾಣಪತ್ರ',
      uploadAIBE: 'ನಿಮ್ಮ AIBE ಪ್ರಮಾಣಪತ್ರವನ್ನು PDF ಅಥವಾ ಚಿತ್ರ ಸ್ವರೂಪದಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
      expertise: 'ಪರಿಣತಿ ಕ್ಷೇತ್ರ',
      selectCaseTypes: 'ಒಂದು ಅಥವಾ ಹೆಚ್ಚಿನ ಪ್ರಕರಣ ವಿಧಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      experienceAndAddress: 'ಅನುಭವ ಮತ್ತು ವಿಳಾಸ',
      finalDetails: 'ಅಂತಿಮ ವಿವರಗಳು',
      professionalExperience: 'ವೃತ್ತಿಪರ ಅನುಭವ',
      experiencePlaceholder: 'ನಿಮ್ಮ ಅನುಭವ, ನಿರ್ವಹಿಸಿದ ಪ್ರಕರಣಗಳು, ಅಭ್ಯಾಸದ ವರ್ಷಗಳು ಇತ್ಯಾದಿಗಳನ್ನು ವಿವರಿಸಿ',
      officeAddress: 'ಕಚೇರಿ ವಿಳಾಸ',
      submit: 'ಸಲ್ಲಿಸಿ',
      profileUnderReview: 'ಪ್ರೊಫೈಲ್ ಪರಿಶೀಲನೆಯಲ್ಲಿದೆ',
      thankYouMessage: 'ನ್ಯಾಯ ಸೇತುದೊಂದಿಗೆ ನೋಂದಾಯಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ಪ್ರಸ್ತುತ ಪರಿಶೀಲನಾ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ।',
      whatNext: 'ಮುಂದೆ ಏನಾಗುತ್ತದೆ?',
      verifyDocs: '• ನಮ್ಮ ತಂಡ ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ',
      processTime: '• ಈ ಪ್ರಕ್ರಿಯೆಯು ಸಾಮಾನ್ಯವಾಗಿ 2-3 ವ್ಯಾಪಾರ ದಿನಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ',
      emailNotification: '• ಪರಿಶೀಲಿಸಿದ ನಂತರ ನೀವು ಇಮೇಲ್ ಸ್ವೀಕರಿಸುತ್ತೀರಿ',
      checkEmail: '• ನಿಮ್ಮ ನೋಂದಾಯಿತ ಇಮೇಲ್ ಅನ್ನು ನಿಯಮಿತವಾಗಿ ಪರಿಶೀಲಿಸಿ',
      backToHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ'
    }
  };

  const t = (translations as any)[selectedLanguage] || translations['English'];

  const caseTypes = [
    'Criminal Law', 'Civil Law', 'Family Law', 'Corporate Law',
    'Property Law', 'Labour Law', 'Tax Law', 'Constitutional Law',
    'Consumer Protection', 'Cyber Law', 'Environmental Law', 'IP Law'
  ];

  const states = [
    'Andhra Pradesh', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Telangana',
    'Gujarat', 'Maharashtra', 'Rajasthan', 'Delhi', 'Haryana',
    'Punjab', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Odisha'
  ];

  const cities: Cities = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Khammam', 'Karimnagar'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Ajmer'],
    'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi'],
    'Haryana': ['Gurugram', 'Faridabad', 'Panipat', 'Ambala', 'Karnal'],
    'Punjab': ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi'],
    'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur']
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setLawyerData({ ...lawyerData, [field]: file });
  };

  const handleExpertiseToggle = (caseType: string) => {
    const current = lawyerData.expertise;
    if (current.includes(caseType)) {
      setLawyerData({ ...lawyerData, expertise: current.filter(e => e !== caseType) });
    } else {
      setLawyerData({ ...lawyerData, expertise: [...current, caseType] });
    }
  };

  // Animated Splash Screen
  if (currentScreen === 'splash' && !showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6 overflow-hidden">
        <style>
          {`
            @keyframes scaleIn {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.1); }
              100% { transform: scale(1); opacity: 1; }
            }
            @keyframes fadeInUp {
              0% { transform: translateY(30px); opacity: 0; }
              100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            .animate-scaleIn {
              animation: scaleIn 1s ease-out forwards;
            }
            .animate-fadeInUp {
              animation: fadeInUp 1s ease-out 0.5s forwards;
              opacity: 0;
            }
            .animate-pulse-custom {
              animation: pulse 2s ease-in-out infinite;
            }
          `}
        </style>
        <div className="text-center">
          <div className="animate-scaleIn">
            <Scale className="w-40 h-40 mx-auto text-blue-600 mb-6 animate-pulse-custom" strokeWidth={1.5} />
          </div>
          <div className="animate-fadeInUp">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-3">
              Nyaya Setu
            </h1>
            <p className="text-gray-600 text-xl">Connect with Justice</p>
          </div>
        </div>
      </div>
    );
  }

  // Splash Screen with Button
  if (currentScreen === 'splash' && showContent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center transform hover:scale-105 transition-transform">
          <div className="mb-8">
            <Scale className="w-32 h-32 mx-auto text-blue-600 mb-4" strokeWidth={1.5} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent mb-2">
              {t.appName}
            </h1>
            <p className="text-gray-600 text-lg">{t.tagline}</p>
          </div>
          <button
            onClick={() => setCurrentScreen('language')}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transition-all text-lg"
          >
            {t.getStarted}
          </button>
        </div>
      </div>
    );
  }

  // Language Selection
  if (currentScreen === 'language') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{t.selectLanguage}</h2>
          <div className="grid grid-cols-1 gap-3">
            {Object.keys(translations).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setSelectedLanguage(lang);
                  setCurrentScreen('userType');
                }}
                className="bg-gradient-to-r from-gray-50 to-blue-50 hover:from-gray-100 hover:to-blue-100 text-gray-800 font-medium py-4 px-6 rounded-xl border-2 border-gray-200 hover:border-blue-400 transition-all text-left shadow-sm hover:shadow-md"
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // User Type Selection
  if (currentScreen === 'userType') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t.iAmA}</h2>
          <div className="space-y-4">
            <button
              onClick={() => {
                setUserType('client');
                setCurrentScreen('clientLogin');
              }}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-8 rounded-xl shadow-lg transition-all flex items-center justify-between gap-3 transform hover:scale-105 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-left">
                  <span className="text-xl block">{t.client}</span>
                  <span className="text-sm text-blue-100 block">Seeking legal help</span>
                </div>
              </div>
              <div className="text-3xl group-hover:translate-x-1 transition-transform">→</div>
            </button>
            <button
              onClick={() => {
                setUserType('lawyer');
                setCurrentScreen('lawyerRegister');
              }}
              className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-semibold py-6 px-8 rounded-xl shadow-lg transition-all flex items-center justify-between gap-3 transform hover:scale-105 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                  <Scale className="w-8 h-8 text-gray-700" />
                </div>
                <div className="text-left">
                  <span className="text-xl block">{t.lawyer}</span>
                  <span className="text-sm text-gray-200 block">Providing legal services</span>
                </div>
              </div>
              <div className="text-3xl group-hover:translate-x-1 transition-transform">→</div>
            </button>
          </div>
        </div>
      </div>
    );
  }

 // Client Login
  if (currentScreen === 'clientLogin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t.clientLogin}</h2>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                {t.mobileNumber}
              </label>
              <input
                type="tel"
                placeholder={t.enterMobile}
                value={clientData.phone}
                onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.enterOTP}</label>
              <input
                type="text"
                placeholder={t.sampleOTP}
                value={clientData.otp}
                onChange={(e) => setClientData({ ...clientData, otp: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
              <p className="text-sm text-gray-500 mt-2">{t.sampleOTP}</p>
            </div>
            <button
              onClick={() => setCurrentScreen('clientAddress')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              {t.login}
            </button>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('./dashboard')}
              className="w-full bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 hover:from-gray-100 hover:via-blue-100 hover:to-gray-100 text-blue-700 font-medium py-4 px-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all transform hover:scale-105 shadow-md hover:shadow-xl"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="text-3xl animate-bounce">✨</div>
                <div className="text-left">
                  <div className="font-semibold text-base">Just Browsing?</div>
                  <div className="text-xs text-blue-600">Explore as Guest</div>
                </div>
                <div className="text-3xl">👋</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Client Address
  if (currentScreen === 'clientAddress') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-6 h-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-800">{t.yourAddress}</h2>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.state}</label>
              <select
                value={addressData.state}
                onChange={(e) => {
                  setAddressData({ ...addressData, state: e.target.value, city: '' });
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              >
                <option value="">{t.selectState}</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            {addressData.state && (
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
                <label className="block text-gray-700 font-medium mb-2">{t.city}</label>
                <select
                  value={addressData.city}
                  onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                >
                  <option value="">{t.selectState}</option>
                  {cities[addressData.state]?.map((city: string) => <option key={city} value={city}>{city}</option>)}
                </select>
              </div>
            )}
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.address}</label>
              <textarea
                placeholder={t.enterAddress}
                value={addressData.address}
                onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <button
              onClick={() => navigate('./dashboard')}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              {t.continue}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Client Dashboard
  if (currentScreen === 'clientDashboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.welcome}</h2>
          <p className="text-gray-600 text-lg">{t.clientWelcome}</p>
        </div>
      </div>
    );
  }

 // Lawyer Registration - Step 1: Basic Details
  if (currentScreen === 'lawyerRegister' && lawyerStep === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.lawyerRegistration}</h2>
            <p className="text-gray-600">{t.step} 1 {t.of} 6: {t.basicInfo}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <User className="w-5 h-5 text-blue-600" />
                {t.fullName}
              </label>
              <input
                type="text"
                value={lawyerData.name}
                onChange={(e) => setLawyerData({ ...lawyerData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                {t.phoneNumber}
              </label>
              <input
                type="tel"
                value={lawyerData.phone}
                onChange={(e) => setLawyerData({ ...lawyerData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-600" />
                {t.email}
              </label>
              <input
                type="email"
                value={lawyerData.email}
                onChange={(e) => setLawyerData({ ...lawyerData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.enterOTP}</label>
              <input
                type="text"
                placeholder={t.sampleOTP}
                value={lawyerData.otp}
                onChange={(e) => setLawyerData({ ...lawyerData, otp: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
              <p className="text-sm text-gray-500 mt-2">{t.sampleOTP}</p>
            </div>
            <button
              onClick={() => setLawyerStep(2)}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-105"
            >
              {t.next}
            </button>
            <button
              onClick={() => setCurrentScreen('clientDashboard')}
              className="w-full bg-gradient-to-r from-gray-100 to-blue-100 hover:from-gray-200 hover:to-blue-200 text-blue-700 font-medium py-3 px-6 rounded-xl border-2 border-blue-300 transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <span className="text-2xl">👋</span>
              <span>Skip & Explore as Guest</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lawyer Registration - Step 2: Educational Details
  if (currentScreen === 'lawyerRegister' && lawyerStep === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">{t.educationalDetails}</h2>
            </div>
            <p className="text-gray-600">{t.step} 2 {t.of} 6: {t.uploadCertificates}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.llbDegree}</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload('llbCert', e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.marksheet10}</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload('class10', e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.marksheet12}</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload('class12', e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.schoolName}</label>
              <input
                type="text"
                value={lawyerData.school}
                onChange={(e) => setLawyerData({ ...lawyerData, school: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.collegeName}</label>
              <input
                type="text"
                value={lawyerData.college}
                onChange={(e) => setLawyerData({ ...lawyerData, college: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setLawyerStep(1)}
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
              >
                {t.back}
              </button>
              <button
                onClick={() => setLawyerStep(3)}
                className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                {t.next}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lawyer Registration - Step 3: KYC Verification
  if (currentScreen === 'lawyerRegister' && lawyerStep === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">{t.kycVerification}</h2>
            </div>
            <p className="text-gray-600">{t.step} 3 {t.of} 6: {t.identityVerification}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.aadharCard}</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload('aadhar', e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.panNumber}</label>
              <input
                type="text"
                value={lawyerData.pan}
                onChange={(e) => setLawyerData({ ...lawyerData, pan: e.target.value })}
                placeholder={t.enterPAN}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.profilePhoto}</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload('photo', e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setLawyerStep(2)}
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
              >
                {t.back}
              </button>
              <button
                onClick={() => setLawyerStep(4)}
                className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                {t.next}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lawyer Registration - Step 4: Bar Examination Certificate
  if (currentScreen === 'lawyerRegister' && lawyerStep === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">{t.barCertificate}</h2>
            </div>
            <p className="text-gray-600">{t.step} 4 {t.of} 6</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 via-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.aibeCertificate}</label>
              <input
                type="file"
                onChange={(e) => handleFileUpload('barCert', e.target.files?.[0] || null)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
              <p className="text-sm text-gray-500 mt-2">{t.uploadAIBE}</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setLawyerStep(3)}
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
              >
                {t.back}
              </button>
              <button
                onClick={() => setLawyerStep(5)}
                className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                {t.next}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Lawyer Registration - Step 5: Expertise
  if (currentScreen === 'lawyerRegister' && lawyerStep === 5) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">{t.expertise}</h2>
            </div>
            <p className="text-gray-600">{t.step} 5 {t.of} 6: {t.selectCaseTypes}</p>
          </div>
          <div className="space-y-3 mb-6">
            {caseTypes.map((caseType) => (
              <label key={caseType} className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-gray-100 hover:to-blue-100 cursor-pointer transition-all shadow-sm hover:shadow-md">
                <input
                  type="checkbox"
                  checked={lawyerData.expertise.includes(caseType)}
                  onChange={() => handleExpertiseToggle(caseType)}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <span className="text-gray-800 font-medium">{caseType}</span>
              </label>
            ))}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setLawyerStep(4)}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
            >
              {t.back}
            </button>
            <button
              onClick={() => setLawyerStep(6)}
              className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Lawyer Registration - Step 6: Experience & Address
  if (currentScreen === 'lawyerRegister' && lawyerStep === 6) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 my-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.experienceAndAddress}</h2>
            <p className="text-gray-600">{t.step} 6 {t.of} 6: {t.finalDetails}</p>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
              <label className="block text-gray-700 font-medium mb-2">{t.professionalExperience}</label>
              <textarea
                value={lawyerData.experience}
                onChange={(e) => setLawyerData({ ...lawyerData, experience: e.target.value })}
                placeholder={t.experiencePlaceholder}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
              />
            </div>
            <div className="pt-4 border-t-2 border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">{t.officeAddress}</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
                  <label className="block text-gray-700 font-medium mb-2">{t.state}</label>
                  <select
                    value={addressData.state}
                    onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="">{t.selectState}</option>
                    {states.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl shadow-sm">
                  <label className="block text-gray-700 font-medium mb-2">{t.city}</label>
                  <select
                    value={addressData.city}
                    onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                  >
                    <option value="">{t.enterCity}</option>
                    {cities[addressData.state]?.map((city: string) => <option key={city} value={city}>{city}</option>)}
                  </select>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-2xl shadow-sm">
                  <label className="block text-gray-700 font-medium mb-2">{t.address}</label>
                  <textarea
                    placeholder={t.enterAddress}
                    value={addressData.address}
                    onChange={(e) => setAddressData({ ...addressData, address: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none bg-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setLawyerStep(5)}
                className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
              >
                {t.back}
              </button>
              <button
                onClick={() => setCurrentScreen('verification')}
                className="w-1/2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
              >
                {t.submit}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Verification Acknowledgment
  if (currentScreen === 'verification') {
    const applicationId = `NYS${Date.now().toString().slice(-8)}`;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-lg w-full text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.profileUnderReview}</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-gray-50 border-2 border-blue-200 rounded-2xl p-4 mb-4">
              <p className="text-sm text-gray-600 mb-2">Application ID</p>
              <p className="text-2xl font-bold text-blue-600 tracking-wider">{applicationId}</p>
            </div>
            
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-sm font-semibold text-gray-700">Status: Under Verification</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full animate-pulse" style={{width: '40%'}}></div>
              </div>
            </div>
            
            <p className="text-gray-600 text-base mb-6">
              {t.thankYouMessage}
            </p>
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 border-2 border-gray-200 rounded-2xl p-6 text-left shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">i</span>
                {t.whatNext}
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>{t.verifyDocs}</li>
                <li>{t.processTime}</li>
                <li>{t.emailNotification}</li>
                <li>{t.checkEmail}</li>
              </ul>
            </div>
          </div>
          <button
  onClick={() => {
    // Save lawyer data to localStorage
    const lawyerDataToSave = {
      ...lawyerData,
      address: addressData,
      isVerified: false,
      registrationDate: new Date().toISOString()
    };
    localStorage.setItem('lawyerData', JSON.stringify(lawyerDataToSave));
    navigate('/lawyerdashboard'); // Redirect to dashboard
  }}
  className="w-1/2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all"
>
  {t.submit}
</button>
        </div>
      </div>
    );
  }

  return null;
};

export default NyayaSetu;
