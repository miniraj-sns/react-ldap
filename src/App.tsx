import { FormEvent, useState, type ComponentType } from "react"
import {
  Activity,
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronRight,
  Database,
  Fingerprint,
  Gauge,
  KeyRound,
  LayoutDashboard,
  LockKeyhole,
  Network,
  Search,
  Server,
  ShieldCheck,
  UsersRound,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const stats = [
  { label: "Directory users", value: "12,482", change: "+8.2%", icon: UsersRound },
  { label: "LDAP binds", value: "1.8M", change: "+12.4%", icon: Activity },
  { label: "Policy health", value: "98.7%", change: "Stable", icon: ShieldCheck },
  { label: "Avg latency", value: "24ms", change: "-6ms", icon: Gauge },
]

const directoryActivity = [
  { title: "Privileged group review completed", detail: "Security Operations approved 14 role changes.", time: "2 min ago" },
  { title: "Replication recovered", detail: "US-East replica returned to healthy sync state.", time: "18 min ago" },
  { title: "Password policy updated", detail: "Minimum passphrase length changed to 14 characters.", time: "1 hr ago" },
]

const connectors = [
  { name: "Corporate LDAP", status: "Healthy", nodes: "4 nodes", color: "bg-emerald-500" },
  { name: "Azure AD Sync", status: "Queued", nodes: "2 jobs", color: "bg-cyan-500" },
  { name: "Audit Lake", status: "Streaming", nodes: "9 streams", color: "bg-indigo-500" },
]

type NavItem = {
  icon: ComponentType<{ className?: string }>
  label: string
  active?: boolean
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: UsersRound, label: "Directory" },
  { icon: ShieldCheck, label: "Access policies" },
  { icon: Database, label: "Replication" },
  { icon: KeyRound, label: "Credentials" },
  { icon: Server, label: "Infrastructure" },
]

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onLogin()
  }

  return (
    <main className="grid min-h-screen bg-slate-950 text-white lg:grid-cols-[1.08fr_0.92fr]">
      <section className="mesh-background relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(0_0%_100%/0.06)_1px,transparent_1px),linear-gradient(to_bottom,hsl(0_0%_100%/0.06)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <Fingerprint className="h-6 w-6 text-cyan-200" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight">LDAP Command Center</p>
            <p className="text-sm text-slate-300">Identity access management</p>
          </div>
        </div>

        <div className="relative z-10 max-w-2xl space-y-8">
          <Badge className="border-white/10 bg-white/10 text-cyan-100 hover:bg-white/10">Enterprise ready</Badge>
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold leading-tight tracking-tight xl:text-6xl">
              Secure directory access with executive-grade visibility.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-300">
              Monitor binds, directory replication, and privileged access reviews from one polished operations console.
            </p>
          </div>
          <div className="grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              ["99.99%", "SLA uptime"],
              ["SOC 2", "Controls"],
              ["24ms", "Bind latency"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <p className="text-2xl font-semibold">{value}</p>
                <p className="text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-slate-300">
          <CheckCircle2 className="h-4 w-4 text-cyan-200" />
          Encrypted SSO, MFA, and adaptive access controls included
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 text-slate-950">
        <Card className="w-full max-w-md border-slate-200/80 shadow-2xl shadow-slate-200/60">
          <CardHeader className="space-y-3 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
              <LockKeyhole className="h-7 w-7" />
            </div>
            <div>
              <CardTitle className="text-2xl">Welcome back</CardTitle>
              <CardDescription>Sign in with your directory administrator credentials.</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" type="email" defaultValue="admin@company.com" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <button className="text-sm font-medium text-primary hover:underline" type="button">
                    Reset password
                  </button>
                </div>
                <Input id="password" type="password" defaultValue="directory-admin" />
              </div>
              <Button className="w-full" size="lg" type="submit">
                Open dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <div className="mt-6 rounded-xl border bg-muted/60 p-4 text-sm text-muted-foreground">
              Demo mode is enabled. Submit the form to preview the secured dashboard.
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur xl:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Fingerprint className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">LDAP Console</p>
              <p className="text-sm text-muted-foreground">Production tenant</p>
            </div>
          </div>
          <nav className="space-y-2">
            {navItems.map(({ icon: Icon, label, active }) => (
              <button
                key={label}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                  active ? "bg-primary text-primary-foreground shadow" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-4 sm:p-6 lg:p-8">
          <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge variant="secondary" className="mb-3">Live operations</Badge>
              <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">Identity Operations Dashboard</h1>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                A polished command surface for LDAP health, security posture, and enterprise directory activity.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="w-72 bg-white pl-9" placeholder="Search users or groups" />
              </div>
              <Button variant="outline" size="icon" className="bg-white">
                <Bell className="h-4 w-4" />
              </Button>
              <Button onClick={onLogout}>Sign out</Button>
            </div>
          </header>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <Card key={item.label} className="border-slate-200 bg-white/90">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardDescription>{item.label}</CardDescription>
                  <item.icon className="h-5 w-5 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold">{item.value}</div>
                  <p className="mt-1 text-sm text-emerald-600">{item.change} from last week</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
            <Card className="overflow-hidden border-slate-200 bg-white">
              <CardHeader className="border-b bg-slate-50/70">
                <CardTitle>Directory performance</CardTitle>
                <CardDescription>LDAP bind volume, search throughput, and replication stability.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 lg:grid-cols-3">
                  {connectors.map((connector) => (
                    <div key={connector.name} className="rounded-2xl border bg-white p-5 shadow-sm">
                      <div className="mb-4 flex items-center justify-between">
                        <span className={`h-3 w-3 rounded-full ${connector.color}`} />
                        <Badge variant="outline">{connector.status}</Badge>
                      </div>
                      <p className="font-semibold">{connector.name}</p>
                      <p className="text-sm text-muted-foreground">{connector.nodes}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 h-72 rounded-3xl border bg-[linear-gradient(180deg,hsl(226_71%_40%/0.12),transparent),linear-gradient(to_right,hsl(214_32%_91%)_1px,transparent_1px),linear-gradient(to_bottom,hsl(214_32%_91%)_1px,transparent_1px)] bg-[size:100%_100%,44px_44px,44px_44px] p-6">
                  <div className="flex h-full items-end gap-3">
                    {[42, 58, 53, 66, 74, 68, 82, 76, 91, 86, 94, 88].map((height, index) => (
                      <div key={index} className="flex flex-1 flex-col items-center gap-2">
                        <div
                          className="w-full rounded-t-xl bg-gradient-to-t from-primary to-cyan-400 shadow-glow"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-xs text-muted-foreground">{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-slate-200 bg-slate-950 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="h-5 w-5 text-cyan-300" />
                    Replication map
                  </CardTitle>
                  <CardDescription className="text-slate-300">All regions are synchronized within SLA.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {["US-East", "EU-West", "AP-South"].map((region) => (
                    <div key={region} className="flex items-center justify-between rounded-xl bg-white/10 p-3">
                      <span>{region}</span>
                      <Badge variant="success">Synced</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle>Recent activity</CardTitle>
                  <CardDescription>High-signal administrative events.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {directoryActivity.map((activity) => (
                    <div key={activity.title} className="flex gap-3 rounded-2xl border p-4">
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="font-medium">{activity.title}</p>
                          <span className="whitespace-nowrap text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">{activity.detail}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full justify-between">
                    View audit log <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return isAuthenticated ? <Dashboard onLogout={() => setIsAuthenticated(false)} /> : <LoginScreen onLogin={() => setIsAuthenticated(true)} />
}
