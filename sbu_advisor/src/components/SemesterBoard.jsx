import { useState } from 'react';
import './SemesterBoard.css';

// Expected semester shape
// {
//   id: 'fall_2025',
//   label: 'Semester 1 (Fall 2025)',
//   courses: [ { id: 'CSE 214', name: 'Data Structures', credits: 4, status: 'prereq-issue' | 'valid' } ],
//   totalCredits: 4
// }

export default function SemesterBoard({ semesters = [], onDropCourse }) {
    const [dragOverId, setDragOverId] = useState(null);
        const handleDragOver = (e) => {
            e.preventDefault();
            // Try to determine source to set an appropriate dropEffect
            let effect = 'copy';
            try {
                const raw = e.dataTransfer.getData('application/x-course');
                if (raw) {
                    const payload = JSON.parse(raw);
                    if (payload?.source === 'semester') effect = 'move';
                }
            } catch {}
            e.dataTransfer.dropEffect = effect;
        };

        const handleDrop = (e, semId) => {
        e.preventDefault();
        const raw = e.dataTransfer.getData('application/x-course');
        if (!raw) return;
        try {
            const course = JSON.parse(raw);
            // Add default status if missing
            const normalized = { ...course, status: course.status || 'valid' };
            onDropCourse?.(semId, normalized);
        } catch (err) {
            // Silently ignore malformed payload
        }
            setDragOverId(null);
    };
  return (
    <div className="sem-board">
        
        {/* Render each semester column */}
            {semesters.map(sem => (
                <div
                    key={sem.id}
                        className={`sem-column${dragOverId === sem.id ? ' drag-over' : ''}`}
                    data-sem-id={sem.id}
                    onDragOver={handleDragOver}
                        onDragEnter={() => setDragOverId(sem.id)}
                        onDragLeave={() => setDragOverId(prev => (prev === sem.id ? null : prev))}
                    onDrop={(e) => handleDrop(e, sem.id)}
                >
                <div className="sem-column-header">
                <h3 className="sem-title">{sem.label}</h3>
                <div className="sem-meta">
                    <span className="badge credits" aria-label={`${sem.totalCredits} credits`}>{sem.totalCredits} credits</span>
                    <span className={`badge status ${sem.courses.some(c => c.status === 'prereq-issue') ? 'bad' : 'good'}`}>
                    {sem.courses.some(c => c.status === 'prereq-issue') ? 'Prereq Issue' : 'Valid'}
                    </span>
                </div>
            </div>

            <div className="sem-course-stack">
                    {sem.courses.map(c => (
                        <details key={c.id} className="course-card" open>
                        <summary
                            className="course-summary"
                            draggable
                                                onDragStart={(e) => {
                                                    e.dataTransfer.effectAllowed = 'copyMove';
                                e.dataTransfer.setData('application/x-course', JSON.stringify({
                                    id: c.id,
                                    name: c.name,
                                    credits: c.credits ?? 0,
                                    fromSemId: sem.id,
                                    source: 'semester'
                                }));
                                                    e.dataTransfer.setData('text/plain', c.id);
                            }}
                        >
                        <span className="drag-handle" aria-hidden="true">⋮⋮</span>
                        <div className="course-main">
                        <div className="course-header">
                            <span className="course-code">{c.id}</span>
                            <span className="course-credits" aria-label={`${c.credits} credits`}>{c.credits} cr</span>
                        </div>
                        <div className="course-name">{c.name}</div>
                        </div>
                    </summary>
                    {/* Future: expanded details body */}
                </details>
            ))}
            </div>
        </div>
        ))}
      
    </div>
  );
}
