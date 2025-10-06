import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Users, Scale, Calendar, TrendingUp, DollarSign, Briefcase, Bell, Search, Menu, FileText, Clock, AlertCircle, CheckCircle, Zap, FileSearch, FileDown, BarChart3, MessageSquare, CheckSquare, X, ArrowRight, TrendingDown, LucideIcon, ChevronRight } from 'lucide-react';

interface StatItem {
  label: string;
  value: string;
  icon: LucideIcon;
  color: string;
  change: string;
}

const LawyerDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lawyerData, setLawyerData] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    const storedLawyerData = localStorage.getItem('lawyerData');
    if (storedLawyerData) {
      setLawyerData(JSON.parse(storedLawyerData));
    } else {
      // Redirect to login if no lawyer data found
      navigate('/');
    }
  }, [navigate]);

  // Show loading while checking authentication
  if (!lawyerData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Scale className="w-16 h-16 text-teal-600 mx-auto mb-4 animate-pulse" />
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Active Cases', value: '12', icon: Briefcase, color: 'bg-blue-500', change: '+2 this week' },
    { label: 'Total Clients', value: '45', icon: Users, color: 'bg-teal-500', change: '+3 new' },
    { label: 'Revenue (Month)', value: '₹2.4L', icon: DollarSign, color: 'bg-emerald-500', change: '+12%' },
    { label: 'Success Rate', value: '78%', icon: TrendingUp, color: 'bg-cyan-500', change: '+5%' }
  ];

  const quickActions = [
    { icon: FileText, label: 'Generate Document', gradient: 'from-blue-500 to-blue-600' },
    { icon: FileSearch, label: 'Research Case Law', gradient: 'from-teal-500 to-teal-600' },
    { icon: DollarSign, label: 'Create Invoice', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: BarChart3, label: 'Case Analysis', gradient: 'from-cyan-500 to-cyan-600' }
  ];

  const performanceMetrics = [
    { label: 'Hours Billed', value: 42, max: 50, unit: 'hrs', color: 'bg-blue-500' },
    { label: 'Documents Generated', value: 18, max: 25, unit: 'docs', color: 'bg-teal-500' },
    { label: 'Cases Updated', value: 8, max: 12, unit: 'cases', color: 'bg-emerald-500' },
    { label: 'Client Satisfaction', value: 92, max: 100, unit: '%', color: 'bg-cyan-500' }
  ];

  const notifications = [
    { type: 'court', icon: Calendar, title: 'Court Hearing Tomorrow', desc: 'Sharma vs Properties - 10:00 AM', action: 'View Details', color: 'text-red-600', bg: 'bg-red-50' },
    { type: 'message', icon: MessageSquare, title: '3 New Client Messages', desc: 'Priya Sharma, Amit Patel, Rajesh Kumar', action: 'Reply', color: 'text-blue-600', bg: 'bg-blue-50' },
    { type: 'document', icon: FileText, title: 'Document Signature Pending', desc: 'Contract Agreement - Kumar Case', action: 'Send Reminder', color: 'text-amber-600', bg: 'bg-amber-50' },
    { type: 'payment', icon: DollarSign, title: 'Payment Received', desc: '₹45,000 from Sharma case', action: 'View Invoice', color: 'text-green-600', bg: 'bg-green-50' }
  ];

  const clientRequests = [
    { name: 'Neha Verma', type: 'Consultation', time: '30 min ago', priority: 'high' },
    { name: 'Suresh Reddy', type: 'Document Review', time: '2 hours ago', priority: 'medium' },
    { name: 'Kavita Singh', type: 'Case Evaluation', time: '5 hours ago', priority: 'low' }
  ];

  const recentDocuments = [
    { name: 'Sale Agreement Draft', case: 'Kumar Property Case', time: '2 hours ago', status: 'draft' },
    { name: 'Divorce Petition', case: 'Sharma Divorce', time: '1 day ago', status: 'filed' },
    { name: 'Legal Notice', case: 'Patel vs Company', time: '3 days ago', status: 'sent' }
  ];

  const caseLawUpdates = [
    { title: 'Supreme Court ruling on Property Rights', date: 'Today', relevance: 'High' },
    { title: 'New Amendment in Tax Law', date: 'Yesterday', relevance: 'Medium' },
    { title: 'Delhi HC Precedent on Contracts', date: '2 days ago', relevance: 'High' }
  ];

  // Get user initials for avatar
  const getUserInitials = () => {
    if (lawyerData.name) {
      return lawyerData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
    }
    return 'AK';
  };

  const handleLogout = () => {
    localStorage.removeItem('lawyerData');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
<div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-slate-800 to-slate-900 text-white transition-all duration-300 flex flex-col`}>
  <div className="p-6 flex items-center justify-between border-b border-slate-700">
    {sidebarOpen ? (
      <div className="flex items-center gap-3">
        <Scale className="w-8 h-8 text-teal-400" />
        <span className="text-xl font-bold">Nyaya Setu</span>
      </div>
    ) : (
      <Scale className="w-8 h-8 text-teal-400 mx-auto" />
    )}
    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
      <Menu className="w-6 h-6" />
    </button>
  </div>

  {/* JurisConnect Quick Access - Added at the top */}
  {sidebarOpen && (
    <div className="p-4 border-b border-slate-700/50">
      <button 
        onClick={() => navigate('/jurisconnect')}
        className="w-full flex items-center gap-3 p-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition-all group relative overflow-hidden shadow-lg"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center z-10">
          <Users className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 text-left z-10">
          <div className="text-sm font-semibold text-white flex items-center gap-2">
            JurisConnect
            <span className="text-xs bg-yellow-400 text-purple-900 px-1.5 py-0.5 rounded-full font-bold">NEW</span>
          </div>
          <div className="text-xs text-purple-200">Professional Network</div>
        </div>
        <div className="z-10">
          <ChevronRight className="w-4 h-4 text-white/70 group-hover:translate-x-1 transition-transform" />
        </div>
      </button>
    </div>
  )}

  <nav className="flex-1 p-4 space-y-2">
    {[
      { icon: TrendingUp, label: 'Dashboard', active: true },
      { icon: Scale, label: 'My Cases', badge: '12' },
      { icon: Users, label: 'Clients', badge: '45' },
      { icon: FileText, label: 'Documents' },
      { icon: DollarSign, label: 'Billing' },
      { icon: Briefcase, label: 'AI Research' },
      { icon: Bell, label: 'Quick Actions' }
    ].map((item, idx) => (
      <button
        key={idx}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
          item.active ? 'bg-teal-600 text-white' : 'text-slate-300 hover:bg-slate-700 hover:text-white'
        }`}
      >
        <item.icon className="w-5 h-5" />
        {sidebarOpen && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="bg-teal-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
            )}
          </>
        )}
      </button>
    ))}
  </nav>

  {sidebarOpen && (
    <div className="p-4 border-t border-slate-700">
      <div className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center font-bold relative">
          {getUserInitials()}
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{lawyerData.name || 'Adv. Kumar'}</div>
          <div className="text-xs text-slate-400">
            {lawyerData.isVerified ? 'Verified Lawyer' : 'Verification Pending'}
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-red-400 hover:text-red-300 mt-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )}
</div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}

        


        <div className="bg-white border-b border-slate-200 px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Welcome back, {lawyerData.name || 'Adv. Kumar'}
              </h1>
              <p className="text-slate-600">
                {lawyerData.isVerified 
                  ? "Here's what's happening with your practice today" 
                  : "Your profile is under verification. You have limited access."}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search cases, clients..." className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-teal-500 w-64" />
              </div>
              <button className="relative p-2 hover:bg-slate-100 rounded-lg">
                <Bell className="w-6 h-6 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* AI Quick Actions Bar */}
          <div className="bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">AI Quick Actions</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {quickActions.map((action, idx) => (
                <button key={idx} className="group bg-white hover:bg-slate-50 rounded-lg p-4 transition-all transform hover:scale-105 hover:shadow-xl">
                  <div className={`w-12 h-12 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700 text-center">{action.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs text-green-600 font-semibold">{stat.change}</span>
                </div>
                <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* AI Case Intelligence */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  AI Case Intelligence
                  <span className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full animate-pulse">LIVE</span>
                </h2>
              </div>

              <div className="bg-gradient-to-br from-blue-50 via-teal-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200 mb-4">
                <div className="font-semibold text-slate-800 mb-4 text-lg">Sharma vs Properties Ltd</div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-slate-600 mb-2">Win Probability</div>
                    <div className="text-3xl font-bold text-teal-600">78%</div>
                    <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" />
                      +5% from last week
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-slate-600 mb-2">Estimated Timeline</div>
                    <div className="text-3xl font-bold text-blue-600">3-6M</div>
                    <div className="text-xs text-slate-500 mt-1">Months to resolution</div>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Weakness: </span>
                      <span className="text-slate-600">Document gaps in possession proof</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 bg-white rounded-lg p-3">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-700">Strategy: </span>
                      <span className="text-slate-600">Focus on strengthening possession evidence</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2">
                  View Detailed Analysis
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Performance This Week */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Performance This Week
              </h2>
              <div className="space-y-4">
                {performanceMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">{metric.label}</span>
                      <span className="text-sm font-bold text-slate-800">{metric.value}/{metric.max} {metric.unit}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div className={`${metric.color} h-full rounded-full transition-all`} style={{ width: `${(metric.value / metric.max) * 100}%` }}></div>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{Math.round((metric.value / metric.max) * 100)}% completed</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Performance This Week */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
  {/* Performance Metrics */}
  <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
      <TrendingUp className="w-5 h-5 text-emerald-600" />
      Performance This Week
    </h2>
    <div className="space-y-4">
      {performanceMetrics.map((metric, idx) => (
        <div key={idx}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-slate-700">{metric.label}</span>
            <span className="text-sm font-bold text-slate-800">{metric.value}/{metric.max} {metric.unit}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div className={`${metric.color} h-full rounded-full transition-all`} style={{ width: `${(metric.value / metric.max) * 100}%` }}></div>
          </div>
          <div className="text-xs text-slate-500 mt-1">{Math.round((metric.value / metric.max) * 100)}% completed</div>
        </div>
      ))}
    </div>
  </div>

  {/* JurisConnect Quick Access Card */}
  <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg border-0 p-6 text-white">
    <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
      <Users className="w-5 h-5" />
      JurisConnect
    </h2>
    <p className="text-purple-100 text-sm mb-4">
      Connect with fellow lawyers, share case insights, and grow your professional network
    </p>
    <div className="space-y-3 mb-4">
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span>Network with 2.4K+ lawyers</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span>Share case victories</span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span>Get legal insights</span>
      </div>
    </div>
    <button 
      onClick={() => navigate('/jurisconnect')}
      className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
    >
      <TrendingUp className="w-4 h-4" />
      Explore Network
    </button>
  </div>
</div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Smart Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-600" />
                Smart Notifications
              </h2>
              <div className="space-y-3">
                {notifications.map((notif, idx) => (
                  <div key={idx} className={`${notif.bg} border-2 border-slate-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer`}>
                    <div className="flex items-start gap-3">
                      <div className={`${notif.color} p-2 rounded-lg bg-white`}>
                        <notif.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800 mb-1">{notif.title}</div>
                        <div className="text-sm text-slate-600 mb-2">{notif.desc}</div>
                        <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">{notif.action} →</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Client Intake Widget */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                New Client Requests
                <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">3 NEW</span>
              </h2>
              <div className="space-y-3">
                {clientRequests.map((req, idx) => (
                  <div key={idx} className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-semibold text-slate-800">{req.name}</div>
                        <div className="text-sm text-slate-600">{req.type}</div>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          req.priority === 'high' ? 'bg-red-100 text-red-700' : 
                          req.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {req.priority.toUpperCase()}
                        </span>
                        <div className="text-xs text-slate-500 mt-1">{req.time}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-sm font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" />
                        Accept
                      </button>
                      <button className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 text-sm font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-1">
                        <X className="w-4 h-4" />
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Insights */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                Revenue Insights
              </h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                  <div className="text-sm text-slate-600 mb-1">Monthly Revenue</div>
                  <div className="text-3xl font-bold text-emerald-600 mb-1">₹2.4L</div>
                  <div className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12% from last month
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Pending Payments</span>
                    <span className="font-semibold text-amber-600">₹85,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Successful Collections</span>
                    <span className="font-semibold text-green-600">₹1.55L</span>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold py-2 rounded-lg transition-all">
                  Send Payment Reminders
                </button>
              </div>
            </div>

            {/* Recent Documents */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Recent Documents
              </h2>
              <div className="space-y-3">
                {recentDocuments.map((doc, idx) => (
                  <div key={idx} className="border-2 border-slate-200 rounded-lg p-3 hover:border-blue-300 transition-all">
                    <div className="font-semibold text-slate-800 text-sm mb-1">{doc.name}</div>
                    <div className="text-xs text-slate-600 mb-2">{doc.case}</div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        doc.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                        doc.status === 'filed' ? 'bg-green-100 text-green-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {doc.status.toUpperCase()}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-700">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="text-teal-600 hover:text-teal-700">
                          <FileDown className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Case Law Updates */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5 text-teal-600" />
                Case Law Updates
              </h2>
              <div className="space-y-3">
                {caseLawUpdates.map((update, idx) => (
                  <div key={idx} className="border-2 border-slate-200 rounded-lg p-3 hover:border-teal-300 transition-all cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-semibold text-slate-800 text-sm flex-1">{update.title}</div>
                      <span className={`text-xs px-2 py-1 rounded-full ml-2 ${
                        update.relevance === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {update.relevance}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{update.date}</span>
                      <button className="text-xs font-semibold text-teal-600 hover:text-teal-700">Read More →</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;