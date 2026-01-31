'use client'

import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Lock,
  ArrowDown,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

// Dot Logo SVG
const WECLogo = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="#1a2e26">
    <circle cx="50" cy="20" r="3" />
    <circle cx="65" cy="25" r="3" />
    <circle cx="75" cy="35" r="3" />
    <circle cx="80" cy="50" r="3" />
    <circle cx="75" cy="65" r="3" />
    <circle cx="65" cy="75" r="3" />
    <circle cx="50" cy="80" r="3" />
    <circle cx="35" cy="75" r="3" />
    <circle cx="25" cy="65" r="3" />
    <circle cx="20" cy="50" r="3" />
    <circle cx="25" cy="35" r="3" />
    <circle cx="35" cy="25" r="3" />
    {/* Inner ring */}
    <circle cx="50" cy="30" r="2.5" />
    <circle cx="62" cy="35" r="2.5" />
    <circle cx="70" cy="50" r="2.5" />
    <circle cx="62" cy="65" r="2.5" />
    <circle cx="50" cy="70" r="2.5" />
    <circle cx="38" cy="65" r="2.5" />
    <circle cx="30" cy="50" r="2.5" />
    <circle cx="38" cy="35" r="2.5" />
    {/* Core dots */}
    <circle cx="50" cy="40" r="2" />
    <circle cx="58" cy="50" r="2" />
    <circle cx="50" cy="60" r="2" />
    <circle cx="42" cy="50" r="2" />
  </svg>
);

interface FormData {
  email: string;
  diagnosis: string;
  primaryWearable: string;
  otherWearable: string;
  trackingDuration: string;
  openToContact: string;
  interestReason: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    diagnosis: '',
    primaryWearable: '',
    otherWearable: '',
    trackingDuration: '',
    openToContact: '',
    interestReason: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          email: '',
          diagnosis: '',
          primaryWearable: '',
          otherWearable: '',
          trackingDuration: '',
          openToContact: '',
          interestReason: ''
        });
      }, 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1a2e26] font-sans-clean selection:bg-emerald-100 selection:text-emerald-900 text-[17px] antialiased">
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FDFCFB]/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          >
            <WECLogo className="w-10 h-10 group-hover:scale-105 transition-transform" />
            <div className="logo-text text-sm md:text-base uppercase flex flex-col">
              <span>Women&apos;s</span>
              <span>Evidence</span>
              <span>Collective</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => scrollTo('shift')}
              className="hidden md:block text-sm font-semibold text-slate-500 hover:text-[#1a2e26] transition-colors"
            >
              The Shift
            </button>
            <button 
              onClick={() => scrollTo('waitlist')}
              className="text-sm font-bold bg-[#1a2e26] text-white px-6 py-2.5 rounded-full hover:bg-emerald-900 transition-all shadow-sm"
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20 pb-16 md:pt-32 md:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
          <div className="absolute top-10 right-0 w-72 h-72 bg-emerald-100 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-10 left-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 text-sm font-bold mb-8 animate-fade-in">
            <Users className="w-4 h-4" />
            A PATIENT-LED SCIENTIFIC INITIATIVE
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05] text-[#1a2e26]">
            Endometriosis has never <br className="hidden md:block" /> had a baseline. 
            <span className="text-emerald-700 block mt-2 font-serif-elegant italic font-normal"> We&apos;re building it.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            The Women&apos;s Evidence Collective is turning lived experience into the biological evidence doctors can no longer ignore.
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={() => scrollTo('waitlist')}
              className="group bg-[#1a2e26] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/10 flex items-center gap-2"
            >
              Join the Waitlist
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <p className="text-slate-400 text-sm font-medium tracking-wide uppercase">Joining the waitlist simply notifies you when participation opens.</p>
          </div>
        </div>
      </header>

      {/* The Case: Reality, Cost, Goal */}
      <section className="py-20 bg-white border-b border-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-4 border-l-4 border-slate-100 pl-6">
              <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs font-sans-clean">The Reality</h4>
              <p className="text-xl font-medium text-slate-800">Medicine lacks a universal standard for what endometriosis looks like in the body.</p>
            </div>
            <div className="space-y-4 border-l-4 border-slate-100 pl-6">
              <h4 className="font-bold text-slate-400 uppercase tracking-widest text-xs font-sans-clean">The Cost</h4>
              <p className="text-xl font-medium text-slate-800">Patients spend decades trying to prove their pain to a system that isn&apos;t looking for patterns.</p>
            </div>
            <div className="space-y-4 border-l-4 border-emerald-600 pl-6">
              <h4 className="font-bold text-emerald-700 uppercase tracking-widest text-xs font-sans-clean">The Goal</h4>
              <p className="text-xl font-medium text-[#1a2e26] font-serif-elegant italic">A shared biological reference built from the collective truth of thousands.</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Spark: Origin Story */}
      <section id="spark" className="py-24 bg-white font-sans-clean">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] text-emerald-700 uppercase mb-12">THE SPARK</h2>
          <div className="space-y-8">
            <h3 className="text-3xl md:text-5xl font-serif-elegant leading-tight text-[#1a2e26]">
              Started by a patient. <br className="md:hidden"/> Built for everyone.
            </h3>
            <div className="bg-emerald-50/50 p-10 md:p-14 rounded-[3rem] border border-emerald-100 relative overflow-hidden text-left">
              <div className="relative z-10 space-y-6">
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  The Women&apos;s Evidence Collective was started by a patient who spent years tracking symptoms no one asked to see. It exists because the research we needed didn&apos;t.
                </p>
                <div className="h-px w-16 bg-emerald-200"></div>
                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light">
                  This work grew from <span className="font-bold text-[#1a2e26]">214 women</span> who were tired of waiting for medicine to catch up.
                </p>
              </div>
              <Sparkles className="absolute -bottom-10 -right-10 w-48 h-48 text-emerald-100/50 -rotate-12" />
            </div>
          </div>
        </div>
      </section>

      {/* The Context - Stats Section */}
      <section id="stats" className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-emerald-700 uppercase mb-4 font-sans-clean">The Context</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight font-serif-elegant">
                An 8 to 10 year wait for a name.
              </h3>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  Endometriosis affects <span className="font-bold text-slate-900">190 million people</span> worldwide. Yet, without a shared medical standard, people are forced to explain their pain for years without answers.
                </p>
                <p className="italic font-medium text-[#1a2e26]">
                  That is too long. And it is about to change.
                </p>
              </div>
            </div>
            <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden text-center">
              <div className="text-7xl font-black text-emerald-600 mb-2 font-serif-elegant">10</div>
              <div className="text-xl font-bold text-slate-900 mb-4 uppercase tracking-widest font-sans-clean">Years of Uncertainty</div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-6">
                <div className="h-full bg-emerald-600 w-3/4"></div>
              </div>
              <p className="text-slate-500 text-sm font-medium uppercase tracking-tighter">AVERAGE TIME TO DIAGNOSIS</p>
            </div>
          </div>
        </div>
      </section>

      {/* Breakthrough Section - Wearable Data Integration */}
      <section className="py-24 bg-[#1a2e26] text-white relative">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase mb-4 font-sans-clean">The Breakthrough</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-12 font-serif-elegant">Measuring what was unmeasured.</h3>
          <div className="space-y-8 text-xl md:text-2xl text-emerald-100/80 leading-relaxed font-light font-sans-clean">
            <p>
              Endometriosis has never been studied in a way that reflects real life, across many bodies, over time.
            </p>
            <p>
              By safely pooling anonymous data, <span className="text-white font-medium italic underline decoration-emerald-500 underline-offset-8">we use the patterns in your daily wearable data</span> to define the biological indicators of the disease.
            </p>
            <p className="text-lg md:text-xl text-emerald-300 font-medium">
              This reveals shared patterns no single person could reveal alone.
            </p>
          </div>
        </div>
      </section>

      {/* Research Partnerships Section */}
      <section id="partnerships" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="order-2 md:order-1">
              <div className="bg-emerald-50 p-1 rounded-2xl inline-block mb-6">
                <div className="bg-white p-6 rounded-xl border border-emerald-100 shadow-sm">
                  <GraduationCap className="w-10 h-10 text-emerald-700" />
                </div>
              </div>
              <h3 className="text-3xl md:text-4xl font-serif-elegant mb-6 text-[#1a2e26]">Bridging the gap between lived experience and leading science.</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6 font-sans-clean">
                The Collective does not work in a vacuum. We are actively pursuing research partnerships with leading academic institutions and endometriosis researchers worldwide.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed font-sans-clean">
                By collaborating with specialists, we ensure that these wearable patterns are translated into evidence that shifts medical practice.
              </p>
              <p className="text-lg text-[#1a2e26] leading-relaxed font-sans-clean mt-8 font-medium italic">
                When a formal research partnership is established, we will share next steps by email from the Women&apos;s Evidence Collective research team.
              </p>
              
              {/* Highlighted Disclaimer Callout */}
              <div className="mt-8 p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-900 font-sans-clean leading-relaxed">
                  <span className="font-bold">Waitlist Policy:</span> Joining the waitlist does not enroll you in a study or share any data.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center sticky top-32">
              <div className="relative w-full max-w-sm aspect-square">
                <div className="absolute inset-0 bg-emerald-50 rounded-full scale-110 blur-2xl opacity-50"></div>
                <div className="relative h-full w-full border border-[#e9e4e2] rounded-full flex items-center justify-center p-12">
                  <div className="text-center">
                    <div className="font-bold text-emerald-800 uppercase tracking-widest text-xs mb-2 font-sans-clean">Research Network</div>
                    <div className="font-serif-elegant italic text-2xl text-[#1a2e26]">Universities & Experts</div>
                    <div className="h-px w-12 bg-emerald-200 mx-auto mt-6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift Section */}
      <section id="shift" className="py-32 bg-[#FDFCFB]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-xs font-bold tracking-[0.2em] text-[#b59e9e] uppercase mb-4 font-sans-clean">THE SHIFT</h2>
            <h3 className="text-4xl md:text-5xl font-normal font-serif-elegant text-[#1a2e26] leading-tight mb-16">
              What changes when endometriosis has a baseline
            </h3>
          </div>
          
          <div className="space-y-0">
            {[
              "Lived experience becomes evidence that carries weight",
              "Pain no longer has to be proven one person at a time",
              "Patterns can support earlier diagnosis and better care",
              "The disease moves from doubt into definition"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-8 py-10 border-b border-[#e9e4e2] first:border-t last:border-b group">
                <div className="w-2.5 h-2.5 rounded-full bg-[#c26d6d] flex-shrink-0"></div>
                <p className="text-xl md:text-2xl text-slate-700 font-normal leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
            <p className="text-2xl md:text-4xl font-serif-elegant italic text-[#1a2e26] leading-relaxed">
              This is how uncertainty becomes clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophical Bridge: Partner, Not Subject */}
      <section className="py-24 bg-white overflow-hidden border-t border-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-4xl md:text-6xl font-serif-elegant italic mb-8 text-[#1a2e26]">A partner, not a subject.</h3>
          <div className="w-16 h-px bg-emerald-200 mx-auto mb-10"></div>
          <div className="space-y-8">
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light max-w-3xl mx-auto font-sans-clean">
              For years, endometriosis has been experienced one person at a time. Each person explaining their pain. Each case treated as an exception.
            </p>
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-bold max-w-3xl mx-auto font-sans-clean">
              We are trying something different.
            </p>
            <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light max-w-3xl mx-auto font-sans-clean">
              When many people with the same disease are studied together, patterns begin to appear. What felt confusing or invisible on its own starts to make sense in numbers. The disease itself becomes clearer.
            </p>
            <p className="text-xl md:text-2xl text-[#1a2e26] leading-relaxed font-medium max-w-3xl mx-auto font-sans-clean italic underline decoration-emerald-200 underline-offset-8">
              Participants help build a shared biological record of endometriosis and see what the collective data reveals.
            </p>
            <p className="text-2xl md:text-3xl font-serif-elegant italic text-[#1a2e26] pt-4">
              This is how what you&apos;ve lived starts to be understood.
            </p>
          </div>
        </div>
      </section>

      {/* Waitlist Detailed Form Section */}
      <section id="waitlist" className="py-24 bg-white relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold font-serif-elegant mb-4">Join the Waitlist</h2>
              <p className="text-lg text-slate-600 font-sans-clean">
                We&apos;re building a research-ready community so we can responsibly open participation later.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12 text-sm text-slate-500 font-sans-clean">
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p>This is not enrollment. No data is shared today.</p>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p>We only ask what&apos;s needed to understand the cohort.</p>
              </div>
              <div className="flex gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <p>Notify me when participation opens.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Email */}
              <div className="space-y-4">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#1a2e26] outline-none transition-all text-lg"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <p className="text-xs text-slate-400">So we can notify you if participation opens.</p>
              </div>

              {/* Inclusively Updated Diagnosis Dropdown */}
              <div className="space-y-4">
                <label className="form-label">Which best describes your endometriosis status?</label>
                <p className="text-sm text-slate-400 -mt-2 mb-4">This helps us understand who this work is for.</p>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#1a2e26] outline-none transition-all"
                  value={formData.diagnosis}
                  onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                  required
                >
                  <option value="">Select your status</option>
                  <option value="surgically_confirmed">Surgically confirmed (Laparoscopy)</option>
                  <option value="clinically_imaging">Clinically diagnosed via imaging (MRI, Ultrasound)</option>
                  <option value="clinically_specialist">Clinically diagnosed by a specialist (based on symptoms)</option>
                  <option value="suspected_professional">Suspected by a medical professional, awaiting confirmation</option>
                  <option value="highly_suspected_symptoms">Highly suspected based on long-term symptoms</option>
                  <option value="previous_diagnosis_no_symptoms">Previously diagnosed, no longer experiencing symptoms (remission, post-menopause, etc.)</option>
                  <option value="supporter_only">I don&apos;t have endometriosis but want to support this work (ally, partner, researcher, clinician)</option>
                  <option value="other">Other status</option>
                </select>
                <p className="text-xs text-slate-400 italic px-2">You can still join the waitlist either way.</p>
              </div>

              {/* Wearable Usage - WITH OTHER OPTION */}
              <div className="space-y-6">
                <div>
                  <label className="form-label">Which primary wearable do you use?</label>
                  <p className="text-sm text-slate-400 -mt-2 mb-4">This project focuses on learning from patterns in wearable health data.</p>
                </div>
                <select 
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#1a2e26] outline-none transition-all"
                  value={formData.primaryWearable}
                  onChange={(e) => setFormData({...formData, primaryWearable: e.target.value})}
                  required
                >
                  <option value="">Select your wearable</option>
                  <option value="apple">Apple Watch</option>
                  <option value="fitbit">Fitbit</option>
                  <option value="garmin">Garmin</option>
                  <option value="oura">Oura Ring</option>
                  <option value="whoop">Whoop</option>
                  <option value="samsung">Samsung Galaxy Watch</option>
                  <option value="other">Other Brand</option>
                  <option value="none">I don&apos;t regularly use a wearable</option>
                </select>

                {/* Conditional Other Brand Field */}
                {formData.primaryWearable === 'other' && (
                  <div className="animate-fade-in space-y-4 pt-2">
                    <label className="form-label">Please specify your wearable brand</label>
                    <input
                      type="text"
                      placeholder="Brand name"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#1a2e26] outline-none transition-all"
                      value={formData.otherWearable}
                      onChange={(e) => setFormData({...formData, otherWearable: e.target.value})}
                      required
                    />
                  </div>
                )}
              </div>

              {/* Tracking Duration */}
              <div className="space-y-4">
                <label className="form-label">How long have you tracked your health data?</label>
                <p className="text-sm text-slate-400 -mt-2 mb-4">This helps us understand whether long-term patterns might be possible.</p>
                <div className="grid gap-3">
                  {[
                    { id: 'dur-short', label: 'Less than 3 months', val: '<3m' },
                    { id: 'dur-mid', label: '3–12 months', val: '3-12m' },
                    { id: 'dur-long', label: '1 year or more', val: '1y+' }
                  ].map((opt) => (
                    <div key={opt.id}>
                      <input 
                        type="radio" 
                        name="duration" 
                        id={opt.id} 
                        className="hidden" 
                        value={opt.val}
                        checked={formData.trackingDuration === opt.val}
                        onChange={(e) => setFormData({...formData, trackingDuration: e.target.value})}
                      />
                      <label 
                        htmlFor={opt.id} 
                        className="block w-full border border-slate-200 bg-white rounded-xl px-6 py-4 cursor-pointer hover:border-[#1a2e26] transition-all font-medium"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Consent */}
              <div className="space-y-6">
                <label className="form-label">Are you open to being contacted if a research study opens?</label>
                <p className="text-sm text-slate-400 -mt-2 mb-4">There is no obligation. This just helps us plan responsibly.</p>
                <div className="grid gap-3">
                  {[
                    { id: 'contact-yes', label: 'Yes', val: 'yes' },
                    { id: 'contact-maybe', label: 'Maybe, depending on study details', val: 'maybe' },
                    { id: 'contact-no', label: 'No', val: 'no' }
                  ].map((opt) => (
                    <div key={opt.id}>
                      <input 
                        type="radio" 
                        name="contact" 
                        id={opt.id} 
                        className="hidden" 
                        value={opt.val}
                        checked={formData.openToContact === opt.val}
                        onChange={(e) => setFormData({...formData, openToContact: e.target.value})}
                      />
                      <label 
                        htmlFor={opt.id} 
                        className="block w-full border border-slate-200 bg-white rounded-xl px-6 py-4 cursor-pointer hover:border-[#1a2e26] transition-all font-medium"
                      >
                        {opt.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interest Reason */}
              <div className="space-y-4">
                <label className="form-label">Optional: What made you interested in this project?</label>
                <textarea 
                  rows={3}
                  placeholder="One sentence is enough."
                  className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#1a2e26] outline-none transition-all resize-none font-sans-clean"
                  value={formData.interestReason}
                  onChange={(e) => setFormData({...formData, interestReason: e.target.value})}
                ></textarea>
              </div>

              {/* Before You Submit Checklist */}
              <div className="p-8 bg-white border border-slate-100 rounded-3xl space-y-4 font-sans-clean">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Before You Submit</h4>
                <div className="grid gap-3 text-sm font-medium text-slate-600">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Joining the waitlist does not enroll you in a study</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>No wearable data is accessed or collected</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Privacy comes first, by design</span>
                  </div>
                </div>
                <p className="pt-4 text-xs italic text-slate-400 border-t border-slate-50 mt-4">
                  We cannot sell, subpoena, or expose what we never possess.
                </p>
              </div>

              {/* Submit */}
              <div className="text-center space-y-4">
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-[#1a2e26] text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-900/10 flex items-center justify-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Notify me when participation opens'}
                  {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                </button>
                <p className="text-xs text-slate-400">You can unsubscribe at any time.</p>
                {error && (
                  <div className="animate-fade-in p-4 bg-red-50 text-red-700 rounded-xl border border-red-100 font-medium">
                    {error}
                  </div>
                )}
                {submitted && (
                  <div className="animate-fade-in p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-bold">
                    Thank you. You&apos;ve been added to the waitlist.
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Privacy Section Footer Callout */}
      <section className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#1a2e26] text-white px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-8">
            <Lock className="w-3.5 h-3.5" />
            Privacy First
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 font-serif-elegant">Trust is earned, not assumed.</h2>
          
          <div className="bg-emerald-50 p-8 md:p-12 rounded-[2rem] border border-emerald-100 text-left font-sans-clean">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-xl mb-3 text-[#1a2e26]">Identity is never collected.</h4>
                <p className="text-slate-600">We study only anonymous, aggregated patterns. We cannot sell, subpoena, or expose what we never possess.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-3 text-[#1a2e26]">Protection by design.</h4>
                <p className="text-slate-600">Participation is voluntary. Leaving is always allowed. We built the Collective to protect you, not exploit you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <WECLogo className="w-8 h-8 opacity-40 text-[#1a2e26]" />
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-slate-400 font-sans-clean">Women&apos;s Evidence Collective — 2026</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 flex gap-8 font-sans-clean">
            <a href="#" className="hover:text-emerald-800 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-800 transition-colors">Method</a>
            <a href="#" className="hover:text-emerald-800 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
