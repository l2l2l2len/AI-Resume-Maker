import React, { useState } from 'react';

interface FAQProps {
  onBack: () => void;
  onStart: () => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is this really free?",
    answer: "Yes, AI Resume Maker is 100% free to use. There are no hidden fees, premium tiers, or watermarks. You can create unlimited resumes and download them as PDFs without any cost."
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is needed. You can start building your resume immediately without signing up, providing an email, or creating a password. Just open the app and start creating."
  },
  {
    question: "Where is my data stored?",
    answer: "All your resume data is stored locally in your browser using localStorage. This means your data never leaves your device and is not uploaded to any servers. Your privacy is protected by design."
  },
  {
    question: "Will my resume be saved if I close the browser?",
    answer: "Yes, your work is automatically saved in your browser. When you return to AI Resume Maker in the same browser, your resume will be exactly as you left it. However, clearing your browser data will delete your saved resume."
  },
  {
    question: "What is an ATS-friendly resume?",
    answer: "ATS stands for Applicant Tracking System - software that companies use to scan and filter resumes. Our ATS-friendly templates are designed with clean formatting, standard fonts, and proper structure that these systems can easily read, increasing your chances of getting past the initial screening."
  },
  {
    question: "Which template should I choose?",
    answer: "It depends on your industry and preference. 'Classic' is great for traditional industries like finance or law. 'Modern' works well for creative and tech roles. 'Compact' is ideal if you have extensive experience. 'ATS Simple' and 'ATS Pro' are best if you're applying to large companies that use applicant tracking systems."
  },
  {
    question: "Can I download my resume as a PDF?",
    answer: "Yes, you can download your resume as a high-quality PDF at any time. The PDF is formatted for A4 paper size and is print-ready. The downloaded PDF has no watermarks or branding."
  },
  {
    question: "Is my resume private and secure?",
    answer: "Absolutely. Since all data is stored only in your browser and never transmitted to any servers, your resume content remains completely private. We don't have access to your data, and no one else can see it."
  },
  {
    question: "Can I edit my resume after downloading?",
    answer: "Yes, your resume data remains in your browser even after downloading. You can continue to edit and re-download as many times as you want. The PDF itself cannot be edited, but you can always make changes in the app and download a new version."
  },
  {
    question: "Does the resume work on mobile devices?",
    answer: "Yes, AI Resume Maker is fully responsive and works on all devices - phones, tablets, laptops, and desktops. You can create and edit your resume on any device with a modern web browser."
  },
  {
    question: "What browsers are supported?",
    answer: "AI Resume Maker works on all modern browsers including Chrome, Firefox, Safari, Edge, and Opera. For the best experience, we recommend using the latest version of your preferred browser."
  },
  {
    question: "Can I use custom sections?",
    answer: "Yes, you can add custom sections to your resume for things like certifications, publications, volunteer work, or any other information you want to include. There's no limit to the number of custom sections you can add."
  },
  {
    question: "How do I start over with a new resume?",
    answer: "Click the 'New' button in the header or navigate to the home page and click 'Get Started'. You'll be asked to confirm before your current resume data is cleared."
  },
  {
    question: "Is there a limit to how much I can write?",
    answer: "The professional summary has a 500 character limit to encourage conciseness. Other fields have no hard limits, but we recommend keeping your resume to 1-2 pages for best results."
  }
];

const FAQAccordionItem: React.FC<{ item: FAQItem; isOpen: boolean; onToggle: () => void }> = ({
  item,
  isOpen,
  onToggle
}) => (
  <div className="border-b border-gray-200">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 px-4 md:px-6 text-left min-h-[56px] hover:bg-gray-50 transition-colors"
      aria-expanded={isOpen}
    >
      <span className="text-base md:text-lg font-medium text-gray-900 pr-4">{item.question}</span>
      <svg
        className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
    >
      <p className="px-4 md:px-6 pb-4 text-base text-gray-600 leading-relaxed">
        {item.answer}
      </p>
    </div>
  </div>
);

export const FAQ: React.FC<FAQProps> = ({ onBack, onStart }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 min-h-[44px] text-base"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about AI Resume Maker
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-12">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="text-center bg-gray-50 rounded-xl p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
            Ready to create your resume?
          </h2>
          <p className="text-gray-600 mb-6">
            Start building your professional resume now - it only takes a few minutes.
          </p>
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-6 py-3 min-h-[48px] bg-blue-600 text-white text-base font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
