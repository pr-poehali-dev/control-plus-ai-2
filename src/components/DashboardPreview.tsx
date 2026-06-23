import Icon from '@/components/ui/icon';

const KPIS = [
  { label: 'Выручка сегодня', value: '₽ 482 600', delta: '+12.4%', icon: 'Wallet' },
  { label: 'Фуд-кост', value: '28.7%', delta: '−1.9%', icon: 'ChefHat' },
  { label: 'Средний чек', value: '₽ 1 340', delta: '+5.1%', icon: 'Receipt' },
  { label: 'Списания', value: '₽ 6 120', delta: '−34%', icon: 'Trash2' },
];

const REVENUE = [38, 52, 47, 63, 58, 71, 66, 82, 76, 91, 85, 97];

function Sparkline({ data }: { data: number[] }) {
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
        <linearGradient id="dp-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#dp-g)" />
      <path d={line} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

const DashboardPreview = () => {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
      {/* fake topbar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-background/60">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/60" />
          <span className="ml-3 text-xs text-muted-foreground font-mono hidden sm:inline">control-plus.app/dashboard</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
          <span className="font-mono">live</span>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {KPIS.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-background/40 p-3.5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-7 h-7 rounded-lg bg-secondary grid place-items-center text-muted-foreground">
                  <Icon name={k.icon} size={15} />
                </div>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded text-primary bg-primary/10">{k.delta}</span>
              </div>
              <div className="text-base sm:text-lg font-extrabold font-mono tracking-tight">{k.value}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 rounded-xl border border-border bg-background/40 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold">Выручка · 12 недель</span>
              <span className="text-[10px] font-mono text-primary">+24%</span>
            </div>
            <div className="h-24"><Sparkline data={REVENUE} /></div>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon name="Sparkles" size={14} className="text-primary" />
              <span className="text-sm font-bold">Прогноз</span>
            </div>
            <div className="text-2xl font-extrabold font-mono text-primary text-glow">+18.5%</div>
            <p className="text-[10px] text-muted-foreground">рост на выходных · учтён дождь</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
