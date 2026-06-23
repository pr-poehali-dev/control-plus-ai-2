import { useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV = [
  { id: 'dashboard', label: 'Панель KPI', icon: 'LayoutDashboard' },
  { id: 'demand', label: 'Прогноз спроса', icon: 'TrendingUp' },
  { id: 'purchasing', label: 'Закупки и OCR', icon: 'ScanLine' },
  { id: 'inventory', label: 'Склад и инвентарь', icon: 'Boxes' },
  { id: 'voice', label: 'Голосовой ассистент', icon: 'Mic' },
];

const KPIS = [
  { label: 'Выручка сегодня', value: '₽ 482 600', delta: '+12.4%', up: true, icon: 'Wallet' },
  { label: 'Фуд-кост', value: '28.7%', delta: '−1.9%', up: true, icon: 'ChefHat' },
  { label: 'Средний чек', value: '₽ 1 340', delta: '+5.1%', up: true, icon: 'Receipt' },
  { label: 'Списания', value: '₽ 6 120', delta: '−34%', up: true, icon: 'Trash2' },
];

const REVENUE = [38, 52, 47, 63, 58, 71, 66, 82, 76, 91, 85, 97];
const FORECAST = [97, 88, 79, 84, 92, 100];

const ALERTS = [
  { icon: 'TrendingUp', tone: 'warning', title: 'Аномалия цены', text: 'Лосось у «МореТрейд» вырос на +22%. Найдено 2 альтернативы дешевле.' },
  { icon: 'CloudRain', tone: 'primary', title: 'Прогноз спроса', text: 'Дождь в выходные → +18% к доставке. Рекомендуем дозаказ упаковки.' },
  { icon: 'PackageX', tone: 'destructive', title: 'Риск дефицита', text: 'Моцарелла закончится через 2 дня при текущем темпе продаж.' },
];

const INVOICES = [
  { supplier: 'МореТрейд', sum: '₽ 84 200', items: 14, status: 'Распознано', ok: true },
  { supplier: 'ФрешОвощ', sum: '₽ 31 750', items: 22, status: 'Распознано', ok: true },
  { supplier: 'МилкоПром', sum: '₽ 19 400', items: 8, status: 'Проверка', ok: false },
];

const STOCK = [
  { name: 'Сёмга филе', level: 82, unit: '14 кг' },
  { name: 'Моцарелла', level: 18, unit: '2.1 кг' },
  { name: 'Томаты', level: 64, unit: '9 кг' },
  { name: 'Оливковое масло', level: 47, unit: '6 л' },
];

const toneMap: Record<string, string> = {
  primary: 'text-primary bg-primary/10 border-primary/20',
  warning: 'text-warning bg-warning/10 border-warning/20',
  destructive: 'text-destructive bg-destructive/10 border-destructive/20',
};

function Sparkline({ data, color = 'hsl(var(--primary))', dashed = false }: { data: number[]; color?: string; dashed?: boolean }) {
  const w = 300;
  const h = 90;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 12) - 6;
    return [x, y];
  });
  const line = pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(' ');
  const area = `${line} L ${w} ${h} L 0 ${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={dashed ? 'g2' : 'g1'} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {!dashed && <path d={area} fill={`url(#g1)`} />}
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={dashed ? '6 7' : undefined} className={dashed ? '' : 'draw-line'} />
      {dashed && pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={color} />)}
    </svg>
  );
}

const Index = () => {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-border bg-card/40 backdrop-blur sticky top-0 h-screen">
        <div className="px-6 py-6 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center font-bold glow">
            <Icon name="Activity" size={20} />
          </div>
          <div>
            <div className="font-extrabold tracking-tight leading-none text-[17px]">Контроль<span className="text-primary">+</span></div>
            <div className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">AI Autopilot</div>
          </div>
        </div>
        <nav className="px-3 mt-2 flex flex-col gap-1">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => setActive(n.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active === n.id ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}>
              <Icon name={n.icon} size={18} />
              {n.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto m-3 p-4 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent">
          <div className="text-xs font-mono text-primary mb-1">TITAN</div>
          <div className="text-sm font-semibold mb-2">Полное AI-сопровождение</div>
          <button className="w-full text-xs font-semibold py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition">
            Активировать
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur px-5 sm:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">Ресторан «Бавария», ул. Ленина 12</h1>
            <div className="flex items-center gap-2 mt-0.5 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
              <span className="font-mono">Данные в реальном времени · {new Date().toLocaleDateString('ru-RU')}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-secondary text-sm font-medium hover:bg-muted transition">
              <Icon name="Mic" size={16} className="text-primary" /> Спросить
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-sm font-bold text-primary-foreground">А</div>
          </div>
        </header>

        <div className="p-5 sm:p-8 space-y-6 max-w-[1400px]">
          {/* KPI grid */}
          <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {KPIS.map((k, i) => (
              <div key={k.label} className="animate-fade-up rounded-2xl border border-border bg-card p-5 hover:border-primary/30 transition-colors"
                style={{ animationDelay: `${i * 80}ms` }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-lg bg-secondary grid place-items-center text-muted-foreground">
                    <Icon name={k.icon} size={18} />
                  </div>
                  <span className={`text-xs font-mono font-semibold px-2 py-1 rounded-md ${k.up ? 'text-primary bg-primary/10' : 'text-destructive bg-destructive/10'}`}>
                    {k.delta}
                  </span>
                </div>
                <div className="text-2xl font-extrabold tracking-tight font-mono">{k.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
              </div>
            ))}
          </section>

          {/* Charts row */}
          <section className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 animate-fade-up rounded-2xl border border-border bg-card p-6" style={{ animationDelay: '160ms' }}>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold">Выручка · 12 недель</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Динамика продаж с прогнозом</p>
                </div>
                <div className="flex gap-1 text-xs">
                  {['День', 'Неделя', 'Месяц'].map((t, i) => (
                    <button key={t} className={`px-3 py-1.5 rounded-lg font-medium ${i === 1 ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="h-44"><Sparkline data={REVENUE} /></div>
            </div>

            <div className="animate-fade-up rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.06] to-card p-6 relative overflow-hidden" style={{ animationDelay: '220ms' }}>
              <div className="grid-bg absolute inset-0 opacity-30" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Sparkles" size={16} className="text-primary" />
                  <h2 className="font-bold">Прогноз спроса</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Учтены погода, события, пробки</p>
                <div className="text-3xl font-extrabold font-mono text-primary text-glow">+18.5%</div>
                <p className="text-xs text-muted-foreground mb-4">ожидаемый рост на выходных</p>
                <div className="h-20"><Sparkline data={FORECAST} dashed /></div>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                  <Icon name="CloudRain" size={14} /> Дождь
                  <Icon name="Music" size={14} className="ml-2" /> Концерт рядом
                </div>
              </div>
            </div>
          </section>

          {/* Alerts + Invoices */}
          <section className="grid lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 animate-fade-up rounded-2xl border border-border bg-card p-6" style={{ animationDelay: '260ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold flex items-center gap-2"><Icon name="BellRing" size={18} className="text-warning" /> Умные оповещения</h2>
                <span className="text-xs font-mono text-muted-foreground">3 новых</span>
              </div>
              <div className="space-y-3">
                {ALERTS.map((a) => (
                  <div key={a.title} className={`rounded-xl border p-3.5 ${toneMap[a.tone]}`}>
                    <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                      <Icon name={a.icon} size={15} /> {a.title}
                    </div>
                    <p className="text-xs text-foreground/70 leading-relaxed">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 animate-fade-up rounded-2xl border border-border bg-card p-6" style={{ animationDelay: '300ms' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold flex items-center gap-2"><Icon name="ScanLine" size={18} className="text-primary" /> Накладные · OCR-распознавание</h2>
                <button className="text-xs font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
                  Загрузить <Icon name="Upload" size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {INVOICES.map((inv) => (
                  <div key={inv.supplier} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/60 transition border border-transparent hover:border-border">
                    <div className="w-10 h-10 rounded-lg bg-secondary grid place-items-center text-muted-foreground shrink-0">
                      <Icon name="FileText" size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-sm truncate">{inv.supplier}</div>
                      <div className="text-xs text-muted-foreground font-mono">{inv.items} позиций</div>
                    </div>
                    <div className="font-mono font-bold text-sm">{inv.sum}</div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-md shrink-0 ${inv.ok ? 'text-primary bg-primary/10' : 'text-warning bg-warning/10'}`}>
                      {inv.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Stock */}
          <section className="animate-fade-up rounded-2xl border border-border bg-card p-6" style={{ animationDelay: '340ms' }}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold flex items-center gap-2"><Icon name="Boxes" size={18} /> Остатки на складе</h2>
              <span className="text-xs text-muted-foreground font-mono">Обновлено только что</span>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {STOCK.map((s) => {
                const low = s.level < 25;
                return (
                  <div key={s.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{s.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{s.unit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div className={`h-full rounded-full ${low ? 'bg-destructive' : 'bg-primary'}`} style={{ width: `${s.level}%` }} />
                    </div>
                    {low && <div className="text-[11px] text-destructive mt-1.5 flex items-center gap-1"><Icon name="AlertTriangle" size={11} /> Скоро закончится</div>}
                  </div>
                );
              })}
            </div>
          </section>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Контроль<span className="text-primary">+</span> · Эволюция ресторанного менеджмента в чистую прибыль · 3-е место на Олимпиаде по предпринимательству в Тюмени
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
