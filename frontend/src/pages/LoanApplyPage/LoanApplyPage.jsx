import { useState, useEffect } from "react";
import "./LoanApplyPage.css";
import "../../styles/global.css";
import Sidebar from "../../components/sidebar/sidebar";
import api from "../../services/api";





const SearchIcon = () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#94a3b8" strokeWidth="1.3"/><path d="M9.5 9.5l2.5 2.5" stroke="#94a3b8" strokeWidth="1.3" strokeLinecap="round"/></svg>;
const BankIcon = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 7h14M3 7V15M15 7V15M1 15h16M9 2L1 7h16L9 2z" stroke="#0f172a" strokeWidth="1.3" strokeLinejoin="round"/><rect x="6" y="10" width="2.5" height="5" stroke="#0f172a" strokeWidth="1.2"/><rect x="9.5" y="10" width="2.5" height="5" stroke="#0f172a" strokeWidth="1.2"/></svg>;
const BackArrow = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M8 2.5L3.5 6.5 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const FwdArrow = () => <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M5 2.5l4.5 4L5 10.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ShieldIcon = () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L2 2.5V5.5c0 2.5 1.8 4.2 4 5 2.2-.8 4-2.5 4-5V2.5L6 1z" stroke="#94a3b8" strokeWidth="1.1" strokeLinejoin="round"/></svg>;
const StarIcon = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1l1 2.8H9l-2.2 1.6.8 2.7L5.5 6.6 3.4 8.1l.8-2.7L2 3.8h2.5L5.5 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="currentColor"/></svg>;
const ChatIcon = () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 1h9v7H6.5L4.5 10V8H1V1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg>;

const steps = [
  { label: 'Personal Information ', sub: 'CURRENT STEP', active: true },
  { label: 'Employment Details', active: false },
  { label: 'Financial Information', active: false },
  { label: 'Document Verification', active: false },
  { label: 'Review & Submit', active: false },
];


// Gauge arc helper
const r = 48, cx = 60, cy = 60;
const gaugeArc = (pct) => {
  const angle = Math.PI * pct;
  const x = cx - r * Math.cos(angle);
  const y = cy - r * Math.sin(angle);
  return `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${x} ${y}`;
};

export default function LoanApplyPage() {

  const score = 42;
  const pct = score / 100;
  const [currentStep, setCurrentStep] = useState(1);
  

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
  });
  
const [loanData, setLoanData] = useState({
  account_id: "",
  loan_type: "",
  amount: "",
  interest_rate: 8.5,
  tenure_months: "",
  emi_amount: "",
});
const [documents, setDocuments] = useState({
  pan: null,
  aadhaar: null,
});
const handleFileChange = (e) => {
  const { name, files } = e.target;

  setDocuments({
    ...documents,
    [name]: files[0],
  });
};
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoanChange = (e) => {
  setLoanData({
    ...loanData,
    [e.target.name]: e.target.value,
  });
};
const calculateEMI = () => {

  if (!loanData.amount || !loanData.tenure_months)
    return 0;

  const P = Number(loanData.amount);

  const R = (loanData.interest_rate / 12) / 100;

  const N = Number(loanData.tenure_months);

  const emi =
    (P * R * Math.pow(1 + R, N)) /
    (Math.pow(1 + R, N) - 1);

  return Math.round(emi);

};
const submitLoan = async () => {
  try {
    const form = new FormData();

    form.append("account_id", 1);
    form.append("loan_type", loanData.loan_type);
    form.append("amount", Number(loanData.amount));
    form.append("interest_rate", loanData.interest_rate);
    form.append("tenure_months", Number(loanData.tenure_months));
    form.append("emi_amount", calculateEMI());

    form.append("pan", documents.pan);
    form.append("aadhaar", documents.aadhaar);

    const res = await api.post("/loans", form, {
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

alert("🎉 Loan Application Submitted Successfully!");

setCurrentStep(1);

setLoanData({
  account_id: "",
  loan_type: "",
  amount: "",
  interest_rate: 8.5,
  tenure_months: "",
  emi_amount: "",
});

setDocuments({
  pan: null,
  aadhaar: null,
});

  } catch (error) {
    console.error(error);

    alert(
      error.response?.data?.message ||
      "Loan application failed."
    );
  }
};
  useEffect(() => {
  fetchProfile();
}, []);
const fetchProfile = async () => {
  try {
    const res = await api.get("/profile");

    console.log("Profile API Response:", res.data);

    const profile = res.data.profile;

    setFormData({
      firstName: profile.first_name || "",
      lastName: profile.last_name || "",
      email: profile.email || "",
      dob: profile.date_of_birth
        ? profile.date_of_birth.split("T")[0]
        : "",
      phone: profile.phone || "",
      address: profile.address || "",
    });

  } catch (error) {
    console.error("Profile fetch error:", error);
  }
};
const canContinue = () => {

  switch (currentStep) {

    case 1:
      return (
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone
      );

    case 2:
      return true;

    case 3:
      return (
        loanData.loan_type &&
        loanData.amount &&
        loanData.tenure_months
      );

    case 4:
      return true;

    default:
      return true;
  }

};
const nextStep = async () => {
  console.log("Current Step:", currentStep);
  console.log("canContinue:", canContinue());

  if (currentStep < 5) {
    console.log("Moving to next step...");
    setCurrentStep(currentStep + 1);
    return;
  }

  console.log("Submitting loan...");
  await submitLoan();
};

const prevStep = () => {
  if (currentStep > 1) {
    setCurrentStep(currentStep - 1);
  }
};
const renderStep = () => {

  switch (currentStep) {

    case 1:
  return (
    <div style={{ padding: "20px" }}>

      <div className="la-fg">
        <label>First Name</label>
        <input
          className="la-inp"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="la-fg">
        <label>Last Name</label>
        <input
          className="la-inp"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="la-fg">
        <label>Email</label>
        <input
          className="la-inp"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="la-fg">
        <label>Date of Birth</label>
        <input
          className="la-inp"
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      </div>

      <div className="la-fg">
        <label>Phone</label>
        <input
          className="la-inp"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="la-fg">
        <label>Address</label>
        <textarea
          className="la-inp"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

    </div>
  );
    case 2:
      return (
        <div style={{ padding: "20px" }}>
          <h3>Employment Details</h3>

          <div className="la-fg">
            <label>Employment Type</label>
            <select className="la-inp">
              <option>Salaried</option>
              <option>Self Employed</option>
              <option>Student</option>
              <option>Business</option>
            </select>
          </div>

          <div className="la-fg">
            <label>Company Name</label>
            <input
              className="la-inp"
              type="text"
            />
          </div>

          <div className="la-fg">
            <label>Monthly Income</label>
            <input
              className="la-inp"
              type="number"
            />
          </div>
        </div>
      );

    case 3:
      return (
        <div style={{ padding: "20px" }}>
          <h3>Financial Information</h3>

          <div className="la-fg">
            <label>Loan Type</label>

            <select
  className="la-inp"
  name="loan_type"
  value={loanData.loan_type}
  onChange={handleLoanChange}
>
  <option value="">Select Loan Type</option>
  <option value="Personal">Personal Loan</option>
  <option value="Education">Education Loan</option>
  <option value="Home">Home Loan</option>
  <option value="Car">Car Loan</option>
</select>
          </div>
          <div className="la-fg">
            <label>Loan Amount</label>

            <input
              className="la-inp"
              type="number"
              name="amount"
              value={loanData.amount}
              onChange={handleLoanChange}
            />
          </div>

          <div className="la-fg">
            <label>Tenure (Months)</label>

            <input
              className="la-inp"
              type="number"
              name="tenure_months"
              value={loanData.tenure_months}
              onChange={handleLoanChange}
            />
          </div>
        </div>
      );

    case 4:
      return (
        <div style={{ padding: "20px" }}>
          <h3>Document Verification</h3>

          <div className="la-fg">
            <label>Upload PAN Card</label>
            <input
  type="file"
  className="la-inp"
  name="pan"
  onChange={handleFileChange}
/>
          </div>

          <div className="la-fg">
            <label>Upload Aadhaar Card</label>
            <input
  type="file"
  className="la-inp"
  name="aadhaar"
  onChange={handleFileChange}
/>
          </div>
        </div>
      );

    case 5:
  return (
    <div style={{ padding: "20px" }}>

      <h3>Review & Submit</h3>

      <div className="la-fg">
        <label>Name</label>
        <input
          className="la-inp"
          value={`${formData.firstName} ${formData.lastName}`}
          readOnly
        />
      </div>

      <div className="la-fg">
        <label>Loan Type</label>
        <input
          className="la-inp"
          value={loanData.loan_type}
          readOnly
        />
      </div>

      <div className="la-fg">
        <label>Loan Amount</label>
        <input
          className="la-inp"
          value={loanData.amount}
          readOnly
        />
      </div>

      <div className="la-fg">
        <label>Tenure</label>
        <input
          className="la-inp"
          value={loanData.tenure_months}
          readOnly
        />
      </div>

      <div className="la-fg">
        <label>Estimated EMI</label>
        <input
          className="la-inp"
          value={calculateEMI()}
          readOnly
        />
      </div>

    </div>
  );

    default:
      return null;
  }

};

  return (
    <div className="la-layout">
      <Sidebar active="loans" />

      <div className="la-main">
        {/* Topbar */}
        <div className="la-topbar">
          <div className="la-srch">
            <SearchIcon />
            <input type="text" placeholder="Search transactions or ask AI..." />
          </div>
          <div className="la-tb-r">
            <button className="la-bell">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a4.5 4.5 0 014.5 4.5v2.5l1.5 2H2L3.5 8.5V6A4.5 4.5 0 018 1.5z" stroke="#64748b" strokeWidth="1.2" strokeLinejoin="round"/><path d="M6.5 12.5a1.5 1.5 0 003 0" stroke="#64748b" strokeWidth="1.2" strokeLinecap="round"/></svg>
              <span className="la-bdot"></span>
            </button>
            <div className="la-ui">
              <span className="la-un">Alex Johnson</span>
              <span className="la-ur">Premium Member</span>
            </div>
            <div className="la-av">A<span className="la-avdot"></span></div>
          </div>
        </div>

        <div className="la-content">
          {/* Title Row */}
          <div className="la-title-row">
            <h1><BankIcon /> Loan Application</h1>
            <p>Apply for a smart, AI-powered loan in minutes.Our AI system evaluates your eligibility and provides instant recommendations..</p>
          </div>

          {/* Left: Progress */}
          <div className="la-progress-col">
            <div className="la-prog-label">PROGRESS</div>
            <div className="la-steps">
              {steps.map((s, i) => (
                <div key={i} className="la-step">
                  <div className={`la-dot${currentStep === i + 1 ? " active" : ""}`}>
                    {s.active
                      ? <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="4.5" r="2" stroke="#fff" strokeWidth="1.1"/><path d="M2 11c0-2.3 2-4.2 4.5-4.2S11 8.7 11 11" stroke="#fff" strokeWidth="1.1" strokeLinecap="round"/></svg>
                      : i + 1}
                  </div>
                  <div className="la-step-txt">
                    <div className={`la-step-name${currentStep === i + 1 ? "" : " dim"}`}>{s.label}</div>
                    {currentStep === i + 1 && <div className="la-step-cur">CURRENT STEP</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Form */}
          <div className="la-form-card">
            <div className="la-fhdr">
              <div>
                <h2>
  {
    [
      "Personal Information",
      "Employment Details",
      "Financial Information",
      "Document Verification",
      "Review & Submit",
    ][currentStep - 1]
  }
</h2>

<p>
  {
    [
      "Basic details required for identity verification.",
      "Tell us about your employment.",
      "Provide your loan requirements.",
      "Upload required documents.",
      "Review everything before submitting.",
    ][currentStep - 1]
  }
</p>
              </div>
              <span className="la-step-ctr">
  Step {currentStep} of 5
</span>
            </div>

            <div className="la-fbody">
  {renderStep()}
</div>

            <button
              className="btn-back"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <BackArrow />
              Back
            </button>

            <button
  className="btn-cont-loan"
  onClick={() => {
    console.log("Button clicked");
    nextStep();
  }}
  disabled={false}
>
  {currentStep === 5 ? "Submit" : "Continue"}
</button>

            <div className="la-sec-note">
              <ShieldIcon /> BANK-GRADE 256-BIT ENCRYPTION SECURED
            </div>
          </div>

          {/* Right Panel */}
          <div className="la-rp">

            {/* AI Eligibility Score */}
            <div className="la-ec">
              <div className="la-elbl"><StarIcon /> AI ELIGIBILITY SCORE</div>
              <div className="la-gauge">
                <div className="la-gauge-inner">
                  <svg width="120" height="70" viewBox="0 0 120 70">
                    {/* background arc */}
                    <path d={`M 12 60 A 48 48 0 0 1 108 60`} fill="none" stroke="#f1f5f9" strokeWidth="9" strokeLinecap="round"/>
                    {/* score arc - 42% */}
                    <path d={`M 12 60 A 48 48 0 0 1 ${60 - 48 * Math.cos(Math.PI * 0.42)} ${60 - 48 * Math.sin(Math.PI * 0.42)}`}
                      fill="none" stroke="#29b6f6" strokeWidth="9" strokeLinecap="round"/>
                    {/* needle dot */}
                    <circle
                      cx={60 - 48 * Math.cos(Math.PI * 0.42)}
                      cy={60 - 48 * Math.sin(Math.PI * 0.42)}
                      r="5" fill="#0f172a"/>
                  </svg>
                  <div className="la-gauge-num">{score}</div>
                  <div className="la-gauge-sub">AVERAGE</div>
                </div>
              </div>
              <p className="la-enote">
                Our AI analyzes your data in real-time. Complete all steps to get your final guaranteed rate.
              </p>
            </div>

            {/* AI Insights */}
            <div className="la-ic">
              <div className="la-ilbl"><ChatIcon /> AI INSIGHTS</div>
              <div className="la-irow">
                <div className="la-iname">Estimated Interest Rate:</div>
                <div className="la-ivalue blue">8.5%</div>
                <div className="la-isub">Estimated Monthly EMI:₹{calculateEMI()}/month</div>
              </div>
              <div className="la-irow">
                <div className="la-iname">Loan Approval Chance:</div>
                <div className="la-ivalue">92%</div>
                <div className="la-isub">For a 48-month tenure.</div>
              </div>
            </div>

            {/* Help Card */}
            <div className="la-hc">
              <div className="la-hico">❓</div>
              <div className="la-htitle">Need help applying?</div>
              <p className="la-htxt">Our AI assistant is available 24/7 to answer your questions.</p>
              <button className="btn-ask">Ask AI Assistant</button>
            </div>

          </div>
        </div>

        <div className="la-footer" style={{marginLeft:0}}>
          <span>© 2024 NovaBank AI. Secure Banking for Gen Z.</span>
          <div className="la-ftl">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact Support</a>
          </div>
        </div>
      </div>
    </div>
  );
}