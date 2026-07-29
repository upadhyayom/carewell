"use client";

import * as React from "react";
import {
  FileSignature, FileCheck2, CalendarDays, Printer, Save, FilePlus2, Search,
  CheckCircle2, Eye, RotateCcw, Languages,
} from "lucide-react";
import { PageHeader, StatCard } from "@/components/admin/widgets";
import { ConsentDocument } from "@/components/admin/consent-document";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { consentForms, consentTemplates, findConsentTemplate } from "@/lib/data/consents";
import { doctors, findDoctor, findPatient, patients } from "@/lib/data/people";
import type { ConsentForm } from "@/lib/data/types";
import { cn, formatDateTime } from "@/lib/utils";

const TODAY_ISO = "2026-07-19";

const statusVariant: Record<ConsentForm["status"], "good" | "blue" | "secondary"> = {
  "Signed & Filed": "good",
  Printed: "blue",
  Generated: "secondary",
};

export default function ConsentFormsPage() {
  const [tab, setTab] = React.useState("generator");

  // Generator selections — "manual" lets the desk type a patient in directly
  const [patientId, setPatientId] = React.useState(patients[0]?.id ?? "manual");
  const [manualName, setManualName] = React.useState("");
  const [manualAge, setManualAge] = React.useState("");
  const [manualGender, setManualGender] = React.useState<"Male" | "Female">("Male");
  const [manualPhone, setManualPhone] = React.useState("");
  const [doctorId, setDoctorId] = React.useState(doctors[0].id);
  const [templateSlug, setTemplateSlug] = React.useState(consentTemplates[0].slug);
  const [language, setLanguage] = React.useState<"English" | "Hindi">("English");

  // Generated state
  const [sessionCount, setSessionCount] = React.useState(0);
  const [generatedId, setGeneratedId] = React.useState<string | null>(null);
  const [savedForms, setSavedForms] = React.useState<ConsentForm[]>([]);
  const [confirmation, setConfirmation] = React.useState<string | null>(null);

  // History filters
  const [query, setQuery] = React.useState("");
  const [filterTreatment, setFilterTreatment] = React.useState("all");
  const [filterStatus, setFilterStatus] = React.useState("all");
  const [viewForm, setViewForm] = React.useState<ConsentForm | null>(null);

  const manualPatient = React.useMemo(
    () =>
      ({
        id: "WALK-IN",
        name: manualName || "________________",
        age: Number(manualAge) || 0,
        gender: manualGender,
        phone: manualPhone || "—",
        email: "", city: "", bloodGroup: "—", allergies: [], conditions: [],
        registeredOn: TODAY_ISO, lastVisit: TODAY_ISO, totalSpent: 0, outstanding: 0,
        treatments: [], prescriptions: [], invoices: [], reports: [], notes: "",
      }) as (typeof patients)[number],
    [manualName, manualAge, manualGender, manualPhone]
  );
  const patient = patientId === "manual" ? manualPatient : findPatient(patientId) ?? manualPatient;
  const doctor = findDoctor(doctorId) ?? doctors[0];
  const template = findConsentTemplate(templateSlug) ?? consentTemplates[0];

  const allForms = React.useMemo(() => [...savedForms, ...consentForms], [savedForms]);
  const signedCount = allForms.filter((f) => f.status === "Signed & Filed").length;
  const monthCount = allForms.filter((f) => f.generatedAt.startsWith("2026-07")).length;

  const resetSelections = () => {
    setGeneratedId(null);
    setConfirmation(null);
  };

  const handleGenerate = () => {
    const id = `CW-CF-260719-${101 + sessionCount}`;
    setSessionCount((n) => n + 1);
    setGeneratedId(id);
    setConfirmation(null);
  };

  const handleSave = () => {
    if (!generatedId) return;
    if (savedForms.some((f) => f.id === generatedId)) {
      setConfirmation(`${generatedId} is already saved to ${patient.name}'s history.`);
      return;
    }
    setSavedForms((prev) => [
      {
        id: generatedId,
        patientId: patient.id,
        patientName: patient.name,
        doctorId: doctor.id,
        treatmentSlug: template.slug,
        treatment: template.treatment,
        language,
        generatedAt: `${TODAY_ISO}T12:00:00.000Z`,
        generatedBy: "Priya Sharma",
        status: "Generated",
      },
      ...prev,
    ]);
    setConfirmation(`Saved ${generatedId} to ${patient.name}'s treatment history.`);
  };

  const handleReprint = (form: ConsentForm) => {
    setPatientId(form.patientId);
    setDoctorId(form.doctorId);
    setTemplateSlug(form.treatmentSlug);
    setLanguage(form.language);
    setGeneratedId(form.id);
    setConfirmation(null);
    setTab("generator");
  };

  /** Load a form (if given) into the preview, then open the browser print dialog. */
  const handlePrint = (form?: ConsentForm) => {
    if (form) handleReprint(form);
    // let the preview re-render with the selected form before printing
    setTimeout(() => window.print(), form ? 450 : 50);
  };

  const filtered = allForms.filter((f) => {
    if (filterTreatment !== "all" && f.treatmentSlug !== filterTreatment) return false;
    if (filterStatus !== "all" && f.status !== filterStatus) return false;
    if (query) {
      const q = query.toLowerCase();
      if (
        !f.id.toLowerCase().includes(q) &&
        !f.patientName.toLowerCase().includes(q) &&
        !f.treatment.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div>
      {/* Print isolation: only the consent document sheet prints */}
      <style>{`@media print {
        body * { visibility: hidden !important; }
        .print-page, .print-page * { visibility: visible !important; }
        .print-page { position: absolute !important; left: 0 !important; top: 0 !important; }
      }`}</style>

      <div className="no-print">
        <PageHeader
          title="Consent Form Generator"
          description="Generate, print and file physical consent forms — no digital signatures."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Forms generated" value={String(allForms.length)} icon={FileSignature} />
          <StatCard label="Signed & filed" value={String(signedCount)} icon={FileCheck2} />
          <StatCard label="This month" value={String(monthCount)} icon={CalendarDays} />
        </div>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="mt-6">
        <TabsList className="no-print">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* ---------------- Generator ---------------- */}
        <TabsContent value="generator">
          <Card className="no-print p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-[14.5px] font-semibold text-ink-900">Configure the form</h3>
                <p className="mt-0.5 text-xs text-ink-400">
                  Four steps — the document preview below updates live as you pick.
                </p>
              </div>
              {generatedId && (
                <Badge variant="good">
                  <CheckCircle2 /> {generatedId}
                </Badge>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <Label htmlFor="cf-patient">1 · Select patient</Label>
                <Select
                  id="cf-patient"
                  value={patientId}
                  onChange={(e) => {
                    setPatientId(e.target.value);
                    resetSelections();
                  }}
                >
                  <option value="manual">✍️ Type patient details</option>
                  {patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} · {p.id}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-doctor">2 · Select doctor</Label>
                <Select
                  id="cf-doctor"
                  value={doctorId}
                  onChange={(e) => {
                    setDoctorId(e.target.value);
                    resetSelections();
                  }}
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-treatment">3 · Select treatment</Label>
                <Select
                  id="cf-treatment"
                  value={templateSlug}
                  onChange={(e) => {
                    setTemplateSlug(e.target.value);
                    resetSelections();
                  }}
                >
                  {consentTemplates.map((t) => (
                    <option key={t.slug} value={t.slug}>
                      {t.treatment}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cf-language">4 · Language</Label>
                <Select
                  id="cf-language"
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value as "English" | "Hindi");
                    resetSelections();
                  }}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (bilingual)</option>
                </Select>
              </div>
            </div>

            {patientId === "manual" && (
              <div className="mt-4 grid gap-4 rounded-xl bg-brand-50/60 p-4 ring-1 ring-inset ring-brand-600/10 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-1.5">
                  <Label htmlFor="cf-mname">Patient name</Label>
                  <Input id="cf-mname" placeholder="Full name" value={manualName}
                    onChange={(e) => { setManualName(e.target.value); resetSelections(); }} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cf-mage">Age</Label>
                  <Input id="cf-mage" type="number" min={1} max={110} placeholder="Age" value={manualAge}
                    onChange={(e) => { setManualAge(e.target.value); resetSelections(); }} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cf-mgender">Gender</Label>
                  <Select id="cf-mgender" value={manualGender}
                    onChange={(e) => { setManualGender(e.target.value as "Male" | "Female"); resetSelections(); }}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="cf-mphone">Phone (optional)</Label>
                  <Input id="cf-mphone" placeholder="+91 …" value={manualPhone}
                    onChange={(e) => { setManualPhone(e.target.value); resetSelections(); }} />
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-4">
              {!generatedId ? (
                <>
                  <Button onClick={handleGenerate} disabled={patientId === "manual" && manualName.trim().length < 2}>
                    <FileSignature /> Generate consent
                  </Button>
                  <Button variant="secondary" onClick={() => handlePrint()}>
                    <Printer /> Print draft
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handlePrint()}>
                    <Printer /> Print
                  </Button>
                  <Button variant="secondary" onClick={handleSave}>
                    <Save /> Save to patient history
                  </Button>
                  <Button variant="ghost" onClick={resetSelections}>
                    <FilePlus2 /> New form
                  </Button>
                </>
              )}
              {patient.age < 18 && (
                <Badge variant="warning" className="ml-auto">
                  Minor patient — guardian signature required
                </Badge>
              )}
            </div>

            {confirmation && (
              <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3.5 py-2.5 text-[13px] font-medium text-emerald-800 ring-1 ring-inset ring-emerald-600/15">
                <CheckCircle2 className="size-4 shrink-0" />
                {confirmation}
              </div>
            )}
          </Card>

          {/* Live preview / generated document */}
          <div className="mt-6">
            <div className="no-print mb-3 flex items-center justify-between">
              <p className="text-[12.5px] font-medium text-ink-400">
                {generatedId ? "Document ready — print to A4" : "Live preview — generate to assign a consent ID"}
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs text-ink-400">
                <Languages className="size-3.5" /> {language === "Hindi" ? "Bilingual English + Hindi" : "English"}
              </span>
            </div>
            <ConsentDocument
              template={template}
              patient={patient}
              doctor={doctor}
              language={language}
              consentId={generatedId ?? "CW-CF-260719-DRAFT"}
              date={TODAY_ISO}
              generatedBy="Priya Sharma"
            />
          </div>
        </TabsContent>

        {/* ---------------- History ---------------- */}
        <TabsContent value="history" className="no-print">
          <Card className="p-5">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative min-w-52 flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
                <Input
                  placeholder="Search by consent ID, patient or treatment…"
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <Select
                className="w-full sm:w-52"
                value={filterTreatment}
                onChange={(e) => setFilterTreatment(e.target.value)}
                aria-label="Filter by treatment"
              >
                <option value="all">All treatments</option>
                {consentTemplates.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    {t.treatment}
                  </option>
                ))}
              </Select>
              <Select
                className="w-full sm:w-44"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                aria-label="Filter by status"
              >
                <option value="all">All statuses</option>
                <option value="Signed & Filed">Signed &amp; Filed</option>
                <option value="Printed">Printed</option>
                <option value="Generated">Generated</option>
              </Select>
            </div>

            <p className="mb-2 text-xs text-ink-400 tnum">
              {filtered.length} of {allForms.length} forms
            </p>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Consent ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.slice(0, 50).map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="whitespace-nowrap font-medium text-ink-900 tnum">{f.id}</TableCell>
                    <TableCell className="whitespace-nowrap">{f.patientName}</TableCell>
                    <TableCell className="whitespace-nowrap">{f.treatment}</TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500">{findDoctor(f.doctorId)?.name}</TableCell>
                    <TableCell>{f.language}</TableCell>
                    <TableCell className="whitespace-nowrap text-ink-500 tnum">{formatDateTime(f.generatedAt)}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant[f.status]}>{f.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handlePrint(f)}>
                          <Printer className="size-3.5" /> Print
                        </Button>
                        <Button variant="ghost" size="icon-sm" aria-label="Load in generator" onClick={() => handleReprint(f)}>
                          <RotateCcw className="size-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon-sm" aria-label="View form" onClick={() => setViewForm(f)}>
                          <Eye className="size-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length > 50 && (
              <p className="mt-3 text-center text-xs text-ink-400">Showing first 50 — refine your search to narrow down.</p>
            )}
          </Card>
        </TabsContent>
      </Tabs>

      {/* View dialog */}
      <Dialog open={viewForm !== null} onOpenChange={(o) => !o && setViewForm(null)}>
        <DialogContent className="no-print">
          {viewForm && (
            <>
              <DialogHeader>
                <DialogTitle className="tnum">{viewForm.id}</DialogTitle>
                <DialogDescription>
                  Informed consent — {viewForm.treatment} · {viewForm.language}
                </DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
                {[
                  ["Patient", `${viewForm.patientName} (${viewForm.patientId})`],
                  ["Doctor", findDoctor(viewForm.doctorId)?.name ?? viewForm.doctorId],
                  ["Generated", formatDateTime(viewForm.generatedAt)],
                  ["Generated by", viewForm.generatedBy],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-xs text-ink-400">{k}</dt>
                    <dd className={cn("mt-0.5 font-medium text-ink-900", k === "Generated" && "tnum")}>{v}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-xs text-ink-400">Status</dt>
                  <dd className="mt-1">
                    <Badge variant={statusVariant[viewForm.status]}>{viewForm.status}</Badge>
                  </dd>
                </div>
              </dl>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleReprint(viewForm);
                    setViewForm(null);
                  }}
                >
                  <RotateCcw /> Load in generator
                </Button>
                <Button
                  onClick={() => {
                    const f = viewForm;
                    setViewForm(null);
                    handlePrint(f);
                  }}
                >
                  <Printer /> Print
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
