import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface UploadedDocuments {
  [key: string]: File;
}

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  annualIncome: string;
  familyMembers: string;
  category: string;
}

interface CaseDetails {
  caseType: string;
  description: string;
  opponentName: string;
  opponentAddress: string;
  courtName: string;
}

interface FormData {
  personalInfo: PersonalInfo;
  caseDetails: CaseDetails;
}

interface DocumentRequirement {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  formats: string[];
}

const LegalAid = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      annualIncome: '',
      familyMembers: '',
      category: ''
    },
    caseDetails: {
      caseType: '',
      description: '',
      opponentName: '',
      opponentAddress: '',
      courtName: ''
    }
  });
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocuments>({});

  const requiredDocuments: DocumentRequirement[] = [
    {
      id: 'aadhaar',
      name: 'Aadhaar Card',
      description: 'Front and back copy of Aadhaar card',
      mandatory: true,
      formats: ['PDF', 'JPG', 'PNG']
    },
    {
      id: 'incomeCertificate',
      name: 'Income Certificate',
      description: 'Certificate from competent authority showing annual income below ₹3 Lakhs',
      mandatory: true,
      formats: ['PDF']
    },
    {
      id: 'addressProof',
      name: 'Address Proof',
      description: 'Recent utility bill, ration card, or any government-issued address proof',
      mandatory: true,
      formats: ['PDF', 'JPG', 'PNG']
    },
    {
      id: 'casteCertificate',
      name: 'Caste Certificate (if applicable)',
      description: 'For SC/ST/OBC categories',
      mandatory: false,
      formats: ['PDF', 'JPG', 'PNG']
    },
    {
      id: 'caseDocuments',
      name: 'Case Related Documents',
      description: 'Any existing court notices, FIR, or related legal documents',
      mandatory: false,
      formats: ['PDF', 'JPG', 'PNG']
    },
    {
      id: 'affidavit',
      name: 'Affidavit of Indigence',
      description: 'Sworn affidavit declaring financial status',
      mandatory: true,
      formats: ['PDF']
    },
    {
      id: 'photograph',
      name: 'Passport Size Photograph',
      description: 'Recent passport size color photograph',
      mandatory: true,
      formats: ['JPG', 'PNG']
    },
    {
      id: 'bankStatement',
      name: 'Bank Statement (6 months)',
      description: 'Last 6 months bank statement',
      mandatory: true,
      formats: ['PDF']
    }
  ];

  const handleFileUpload = (docId: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setUploadedDocs(prev => ({
        ...prev,
        [docId]: files[0]
      }));
    }
  };

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return Object.values(formData.personalInfo).every(val => val.trim() !== '');
      case 2:
        return Object.values(formData.caseDetails).every(val => val.trim() !== '');
      case 3:
        const mandatoryDocs = requiredDocuments.filter(doc => doc.mandatory);
        return mandatoryDocs.every(doc => uploadedDocs[doc.id]);
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', { formData, uploadedDocs });
    setCurrentStep(5); // Success step
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Home
          </button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Free Legal Aid Application
            </h1>
            <p className="text-gray-600 mt-2">
              Complete your application by providing the required information and documents
            </p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold transition-all duration-300 ${
                    currentStep >= step
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStep > step ? <CheckCircle size={20} /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-24 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step ? 'bg-red-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 text-sm text-gray-600">
            <div className="text-center font-medium">Personal Info</div>
            <div className="text-center font-medium">Case Details</div>
            <div className="text-center font-medium">Documents</div>
            <div className="text-center font-medium">Review & Submit</div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your full name"
                  value={formData.personalInfo.fullName}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, fullName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your email"
                  value={formData.personalInfo.email}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, email: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter your phone number"
                  value={formData.personalInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, phone: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Income (₹) *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter annual income"
                  value={formData.personalInfo.annualIncome}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, annualIncome: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  rows={3}
                  placeholder="Enter your complete address"
                  value={formData.personalInfo.address}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, address: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Family Members *
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Number of family members"
                  value={formData.personalInfo.familyMembers}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, familyMembers: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  value={formData.personalInfo.category}
                  onChange={(e) => setFormData({
                    ...formData,
                    personalInfo: { ...formData.personalInfo, category: e.target.value }
                  })}
                >
                  <option value="">Select category</option>
                  <option value="general">General</option>
                  <option value="sc">SC</option>
                  <option value="st">ST</option>
                  <option value="obc">OBC</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <AlertCircle size={16} />
                <span>All fields marked with * are mandatory</span>
              </div>
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!isStepComplete(1)}
                className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                Continue to Case Details
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Case Details */}
        {currentStep === 2 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Type *
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  value={formData.caseDetails.caseType}
                  onChange={(e) => setFormData({
                    ...formData,
                    caseDetails: { ...formData.caseDetails, caseType: e.target.value }
                  })}
                >
                  <option value="">Select case type</option>
                  <option value="civil">Civil Case</option>
                  <option value="criminal">Criminal Case</option>
                  <option value="family">Family Dispute</option>
                  <option value="property">Property Matter</option>
                  <option value="labor">Labor/Employment</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Court Name (if any)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter court name"
                  value={formData.caseDetails.courtName}
                  onChange={(e) => setFormData({
                    ...formData,
                    caseDetails: { ...formData.caseDetails, courtName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opponent Name (if any)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter opponent name"
                  value={formData.caseDetails.opponentName}
                  onChange={(e) => setFormData({
                    ...formData,
                    caseDetails: { ...formData.caseDetails, opponentName: e.target.value }
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opponent Address (if any)
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  placeholder="Enter opponent address"
                  value={formData.caseDetails.opponentAddress}
                  onChange={(e) => setFormData({
                    ...formData,
                    caseDetails: { ...formData.caseDetails, opponentAddress: e.target.value }
                  })}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Description *
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                  rows={4}
                  placeholder="Provide detailed description of your case..."
                  value={formData.caseDetails.description}
                  onChange={(e) => setFormData({
                    ...formData,
                    caseDetails: { ...formData.caseDetails, description: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentStep(1)}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!isStepComplete(2)}
                className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                Continue to Documents
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Document Upload */}
        {currentStep === 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Required Documents</h2>
            <p className="text-gray-600 mb-8">
              Please upload clear scanned copies of the following documents. Maximum file size: 5MB per file.
            </p>

            <div className="space-y-6">
              {requiredDocuments.map((doc) => (
                <div key={doc.id} className="border border-gray-200 rounded-xl p-6 hover:border-red-300 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {doc.name}
                        </h3>
                        {doc.mandatory && (
                          <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                            Required
                          </span>
                        )}
                        {!doc.mandatory && (
                          <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                            Optional
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{doc.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Accepted formats: {doc.formats.join(', ')}</span>
                        <span>•</span>
                        <span>Max 5MB</span>
                      </div>
                    </div>

                    <div className="ml-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          accept={doc.formats.map(f => `.${f.toLowerCase()}`).join(',')}
                          onChange={(e) => handleFileUpload(doc.id, e.target.files)}
                        />
                        <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-3 rounded-xl hover:bg-red-700 transition-all duration-300">
                          <Upload size={18} />
                          <span>Upload</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {uploadedDocs[doc.id] && (
                    <div className="mt-4 flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4">
                      <CheckCircle className="text-green-600" size={20} />
                      <div className="flex-1">
                        <p className="text-green-800 font-medium">
                          {uploadedDocs[doc.id].name}
                        </p>
                        <p className="text-green-600 text-sm">
                          {(uploadedDocs[doc.id].size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          const newDocs = { ...uploadedDocs };
                          delete newDocs[doc.id];
                          setUploadedDocs(newDocs);
                        }}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Download Affidavit Template */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Download className="text-blue-600" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Affidavit of Indigence Template
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Download the affidavit template, get it notarized, and upload the scanned copy above.
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium">
                  Download Template
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentStep(2)}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                disabled={!isStepComplete(3)}
                className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300"
              >
                Review & Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Application</h2>
            
            <div className="space-y-8">
              {/* Personal Info Review */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Full Name:</span>
                    <p className="font-medium">{formData.personalInfo.fullName}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <p className="font-medium">{formData.personalInfo.email}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Phone:</span>
                    <p className="font-medium">{formData.personalInfo.phone}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Annual Income:</span>
                    <p className="font-medium">₹{formData.personalInfo.annualIncome}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Family Members:</span>
                    <p className="font-medium">{formData.personalInfo.familyMembers}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Category:</span>
                    <p className="font-medium">{formData.personalInfo.category || 'Not specified'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-gray-600">Address:</span>
                    <p className="font-medium">{formData.personalInfo.address}</p>
                  </div>
                </div>
              </div>

              {/* Case Details Review */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Case Type:</span>
                    <p className="font-medium">{formData.caseDetails.caseType}</p>
                  </div>
                  {formData.caseDetails.courtName && (
                    <div>
                      <span className="text-gray-600">Court Name:</span>
                      <p className="font-medium">{formData.caseDetails.courtName}</p>
                    </div>
                  )}
                  {formData.caseDetails.opponentName && (
                    <div>
                      <span className="text-gray-600">Opponent Name:</span>
                      <p className="font-medium">{formData.caseDetails.opponentName}</p>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Case Description:</span>
                    <p className="font-medium mt-1">{formData.caseDetails.description}</p>
                  </div>
                </div>
              </div>

              {/* Documents Review */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                <div className="space-y-2 text-sm">
                  {requiredDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3">
                      {uploadedDocs[doc.id] ? (
                        <CheckCircle className="text-green-600" size={16} />
                      ) : (
                        <AlertCircle className="text-red-600" size={16} />
                      )}
                      <span className={uploadedDocs[doc.id] ? 'text-green-700' : 'text-red-700'}>
                        {doc.name} {uploadedDocs[doc.id] ? '- Uploaded' : '- Missing'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(3)}
                className="text-gray-600 hover:text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300"
              >
                Back to Documents
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 flex items-center gap-2"
              >
                <FileText size={18} />
                Submit Application
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {currentStep === 5 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted Successfully!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Your legal aid application has been received. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-gray-700 mb-4">
                <strong>Application ID:</strong> LA-{Date.now().toString().slice(-8)}
              </p>
              <p className="text-gray-600">
                Our legal team will review your application and contact you within 3-5 working days.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-all duration-300"
            >
              Return to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalAid;