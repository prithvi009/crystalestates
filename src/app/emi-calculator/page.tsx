"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calculator, MessageCircle, ArrowRight, IndianRupee } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatINR(amount: number): string {
  if (amount >= 1_00_00_000) {
    return `${(amount / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (amount >= 1_00_000) {
    return `${(amount / 1_00_000).toFixed(2)} L`;
  }
  return amount.toLocaleString("en-IN");
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ------------------------------------------------------------------ */
/*  SEO metadata (exported separately because "use client")            */
/* ------------------------------------------------------------------ */

// metadata is exported from a sibling layout or via generateMetadata in a
// server wrapper — for "use client" pages we set <title> via head.

/* ------------------------------------------------------------------ */
/*  EMI Calculator Page                                                */
/* ------------------------------------------------------------------ */

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5_000_000); // ₹50,00,000
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  /* ---- EMI Calculation ---- */
  const { emi, totalInterest, totalPayment } = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 12 / 100; // monthly rate
    const n = tenure * 12; // total months

    if (r === 0) {
      const monthlyEmi = P / n;
      return {
        emi: monthlyEmi,
        totalInterest: 0,
        totalPayment: P,
      };
    }

    const emiCalc = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emiCalc * n;
    const totalInt = totalPay - P;

    return {
      emi: emiCalc,
      totalInterest: totalInt,
      totalPayment: totalPay,
    };
  }, [loanAmount, interestRate, tenure]);

  /* ---- Donut chart calculations ---- */
  const principalPercent = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 50;
  const interestPercent = 100 - principalPercent;
  const circumference = 2 * Math.PI * 70; // r = 70
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  return (
    <>
      {/* Head metadata for client component */}
      <title>EMI Calculator | Crystal Estates</title>
      <meta
        name="description"
        content="Calculate your home loan EMI instantly. Free EMI calculator for properties in Maharashtra — Crystal Estates."
      />

      <main className="min-h-screen bg-primary-black">
        {/* ---- Hero ---- */}
        <section className="pt-36 pb-16 px-6 text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10"
          >
            <Calculator className="h-8 w-8 text-gold" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="font-heading text-4xl md:text-5xl text-white mb-4"
          >
            EMI Calculator
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="font-body text-lg text-text-muted max-w-xl mx-auto"
          >
            Plan your home purchase with confidence. Calculate your monthly EMI,
            total interest, and total payment instantly.
          </motion.p>
        </section>

        {/* ---- Calculator Section ---- */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10">
            {/* ---- Inputs ---- */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={3}
              className="space-y-8"
            >
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm text-text-muted">
                    Loan Amount
                  </label>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-3.5 w-3.5 text-gold" />
                    <input
                      type="text"
                      value={loanAmount.toLocaleString("en-IN")}
                      onChange={(e) => {
                        const num = parseInt(e.target.value.replace(/,/g, ""), 10);
                        if (!isNaN(num)) setLoanAmount(Math.min(1500000000, Math.max(100000, num)));
                      }}
                      className="w-40 bg-card-dark border border-border-subtle rounded-lg px-3 py-1.5 text-right text-white font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={1500000000}
                  step={500000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border-subtle accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-lg"
                />
                <div className="flex justify-between font-body text-xs text-text-muted mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹150 Crore</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm text-text-muted">
                    Interest Rate (% p.a.)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    step={0.1}
                    min={5}
                    max={15}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) setInterestRate(Math.min(15, Math.max(5, val)));
                    }}
                    className="w-20 bg-card-dark border border-border-subtle rounded-lg px-3 py-1.5 text-right text-white font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <input
                  type="range"
                  min={5}
                  max={15}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border-subtle accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-lg"
                />
                <div className="flex justify-between font-body text-xs text-text-muted mt-1">
                  <span>5%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="font-body text-sm text-text-muted">
                    Loan Tenure (Years)
                  </label>
                  <input
                    type="number"
                    value={tenure}
                    min={1}
                    max={30}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val)) setTenure(Math.min(30, Math.max(1, val)));
                    }}
                    className="w-20 bg-card-dark border border-border-subtle rounded-lg px-3 py-1.5 text-right text-white font-body text-sm focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-border-subtle accent-gold [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-lg"
                />
                <div className="flex justify-between font-body text-xs text-text-muted mt-1">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>
            </motion.div>

            {/* ---- Output ---- */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="space-y-6"
            >
              {/* Donut Chart */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <svg width="180" height="180" viewBox="0 0 180 180">
                    {/* Interest arc (background) */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="none"
                      stroke="#333"
                      strokeWidth="20"
                    />
                    {/* Principal arc */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="none"
                      stroke="#C6A962"
                      strokeWidth="20"
                      strokeDasharray={`${principalStroke} ${circumference}`}
                      strokeDashoffset={0}
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                      className="transition-all duration-500"
                    />
                    {/* Interest arc */}
                    <circle
                      cx="90"
                      cy="90"
                      r="70"
                      fill="none"
                      stroke="#555"
                      strokeWidth="20"
                      strokeDasharray={`${interestStroke} ${circumference}`}
                      strokeDashoffset={-principalStroke}
                      strokeLinecap="round"
                      transform="rotate(-90 90 90)"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-body text-xs text-text-muted">Monthly EMI</span>
                    <span className="font-heading text-lg text-white">
                      {formatCurrency(emi)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex justify-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-gold" />
                  <span className="font-body text-xs text-text-muted">
                    Principal ({principalPercent.toFixed(1)}%)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#555]" />
                  <span className="font-body text-xs text-text-muted">
                    Interest ({interestPercent.toFixed(1)}%)
                  </span>
                </div>
              </div>

              {/* Output Cards */}
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl bg-card-dark border border-border-subtle p-5">
                  <p className="font-body text-sm text-text-muted mb-1">Monthly EMI</p>
                  <p className="font-heading text-2xl text-gold">
                    {formatCurrency(emi)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-card-dark border border-border-subtle p-5">
                    <p className="font-body text-sm text-text-muted mb-1">Total Interest</p>
                    <p className="font-heading text-lg text-white">
                      {formatCurrency(totalInterest)}
                    </p>
                    <p className="font-body text-xs text-text-muted mt-1">
                      ({formatINR(totalInterest)})
                    </p>
                  </div>
                  <div className="rounded-2xl bg-card-dark border border-border-subtle p-5">
                    <p className="font-body text-sm text-text-muted mb-1">Total Payment</p>
                    <p className="font-heading text-lg text-white">
                      {formatCurrency(totalPayment)}
                    </p>
                    <p className="font-body text-xs text-text-muted mt-1">
                      ({formatINR(totalPayment)})
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ---- Loan Assistance CTA ---- */}
        <section className="px-6 pb-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            className="mx-auto max-w-3xl rounded-2xl bg-card-dark border border-border-subtle p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">
              Need Help with Home Loan?
            </h2>
            <p className="font-body text-text-muted mb-8 max-w-xl mx-auto">
              We assist with complete loan processing — from documentation to disbursement.
              Our tie-ups with leading banks ensure you get the best interest rates.
            </p>
            <a
              href="https://wa.me/919511750686?text=Hi%2C%20I%20need%20help%20with%20home%20loan%20processing."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-green-600 hover:bg-green-500 transition-colors px-8 py-4 font-body text-base font-semibold text-white"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>
        </section>

        {/* ---- SEO Content ---- */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <h2 className="font-heading text-2xl text-white mb-6">
                Home Loans in Maharashtra — What You Need to Know
              </h2>
              <div className="space-y-4 font-body text-sm text-text-muted leading-relaxed">
                <p>
                  Maharashtra remains one of India&rsquo;s most active real estate markets,
                  with cities like Mumbai, Pune, Nashik, and Solapur seeing consistent
                  demand. In 2026, home loan interest rates in India range from 8.25% to
                  9.5% depending on the lender, CIBIL score, and loan amount.
                </p>
                <p>
                  Leading banks like SBI, HDFC, ICICI, and Bank of Baroda offer competitive
                  rates for salaried and self-employed buyers. Pradhan Mantri Awas Yojana
                  (PMAY) provides interest subsidy of up to ₹2.67 lakh for first-time
                  homebuyers in the EWS and LIG categories.
                </p>
                <p>
                  Before applying for a home loan, ensure you have the following ready:
                  property agreement, 7/12 extract (for non-agricultural land), NA order,
                  approved building plan, identity and address proof, income documents, and
                  bank statements for the last 6 months.
                </p>
                <p>
                  At Crystal Estates, we provide end-to-end loan assistance — from helping
                  you compare interest rates across banks to completing documentation and
                  coordinating with the lender for quick disbursement. Our service covers
                  properties across Maharashtra including Mumbai, Thane, Navi Mumbai, Pune,
                  Nashik, Aurangabad, and Solapur.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}
