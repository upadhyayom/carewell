"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, Users, IndianRupee, CalendarCheck, Plus } from "lucide-react";
import { StatCard, PageHeader, EmptyState } from "@/components/admin/widgets";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { cn, inr, initials, formatDate } from "@/lib/utils";
import { patients } from "@/lib/data/people";
import { appointmentStats } from "@/lib/data/appointments";

function AddPatientDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Add patient</DialogTitle>
          <DialogDescription>
            Register a new patient record. Demo form — entries are not persisted.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            onOpenChange(false);
          }}
        >
          <div className="space-y-1.5">
            <Label htmlFor="p-name">Full name</Label>
            <Input id="p-name" placeholder="e.g. Rohit Sharma" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-phone">Phone</Label>
            <Input id="p-phone" placeholder="+91 98xxx xxxxx" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-age">Age</Label>
            <Input id="p-age" type="number" min={1} max={110} placeholder="34" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-gender">Gender</Label>
            <Select id="p-gender" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              <option>Female</option>
              <option>Male</option>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-email">Email</Label>
            <Input id="p-email" type="email" placeholder="name@email.com" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p-blood">Blood group</Label>
            <Select id="p-blood" defaultValue="">
              <option value="" disabled>
                Select…
              </option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="p-notes">Medical notes</Label>
            <Textarea id="p-notes" placeholder="Allergies, existing conditions, medications…" />
          </div>
          <DialogFooter className="sm:col-span-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save patient</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function PatientsPage() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [addOpen, setAddOpen] = React.useState(false);

  const outstandingTotal = patients.reduce((s, p) => s + p.outstanding, 0);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.id.toLowerCase().includes(q) ||
        p.phone.replace(/\s/g, "").includes(q.replace(/\s/g, ""))
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Patients"
        description="Complete patient registry with billing and treatment history"
        actions={
          <Button size="sm" className="h-9" onClick={() => setAddOpen(true)}>
            <Plus className="size-4" /> Add patient
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Patients" value={String(patients.length)} delta={8.4} icon={Users} />
        <StatCard
          label="Outstanding Dues"
          value={inr(outstandingTotal)}
          deltaLabel="across 4 patients"
          icon={IndianRupee}
        />
        <StatCard
          label="Visits Today"
          value={String(appointmentStats.today)}
          delta={11.1}
          deltaLabel="vs last Sunday"
          icon={CalendarCheck}
        />
      </div>

      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, patient ID or phone…"
          className="h-9 pl-9 text-[13px]"
        />
      </div>

      <Card className="overflow-hidden p-0">
        {filtered.length === 0 ? (
          <div className="p-6">
            <EmptyState icon={Search} title="No patients found" text="Try a different name, ID or phone number." />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="pl-5">Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age / Gender</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Last visit</TableHead>
                <TableHead className="text-right">Total spent</TableHead>
                <TableHead className="text-right">Outstanding</TableHead>
                <TableHead className="pr-5">Conditions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/admin/patients/${p.id}`)}
                >
                  <TableCell className="pl-5 text-[12.5px] font-medium text-ink-500 tnum">{p.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-[10px]">{initials(p.name)}</AvatarFallback>
                      </Avatar>
                      <span className="whitespace-nowrap text-[13px] font-semibold text-ink-900">
                        {p.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-[13px] text-ink-500 tnum">
                    {p.age} · {p.gender}
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-[12.5px] text-ink-500 tnum">{p.phone}</TableCell>
                  <TableCell className="whitespace-nowrap text-[12.5px] text-ink-500 tnum">
                    {formatDate(p.lastVisit)}
                  </TableCell>
                  <TableCell className="text-right font-medium tnum">{inr(p.totalSpent)}</TableCell>
                  <TableCell
                    className={cn(
                      "text-right tnum",
                      p.outstanding > 0 ? "font-semibold text-red-700" : "text-ink-300"
                    )}
                  >
                    {p.outstanding > 0 ? inr(p.outstanding) : "—"}
                  </TableCell>
                  <TableCell className="pr-5">
                    {p.conditions.length === 0 ? (
                      <span className="text-xs text-ink-300">None</span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <Badge variant="warning" className="max-w-[150px] truncate px-2 py-0 text-[10.5px]">
                          {p.conditions[0]}
                        </Badge>
                        {p.conditions.length > 1 && (
                          <span className="text-[11px] font-medium text-ink-400 tnum">
                            +{p.conditions.length - 1}
                          </span>
                        )}
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      <AddPatientDialog open={addOpen} onOpenChange={setAddOpen} />
    </div>
  );
}
