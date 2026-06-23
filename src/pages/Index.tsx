import { useState } from 'react';
import Icon from '@/components/ui/icon';
import DashboardPreview from '@/components/DashboardPreview';

const HERO_IMG = 'https://cdn.poehali.dev/projects/9ce766f8-12b4-43ce-90b4-430145c569a7/files/501dec68-1f7f-4d00-b277-3cb3ec54527b.jpg';

const NAV = [
  { id: 'features', label: 'Возможности' },
  { id: 'how', label: 'Как работает' },
  { id: 'pricing', label: 'Тарифы' },
];

const FEATURES = [
  { icon: 'TrendingUp', title: 'Предиктивная аналитика спроса', text: 'Прогноз потока гостей и закупок с учётом погоды, городских событий, пробок и сезонных трендов. Минус списания и излишки.' },
  { icon: 'ScanLine', title: 'OCR накладных', text: 'Компьютерное зрение мгновенно оцифровывает документы. Никакого ручного ввода — десятки сэкономленных часов в месяц.' },
  { icon: 'Percent', title: 'Контроль фуд-коста', text: 'Себестоимость блюд пересчитывается в реальном времени. AI подсветит скачок цены и предложит выгодную альтернативу.' },
  { icon: 'Mic', title: 'Голосовое управление', text: 'Выручка, остатки, смены, HR — аналитический срез по простой голосовой команде. Без сложных таблиц.' },
  { icon: 'Boxes', title: 'Учёт остатков и склад', text: 'Прозрачный контроль инвентаря с автоматическим прогнозом дефицита и подсказками по дозаказу.' },
  { icon: 'BellRing', title: 'Умные оповещения', text: 'Сигналы при аномалиях цен поставщиков и рисках дефицита товара — раньше, чем проблема ударит по прибыли.' },
];

const STEPS = [
  { n: '01', title: 'Подключаем данные', text: 'Загружаем историю продаж, накладные и подключаем внешние источники: погода, события, поставщики.' },
  { n: '02', title: 'AI анализирует', text: 'Движок прогнозирует спрос, считает фуд-кост и находит аномалии в режиме реального времени.' },
  { n: '03', title: 'Получаете прибыль', text: 'Готовые сценарии оптимизации вместо констатации убытков. Вы фокусируетесь на гостях и сервисе.' },
];

const PLANS = [
  {
    name: 'SCOUT', tagline: 'Контроль ключевых метрик', price: '7 990', icon: 'Compass', popular: false,
    features: ['Главная панель KPI', 'Учёт остатков и склад', 'Базовая автоматизация рутины', 'OCR до 100 накладных/мес'],
  },
  {
    name: 'WARRIOR', tagline: 'Предиктивная аналитика', price: '7 990', icon: 'Swords', popular: true,
    features: ['Всё из SCOUT', 'Прогноз спроса (погода + события)', 'Глубокий контроль фуд-коста', 'Умные оповещения об аномалиях', 'OCR без ограничений'],
  },
  {
    name: 'TITAN', tagline: 'Полное AI-сопровождение', price: '7 990', icon: 'Crown', popular: false,
    features: ['Всё из WARRIOR', 'Голосовое управление', 'Интеграция с поставщиками', 'Сквозная интеграция систем', 'Персональный AI-управляющий'],
  },
];

const Index = () => {
  const [menu, setMenu] = useState(false);
  const scrollTo = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary text-primary-foreground grid place-items-center glow">
              <Icon name="Activity" size={20} />
            </div>
            <span className="font-extrabold tracking-tight text-lg">Контроль<span className="text-primary">+</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="hover:text-foreground transition-colors">{n.label}</button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('pricing')} className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition glow">
              Начать бесплатно
            </button>
            <button onClick={() => setMenu(!menu)} className="md:hidden w-9 h-9 grid place-items-center rounded-lg bg-secondary">
              <Icon name={menu ? 'X' : 'Menu'} size={18} />
            </button>
          </div>
        </div>
        {menu && (
          <div className="md:hidden border-t border-border px-5 py-4 flex flex-col gap-3 animate-fade-up">
            {NAV.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left text-sm font-medium text-muted-foreground">{n.label}</button>
            ))}
            <button onClick={() => scrollTo('pricing')} className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold">Начать бесплатно</button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
          <div className="grid-bg absolute inset-0 opacity-[0.15]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="max-w-3xl">
            <div className="animate-fade-up inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary live-dot" />
              Интеллектуальный автопилот для ресторанов
            </div>
            <h1 className="animate-fade-up text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6" style={{ animationDelay: '80ms' }}>
              Превращаем операционную рутину
              <span className="block text-primary text-glow">в чистую прибыль</span>
            </h1>
            <p className="animate-fade-up text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl" style={{ animationDelay: '160ms' }}>
              «Контроль+» — это AI-управляющий, который прогнозирует спрос, держит фуд-кост под контролем и сам находит выгодных поставщиков. Не констатация убытков постфактум — а готовые сценарии оптимизации.
            </p>
            <div className="animate-fade-up flex flex-col sm:flex-row gap-3" style={{ animationDelay: '240ms' }}>
              <button onClick={() => scrollTo('pricing')} className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition glow flex items-center justify-center gap-2">
                Попробовать 14 дней бесплатно <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => scrollTo('how')} className="px-6 py-3.5 rounded-xl bg-secondary font-semibold hover:bg-muted transition flex items-center justify-center gap-2">
                <Icon name="PlayCircle" size={18} /> Как это работает
              </button>
            </div>
            <div className="animate-fade-up flex flex-wrap items-center gap-x-8 gap-y-2 mt-8 text-sm text-muted-foreground" style={{ animationDelay: '320ms' }}>
              <span className="flex items-center gap-2"><Icon name="Check" size={16} className="text-primary" /> Без карты</span>
              <span className="flex items-center gap-2"><Icon name="Check" size={16} className="text-primary" /> Настройка за 1 день</span>
              <span className="flex items-center gap-2"><Icon name="Award" size={16} className="text-primary" /> 3-е место Олимпиады в Тюмени</span>
            </div>
          </div>

          <div className="animate-fade-up mt-16" style={{ animationDelay: '400ms' }}>
            <DashboardPreview />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { v: '−34%', l: 'списаний продуктов' },
            { v: '+18%', l: 'точность прогноза спроса' },
            { v: '40 ч', l: 'экономии в месяц на учёте' },
            { v: '24/7', l: 'контроль в реальном времени' },
          ].map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-primary text-glow">{s.v}</div>
              <div className="text-xs sm:text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="max-w-2xl mb-14">
          <span className="text-primary text-sm font-semibold font-mono tracking-widest uppercase">Возможности</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">Один AI вместо целого отдела аналитики</h2>
          <p className="text-muted-foreground text-lg">Классические POS лишь фиксируют данные. «Контроль+» думает за вас и действует на опережение.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary grid place-items-center mb-5 group-hover:scale-110 transition-transform">
                <Icon name={f.icon} size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-primary text-sm font-semibold font-mono tracking-widest uppercase">Как работает</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">Запуск за 3 шага</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s) => (
              <div key={s.n} className="relative rounded-2xl border border-border bg-card p-7">
                <div className="text-5xl font-extrabold font-mono text-primary/20 mb-4">{s.n}</div>
                <h3 className="font-bold text-xl mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-primary text-sm font-semibold font-mono tracking-widest uppercase">Тарифы</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3 mb-4">Гибкий SaaS под любой масштаб</h2>
          <p className="text-muted-foreground text-lg">От локальной кофейни до крупной ресторанной сети. Первые 14 дней — бесплатно.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((p) => (
            <div key={p.name} className={`relative rounded-2xl border p-7 transition-all ${
              p.popular ? 'border-primary bg-gradient-to-b from-primary/[0.08] to-card glow md:-translate-y-3' : 'border-border bg-card hover:border-primary/30'
            }`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Выбор рестораторов
                </div>
              )}
              <div className="flex items-center gap-2.5 mb-1">
                <div className={`w-9 h-9 rounded-lg grid place-items-center ${p.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'}`}>
                  <Icon name={p.icon} size={18} />
                </div>
                <span className="font-extrabold text-lg tracking-tight font-mono">{p.name}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-5">{p.tagline}</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-extrabold font-mono">₽{p.price}</span>
                <span className="text-muted-foreground text-sm mb-1.5">/ мес</span>
              </div>
              <button onClick={() => scrollTo('pricing')} className={`w-full py-3 rounded-xl font-semibold transition mb-6 ${
                p.popular ? 'bg-primary text-primary-foreground hover:opacity-90' : 'bg-secondary hover:bg-muted'
              }`}>
                Подключить {p.name}
              </button>
              <ul className="space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Icon name="Check" size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20 sm:pb-28">
        <div className="relative rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/[0.12] via-card to-card p-10 sm:p-16 text-center overflow-hidden">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
              Сфокусируйтесь на вкусе.<br />Рутину возьмёт <span className="text-primary text-glow">искусственный интеллект</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Присоединяйтесь к ресторанам, которые превращают расходы в прибыль с «Контроль+».
            </p>
            <button onClick={() => scrollTo('pricing')} className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:opacity-90 transition glow inline-flex items-center gap-2">
              Начать бесплатно <Icon name="ArrowRight" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground grid place-items-center">
              <Icon name="Activity" size={16} />
            </div>
            <span className="font-extrabold tracking-tight">Контроль<span className="text-primary">+</span></span>
          </div>
          <p className="text-sm text-muted-foreground text-center">Эволюция ресторанного менеджмента в чистую прибыль</p>
          <p className="text-xs text-muted-foreground font-mono">© {new Date().getFullYear()} Control+</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;