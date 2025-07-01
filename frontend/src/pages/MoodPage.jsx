const moods = [
  { label: '😊', name: 'Happy' },
  { label: '😐', name: 'Neutral' },
  { label: '😔', name: 'Sad' },
  { label: '😡', name: 'Angry' },
  { label: '🤩', name: 'Inspired' },
];

const MoodPage = () => (
  <section className="flex flex-col items-center py-16 bg-background min-h-[70vh]">
    <div className="bg-white border-4 border-primary rounded-brutal shadow-brutal p-10 w-full max-w-2xl mb-8 text-center">
      <h2 className="text-3xl font-anime text-primary mb-6">Mood Tracker</h2>
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.name}
            className="px-8 py-4 bg-secondary text-primary font-anime text-2xl rounded-brutal border-2 border-primary shadow-brutal hover:bg-primary hover:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-150"
          >
            {mood.label} <span className="ml-2 text-lg">{mood.name}</span>
          </button>
        ))}
      </div>
      <div className="text-gray-600">Mood tracking features will appear here.</div>
    </div>
  </section>
);

export default MoodPage; 