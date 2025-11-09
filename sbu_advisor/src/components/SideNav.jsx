import { useMemo, useState } from 'react';
import './SideNav.css';
import catalog from '../data/available_classes_updated.json';

// Tabs shown in UI
const TABS = [
  'All Courses',
  'Core Requirements',
  'AI & Data Science',
  'Human-Computer Interaction',
  'Security & Privacy',
  'Systems Development',
  'Game Programming'
];

// Map specialization_name -> tab label
const SPEC_TO_TAB = {
  'Artificial Intelligence and Data Science': 'AI & Data Science',
  'Human-Computer Interaction': 'Human-Computer Interaction',
  'Security and Privacy': 'Security & Privacy',
  'Systems Software Development': 'Systems Development',
  'Game Programming': 'Game Programming'
};

// Normalize IDs like "CSE351" -> "CSE 351"
function normalizeId(raw) {
  if (!raw) return '';
  const s = String(raw).trim();
  const m = s.match(/^([A-Z]{2,4})\s*-?\s*(\d{3})$/i);
  if (m) return `${m[1].toUpperCase()} ${m[2]}`;
  return s;
}

function normalizeCredits(credits) {
  if (credits == null) return null;
  if (typeof credits === 'number') return String(credits);
  const s = String(credits).trim().replace(/–/g, '-'); // normalize en-dash
  const match = s.match(/^\d+(-\d+)?$/);
  return match ? s : (s.match(/\d+/)?.[0] ?? null);
}

function normalizeCourseLike(entry) {
  // Strings like "CSE 327 - Fundamentals of Computer Vision"
  if (typeof entry === 'string') {
    const [code, ...rest] = entry.split(' - ');
    const name = rest.join(' - ').trim();
    return [{
      id: normalizeId(code),
      name: name || normalizeId(code),
      credits: null,
      description: '',
      requirements: ''
    }];
  }

  // Choice groups (e.g., Security core options)
  if (entry && Array.isArray(entry.options)) {
    return entry.options.map(normalizeCourseLike).flat();
  }

  // Alternatives embedded in a course -> include base + alts (flatten)
  if (entry && Array.isArray(entry.alternative)) {
    return [
      normalizeCourseLike({ ...entry, alternative: undefined }),
      ...entry.alternative.map(normalizeCourseLike)
    ].flat();
  }

  if (!entry || typeof entry !== 'object') return [];

  const id = normalizeId(entry.id || entry.code || '');
  if (!id) return []; // skip entries without an ID/code

  const name = entry.name || entry.title || id;
  const credits = normalizeCredits(entry.credits);
  const description = entry.description || '';
  const requirements = entry.requirements || entry.prerequisites || '';
  return [{ id, name, credits, description, requirements }];
}

// Build a unique list of courses, tagging each with the tabs it belongs to
function buildCoursesIndex(data) {
  const byId = new Map();

  const upsert = (course, tab) => {
    if (!course || !course.id) return;
    const existing = byId.get(course.id) || { ...course, tabs: new Set(['All Courses']) };
    // Prefer non-empty fields
    existing.name = existing.name || course.name;
    existing.credits = existing.credits || course.credits;
    existing.description = existing.description || course.description;
    existing.requirements = existing.requirements || course.requirements;
    existing.tabs.add(tab);
    byId.set(course.id, existing);
  };

  data.forEach(section => {
    // Required -> Core Requirements tab
    if (section.Required) {
      section.Required.forEach(raw => {
        normalizeCourseLike(raw).forEach(c => upsert(c, 'Core Requirements'));
      });
    }
    // Specializations -> map each specialization_name to its tab
    if (section.Specializations) {
      section.Specializations.forEach(spec => {
        const tab = SPEC_TO_TAB[spec.specialization_name];
        if (!tab) return;
        // core_courses
        (spec.core_courses || []).forEach(raw => {
          normalizeCourseLike(raw).forEach(c => upsert(c, tab));
        });
        // electives: strings, objects, grouped objects
        (spec.electives || []).forEach(e => {
          if (Array.isArray(e?.courses)) {
            e.courses.forEach(raw => normalizeCourseLike(raw).forEach(c => upsert(c, tab)));
          } else {
            normalizeCourseLike(e).forEach(c => upsert(c, tab));
          }
        });
      });
    }
  });

  // Final array, sort by id
  return Array.from(byId.values())
    .map(c => ({ ...c, tabs: Array.from(c.tabs) }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export default function SideNav({ excludeIds, onUnscheduleCourse }) {
  const [activeTab, setActiveTab] = useState('All Courses');
  const [expandedId, setExpandedId] = useState(null);

  const courses = useMemo(() => buildCoursesIndex(catalog), []);
  const excluded = useMemo(() => new Set(excludeIds || []), [excludeIds]);
  const visible = useMemo(() => {
    const base = activeTab === 'All Courses' ? courses : courses.filter(c => c.tabs.includes(activeTab));
    // Hide courses that are already planned in any semester
    return base.filter(c => !excluded.has(c.id));
  }, [courses, activeTab, excluded]);

  const [dragUnschedule, setDragUnschedule] = useState(false);

  const handleDragOver = (e) => {
    const raw = e.dataTransfer.getData('application/x-course');
    // Even if raw not accessible yet, optimistically allow; we'll validate on drop.
    e.preventDefault();
    if (raw) {
      try {
        const payload = JSON.parse(raw);
        setDragUnschedule(payload.source === 'semester');
      } catch {
        setDragUnschedule(false);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData('application/x-course');
    if (!raw) return;
    try {
      const payload = JSON.parse(raw);
      if (payload.source === 'semester' && payload.fromSemId) {
        onUnscheduleCourse?.(payload.fromSemId, payload.id);
      }
    } catch {}
    setDragUnschedule(false);
  };

  return (
    <aside
      className={`side-nav${dragUnschedule ? ' drag-over-unschedule' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Search bar */}
      <div className="sn-search">
        <i className="bi bi-search" aria-hidden="true" />
        <input
          aria-label="Search courses"
          placeholder="Search courses..."
          disabled
        />
      </div>

      {/* Category chips */}
      <div className="sn-chips" role="tablist" aria-label="Course categories">
        {TABS.map(t => (
          <button
            key={t}
            role="tab"
            aria-selected={activeTab === t}
            className={`sn-chip ${activeTab === t ? 'active' : ''}`}
            onClick={() => setActiveTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Course cards (from JSON) */}
      <div className="sn-course-list">
        {visible.map(c => {
          const isOpen = expandedId === c.id;
          const dragPayload = JSON.stringify({
            id: c.id,
            name: c.name,
            credits: (typeof c.credits === 'string' ? parseInt(c.credits) : c.credits) ?? 0,
            source: 'catalog'
          });
          return (
            <article
              key={c.id}
              className="sn-card"
              draggable
              aria-grabbed={false}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'copyMove';
                e.dataTransfer.setData('application/x-course', dragPayload);
                // Provide plain text fallback for some browsers / debugging
                e.dataTransfer.setData('text/plain', c.id);
              }}
            >
              <div className="sn-card-left">
                <i className="bi bi-grip-vertical" aria-hidden="true" />
              </div>
              <div className="sn-card-body">
                <div className="sn-card-header">
                  <h4 className="sn-code">{c.id}</h4>
                  {c.credits != null && (
                    <span className="sn-credit">{String(c.credits)} credits</span>
                  )}
                </div>
                <div className="sn-title">{c.name}</div>
                {isOpen && (
                  <div className="sn-details">
                    {c.description && <p className="sn-desc">{c.description}</p>}
                    {c.requirements && (
                      <p className="sn-req"><strong>Prerequisites:</strong> {c.requirements}</p>
                    )}
                  </div>
                )}
              </div>
              <button
                className="sn-expand"
                aria-label={isOpen ? 'Collapse details' : 'Expand details'}
                aria-expanded={isOpen}
                onClick={() => setExpandedId(isOpen ? null : c.id)}
              >
                <i className={`bi ${isOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
              </button>
            </article>
          );
        })}
      </div>
    </aside>
  )
}