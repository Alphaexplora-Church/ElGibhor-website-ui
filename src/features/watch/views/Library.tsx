import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';

interface Sermon {
  id: string;
  title: string;
  date: string;
  overview: string;
  image: string;
}

interface WordItem {
  id: string;
  title: string;
  date: string;
  duration: string;
  image: string;
  category: string;
}

interface Episode {
  title: string;
  date: string;
  duration: string;
  image: string;
}

interface SeriesItem {
  id: string;
  title: string;
  category: string;
  image: string;
  blurb: string;
  episodes: Episode[];
}

interface Teacher {
  name: string;
  role: string;
  sermonCount: number;
  image: string;
}

interface NowPlaying {
  title: string;
  date: string;
  duration: string;
  overview: string;
}

type Tab = 'sermons' | 'series' | 'teachers';

const placeholderSermons: Sermon[] = [
  {
    id: '1',
    title: 'Walking In Faith',
    date: 'August 24, 2026',
    overview:
      'Placeholder overview. A short summary of the message goes here — the main scripture, the central idea, and the takeaway for the congregation.',
    image: 'https://images.pexels.com/photos/11667919/pexels-photo-11667919.jpeg',
  },
  {
    id: '2',
    title: 'The Anchored Heart',
    date: 'August 17, 2026',
    overview:
      'Placeholder overview. Replace this with the real description of the sermon, including the speaker and the series it belongs to.',
    image: 'https://images.pexels.com/photos/14364672/pexels-photo-14364672.jpeg',
  },
  {
    id: '3',
    title: 'Grace That Moves',
    date: 'August 10, 2026',
    overview:
      'Placeholder overview. This is where the sermon summary will sit once the real content is ready to be added in.',
    image: 'https://images.pexels.com/photos/7697244/pexels-photo-7697244.jpeg',
  },
  {
    id: '4',
    title: 'Rooted & Unshaken',
    date: 'August 3, 2026',
    overview:
      'Placeholder overview. A brief, compelling summary of the sermon message will replace this placeholder text.',
    image: 'https://images.pexels.com/photos/34683153/pexels-photo-34683153.jpeg',
  },
  {
    id: '5',
    title: 'Called By Name',
    date: 'July 27, 2026',
    overview:
      'Placeholder overview. Final placeholder slot — swap in the real title, date, thumbnail, and overview text.',
    image: 'https://images.pexels.com/photos/11140399/pexels-photo-11140399.jpeg',
  },
];

const AUTOPLAY_DELAY = 4000;
const SWIPE_THRESHOLD = 80;

const variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 60 : -60, scale: 1.02 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -60 : 60, scale: 1.02 }),
};

const durations = ['32 min', '38 min', '41 min', '45 min', '52 min'];
const thumbnails = [
  'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg',
  'https://images.pexels.com/photos/34352434/pexels-photo-34352434.jpeg',
  'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg',
  'https://images.pexels.com/photos/208216/pexels-photo-208216.jpeg',
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
];

// Categories replace the old flat search-only list. Counts are illustrative —
// wire these up to real tallies once content is final.
const CATEGORIES = [
  { name: 'Faith', count: 24 },
  { name: 'Prayer', count: 16 },
  { name: 'Identity', count: 14 },
  { name: 'Family', count: 12 },
  { name: 'Generosity', count: 9 },
  { name: 'Healing', count: 8 },
  { name: 'Hope', count: 7 },
  { name: 'Worship', count: 6 },
];

const itemsPerPage = 8;
const totalWordItems = 80;

const wordItems: WordItem[] = Array.from({ length: totalWordItems }, (_, i) => {
  const sermonDate = new Date('2026-08-24');
  sermonDate.setDate(sermonDate.getDate() - i * 7);

  return {
    id: `word-${i + 1}`,
    title: `Sermon Title ${i + 1}`,
    date: sermonDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    duration: durations[i % durations.length],
    image: thumbnails[i % thumbnails.length],
    category: CATEGORIES[i % CATEGORIES.length].name,
  };
});

const SERIES_LIST: SeriesItem[] = [
  {
    id: 'ser-1',
    title: 'Kingdom Culture',
    category: 'Faith',
    image: thumbnails[0],
    blurb: 'A short arc on what it looks like to carry Kingdom values into ordinary weeks.',
    episodes: [
      { title: 'Kingdom Culture: Part One', date: 'Aug 2026', duration: '42 min', image: thumbnails[0] },
      { title: 'Kingdom Culture: Part Two', date: 'Aug 2026', duration: '39 min', image: thumbnails[1] },
      { title: 'Kingdom Culture: Part Three', date: 'Aug 2026', duration: '44 min', image: thumbnails[2] },
    ],
  },
  {
    id: 'ser-2',
    title: 'Steady Hands',
    category: 'Hope',
    image: thumbnails[3],
    blurb: 'One message on staying grounded when the outlook is uncertain.',
    episodes: [{ title: 'Steady Hands', date: 'Jul 2026', duration: '41 min', image: thumbnails[3] }],
  },
  {
    id: 'ser-3',
    title: 'The Upper Room',
    category: 'Identity',
    image: thumbnails[2],
    blurb: 'A close reading of the final conversations before the cross, told in three parts.',
    episodes: [
      { title: 'The Upper Room: Part One', date: 'Jul 2026', duration: '48 min', image: thumbnails[2] },
      { title: 'The Upper Room: Part Two', date: 'Jul 2026', duration: '44 min', image: thumbnails[4] },
    ],
  },
  {
    id: 'ser-4',
    title: 'Open Hands',
    category: 'Generosity',
    image: thumbnails[4],
    blurb: 'A single teaching on generosity as posture rather than obligation.',
    episodes: [{ title: 'Open Hands', date: 'Jun 2026', duration: '35 min', image: thumbnails[4] }],
  },
];

const TEACHERS: Teacher[] = [
  { name: 'Pastor Mike', role: 'Lead Pastor', sermonCount: 42, image: thumbnails[0] },
  { name: 'Pastor Anna', role: 'Associate Pastor', sermonCount: 18, image: thumbnails[1] },
  { name: 'Pastor Ruben', role: 'Youth Pastor', sermonCount: 12, image: thumbnails[2] },
];

const TABS: { id: Tab; label: string }[] = [
  { id: 'sermons', label: 'All Sermons' },
  { id: 'series', label: 'Series' },
  { id: 'teachers', label: 'Teachers' },
];

const getPaginationRange = (current: number, total: number) => {
  const delta = 1;
  const range: (number | string)[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
      range.push(i);
    } else if (range[range.length - 1] !== '...') {
      range.push('...');
    }
  }
  return range;
};

export const Library: React.FC = () => {
  const [[activeIndex, direction], setSlide] = useState<[number, number]>([0, 0]);
  const total = placeholderSermons.length;
  const current = placeholderSermons[activeIndex];
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (nextIndex: number, dir: number) => {
      const wrapped = ((nextIndex % total) + total) % total;
      setSlide([wrapped, dir]);
    },
    [total]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1, 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1, -1), [activeIndex, goTo]);
  const goToIndex = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      goTo(index, index > activeIndex ? 1 : -1);
    },
    [activeIndex, goTo]
  );

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => goTo(activeIndex + 1, 1), AUTOPLAY_DELAY);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, goTo]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x >= SWIPE_THRESHOLD) goPrev();
  };

  // --- Archive controls: tab, category, search, pagination ---
  const [activeTab, setActiveTab] = useState<Tab>('sermons');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const categoryDropdownRef = useRef<HTMLDivElement | null>(null);

  const selectCategory = (name: string | null) => {
    setActiveCategory(name);
    setCurrentPage(1);
    setCategoryOpen(false);
    setCategorySearch('');
  };

  const filteredCategories = useMemo(() => {
    const query = categorySearch.trim().toLowerCase();
    if (!query) return CATEGORIES;
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(query));
  }, [categorySearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
        setCategorySearch('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  const filteredWordItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return wordItems.filter((item) => {
      const matchesQuery = !query || item.title.toLowerCase().includes(query);
      const matchesCategory = !activeCategory || item.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filteredWordItems.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWordItems.slice(start, start + itemsPerPage);
  }, [filteredWordItems, currentPage]);

  const paginationRange = useMemo(() => getPaginationRange(currentPage, totalPages), [currentPage, totalPages]);

  const goToPage = useCallback(
    (page: number) => setCurrentPage(Math.max(1, Math.min(totalPages, page))),
    [totalPages]
  );

  const filteredSeries = useMemo(
    () => (activeCategory ? SERIES_LIST.filter((s) => s.category === activeCategory) : SERIES_LIST),
    [activeCategory]
  );

  // --- Player / series / detail modals ---
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seeMoreSermon, setSeeMoreSermon] = useState<Sermon | null>(null);
  const [openSeries, setOpenSeries] = useState<SeriesItem | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const openPlayer = (sermon: NowPlaying) => {
    setNowPlaying(sermon);
    setPlaying(false);
  };

  const closePlayer = () => {
    setNowPlaying(null);
    setPlaying(false);
  };

  const handleSeriesClick = (series: SeriesItem) => {
    if (series.episodes.length === 1) {
      const ep = series.episodes[0];
      openPlayer({ title: ep.title, date: ep.date, duration: ep.duration, overview: series.blurb });
    } else {
      setOpenSeries(series);
    }
  };

  return (
    <div className="bg-[var(--color-background-dark)] w-full min-h-screen pt-16 lg:pt-24">
      {/* HERO */}
      <section className="relative w-full h-[80vh] min-h-[560px] overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
          >
            <div className="absolute inset-0 bg-cover bg-center select-none" style={{ backgroundImage: `url(${current.image})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)] via-[var(--color-background-dark)]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-background-dark)]/90 via-[var(--color-background-dark)]/20 to-transparent" />

            <div className="relative z-10 h-full flex flex-col justify-end max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pb-16 lg:pb-24">
              <h1 className="font-heading font-black uppercase tracking-tight text-white text-4xl sm:text-6xl lg:text-7xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)] max-w-3xl">
                {current.title}
              </h1>
              <div className="flex items-center gap-3 mt-4 text-sm sm:text-base font-medium text-gray-200">
                <span className="text-gold font-bold">{current.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span className="text-gray-300">Sermon</span>
              </div>
              <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed line-clamp-3">{current.overview}</p>

              <div className="flex items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => openPlayer({ title: current.title, date: current.date, duration: '45 min', overview: current.overview })}
                  className="flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.35)]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  Play
                </button>
                <button
                  type="button"
                  onClick={() => setSeeMoreSermon(current)}
                  className="flex items-center justify-center gap-2 h-12 sm:h-14 px-6 sm:px-8 rounded-full bg-white/10 border border-white/20 text-white font-bold tracking-wide hover:bg-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M12 16v-4M12 8h.01" />
                  </svg>
                  See More
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button type="button" onClick={goPrev} aria-label="Previous sermon" className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 backdrop-blur-md transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button type="button" onClick={goNext} aria-label="Next sermon" className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 backdrop-blur-md transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {placeholderSermons.map((sermon, index) => (
            <button
              key={sermon.id}
              type="button"
              aria-label={`Go to sermon ${index + 1}`}
              onClick={() => goToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* ARCHIVE */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 lg:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-heading font-black uppercase tracking-tight text-white text-3xl sm:text-4xl">
            The <span className="text-gold">Archive</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Every message we've preached, sorted by topic or grouped into the series it came from.
          </p>
        </div>

        {/* tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1 rounded-full bg-white/5 border border-white/10 p-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-colors duration-300 ${
                  activeTab === tab.id ? 'bg-gold text-royal-purple-dark' : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* search (sermons tab only) */}
        {activeTab !== 'teachers' && (
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-xs" ref={categoryDropdownRef}>
        
              <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sermons by title..."
                className="w-full h-12 pl-12 pr-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-gold/60 transition-colors"
              />
            </div>
          </div>
        )}

        {/* category dropdown, searchable — built for a long list of topics (sermons + series tabs) */}
        {activeTab === 'sermons' && (
          <div className="flex justify-center mb-6">
            <div className="relative w-full max-w-md">
              <button
                type="button"
                onClick={() => setCategoryOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between h-12 px-5 rounded-full border text-sm font-bold tracking-wide transition-colors duration-300 ${
                  activeCategory ? 'bg-royal-purple-dark border-royal-purple-dark text-white' : 'bg-white/5 border-white/10 text-gray-300 hover:border-gold/40'
                }`}
              >
                <span className="truncate">{activeCategory ?? 'Filter by topic'}</span>
                <svg
                  className={`w-4 h-4 shrink-0 ml-2 transition-transform duration-300 ${categoryOpen ? 'rotate-180' : ''} ${activeCategory ? 'text-white' : 'text-gray-500'}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-background-dark)] shadow-2xl"
                  >
                    <div className="border-b border-white/10 p-3">
                      <div className="relative">
                        <input
                          autoFocus
                          type="text"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          placeholder="Search topics..."
                          className="w-full h-10 pl-4 pr-9 rounded-full bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold/60 transition-colors"
                        />
                        <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <circle cx="11" cy="11" r="7" />
                          <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                        </svg>
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto">
                      {activeCategory && (
                        <button
                          type="button"
                          onClick={() => selectCategory(null)}
                          className="flex w-full items-center px-5 py-3 text-sm font-bold text-gold hover:bg-white/5 transition-colors"
                        >
                          Clear filter
                        </button>
                      )}

                      {filteredCategories.length === 0 ? (
                        <p className="px-5 py-6 text-center text-sm text-gray-500">No topics found.</p>
                      ) : (
                        filteredCategories.map((cat) => (
                          <button
                            key={cat.name}
                            type="button"
                            onClick={() => selectCategory(cat.name)}
                            className={`flex w-full items-center justify-between px-5 py-3 text-sm transition-colors hover:bg-white/5 ${
                              activeCategory === cat.name ? 'text-gold' : 'text-gray-300'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <span className="text-gray-600">{cat.count}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + currentPage + searchQuery + (activeCategory ?? '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'sermons' && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {pageItems.length === 0 && (
                    <div className="col-span-full text-center text-gray-400 py-16">
                      Nothing matches that search or topic yet.
                    </div>
                  )}
                  {pageItems.map((item) => {
                    const isHovered = hoveredCard === item.id;
                    return (
                      <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col cursor-pointer">
                        <div
                          onMouseEnter={() => setHoveredCard(item.id)}
                          onMouseLeave={() => setHoveredCard(null)}
                          onClick={() =>
                            setSeeMoreSermon({
                              id: item.id,
                              title: item.title,
                              date: item.date,
                              overview: 'Placeholder overview. Replace this with the real sermon description once the content is ready.',
                              image: item.image,
                            })
                          }
                          className="relative h-72 sm:h-80 bg-cover bg-center w-full overflow-hidden"
                          style={{ backgroundImage: `url(${item.image})` }}
                        >
                          <span className="absolute top-3 left-3 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gold">
                            {item.category}
                          </span>
                          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <span className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-2'}`}>
                              See More
                              <svg className={`w-4 h-4 text-gold transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col items-center py-4 px-4 gap-1.5 bg-white z-10">
                          <h3 className="text-royal-purple-dark font-bold text-lg text-center">{item.title}</h3>
                          <p className="text-gray-500 text-xs">{item.duration} • {item.date}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openPlayer({
                                title: item.title,
                                date: item.date,
                                duration: item.duration,
                                overview: 'Placeholder overview. Replace this with the real sermon description once the content is ready.',
                              });
                            }}
                            className="mt-2 px-6 py-2 rounded-full bg-royal-purple-dark text-white text-xs font-bold tracking-wide hover:bg-royal-purple-light transition-colors duration-300"
                          >
                            Watch Now
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {pageItems.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                    <button type="button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} aria-label="Previous page" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {paginationRange.map((page, idx) =>
                      page === '...' ? (
                        <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
                      ) : (
                        <button
                          key={page}
                          type="button"
                          onClick={() => goToPage(page as number)}
                          aria-label={`Go to page ${page}`}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                            page === currentPage ? 'bg-gold text-royal-purple-dark' : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button type="button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Next page" className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                )}
              </>
            )}

            {activeTab === 'series' && (
              <div className="flex flex-col gap-4">
                {filteredSeries.length === 0 ? (
                  <p className="text-center text-gray-400 py-16">No series in this topic yet.</p>
                ) : (
                  filteredSeries.map((series) => (
                    <button
                      key={series.id}
                      type="button"
                      onClick={() => handleSeriesClick(series)}
                      className="group flex flex-col sm:flex-row items-stretch gap-0 sm:gap-6 rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden text-left hover:border-gold/40 transition-colors duration-300"
                    >
                      <div className="relative h-44 sm:h-auto sm:w-56 shrink-0 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${series.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 sm:bg-gradient-to-r sm:from-transparent sm:via-transparent" />
                      </div>

                      <div className="flex flex-1 flex-col justify-center p-5 sm:py-6 sm:pr-6">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-1">{series.category}</span>
                        <h3 className="font-heading font-black uppercase tracking-tight text-white text-xl sm:text-2xl">{series.title}</h3>
                        <p className="text-gray-400 text-sm mt-2 leading-relaxed max-w-lg">{series.blurb}</p>
                        <span className="text-xs text-gray-500 mt-3">
                          {series.episodes.length} {series.episodes.length === 1 ? 'message' : 'messages'}
                        </span>
                      </div>

                      <div className="hidden sm:flex items-center pr-6">
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-gold transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEACHERS.map((teacher) => (
                  <div key={teacher.name} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="relative h-16 w-16 shrink-0 rounded-full overflow-hidden ring-2 ring-gold/60">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${teacher.image})` }} />
                    </div>
                    <div>
                      <h4 className="font-heading font-black uppercase tracking-tight text-white text-base">{teacher.name}</h4>
                      <p className="text-gold text-xs font-bold uppercase tracking-widest mt-0.5">{teacher.role}</p>
                      <p className="text-gray-400 text-xs mt-1">{teacher.sermonCount} messages</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* SERIES MODAL */}
      <AnimatePresence>
        {openSeries && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setOpenSeries(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-background-dark)] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between p-6 sm:p-8">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold">{openSeries.category}</span>
                  <h2 className="font-heading font-black uppercase tracking-tight text-white text-2xl sm:text-3xl mt-1">{openSeries.title}</h2>
                  <p className="text-gray-400 text-sm mt-2 max-w-md">{openSeries.blurb}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenSeries(null)}
                  aria-label="Close"
                  className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="flex flex-col gap-2 px-6 sm:px-8 pb-8">
                {openSeries.episodes.map((episode, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setOpenSeries(null);
                      openPlayer({ title: episode.title, date: episode.date, duration: episode.duration, overview: openSeries.blurb });
                    }}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 hover:border-gold/40 p-3 text-left transition-colors"
                  >
                    <span className="font-heading font-black text-gold/60 group-hover:text-gold text-lg w-6 text-center shrink-0">{i + 1}</span>
                    <div className="h-14 w-20 rounded-lg overflow-hidden shrink-0">
                      <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${episode.image})` }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white text-sm font-bold truncate">{episode.title}</h4>
                      <p className="text-gray-500 text-xs mt-0.5">{episode.date} • {episode.duration}</p>
                    </div>
                    <svg className="w-4 h-4 text-gray-600 group-hover:text-gold transition-colors shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SEE MORE MODAL */}
      <AnimatePresence>
        {seeMoreSermon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSeeMoreSermon(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[var(--color-background-dark)] border border-white/10 rounded-2xl w-full max-w-lg overflow-hidden"
            >
              <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${seeMoreSermon.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)] to-transparent" />
                <button
                  type="button"
                  onClick={() => setSeeMoreSermon(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="font-heading font-black uppercase tracking-tight text-white text-2xl sm:text-3xl">{seeMoreSermon.title}</h2>
                <div className="flex items-center gap-3 mt-3 text-sm text-gray-300">
                  <span className="text-gold font-bold">{seeMoreSermon.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span>45 min</span>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Overview</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{seeMoreSermon.overview}</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSeeMoreSermon(null);
                    openPlayer({ title: seeMoreSermon.title, date: seeMoreSermon.date, duration: '45 min', overview: seeMoreSermon.overview });
                  }}
                  className="flex items-center justify-center gap-2 h-12 px-7 mt-7 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                  Watch Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAYER */}
      <AnimatePresence>
        {nowPlaying && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black">
            <button
              type="button"
              onClick={closePlayer}
              aria-label="Back"
              className="absolute top-6 left-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div className="absolute inset-0">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Y-x0efG1seA"
                title={nowPlaying.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {playing && <div onClick={() => setPlaying(false)} className="absolute inset-0 z-10 cursor-pointer" />}

            <AnimatePresence>
              {!playing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 z-10 bg-black/60 flex items-center"
                >
                  <div className="max-w-xl px-6 sm:px-10 lg:px-16">
                    <h1 className="font-heading font-black uppercase tracking-tight text-white text-3xl sm:text-5xl drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                      {nowPlaying.title}
                    </h1>
                    <div className="flex items-center gap-3 mt-4 text-sm sm:text-base font-medium text-gray-200">
                      <span className="text-gold font-bold">{nowPlaying.date}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
                      <span className="text-gray-300">{nowPlaying.duration}</span>
                    </div>
                    <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">{nowPlaying.overview}</p>
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 mt-8 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.35)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      Play
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

Library.displayName = 'Library';

export default Library;