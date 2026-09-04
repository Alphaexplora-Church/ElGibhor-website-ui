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
}

interface NowPlaying {
  title: string;
  date: string;
  duration: string;
  overview: string;
}

const placeholderSermons: Sermon[] = [
  {
    id: '1',
    title: 'Walking In Faith',
    date: 'August 24, 2026',
    overview:
      'Placeholder overview. A short summary of the message goes here — the main scripture, the central idea, and the takeaway for the congregation.',
    image: 'https://images.pexels.com/photos/11667919/pexels-photo-11667919.jpeg?_gl=1*1d8m26p*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc3MzU5OTAkbzUkZzEkdDE3ODc3MzY4MDgkajIxJGwwJGgw',
  },
  {
    id: '2',
    title: 'The Anchored Heart',
    date: 'August 17, 2026',
    overview:
      'Placeholder overview. Replace this with the real description of the sermon, including the speaker and the series it belongs to.',
    image: 'https://images.pexels.com/photos/14364672/pexels-photo-14364672.jpeg?_gl=1*667rfb*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc3MzU5OTAkbzUkZzEkdDE3ODc3MzY0NjYkajUxJGwwJGgw',
  },
  {
    id: '3',
    title: 'Grace That Moves',
    date: 'August 10, 2026',
    overview:
      'Placeholder overview. This is where the sermon summary will sit once the real content is ready to be added in.',
    image: 'https://images.pexels.com/photos/7697244/pexels-photo-7697244.jpeg?_gl=1*q4vg8l*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc3MzU5OTAkbzUkZzEkdDE3ODc3MzY1NTAkajI4JGwwJGgw',
  },
  {
    id: '4',
    title: 'Rooted & Unshaken',
    date: 'August 3, 2026',
    overview:
      'Placeholder overview. A brief, compelling summary of the sermon message will replace this placeholder text.',
    image: 'https://images.pexels.com/photos/34683153/pexels-photo-34683153.jpeg?_gl=1*1yy711q*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc3MzU5OTAkbzUkZzEkdDE3ODc3MzY3MzYkajUwJGwwJGgw',
  },
  {
    id: '5',
    title: 'Called By Name',
    date: 'July 27, 2026',
    overview:
      'Placeholder overview. Final placeholder slot — swap in the real title, date, thumbnail, and overview text.',
    image: 'https://images.pexels.com/photos/11140399/pexels-photo-11140399.jpeg?_gl=1*z943en*_ga*OTQwMjU2MDM1LjE3ODUyMjMwMjA.*_ga_8JE65Q40S6*czE3ODc3MzU5OTAkbzUkZzEkdDE3ODc3MzY3OTQkajU4JGwwJGgw',
  },
];

const AUTOPLAY_DELAY = 4000;
const SWIPE_THRESHOLD = 80;

const variants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 1.02,
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    scale: 1.02,
  }),
};

const durations = ['32 min', '38 min', '41 min', '45 min', '52 min'];
const thumbnails = [
  'https://images.pexels.com/photos/8468470/pexels-photo-8468470.jpeg',
  'https://images.pexels.com/photos/34352434/pexels-photo-34352434.jpeg',
  'https://images.pexels.com/photos/2170473/pexels-photo-2170473.jpeg',
  'https://images.pexels.com/photos/208216/pexels-photo-208216.jpeg',
  'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg',
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
  };
});

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
    timerRef.current = setInterval(() => {
      goTo(activeIndex + 1, 1);
    }, AUTOPLAY_DELAY);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeIndex, goTo]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x <= -SWIPE_THRESHOLD) {
      goNext();
    } else if (info.offset.x >= SWIPE_THRESHOLD) {
      goPrev();
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  const filteredWordItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return wordItems;
    return wordItems.filter((item) => item.title.toLowerCase().includes(query));
  }, [searchQuery]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredWordItems.length / itemsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWordItems.slice(start, start + itemsPerPage);
  }, [filteredWordItems, currentPage]);

  const paginationRange = useMemo(
    () => getPaginationRange(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const goToPage = useCallback(
    (page: number) => {
      const clamped = Math.max(1, Math.min(totalPages, page));
      setCurrentPage(clamped);
    },
    [totalPages]
  );

  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [playing, setPlaying] = useState(false);
  const [seeMoreSermon, setSeeMoreSermon] = useState<Sermon | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const openPlayer = (sermon: NowPlaying) => {
    setNowPlaying(sermon);
    setPlaying(false);
  };

  const closePlayer = () => {
    setNowPlaying(null);
    setPlaying(false);
  };

  return (
    <div className="bg-[var(--color-background-dark)] w-full min-h-screen pt-16 lg:pt-24">
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
            <div
              className="absolute inset-0 bg-cover bg-center select-none"
              style={{ backgroundImage: `url(${current.image})` }}
            />

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

              <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-xl leading-relaxed line-clamp-3">
                {current.overview}
              </p>

              <div className="flex items-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() =>
                    openPlayer({
                      title: current.title,
                      date: current.date,
                      duration: '45 min',
                      overview: current.overview,
                    })
                  }
                  className="flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.35)]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
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

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous sermon"
          className="hidden sm:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 backdrop-blur-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next sermon"
          className="hidden sm:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/30 border border-white/10 text-white hover:bg-black/50 backdrop-blur-md transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {placeholderSermons.map((sermon, index) => (
            <button
              key={sermon.id}
              type="button"
              aria-label={`Go to sermon ${index + 1}`}
              onClick={() => goToIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? 'w-8 bg-gold' : 'w-4 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16 lg:py-24">
        <div className="mb-12 text-center">
          <h2 className="font-heading font-black uppercase tracking-tight text-white text-3xl sm:text-4xl">
            More <span className="text-gold">Word</span>
          </h2>
          <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Placeholder subtitle — replace with real copy about the sermon library.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-md">
            <svg
              className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
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

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + searchQuery}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {pageItems.length === 0 && (
              <div className="col-span-full text-center text-gray-400 py-16">
                No sermons found for "{searchQuery}"
              </div>
            )}
            {pageItems.map((item) => {
              const isHovered = hoveredCard === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex flex-col cursor-pointer"
                >
                  <div
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() =>
                      setSeeMoreSermon({
                        id: item.id,
                        title: item.title,
                        date: item.date,
                        overview:
                          'Placeholder overview. Replace this with the real sermon description once the content is ready.',
                        image: item.image,
                      })
                    }
                    className="relative h-72 sm:h-80 bg-cover bg-center w-full overflow-hidden"
                    style={{ backgroundImage: `url(${item.image})` }}
                  >
                    <div
                      className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex items-center justify-center ${
                        isHovered ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-white/20 text-white font-bold text-sm backdrop-blur-md transition-all duration-300 ${
                          isHovered ? 'translate-y-0' : 'translate-y-2'
                        }`}
                      >
                        See More
                        <svg
                          className={`w-4 h-4 text-gold transition-transform duration-300 ${
                            isHovered ? 'translate-x-1' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center py-4 px-4 gap-1.5 bg-white z-10">
                    <h3 className="text-royal-purple-dark font-bold text-lg text-center">{item.title}</h3>
                    <p className="text-gray-500 text-xs">
                      {item.duration} • {item.date}
                    </p>
                    <div className="flex items-center gap-2 mt-2 w-full justify-center">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openPlayer({
                            title: item.title,
                            date: item.date,
                            duration: item.duration,
                            overview:
                              'Placeholder overview. Replace this with the real sermon description once the content is ready.',
                          });
                        }}
                        className="px-6 py-2 rounded-full bg-royal-purple-dark text-white text-xs font-bold tracking-wide hover:bg-royal-purple-light transition-colors duration-300"
                      >
                        Watch Now
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {paginationRange.map((page, idx) =>
            page === '...' ? (
              <span key={`ellipsis-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                onClick={() => goToPage(page as number)}
                aria-label={`Go to page ${page}`}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                  page === currentPage
                    ? 'bg-gold text-royal-purple-dark'
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                {page}
              </button>
            )
          )}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

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
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${seeMoreSermon.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-dark)] to-transparent" />
                <button
                  type="button"
                  onClick={() => setSeeMoreSermon(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 sm:p-8">
                <h2 className="font-heading font-black uppercase tracking-tight text-white text-2xl sm:text-3xl">
                  {seeMoreSermon.title}
                </h2>

                <div className="flex items-center gap-3 mt-3 text-sm text-gray-300">
                  <span className="text-gold font-bold">{seeMoreSermon.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span>45 min</span>
                </div>

                <div className="mt-6">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Overview</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{seeMoreSermon.overview}</p>
                </div>

                <div className="mt-5">
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Summary</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Placeholder summary text. This is where a longer recap of the sermon's key points will go once it's ready.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSeeMoreSermon(null);
                    openPlayer({
                      title: seeMoreSermon.title,
                      date: seeMoreSermon.date,
                      duration: '45 min',
                      overview: seeMoreSermon.overview,
                    });
                  }}
                  className="flex items-center justify-center gap-2 h-12 px-7 mt-7 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Watch Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {nowPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black"
          >
            <button
              type="button"
              onClick={closePlayer}
              aria-label="Back"
              className="absolute top-6 left-6 z-30 flex items-center justify-center w-11 h-11 rounded-full bg-black/40 border border-white/10 text-white hover:bg-black/60 backdrop-blur-md transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
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

            {playing && (
              <div
                onClick={() => setPlaying(false)}
                className="absolute inset-0 z-10 cursor-pointer"
              />
            )}

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

                    <p className="mt-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                      {nowPlaying.overview}
                    </p>

                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      className="flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-9 mt-8 rounded-full bg-gold text-royal-purple-dark font-black tracking-wide hover:bg-gold-light hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(239,191,4,0.35)]"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
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