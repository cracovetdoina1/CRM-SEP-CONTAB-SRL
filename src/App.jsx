import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import FirmeContabilitate from "./pages/FirmeContabilitate";
import ClientiActivi from "./pages/ClientiActivi";
import ComingSoon from "./pages/ComingSoon";

// ============================================================
// MENIU NAVIGARE
// ============================================================
const MODULES = [
  {
    section: "Principal",
    items: [
      { id: "dashboard", label: "Dashboard", icon: "📊", component: Dashboard },
    ]
  },
  {
    section: "Firme & Clienți",
    items: [
      { id: "firme_contabilitate", label: "Firme Contabilitate", icon: "🏛️", component: FirmeContabilitate },
      { id: "clienti_activi", label: "Clienți Activi", icon: "👥", component: ClientiActivi },
      { id: "baza_clienti", label: "Baza Clienți", icon: "📋", component: () => <ComingSoon title="Baza Mare de Clienți" icon="📋" description="Toți clienții: activi, suspendați, reziliați — cu filtre avansate și export Excel." /> },
      { id: "firme_suspendate", label: "Firme Suspendate", icon: "⏸️", component: () => <ComingSoon title="Firme Suspendate" icon="⏸️" description="Vedere filtrată cu firmele suspendate ONRC, dată suspendare și dată estimată reactivare." /> },
      { id: "rezilieri", label: "Rezilieri", icon: "❌", component: () => <ComingSoon title="Rezilieri & Suspendări Servicii" icon="❌" description="Gestionare rezilieri definitive și suspendări temporare de servicii pentru neplată sau alte cauze." /> },
    ]
  },
  {
    section: "Contracte & Documente",
    items: [
      { id: "contracte_emise", label: "Contracte Emise", icon: "📄", component: () => <ComingSoon title="Contracte Emise" icon="📄" description="Toate contractele emise cu statusuri: Draft, Trimis spre semnare, Semnat, Suspendat, Reziliat." /> },
      { id: "sabloane", label: "Șabloane Contracte", icon: "📝", component: () => <ComingSoon title="Șabloane & Drafturi" icon="📝" description="Modele de contracte care se completează automat cu datele clientului. Export PDF și Word." /> },
      { id: "doc_incomplete", label: "Doc. Incomplete", icon: "⚠️", component: () => <ComingSoon title="Documente Incomplete" icon="⚠️" description="Alertă automată pentru clienții cu dosare incomplete. Listare clienți și documente lipsă." /> },
    ]
  },
  {
    section: "Vânzări",
    items: [
      { id: "leaduri", label: "Lead-uri", icon: "🎯", component: () => <ComingSoon title="Potențiali Clienți (Lead-uri)" icon="🎯" description="Pipeline complet: Nou → Contactat → Ofertat → Negociere → Așteptare semnare → Câștigat/Pierdut." /> },
    ]
  },
  {
    section: "Administrare",
    items: [
      { id: "utilizatori", label: "Utilizatori", icon: "👤", component: () => <ComingSoon title="Utilizatori & Drepturi" icon="👤" description="Gestionare utilizatori și roluri: Admin, Manager, Contabil, Operator." /> },
      { id: "setari", label: "Setări", icon: "⚙️", component: () => <ComingSoon title="Setări" icon="⚙️" /> },
    ]
  }
];

const allItems = MODULES.flatMap(m => m.items);

// ============================================================
// APP PRINCIPAL
// ============================================================
export default function App() {
  const [currentModule, setCurrentModule] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const CurrentPage = allItems.find(m => m.id === currentModule)?.component || Dashboard;

  const navigate = (id) => {
    setCurrentModule(id);
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-4 py-4 border-b border-slate-700`}>
        {!collapsed && (
          <div>
            <p className="text-white font-bold text-sm">SEP CRM</p>
            <p className="text-slate-400 text-xs">Contabilitate</p>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors"
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {MODULES.map(section => (
          <div key={section.section} className="mb-4">
            {!collapsed && (
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-3 mb-1">
                {section.section}
              </p>
            )}
            {section.items.map(item => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm transition-colors ${
                  currentModule === item.id
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-slate-700/50 hover:text-white"
                }`}
                title={collapsed ? item.label : ""}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-3 border-t border-slate-700">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <p className="text-xs text-slate-400">🔥 Firebase conectat</p>
            <p className="text-xs text-slate-500 mt-0.5">sep-crm-contabilitate</p>
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Desktop */}
      <aside
        className={`${collapsed ? "w-16" : "w-60"} bg-slate-900 flex-col transition-all duration-200 fixed h-full z-30 hidden md:flex`}
      >
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 bg-slate-900 flex flex-col z-50">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main className={`flex-1 ${collapsed ? "md:ml-16" : "md:ml-60"} transition-all duration-200 min-h-screen`}>
        {/* Mobile header */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-20">
          <button onClick={() => setMobileOpen(true)} className="text-gray-600 text-xl">☰</button>
          <span className="font-bold text-gray-800">
            {allItems.find(m => m.id === currentModule)?.icon} {allItems.find(m => m.id === currentModule)?.label}
          </span>
        </div>

        <CurrentPage />
      </main>
    </div>
  );
}
