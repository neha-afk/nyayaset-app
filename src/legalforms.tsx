import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Edit, Clock, TrendingUp, X, ChevronRight, AlertCircle, CheckCircle, Star } from 'lucide-react';

interface LegalForm {
  id: string;
  title: string;
  category: 'civil' | 'property' | 'family' | 'corporate' | 'consumer' | 'employment';
  description: string;
  requirements: string[];
  estimatedTime: number;
  popularity: number;
  downloads: number;
  pdfUrl: string;
  icon: string;
}

const formDatabase: LegalForm[] = [
  {
    id: 'affidavit_general',
    title: 'General Affidavit',
    category: 'civil',
    description: 'A sworn statement of facts for legal proceedings',
    requirements: ['Full name', 'Address', 'Purpose of affidavit', 'Statement of facts'],
    estimatedTime: 10,
    popularity: 95,
    downloads: 15420,
    pdfUrl: '/forms/affidavit-general.pdf',
    icon: '📄'
  },
  {
    id: 'rental_agreement',
    title: 'Rental Agreement',
    category: 'property',
    description: 'Standard rental/lease agreement for residential properties',
    requirements: ['Landlord details', 'Tenant details', 'Property address', 'Rent amount', 'Duration'],
    estimatedTime: 15,
    popularity: 98,
    downloads: 28350,
    pdfUrl: '/forms/rental-agreement.pdf',
    icon: '🏠'
  },
  {
    id: 'power_of_attorney',
    title: 'Power of Attorney',
    category: 'civil',
    description: 'Authorization to act on behalf of another person',
    requirements: ['Principal details', 'Agent details', 'Powers granted', 'Duration'],
    estimatedTime: 12,
    popularity: 92,
    downloads: 18720,
    pdfUrl: '/forms/power-of-attorney.pdf',
    icon: '⚖️'
  },
  {
    id: 'divorce_petition',
    title: 'Divorce Petition',
    category: 'family',
    description: 'Petition for divorce filing',
    requirements: ['Petitioner details', 'Respondent details', 'Marriage details', 'Grounds for divorce'],
    estimatedTime: 20,
    popularity: 88,
    downloads: 12450,
    pdfUrl: '/forms/divorce-petition.pdf',
    icon: '💔'
  },
  {
    id: 'consumer_complaint',
    title: 'Consumer Complaint',
    category: 'consumer',
    description: 'Complaint against defective products or services',
    requirements: ['Complainant details', 'Seller/Service provider details', 'Product/Service details', 'Issue description'],
    estimatedTime: 10,
    popularity: 90,
    downloads: 16280,
    pdfUrl: '/forms/consumer-complaint.pdf',
    icon: '🛒'
  },
  {
    id: 'employment_contract',
    title: 'Employment Contract',
    category: 'employment',
    description: 'Standard employment agreement template',
    requirements: ['Employer details', 'Employee details', 'Job role', 'Salary', 'Terms & conditions'],
    estimatedTime: 18,
    popularity: 87,
    downloads: 14590,
    pdfUrl: '/forms/employment-contract.pdf',
    icon: '💼'
  },
  {
    id: 'will_testament',
    title: 'Last Will and Testament',
    category: 'property',
    description: 'Legal document for property distribution after death',
    requirements: ['Testator details', 'Beneficiaries', 'Asset details', 'Executor details'],
    estimatedTime: 25,
    popularity: 85,
    downloads: 9870,
    pdfUrl: '/forms/will-testament.pdf',
    icon: '📜'
  },
  {
    id: 'noc_general',
    title: 'No Objection Certificate',
    category: 'civil',
    description: 'Certificate stating no objection to a particular action',
    requirements: ['Issuer details', 'Recipient details', 'Purpose', 'Conditions if any'],
    estimatedTime: 8,
    popularity: 93,
    downloads: 21340,
    pdfUrl: '/forms/noc-general.pdf',
    icon: '✅'
  },
  {
    id: 'sale_deed',
    title: 'Property Sale Deed',
    category: 'property',
    description: 'Legal document for property sale/purchase',
    requirements: ['Seller details', 'Buyer details', 'Property details', 'Sale price', 'Payment terms'],
    estimatedTime: 20,
    popularity: 91,
    downloads: 13560,
    pdfUrl: '/forms/sale-deed.pdf',
    icon: '🏢'
  },
  {
    id: 'partnership_deed',
    title: 'Partnership Deed',
    category: 'corporate',
    description: 'Agreement for business partnership',
    requirements: ['Partner details', 'Business name', 'Capital contribution', 'Profit sharing', 'Terms'],
    estimatedTime: 22,
    popularity: 84,
    downloads: 8920,
    pdfUrl: '/forms/partnership-deed.pdf',
    icon: '🤝'
  },
  {
    id: 'leave_license',
    title: 'Leave and License Agreement',
    category: 'property',
    description: 'Agreement for temporary property usage',
    requirements: ['Licensor details', 'Licensee details', 'Property details', 'License fee', 'Duration'],
    estimatedTime: 15,
    popularity: 89,
    downloads: 11230,
    pdfUrl: '/forms/leave-license.pdf',
    icon: '🔑'
  },
  {
    id: 'loan_agreement',
    title: 'Personal Loan Agreement',
    category: 'civil',
    description: 'Agreement for personal loan between parties',
    requirements: ['Lender details', 'Borrower details', 'Loan amount', 'Interest rate', 'Repayment terms'],
    estimatedTime: 12,
    popularity: 86,
    downloads: 10450,
    pdfUrl: '/forms/loan-agreement.pdf',
    icon: '💰'
  }
];

const categories = [
  { id: 'all', name: 'All Forms', icon: '📋' },
  { id: 'civil', name: 'Civil', icon: '⚖️' },
  { id: 'property', name: 'Property', icon: '🏠' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧' },
  { id: 'corporate', name: 'Corporate', icon: '🏢' },
  { id: 'consumer', name: 'Consumer', icon: '🛒' },
  { id: 'employment', name: 'Employment', icon: '💼' }
];

const LegalFormsFeature = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'downloads'>('popularity');
  const [selectedForm, setSelectedForm] = useState<LegalForm | null>(null);
  const [showFormBuilder, setShowFormBuilder] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(0);

  const filteredForms = formDatabase
    .filter(form => {
      const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          form.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => sortBy === 'popularity' ? b.popularity - a.popularity : b.downloads - a.downloads);

  const handleDownload = (form: LegalForm) => {
    alert(`Downloading ${form.title}...`);
  };

  const handleFillOnline = (form: LegalForm) => {
    setSelectedForm(form);
    setShowFormBuilder(true);
    setFormData({});
    setCurrentStep(0);
  };

  const handleFormSubmit = () => {
    alert(`Form generated successfully! Your ${selectedForm?.title} is ready for download.`);
    setShowFormBuilder(false);
    setSelectedForm(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={40} />
            <div>
              <h1 className="text-3xl font-bold">Legal Form Templates</h1>
              <p className="text-blue-100">12+ Ready-to-use legal documents for India</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{formDatabase.length}+</div>
              <div className="text-blue-100">Templates</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">{Math.floor(formDatabase.reduce((sum, f) => sum + f.downloads, 0) / 1000)}K+</div>
              <div className="text-blue-100">Downloads</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <div className="text-3xl font-bold">FREE</div>
              <div className="text-blue-100">All Templates</div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search forms by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popularity' | 'downloads')}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="popularity">Most Popular</option>
              <option value="downloads">Most Downloaded</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-600">
          Showing <strong>{filteredForms.length}</strong> {filteredForms.length === 1 ? 'form' : 'forms'}
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredForms.map(form => (
            <div key={form.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden group">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{form.icon}</div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="text-yellow-500" size={14} fill="currentColor" />
                    <span className="text-sm font-semibold text-gray-700">{form.popularity}</span>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {form.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {form.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{form.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} />
                    <span>{(form.downloads / 1000).toFixed(1)}K</span>
                  </div>
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                    {form.category.charAt(0).toUpperCase() + form.category.slice(1)}
                  </span>
                </div>

                {/* Requirements Preview */}
                <div className="mb-4">
                  <div className="text-xs text-gray-600 font-medium mb-2">Required:</div>
                  <div className="flex flex-wrap gap-1">
                    {form.requirements.slice(0, 2).map((req, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {req}
                      </span>
                    ))}
                    {form.requirements.length > 2 && (
                      <span className="text-xs text-gray-500 px-2 py-1">
                        +{form.requirements.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownload(form)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </button>
                  <button
                    onClick={() => handleFillOnline(form)}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Edit size={16} />
                    Fill Online
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredForms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No forms found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Form Builder Modal */}
      {showFormBuilder && selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedForm.title}</h3>
                <p className="text-sm text-gray-600">Step {currentStep + 1} of {selectedForm.requirements.length}</p>
              </div>
              <button
                onClick={() => setShowFormBuilder(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="px-6 pt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / selectedForm.requirements.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {selectedForm.requirements.map((field, index) => (
                  <div
                    key={index}
                    className={`transition-all duration-300 ${
                      index === currentStep ? 'opacity-100' : 'opacity-30 pointer-events-none'
                    }`}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData[field] || ''}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`Enter ${field.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex gap-2">
                  <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Important Notice</h4>
                    <p className="text-sm text-yellow-700">
                      This is a template document. Please consult with a qualified lawyer before using it for legal purposes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t p-6 flex justify-between gap-3 bg-gray-50">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
              >
                Previous
              </button>
              {currentStep < selectedForm.requirements.length - 1 ? (
                <button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleFormSubmit}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  Generate Document
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegalFormsFeature;