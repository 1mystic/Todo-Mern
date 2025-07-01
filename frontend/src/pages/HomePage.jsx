const features = [
  {
    icon: '📝',
    title: 'Mood-based Tasks',
    desc: 'Create todos and assign moods to stay mindful and productive.'
  },
  {
    icon: '📈',
    title: 'Mood Tracking',
    desc: 'Log your mood daily and visualize your emotional trends.'
  },
  {
    icon: '🎨',
    title: 'Anime/Brutalist Design',
    desc: 'A unique blend of minimalist and bold UI inspired by anime and brutalism.'
  },
];

const HomePage = () => (
  <section className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-2 bg-background">
    {/* Hero Section */}
    <div className="bg-white border-4 border-primary rounded-xl shadow-brutal p-12 max-w-2xl w-full text-center mb-12 animate-fade-in">
      <h1 className="text-5xl font-anime text-primary mb-4 drop-shadow">Mood Todo</h1>
      <p className="text-xl text-secondary font-semibold mb-8">Productivity meets emotion. Organize your life, track your moods, and express yourself.</p>
      <a href="/tasks" className="inline-block px-10 py-4 bg-primary text-white font-anime text-2xl rounded-brutal border-2 border-secondary shadow-brutal hover:bg-secondary hover:text-primary transition-colors duration-150">Get Started</a>
    </div>
    {/* Features Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
      {features.map((f) => (
        <div key={f.title} className="bg-background border-2 border-secondary rounded-brutal p-8 flex flex-col items-center shadow-soft">
          <div className="text-5xl mb-3">{f.icon}</div>
          <h3 className="font-anime text-xl text-primary mb-2">{f.title}</h3>
          <p className="text-gray-700 text-center">{f.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HomePage; 