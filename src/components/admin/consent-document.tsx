"use client";

import * as React from "react";
import QRCode from "qrcode";
import type { ConsentTemplate, Doctor, Patient } from "@/lib/data/types";
import { clinic } from "@/lib/data/clinic";
import { formatDate } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* A4-styled printable consent document                                */
/* ------------------------------------------------------------------ */

interface ConsentDocumentProps {
  template: ConsentTemplate;
  patient: Patient;
  doctor: Doctor;
  language: "English" | "Hindi";
  consentId: string;
  /** ISO date for the document date line */
  date: string;
  generatedBy: string;
}

const hindiHeadings: Record<string, string> = {
  "Treatment Description": "उपचार विवरण",
  Benefits: "लाभ",
  Risks: "जोखिम",
  "Possible Complications": "संभावित जटिलताएँ",
  "Alternative Treatments": "वैकल्पिक उपचार",
  "After-care Instructions": "उपचार के बाद देखभाल निर्देश",
  Declaration: "घोषणा",
  Signatures: "हस्ताक्षर",
};

function SectionHeading({ label, language }: { label: string; language: "English" | "Hindi" }) {
  return (
    <h3 className="mb-1.5 mt-5 border-b border-neutral-300 pb-1 text-[11px] font-bold uppercase tracking-[0.08em] text-neutral-800">
      {label}
      {language === "Hindi" && hindiHeadings[label] ? (
        <span className="ml-2 font-semibold normal-case tracking-normal text-neutral-600">/ {hindiHeadings[label]}</span>
      ) : null}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 pl-4 text-[10.5px] leading-[1.55] text-neutral-800">
      {items.map((item, i) => (
        <li key={i} className="list-disc marker:text-neutral-400">
          {item}
        </li>
      ))}
    </ul>
  );
}

function SignatureBlock({ title, hindi, language }: { title: string; hindi: string; language: "English" | "Hindi" }) {
  return (
    <div className="rounded-md border border-neutral-300 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-neutral-700">
        {title}
        {language === "Hindi" && <span className="ml-1.5 font-semibold normal-case tracking-normal text-neutral-500">/ {hindi}</span>}
      </p>
      <div className="mt-8 border-t border-neutral-400" />
      <div className="mt-2 flex items-end justify-between gap-4 text-[9.5px] text-neutral-500">
        <span className="flex-1">
          Name: <span className="ml-1 inline-block w-24 border-b border-dotted border-neutral-400" />
        </span>
        <span>
          Date: <span className="ml-1 inline-block w-16 border-b border-dotted border-neutral-400" />
        </span>
      </div>
    </div>
  );
}

export function ConsentDocument({
  template,
  patient,
  doctor,
  language,
  consentId,
  date,
  generatedBy,
}: ConsentDocumentProps) {
  const [qr, setQr] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    QRCode.toDataURL(`${consentId}|${patient.id}`, { margin: 0, width: 96 })
      .then((url) => {
        if (!cancelled) setQr(url);
      })
      .catch(() => {
        if (!cancelled) setQr(null);
      });
    return () => {
      cancelled = true;
    };
  }, [consentId, patient.id]);

  return (
    <div className="print-page mx-auto min-h-[297mm] w-full max-w-[210mm] bg-white p-10 text-neutral-900 shadow-lift ring-hairline">
      {/* Letterhead */}
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-brand-800 text-white">
            <svg viewBox="0 0 24 24" fill="none" className="size-5.5" aria-hidden>
              <path
                d="M12 3c-2.2 0-2.9 1.2-4.6 1.2C5.2 4.2 3.5 6 3.5 8.6c0 4.6 2.3 9.3 4 11.2.5.6 1.5.4 1.8-.4l1.3-4.1c.4-1.2 2.4-1.2 2.8 0l1.3 4.1c.3.8 1.3 1 1.8.4 1.7-1.9 4-6.6 4-11.2 0-2.6-1.7-4.4-3.9-4.4-1.7 0-2.4-1.2-4.6-1.2Z"
                fill="currentColor"
                fillOpacity="0.95"
              />
            </svg>
          </span>
          <div>
            <p className="text-lg font-bold leading-tight tracking-tight">{clinic.name}</p>
            <p className="mt-0.5 max-w-md text-[10px] leading-snug text-neutral-600">{clinic.address}</p>
            <p className="mt-0.5 text-[10px] text-neutral-600">
              Phone: {clinic.phone} · Email: {clinic.email} · Reg. No: {clinic.regNo}
            </p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {qr ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qr} alt={`QR code for ${consentId}`} className="size-[72px]" />
          ) : (
            <div className="flex size-[72px] items-center justify-center rounded border border-dashed border-neutral-300 text-[8px] text-neutral-400">
              QR
            </div>
          )}
          <span className="text-[8.5px] tracking-wide text-neutral-500 tnum">{consentId}</span>
        </div>
      </div>

      <div className="mt-4 border-t-2 border-neutral-900" />

      {/* Title */}
      <div className="mt-5 text-center">
        <h1 className="text-[16px] font-bold uppercase tracking-[0.06em]">
          Informed Consent — {template.treatment}
        </h1>
        {language === "Hindi" && (
          <p className="mt-0.5 text-[11px] font-semibold text-neutral-600">सूचित सहमति प्रपत्र</p>
        )}
        <p className="mt-1.5 text-[10px] text-neutral-500 tnum">
          Consent ID: <span className="font-semibold text-neutral-800">{consentId}</span>
          <span className="mx-2 text-neutral-300">|</span>
          Date: <span className="font-semibold text-neutral-800">{formatDate(date)}</span>
          <span className="mx-2 text-neutral-300">|</span>
          Language: <span className="font-semibold text-neutral-800">{language}</span>
        </p>
      </div>

      {/* Patient / doctor details */}
      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-md border border-neutral-300 p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-neutral-500">
            Patient Details{language === "Hindi" && <span className="ml-1.5 font-semibold normal-case tracking-normal">/ रोगी विवरण</span>}
          </p>
          <dl className="mt-1.5 space-y-0.5 text-[10.5px] leading-relaxed">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Name</dt>
              <dd className="font-semibold">{patient.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Age / Gender</dt>
              <dd className="font-semibold tnum">
                {patient.age} yrs / {patient.gender}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Patient ID</dt>
              <dd className="font-semibold tnum">{patient.id}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Phone</dt>
              <dd className="font-semibold tnum">{patient.phone}</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-md border border-neutral-300 p-3">
          <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-neutral-500">
            Treating Doctor{language === "Hindi" && <span className="ml-1.5 font-semibold normal-case tracking-normal">/ चिकित्सक विवरण</span>}
          </p>
          <dl className="mt-1.5 space-y-0.5 text-[10.5px] leading-relaxed">
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Name</dt>
              <dd className="font-semibold">{doctor.name}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Qualifications</dt>
              <dd className="font-semibold">{doctor.qualifications}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-24 shrink-0 text-neutral-500">Clinic Reg. No</dt>
              <dd className="font-semibold tnum">{clinic.regNo}</dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Sections */}
      <SectionHeading label="Treatment Description" language={language} />
      <p className="text-[10.5px] leading-[1.6] text-neutral-800">{template.description}</p>

      <SectionHeading label="Benefits" language={language} />
      <BulletList items={template.benefits} />

      <SectionHeading label="Risks" language={language} />
      <BulletList items={template.risks} />

      <SectionHeading label="Possible Complications" language={language} />
      <BulletList items={template.complications} />

      <SectionHeading label="Alternative Treatments" language={language} />
      <BulletList items={template.alternatives} />

      <SectionHeading label="After-care Instructions" language={language} />
      <BulletList items={template.aftercare} />

      {/* Declaration */}
      <SectionHeading label="Declaration" language={language} />
      {language === "Hindi" ? (
        <div className="space-y-2">
          <p className="text-[10.5px] leading-[1.7] text-neutral-900">
            मैं, <span className="inline-block w-44 border-b border-dotted border-neutral-500 align-baseline" />, एतद्द्वारा घोषणा
            करता/करती हूँ कि उपरोक्त उपचार — {template.treatment} — की प्रकृति, उद्देश्य, लाभ, संभावित जोखिम, जटिलताएँ तथा उपलब्ध
            वैकल्पिक उपचार मुझे मेरी अपनी भाषा में विस्तार से समझाए गए हैं। मुझे प्रश्न पूछने का पूर्ण अवसर दिया गया और मेरे सभी
            प्रश्नों के संतोषजनक उत्तर दिए गए। मैं समझता/समझती हूँ कि चिकित्सा में परिणाम की कोई गारंटी नहीं दी जा सकती। मैं
            स्वेच्छा से, बिना किसी दबाव के, इस उपचार के लिए अपनी सहमति देता/देती हूँ।
          </p>
          <p className="text-[9.5px] italic leading-[1.6] text-neutral-600">
            I, the undersigned, declare that the nature and purpose of the above treatment — {template.treatment} — together with
            its benefits, material risks, possible complications and available alternatives, have been explained to me in my own
            language. I have had the opportunity to ask questions, all of which were answered to my satisfaction. I understand that
            no guarantee of outcome can be given in medicine, and I voluntarily give my consent to this treatment.
          </p>
        </div>
      ) : (
        <p className="text-[10.5px] leading-[1.7] text-neutral-900">
          I, <span className="inline-block w-52 border-b border-dotted border-neutral-500 align-baseline" />, hereby declare that
          the nature and purpose of the proposed treatment — {template.treatment} — together with its expected benefits, material
          risks, possible complications and the available alternative treatments (including the option of no treatment), have been
          explained to me in my own language and in terms I fully understand. I have had adequate opportunity to ask questions,
          and all my questions have been answered to my satisfaction. I understand that dentistry is not an exact science and that
          no guarantee of result has been made to me. I voluntarily consent to the treatment described above, to the administration
          of local anaesthesia where required, and to any additional procedures the treating doctor considers necessary in the
          event of unforeseen circumstances arising during treatment.
        </p>
      )}

      {/* Signatures */}
      <SectionHeading label="Signatures" language={language} />
      <div className="grid grid-cols-2 gap-3">
        <SignatureBlock title="Patient Signature" hindi="रोगी के हस्ताक्षर" language={language} />
        <SignatureBlock title="Doctor Signature" hindi="चिकित्सक के हस्ताक्षर" language={language} />
        <SignatureBlock title="Guardian Signature (for minors)" hindi="अभिभावक के हस्ताक्षर" language={language} />
        <SignatureBlock title="Witness Signature" hindi="साक्षी के हस्ताक्षर" language={language} />
      </div>

      {/* Footer strip */}
      <div className="mt-6 flex items-center justify-between border-t border-neutral-300 pt-2.5 text-[8.5px] text-neutral-500">
        <span className="tnum">{consentId}</span>
        <span>Generated by {generatedBy} · {clinic.name}</span>
        <span>Page 1 of 1 · Physical filing copy</span>
      </div>
    </div>
  );
}
