'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Trophy, Star, Map, Clock, CheckCircle2, Compass, Mic, ChevronRight } from 'lucide-react';
import { useQuestStore } from '@/lib/store/questStore';
import { isWithinRadius, distanceMetres, bearingDegrees } from '@/lib/utils/geo';
import { LatLng, QuestStep } from '@/lib/types';

const ActiveQuestMap = dynamic(() => import('@/components/ActiveQuestMap'), {
  ssr: false,
  loading: () => <div className="w-full h-full" style={{ backgroundColor: '#1e1b4b' }} />,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDistance(m: number) {
  return m >= 1000 ? `${(m / 1000).toFixed(1)} km` : `${Math.round(m)} m`;
}

function fmtDuration(ms: number) {
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  return h > 0 ? `${h}h ${m % 60}m` : `${m}m`;
}

/** Move `from` 50 m toward `to` using spherical trig. */
function moveToward(from: LatLng, to: LatLng, metres: number): LatLng {
  const dist = distanceMetres(from, to);
  if (dist <= metres) return to;
  const R = 6_371_000;
  const d = metres / R;
  const brRad = (bearingDegrees(from, to) * Math.PI) / 180;
  const lat1  = (from.latitude  * Math.PI) / 180;
  const lng1  = (from.longitude * Math.PI) / 180;
  const lat2  = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brRad));
  const lng2  = lng1 + Math.atan2(Math.sin(brRad) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return { latitude: (lat2 * 180) / Math.PI, longitude: (lng2 * 180) / Math.PI };
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ActiveQuestPage() {
  const router = useRouter();
  const { activeQuest, activeSteps, activeState, advanceStep, completeStep, clearActiveQuest } = useQuestStore();

  const [userLocation,  setUserLocation]  = useState<LatLng | null>(null);
  const [taskUnlocked,  setTaskUnlocked]  = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [questComplete, setQuestComplete] = useState(false);
  const [exitModal,     setExitModal]     = useState(false);
  const [audioVisible,  setAudioVisible]  = useState(false);
  const [startTimeMs]                     = useState(() => Date.now());

  const currentIndex = activeState?.currentStepIndex ?? 0;
  const currentStep: QuestStep | undefined = activeSteps[currentIndex];

  // Guard: redirect if no active quest
  useEffect(() => {
    if (!activeQuest || !activeState) {
      router.replace('/quests');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Start geolocation watch
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => setUserLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      () => {/* permission denied — user can simulate */},
      { enableHighAccuracy: true, maximumAge: 5000 },
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Proximity check
  useEffect(() => {
    if (!userLocation || !currentStep || taskUnlocked) return;
    if (isWithinRadius(userLocation, currentStep.location, currentStep.radius)) {
      unlockTask();
    }
  }, [userLocation, currentStep?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  function unlockTask() {
    setTaskUnlocked(true);
    if (currentStep?.task.type === 'arrive') {
      doCompleteTask('');
    }
  }

  function doCompleteTask(result: string) {
    if (taskCompleted || !currentStep) return;
    completeStep({
      stepId: currentStep.id,
      completedAt: new Date().toISOString(),
      taskResult: result,
      pointsEarned: currentStep.pointsReward,
    });
    setTaskCompleted(true);
    if (currentStep.audioUrl) {
      setAudioVisible(true);
    }
  }

  function goNextStep() {
    setTaskUnlocked(false);
    setTaskCompleted(false);
    setAudioVisible(false);
    if (currentIndex + 1 >= activeSteps.length) {
      setQuestComplete(true);
    } else {
      advanceStep();
    }
  }

  function simulateGPS() {
    if (!currentStep) return;
    const from: LatLng = userLocation ?? {
      latitude:  currentStep.location.latitude  + 0.002,
      longitude: currentStep.location.longitude + 0.002,
    };
    setUserLocation(moveToward(from, currentStep.location, 50));
  }

  // ── Quest complete screen ─────────────────────────────────────────────────
  if (questComplete && activeState) {
    const elapsed = Date.now() - startTimeMs;
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ backgroundColor: '#0a0a1a' }}
      >
        <div className="w-full max-w-[430px] flex flex-col items-center text-center">
          <Trophy size={64} color="#f59e0b" />
          <h1 className="text-white text-2xl font-bold mt-4">Quest Complete!</h1>
          <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{activeQuest?.title}</p>

          {/* Stats card */}
          <div
            className="w-full rounded-3xl p-6 mt-8 flex flex-col gap-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.10)' }}
          >
            <CompletionRow icon={<Star size={18} fill="#f59e0b" color="#f59e0b" />} label="Points Earned"    value={`+${activeState.totalPointsEarned}`} />
            <CompletionRow icon={<Map  size={18} color="#a5b4fc" />}                label="Steps Completed" value={String(activeState.completedSteps.length)} />
            <CompletionRow icon={<Clock size={18} color="#a5b4fc" />}               label="Time Taken"      value={fmtDuration(elapsed)} />
          </div>

          <div className="w-full flex flex-col gap-3 mt-8">
            <button
              onClick={() => { clearActiveQuest(); router.replace('/quests'); }}
              className="w-full rounded-2xl py-4 font-bold text-white text-base transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#f59e0b' }}
            >
              Save to Memories ✓
            </button>
            <button
              onClick={() => { clearActiveQuest(); router.replace('/quests'); }}
              className="w-full rounded-2xl py-4 font-semibold text-white text-base transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(255,255,255,0.30)' }}
            >
              Back to Quests
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentStep || !activeState) return null;

  const distToStep = userLocation ? distanceMetres(userLocation, currentStep.location) : null;
  const progressPct = (currentIndex / activeSteps.length) * 100;

  // Layout constants — three fixed layers stacked vertically
  const TOP_BAR_H = 56;          // px — top bar height
  const PANEL_H   = '45vh';      // bottom panel height

  return (
    // Outer shell: fixed, full viewport, high z-index to escape root layout
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        backgroundColor: '#0f172a',
      }}
    >
      {/* ── 1. TOP BAR — fixed, z-index 1000, always on top ── */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: TOP_BAR_H,
          zIndex: 1000,
          backgroundColor: '#0f172a',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '0 16px',
        }}
      >
        <button
          onClick={() => setExitModal(true)}
          style={{
            flexShrink: 0,
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: 9999,
            padding: '6px 14px',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: 14,
            border: '1px solid rgba(255,255,255,0.20)',
            cursor: 'pointer',
          }}
        >
          ✕ Exit
        </button>
        <div
          style={{
            flex: 1,
            color: '#ffffff',
            fontWeight: 600,
            fontSize: 14,
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {activeQuest?.title}
        </div>
        <div
          style={{
            flexShrink: 0,
            backgroundColor: '#f59e0b',
            borderRadius: 9999,
            padding: '6px 12px',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 14,
          }}
        >
          {activeState.totalPointsEarned} pts
        </div>
      </div>

      {/* ── 2. MAP — sits between top bar and bottom panel ── */}
      <div
        style={{
          position: 'fixed',
          top: TOP_BAR_H,
          left: 0,
          right: 0,
          bottom: PANEL_H,
          zIndex: 910,
        }}
      >
        <ActiveQuestMap
          steps={activeSteps}
          currentStepIndex={currentIndex}
          userLocation={userLocation}
        />
      </div>

      {/* ── 3. BOTTOM PANEL — fixed height, white, z-index 1000 ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: PANEL_H,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: '0 -4px 16px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 12, paddingBottom: 8, flexShrink: 0 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#cbd5e1' }} />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 32px' }}>
          {/* Step counter + points badge */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#64748b' }}>
              Step {currentIndex + 1} of {activeSteps.length}
            </span>
            <span
              style={{
                borderRadius: 9999,
                padding: '4px 12px',
                fontSize: 12,
                fontWeight: 700,
                backgroundColor: '#fffbeb',
                color: '#d97706',
              }}
            >
              +{currentStep.pointsReward} pts
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 6, borderRadius: 9999, overflow: 'hidden', backgroundColor: '#f1f5f9', marginBottom: 16 }}>
            <div
              style={{
                height: '100%',
                borderRadius: 9999,
                backgroundColor: '#4f46e5',
                width: `${progressPct}%`,
                transition: 'width 0.5s ease',
              }}
            />
          </div>

          {/* Step title + description */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', margin: 0 }}>{currentStep.title}</h2>
          <p style={{ fontSize: 14, marginTop: 4, lineHeight: '1.5', color: '#64748b' }}>
            {currentStep.description}
          </p>

          {/* Task area */}
          <div style={{ marginTop: 16 }}>
            {!taskUnlocked ? (
              <ProximityPanel distanceM={distToStep} radius={currentStep.radius} onSimulate={simulateGPS} />
            ) : !taskCompleted ? (
              <TaskUI step={currentStep} onComplete={doCompleteTask} />
            ) : (
              <TaskDoneBanner points={currentStep.pointsReward} />
            )}
          </div>

          {/* Audio banner */}
          {audioVisible && currentStep.audioUrl && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                borderRadius: 16,
                padding: 16,
                marginTop: 16,
                backgroundColor: '#eff6ff',
                border: '1px solid #bfdbfe',
              }}
            >
              <span style={{ fontSize: 24 }}>📻</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#1e40af' }}>Listen to the story</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: '#3b82f6' }}>Audio guide available</p>
              </div>
              <a
                href={currentStep.audioUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: 9999,
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  textDecoration: 'none',
                }}
              >
                Play
              </a>
            </div>
          )}

          {/* Advance button */}
          {taskCompleted && (
            <button
              onClick={goNextStep}
              style={{
                width: '100%',
                borderRadius: 16,
                padding: '16px 0',
                fontWeight: 700,
                fontSize: 16,
                color: '#ffffff',
                backgroundColor: '#4f46e5',
                border: 'none',
                cursor: 'pointer',
                marginTop: 20,
              }}
            >
              {currentIndex + 1 >= activeSteps.length ? 'Finish Quest 🏆' : 'Next Step →'}
            </button>
          )}
        </div>
      </div>

      {/* ── Exit confirmation modal ── */}
      {exitModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1010,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 24px',
            backgroundColor: 'rgba(0,0,0,0.60)',
          }}
        >
          <div style={{ width: '100%', maxWidth: 340, borderRadius: 16, padding: 24, backgroundColor: '#ffffff' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Exit Quest?</h3>
            <p style={{ margin: '0 0 24px', fontSize: 14, color: '#64748b' }}>Your progress will be saved.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setExitModal(false)}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  padding: '12px 0',
                  fontWeight: 600,
                  fontSize: 15,
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'transparent',
                  color: '#64748b',
                  cursor: 'pointer',
                }}
              >
                Keep Going
              </button>
              <button
                onClick={() => router.replace('/quests')}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  padding: '12px 0',
                  fontWeight: 600,
                  fontSize: 15,
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProximityPanel({
  distanceM, radius, onSimulate,
}: { distanceM: number | null; radius: number; onSimulate: () => void }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ backgroundColor: '#f8fafc' }}>
      <div className="flex items-center gap-3">
        <div
          className="flex-shrink-0 flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, backgroundColor: '#e0e7ff' }}
        >
          <Compass size={22} color="#4f46e5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold" style={{ color: '#334155' }}>Walk to the marker on the map</p>
          {distanceM !== null ? (
            <p className="text-xs mt-0.5" style={{ color: '#64748b' }}>
              {fmtDistance(distanceM)} away · unlocks within {radius}m
            </p>
          ) : (
            <p className="text-xs mt-0.5" style={{ color: '#94a3b8' }}>Acquiring GPS…</p>
          )}
        </div>
      </div>
      <button
        onClick={onSimulate}
        className="rounded-xl py-2.5 font-semibold text-sm transition-opacity hover:opacity-80"
        style={{
          border: '2px dashed #fcd34d',
          backgroundColor: '#fffbeb',
          color: '#d97706',
        }}
      >
        🛠 DEV — Simulate Arrival (tap ~{Math.ceil(radius / 50)}×)
      </button>
    </div>
  );
}

function TaskUI({ step, onComplete }: { step: QuestStep; onComplete: (r: string) => void }) {
  switch (step.task.type) {
    case 'arrive':     return null;
    case 'quiz':       return <QuizTask task={step.task} onComplete={onComplete} />;
    case 'text_input': return <TextTask task={step.task} onComplete={onComplete} />;
    case 'photo':      return <PhotoTask task={step.task} onComplete={onComplete} />;
    default:
      return (
        <button
          onClick={() => onComplete('done')}
          className="w-full rounded-2xl py-4 font-bold text-white"
          style={{ backgroundColor: '#4f46e5' }}
        >
          Complete Task
        </button>
      );
  }
}

function QuizTask({ task, onComplete }: { task: QuestStep['task']; onComplete: (r: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  function pick(opt: string) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt.toLowerCase() === (task.correctAnswer ?? '').toLowerCase()) {
      setTimeout(() => onComplete(opt), 700);
    }
  }

  const isCorrect = (o: string) => answered && o.toLowerCase() === (task.correctAnswer ?? '').toLowerCase();
  const isWrong   = (o: string) => answered && selected === o && !isCorrect(o);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold leading-snug" style={{ color: '#1e293b' }}>{task.question}</p>
      <div className="flex flex-col gap-2">
        {(task.options ?? []).map((opt) => (
          <button
            key={opt}
            onClick={() => pick(opt)}
            className="rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors"
            style={{
              border: `2px solid ${isCorrect(opt) ? '#4ade80' : isWrong(opt) ? '#f87171' : selected === opt ? '#818cf8' : '#e2e8f0'}`,
              backgroundColor: isCorrect(opt) ? '#f0fdf4' : isWrong(opt) ? '#fef2f2' : selected === opt ? '#eef2ff' : '#ffffff',
              color: isCorrect(opt) ? '#15803d' : isWrong(opt) ? '#b91c1c' : '#374151',
            }}
          >
            {isCorrect(opt) ? '✓ ' : isWrong(opt) ? '✗ ' : ''}{opt}
          </button>
        ))}
      </div>
      {answered && !isCorrect(selected ?? '') && (
        <button onClick={() => { setSelected(null); setAnswered(false); }}
          className="text-sm text-center font-medium" style={{ color: '#4f46e5' }}>
          Try again
        </button>
      )}
      {task.hint && !answered && (
        <p className="text-xs text-center" style={{ color: '#94a3b8' }}>Hint: {task.hint}</p>
      )}
    </div>
  );
}

function TextTask({ task, onComplete }: { task: QuestStep['task']; onComplete: (r: string) => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function submit() {
    if (!value.trim()) return;
    if (task.correctAnswer && value.trim().toLowerCase() !== task.correctAnswer.toLowerCase()) {
      setError(true); return;
    }
    onComplete(value.trim());
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold leading-snug" style={{ color: '#1e293b' }}>{task.question}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => { setValue(e.target.value); setError(false); }}
        placeholder={task.hint ?? 'Type your answer…'}
        className="rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-400"
        style={{
          border: `2px solid ${error ? '#f87171' : '#e2e8f0'}`,
          backgroundColor: '#ffffff',
          color: '#0f172a',
        }}
      />
      {error && <p className="text-xs" style={{ color: '#ef4444' }}>Not quite — try again!</p>}
      {task.hint && <p className="text-xs" style={{ color: '#94a3b8' }}>Hint: {task.hint}</p>}
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="w-full rounded-2xl py-3.5 font-bold text-sm transition-opacity disabled:opacity-50"
        style={{ backgroundColor: '#4f46e5', color: '#ffffff' }}
      >
        Submit Answer
      </button>
    </div>
  );
}

function PhotoTask({ task, onComplete }: { task: QuestStep['task']; onComplete: (r: string) => void }) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold leading-snug" style={{ color: '#1e293b' }}>
        {task.question ?? 'Take a photo'}
      </p>

      {!photoUrl ? (
        <div className="flex flex-col gap-2">
          <label
            className="flex flex-col items-center justify-center rounded-2xl cursor-pointer transition-opacity hover:opacity-80"
            style={{
              height: 144,
              backgroundColor: '#f1f5f9',
              border: '2px dashed #cbd5e1',
            }}
          >
            <span style={{ fontSize: 40 }}>📷</span>
            <span className="text-sm font-medium mt-2" style={{ color: '#64748b' }}>Tap to upload photo</span>
            <input type="file" accept="image/*" capture="environment" onChange={handleFileChange} className="hidden" />
          </label>
          <button
            onClick={() => onComplete('https://picsum.photos/400/300?random=' + Date.now())}
            className="rounded-xl py-2.5 font-semibold text-sm"
            style={{ border: '2px dashed #fcd34d', backgroundColor: '#fffbeb', color: '#d97706' }}
          >
            🛠 DEV — Use Test Photo
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={photoUrl} alt="capture" className="w-full rounded-2xl object-cover" style={{ height: 192 }} />
          <button
            onClick={() => setPhotoUrl(null)}
            className="absolute top-2 right-2 rounded-full px-3 py-1 text-xs text-white font-medium"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
          >
            Retake
          </button>
        </div>
      )}

      {photoUrl && (
        <button
          onClick={() => onComplete(photoUrl)}
          className="w-full rounded-2xl py-3.5 font-bold text-white text-sm transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#4f46e5' }}
        >
          Submit Photo ✓
        </button>
      )}
    </div>
  );
}

function TaskDoneBanner({ points }: { points: number }) {
  return (
    <div
      className="flex items-center gap-3 rounded-2xl p-4"
      style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}
    >
      <CheckCircle2 size={28} color="#16a34a" className="flex-shrink-0" />
      <div>
        <p className="font-bold text-sm" style={{ color: '#15803d' }}>Task complete!</p>
        <p className="text-xs mt-0.5" style={{ color: '#16a34a' }}>+{points} points earned</p>
      </div>
    </div>
  );
}

function CompletionRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
      </div>
      <span className="font-bold text-base text-white">{value}</span>
    </div>
  );
}
