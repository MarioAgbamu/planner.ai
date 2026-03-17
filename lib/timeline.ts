export type AssignmentType = 'essay' | 'research_paper' | 'presentation' | 'project' | 'lab_report'

export interface Phase {
  name: string
  percentage: number
  description: string
  icon: string
  tips: string[]
}

export interface Task {
  phase: string
  description: string
  icon: string
  startDate: Date
  endDate: Date
  tips: string[]
  phaseIndex: number
  totalPhases: number
  durationDays: number
}

export interface AssignmentInput {
  title: string
  type: AssignmentType
  startDate: Date
  dueDate: Date
  pages?: number
}

export type UrgencyLevel = 'plenty' | 'tight' | 'urgent'

// ─── Phase Definitions ────────────────────────────────────────────────────────

const PHASES: Record<AssignmentType, Phase[]> = {
  essay: [
    {
      name: 'Topic Selection & Planning',
      percentage: 10,
      description: 'Choose your topic, narrow your focus, and identify your argument.',
      icon: '🔍',
      tips: [
        'Brainstorm at least 5 possible angles',
        'Check that your topic is researchable',
        'Draft a preliminary thesis statement',
      ],
    },
    {
      name: 'Research & Reading',
      percentage: 25,
      description: 'Gather sources, take notes, and build your evidence base.',
      icon: '📚',
      tips: [
        'Aim for at least 5–8 credible sources',
        'Use a citation manager (Zotero, Mendeley)',
        'Annotate as you read',
      ],
    },
    {
      name: 'Outline & Structure',
      percentage: 10,
      description: 'Map out your argument, structure your sections, and plan transitions.',
      icon: '🗂️',
      tips: [
        'Write topic sentences for each paragraph',
        'Ensure your outline supports your thesis',
        'Plan intro, body, and conclusion',
      ],
    },
    {
      name: 'Writing First Draft',
      percentage: 40,
      description: 'Write freely — get your ideas down without worrying about perfection.',
      icon: '✍️',
      tips: [
        "Don't self-edit while writing",
        'Hit your word-count targets daily',
        'Leave placeholders for unclear sections',
      ],
    },
    {
      name: 'Editing & Proofreading',
      percentage: 15,
      description: 'Refine your argument, fix structure, and polish language and citations.',
      icon: '✅',
      tips: [
        'Read aloud to catch awkward phrasing',
        'Check all citations match your style guide',
        'Use a fresh-eye read (sleep on it)',
      ],
    },
  ],

  research_paper: [
    {
      name: 'Topic & Question Definition',
      percentage: 10,
      description: 'Define your research question and scope your investigation.',
      icon: '❓',
      tips: [
        'Formulate a clear, answerable question',
        'Review existing literature briefly',
        'Consult with your instructor early',
      ],
    },
    {
      name: 'Literature Review',
      percentage: 20,
      description: 'Systematically survey existing research and identify gaps.',
      icon: '📖',
      tips: [
        'Use academic databases (JSTOR, PubMed, Google Scholar)',
        'Track at least 10–15 key sources',
        'Organize by theme, not chronology',
      ],
    },
    {
      name: 'Research & Data Collection',
      percentage: 25,
      description: 'Conduct primary or secondary research to answer your question.',
      icon: '🔬',
      tips: [
        'Document your methodology clearly',
        'Back up all data immediately',
        'Note unexpected findings',
      ],
    },
    {
      name: 'Analysis & Interpretation',
      percentage: 15,
      description: 'Analyze your findings and develop your argument.',
      icon: '📊',
      tips: [
        'Connect findings to your research question',
        'Acknowledge limitations honestly',
        'Identify patterns and anomalies',
      ],
    },
    {
      name: 'Writing & Drafting',
      percentage: 20,
      description: 'Write your paper section by section, following academic conventions.',
      icon: '✍️',
      tips: [
        'Write abstract last',
        'Use precise, discipline-specific language',
        'Integrate sources with commentary',
      ],
    },
    {
      name: 'Revision & Formatting',
      percentage: 10,
      description: 'Polish your paper, verify citations, and apply formatting guidelines.',
      icon: '✅',
      tips: [
        'Double-check citation format (APA, MLA, Chicago)',
        'Review abstract to match paper content',
        'Proofread tables and figures',
      ],
    },
  ],

  presentation: [
    {
      name: 'Research & Content Gathering',
      percentage: 30,
      description: 'Research your topic and gather content, data, and visuals.',
      icon: '📚',
      tips: [
        'Know your audience and tailor content',
        'Gather high-quality images and stats',
        'Define 3 key takeaways',
      ],
    },
    {
      name: 'Slide Design & Creation',
      percentage: 40,
      description: 'Design your slides with clear visuals, minimal text, and strong flow.',
      icon: '🎨',
      tips: [
        '1 idea per slide rule',
        'Use consistent fonts and colors',
        'Prioritize visuals over text walls',
      ],
    },
    {
      name: 'Script & Speaker Notes',
      percentage: 15,
      description: 'Write talking points and polish your narrative delivery.',
      icon: '📝',
      tips: [
        'Write how you speak, not formally',
        'Prepare transition phrases between slides',
        'Note timing per section',
      ],
    },
    {
      name: 'Practice & Rehearsal',
      percentage: 15,
      description: 'Rehearse until confident — time yourself and refine delivery.',
      icon: '🎤',
      tips: [
        'Practice out loud, not in your head',
        'Record yourself once to review',
        'Rehearse with a friend for feedback',
      ],
    },
  ],

  project: [
    {
      name: 'Project Scoping & Planning',
      percentage: 15,
      description: 'Define requirements, set goals, and break down deliverables.',
      icon: '🗺️',
      tips: [
        'Write a brief project brief',
        'Identify all deliverables upfront',
        'Define success criteria clearly',
      ],
    },
    {
      name: 'Research & Discovery',
      percentage: 15,
      description: 'Research context, precedents, and gather necessary information.',
      icon: '🔍',
      tips: [
        'Look at 3–5 similar projects',
        'Interview stakeholders if applicable',
        'Document findings in a shared space',
      ],
    },
    {
      name: 'Design & Prototyping',
      percentage: 25,
      description: 'Create initial designs, wireframes, or prototypes for review.',
      icon: '✏️',
      tips: [
        'Start with low-fidelity sketches',
        'Get early feedback before going deep',
        'Iterate in short cycles',
      ],
    },
    {
      name: 'Development & Execution',
      percentage: 30,
      description: 'Build and execute the core project deliverables.',
      icon: '⚙️',
      tips: [
        'Track progress against your plan daily',
        'Address blockers immediately',
        'Keep a running changelog',
      ],
    },
    {
      name: 'Testing & Review',
      percentage: 10,
      description: 'Test, review, and validate against your original requirements.',
      icon: '🧪',
      tips: [
        'Test with actual users or peers',
        'Check against the original brief',
        'Fix critical issues before polishing',
      ],
    },
    {
      name: 'Final Polish & Submission',
      percentage: 5,
      description: 'Final refinements, documentation, and packaging for submission.',
      icon: '🚀',
      tips: [
        'Write a brief summary/README',
        'Double-check submission requirements',
        'Submit early if possible',
      ],
    },
  ],

  lab_report: [
    {
      name: 'Pre-Lab Preparation',
      percentage: 10,
      description: 'Read background theory, understand the experiment, and prepare your hypothesis.',
      icon: '📖',
      tips: [
        'Read the lab manual fully before your session',
        'Write your hypothesis before collecting any data',
        'Prepare a data table template in advance',
      ],
    },
    {
      name: 'Experiment & Data Collection',
      percentage: 25,
      description: 'Conduct the experiment carefully and record all observations and raw data.',
      icon: '🧪',
      tips: [
        'Record everything — even unexpected results',
        'Note units for every measurement',
        'Take photos of your setup if permitted',
      ],
    },
    {
      name: 'Data Analysis',
      percentage: 25,
      description: 'Process raw data, calculate results, and create graphs or tables.',
      icon: '📊',
      tips: [
        'Check calculations twice before writing up',
        'Use correct significant figures throughout',
        'Label all axes and include units on graphs',
      ],
    },
    {
      name: 'Discussion & Interpretation',
      percentage: 20,
      description: 'Interpret your results, explain any anomalies, and connect to theory.',
      icon: '🔎',
      tips: [
        'Compare your results to expected/literature values',
        'Identify sources of error honestly',
        'Explain whether your hypothesis was supported',
      ],
    },
    {
      name: 'Write-Up & References',
      percentage: 15,
      description: 'Write the full report — abstract, methods, results, discussion, conclusion.',
      icon: '✍️',
      tips: [
        'Write the abstract last',
        'Use passive voice for methods section',
        'Cite all data sources and equipment specifications',
      ],
    },
    {
      name: 'Proofread & Submit',
      percentage: 5,
      description: 'Check formatting, units, references, and submission requirements.',
      icon: '✅',
      tips: [
        "Check your institution's report format requirements",
        'Verify all figures are numbered and captioned',
        'Submit before the deadline — not at it',
      ],
    },
  ],
}

// ─── Core Logic ───────────────────────────────────────────────────────────────

/**
 * Returns the minimum number of days needed for a given assignment type.
 * Enforced as: at least one day per phase.
 */
export function getMinDays(type: AssignmentType): number {
  return PHASES[type].length
}

export function generateTimeline(input: AssignmentInput): Task[] {
  const { type, startDate, dueDate } = input
  const phases = PHASES[type]
  const MS_PER_DAY = 24 * 60 * 60 * 1000

  // FIX: enforce minimum viable timeline — at least 1 day per phase
  const totalDays = Math.max(
    phases.length,
    Math.ceil((dueDate.getTime() - startDate.getTime()) / MS_PER_DAY)
  )

  const tasks: Task[] = []
  let currentDate = new Date(startDate)
  // FIX: track allocated days to assign rounding remainder to last phase,
  // preventing cumulative drift that creates gaps or overlapping phases.
  let allocatedDays = 0

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i]
    const isLast = i === phases.length - 1

    // FIX: last phase gets exact remainder, not another rounded value
    const phaseDays = isLast
      ? Math.max(1, totalDays - allocatedDays)
      : Math.max(1, Math.round(totalDays * (phase.percentage / 100)))

    allocatedDays += phaseDays

    // End date is inclusive: startDate + (phaseDays - 1)
    // Last phase snaps exactly to dueDate
    const phaseEnd = isLast
      ? new Date(dueDate)
      : new Date(currentDate.getTime() + (phaseDays - 1) * MS_PER_DAY)

    tasks.push({
      phase: phase.name,
      description: phase.description,
      icon: phase.icon,
      startDate: new Date(currentDate),
      endDate: phaseEnd,
      tips: phase.tips,
      phaseIndex: i,
      totalPhases: phases.length,
      durationDays: phaseDays,
    })

    // Next phase starts the day after this phase ends
    currentDate = new Date(phaseEnd.getTime() + MS_PER_DAY)
  }

  return tasks
}

// ─── Urgency ──────────────────────────────────────────────────────────────────

// FIX: These are called at render time (not stored in state) so urgency is
// always current even if the user leaves the tab open overnight.
export function getUrgencyLevel(dueDate: Date): UrgencyLevel {
  const now = new Date()
  const daysRemaining = (dueDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
  if (daysRemaining > 14) return 'plenty'
  if (daysRemaining > 5) return 'tight'
  return 'urgent'
}

export function getDaysRemaining(dueDate: Date): number {
  const now = new Date()
  return Math.ceil((dueDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000))
}

// ─── Formatting Helpers ───────────────────────────────────────────────────────

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-CA', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export function formatDateRange(start: Date, end: Date): string {
  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear()
  if (sameMonth) {
    return `${start.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })} – ${end.getDate()}`
  }
  return `${formatDate(start)} – ${formatDate(end)}`
}

export function getTotalDays(startDate: Date, dueDate: Date): number {
  return Math.ceil((dueDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000))
}

export function getAssignmentTypeLabel(type: AssignmentType): string {
  const labels: Record<AssignmentType, string> = {
    essay: 'Essay',
    research_paper: 'Research Paper',
    presentation: 'Presentation',
    project: 'Project',
    lab_report: 'Lab Report',
  }
  return labels[type]
}

// ─── ICS Export ───────────────────────────────────────────────────────────────

const MS_PER_DAY = 24 * 60 * 60 * 1000

function toICSDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    date.getFullYear().toString() +
    pad(date.getMonth() + 1) +
    pad(date.getDate())
  )
}

// FIX: Produces a proper RFC 5545 DTSTAMP with actual HH:MM:SS UTC time
function toICSDTStamp(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return (
    date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) +
    'Z'
  )
}

// FIX: Escape RFC 5545 special characters in text values.
// Commas, semicolons and backslashes must be escaped; newlines use literal \n.
function escapeICSText(text: string): string {
  return text
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
}

// FIX: Fold long lines at 75 octets per RFC 5545 §3.1
function foldICSLine(line: string): string {
  const encoder = new TextEncoder()
  let result = ''
  let currentLine = ''
  for (const char of line) {
    const candidate = currentLine + char
    if (encoder.encode(candidate).length > 75) {
      result += currentLine + '\r\n '
      currentLine = char
    } else {
      currentLine = candidate
    }
  }
  return result + currentLine
}

export function generateICS(title: string, tasks: Task[]): string {
  const now = new Date()
  // FIX: use real generation timestamp
  const dtStamp = toICSDTStamp(now)

  const events = tasks
    .map((task, i) => {
      // FIX: guaranteed-unique UID using timestamp + index + random suffix
      const uid = `task-${i}-${now.getTime()}-${Math.random().toString(36).slice(2, 7)}@assignment-planner`
      const dtStart = toICSDate(task.startDate)
      // All-day events: DTEND is exclusive, so add one day
      const dtEnd = toICSDate(new Date(task.endDate.getTime() + MS_PER_DAY))
      // FIX: escape special chars in summary and description
      const summary = escapeICSText(`[${title}] ${task.phase}`)
      const description = escapeICSText(
        task.description + '\n\nTips: ' + task.tips.join(' | ')
      )

      const lines = [
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${dtStamp}`,
        `DTSTART;VALUE=DATE:${dtStart}`,
        `DTEND;VALUE=DATE:${dtEnd}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        'END:VEVENT',
      ]

      return lines.map(foldICSLine).join('\r\n')
    })
    .join('\r\n')

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Assignment Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    events,
    'END:VCALENDAR',
  ].join('\r\n')
}

// ─── Hourly / Sub-24h Mode ────────────────────────────────────────────────────
//
// When a deadline is within 24 hours, day-based planning is useless.
// This mode takes exact start and end datetimes (with timezone offset),
// calculates total available minutes, and divides into time blocks.

export interface HourlyInput {
  title: string
  type: AssignmentType
  /** Exact moment the student starts — local time resolved to UTC */
  startDateTime: Date
  /** Exact deadline — local time resolved to UTC */
  dueDateTime: Date
  /** User's timezone offset in minutes (e.g. -300 for UTC-5) — used for display only */
  tzOffsetMinutes: number
  pages?: number
}

export interface TimeBlock {
  phase: string
  description: string
  icon: string
  tips: string[]
  /** Absolute start moment */
  startTime: Date
  /** Absolute end moment */
  endTime: Date
  /** Duration in minutes */
  durationMinutes: number
  phaseIndex: number
  totalPhases: number
}

/**
 * Compact phase weightings for sub-24h deadlines.
 * Research is cut, writing is maximised, editing is preserved.
 * Each type has exactly the phases that matter when time is critical.
 */
const URGENT_PHASES: Record<AssignmentType, Phase[]> = {
  essay: [
    {
      name: 'Quick Research & Outline',
      percentage: 20,
      description: 'Skim 3–4 sources, lock in your argument, write a bullet outline.',
      icon: '⚡',
      tips: [
        'Use Google Scholar — limit to last 5 years',
        '3 sources is enough for a tight deadline',
        'Write your thesis before anything else',
      ],
    },
    {
      name: 'Write Introduction & Body',
      percentage: 50,
      description: 'Write straight through — no editing. Introduction, each body paragraph, evidence.',
      icon: '✍️',
      tips: [
        'Do not re-read what you just wrote',
        'Use your outline as a checklist, tick off each point',
        'Write [CITATION] inline — fill them in later',
      ],
    },
    {
      name: 'Write Conclusion',
      percentage: 10,
      description: 'Restate your argument, summarise your evidence, close strongly.',
      icon: '🏁',
      tips: [
        'One paragraph — do not introduce new ideas',
        'Mirror your introduction language',
        'End with a clear statement, not a question',
      ],
    },
    {
      name: 'Edit & Proofread',
      percentage: 15,
      description: 'One read-through for argument, one for language, citations last.',
      icon: '🔎',
      tips: [
        'Read aloud — your ear catches what your eye misses',
        'Fix citations now while sources are still open',
        'Check word count and trim if over',
      ],
    },
    {
      name: 'Final Check & Submit',
      percentage: 5,
      description: 'Formatting, file name, submission portal — done.',
      icon: '🚀',
      tips: [
        'Check submission format: PDF vs DOCX',
        'Re-read the brief one last time',
        'Submit 10 minutes early',
      ],
    },
  ],

  research_paper: [
    {
      name: 'Source Sprint',
      percentage: 25,
      description: 'Find 5–6 sources fast. Skim abstracts, note key arguments.',
      icon: '⚡',
      tips: [
        'Google Scholar + Ctrl+F key terms in PDFs',
        'Copy quotes directly — cite as you go',
        'Stop at 6 sources regardless',
      ],
    },
    {
      name: 'Outline & Argument',
      percentage: 10,
      description: 'Structure your paper: intro, 3–4 body sections, conclusion.',
      icon: '🗂️',
      tips: [
        'Each section = one main point',
        'Assign sources to sections now',
        'Write your thesis in one sentence',
      ],
    },
    {
      name: 'Draft All Sections',
      percentage: 45,
      description: 'Write every section in sequence. No editing.',
      icon: '✍️',
      tips: [
        'Write abstract last — skip it for now',
        'Integrate quotes with one sentence of analysis each',
        'Keep methodology brief — describe, do not justify',
      ],
    },
    {
      name: 'Citations & References',
      percentage: 10,
      description: 'Fill in all inline citations and build the reference list.',
      icon: '📚',
      tips: [
        'Use a citation generator (CitationMachine, Zotero)',
        'Match every [CITATION] placeholder',
        'Check citation style against brief',
      ],
    },
    {
      name: 'Edit & Submit',
      percentage: 10,
      description: 'One fast proofread, then submit.',
      icon: '🚀',
      tips: [
        'Check abstract matches your paper',
        'Verify page count and formatting',
        'Submit now — do not keep tweaking',
      ],
    },
  ],

  presentation: [
    {
      name: 'Core Message & Structure',
      percentage: 20,
      description: 'Decide your 3 key points. Sketch the slide order.',
      icon: '⚡',
      tips: [
        '3 key points max — anything more will not land',
        'Write your opening line and closing line first',
        'Sketch on paper before touching any software',
      ],
    },
    {
      name: 'Build Slides',
      percentage: 45,
      description: 'One idea per slide. Minimal text. Visuals only where they help.',
      icon: '🎨',
      tips: [
        'Use a template — do not design from scratch',
        'Max 6 words per slide',
        'Stick to 2 fonts, 2 colours',
      ],
    },
    {
      name: 'Write Speaker Notes',
      percentage: 15,
      description: 'One paragraph of notes per slide. Write how you talk.',
      icon: '📝',
      tips: [
        'Write conversationally, not formally',
        'Note your transition phrase to the next slide',
        'Highlight the one thing to say per slide',
      ],
    },
    {
      name: 'Practice Run',
      percentage: 15,
      description: 'Say it out loud once. Time yourself.',
      icon: '🎤',
      tips: [
        'Stand up and speak — do not mumble through it',
        'If over time, cut a slide, not speed',
        'Record yourself once to catch filler words',
      ],
    },
    {
      name: 'Final Check',
      percentage: 5,
      description: 'Typos, file export, backup link, submission.',
      icon: '🚀',
      tips: [
        'Export to PDF as a backup',
        'Test on a different device if possible',
        'Email yourself the file',
      ],
    },
  ],

  project: [
    {
      name: 'Scope & Prioritise',
      percentage: 15,
      description: 'List every deliverable. Cross out anything non-essential.',
      icon: '⚡',
      tips: [
        'What does the brief actually require vs what you imagined?',
        'Cut scope to the minimum viable deliverable',
        'Write the acceptance criteria in one sentence',
      ],
    },
    {
      name: 'Core Build',
      percentage: 55,
      description: 'Execute the minimum viable deliverable. Nothing extra.',
      icon: '⚙️',
      tips: [
        'Do not start polishing until the core works',
        'Save every 15 minutes',
        'Commit to decisions — no going back',
      ],
    },
    {
      name: 'Test & Fix Critical Bugs',
      percentage: 15,
      description: 'Test the happy path. Fix anything that blocks the reviewer.',
      icon: '🧪',
      tips: [
        'Test as if you have never seen this before',
        'Fix show-stoppers only — cosmetic issues can wait',
        'Document known issues honestly',
      ],
    },
    {
      name: 'Write Up & Submit',
      percentage: 15,
      description: 'README / report / cover sheet. Package and submit.',
      icon: '🚀',
      tips: [
        'Be concise — reviewers read fast under load',
        'State what works and what is incomplete',
        'Submit before deadline even if imperfect',
      ],
    },
  ],

  lab_report: [
    {
      name: 'Review Data & Plan',
      percentage: 15,
      description: 'Check your raw data, identify your key results, plan the report structure.',
      icon: '⚡',
      tips: [
        'Make sure all data tables are complete',
        'Identify the 2–3 results that matter most',
        'Check required sections against the mark scheme',
      ],
    },
    {
      name: 'Analysis & Graphs',
      percentage: 25,
      description: 'Process calculations, create graphs, note anomalies.',
      icon: '📊',
      tips: [
        'Label every axis with units',
        'Use correct significant figures throughout',
        'Compare to expected/literature values now',
      ],
    },
    {
      name: 'Write Results & Discussion',
      percentage: 35,
      description: 'Write your results section, then discussion. This is the bulk.',
      icon: '✍️',
      tips: [
        'Results: describe what you found, not what it means',
        'Discussion: interpret results, link to theory',
        'Address sources of error honestly',
      ],
    },
    {
      name: 'Introduction, Method & Conclusion',
      percentage: 15,
      description: 'Fill in remaining sections — these go faster.',
      icon: '📝',
      tips: [
        'Method: past tense, passive voice',
        'Introduction: brief background and hypothesis',
        'Conclusion: one paragraph summarising findings',
      ],
    },
    {
      name: 'References & Submit',
      percentage: 10,
      description: 'Add citations, check formatting, submit.',
      icon: '🚀',
      tips: [
        'Check your institution\'s referencing style',
        'Verify all figures are numbered and captioned',
        'Submit before the deadline',
      ],
    },
  ],
}

export function generateHourlyTimeline(input: HourlyInput): TimeBlock[] {
  const { type, startDateTime, dueDateTime } = input
  const phases = URGENT_PHASES[type]

  const totalMs = dueDateTime.getTime() - startDateTime.getTime()
  const totalMinutes = Math.max(phases.length * 5, Math.floor(totalMs / (1000 * 60)))

  const blocks: TimeBlock[] = []
  let currentTime = new Date(startDateTime)
  let allocatedMinutes = 0

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i]
    const isLast = i === phases.length - 1

    const blockMinutes = isLast
      ? Math.max(5, totalMinutes - allocatedMinutes)
      : Math.max(5, Math.round(totalMinutes * (phase.percentage / 100)))

    allocatedMinutes += blockMinutes

    const blockEnd = isLast
      ? new Date(dueDateTime)
      : new Date(currentTime.getTime() + blockMinutes * 60 * 1000)

    blocks.push({
      phase: phase.name,
      description: phase.description,
      icon: phase.icon,
      tips: phase.tips,
      startTime: new Date(currentTime),
      endTime: blockEnd,
      durationMinutes: blockMinutes,
      phaseIndex: i,
      totalPhases: phases.length,
    })

    currentTime = new Date(blockEnd)
  }

  return blocks
}

/** Format a Date as a local time string: "2:30 PM" */
export function formatTime(date: Date, tzOffsetMinutes: number): string {
  // Apply offset to get local time
  const local = new Date(date.getTime() + tzOffsetMinutes * 60 * 1000)
  const h = local.getUTCHours()
  const m = local.getUTCMinutes()
  const ampm = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 || 12
  return `${h12}:${m.toString().padStart(2, '0')} ${ampm}`
}

/** Format minutes as "1h 30m" or "45m" */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

/** Returns total hours and minutes remaining from now until dueDateTime */
export function getHoursRemaining(dueDateTime: Date): { hours: number; minutes: number; total: number } {
  const now = new Date()
  const ms = dueDateTime.getTime() - now.getTime()
  const total = Math.max(0, Math.floor(ms / (1000 * 60)))
  return { hours: Math.floor(total / 60), minutes: total % 60, total }
}
