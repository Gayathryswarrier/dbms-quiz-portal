import { useState, useEffect, useCallback, useRef } from "react";

const QUESTIONS = [
  // ===== TOPIC 1: Data, Database & DBMS Basics (2 Simple, 2 Medium, 1 Complex) =====
  { id: 1, topic: "DBMS Basics", difficulty: "Simple", question: "What is a database?", options: ["A single data file", "A collection of related data", "A programming language", "An operating system"], answer: 1 },
  { id: 2, topic: "DBMS Basics", difficulty: "Simple", question: "What is the primary goal of a DBMS?", options: ["To create websites", "To provide convenient and efficient storage and retrieval of data", "To design hardware systems", "To compile programming code"], answer: 1 },
  { id: 3, topic: "DBMS Basics", difficulty: "Medium", question: "Which of the following is NOT a function of a DBMS?", options: ["Defining data types and structures", "Constructing and storing data", "Compiling high-level programming languages", "Sharing data among multiple users"], answer: 2 },
  { id: 4, topic: "DBMS Basics", difficulty: "Medium", question: "What does the 'Manipulate' function of a DBMS involve?", options: ["Specifying data types and constraints", "Storing data on storage medium", "Querying, updating database, and generating reports", "Allowing concurrent access to database"], answer: 2 },
  { id: 5, topic: "DBMS Basics", difficulty: "Complex", question: "A database system must handle multiple concerns simultaneously. Which combination correctly represents ALL the core responsibilities of a DBMS?", options: ["Storage, retrieval, security of data, and avoiding anomalous results in shared access", "Storage, retrieval, user interface design, and network management", "Data entry, report generation, email integration, and backup", "File compression, indexing, defragmentation, and memory management"], answer: 0 },

  // ===== TOPIC 2: Characteristics of Database Approach (2 Simple, 2 Medium, 1 Complex) =====
  { id: 6, topic: "DB Characteristics", difficulty: "Simple", question: "What is metadata in a database system?", options: ["The actual data stored in tables", "Information that describes the structure of the database", "Backup copies of the database", "Temporary query results"], answer: 1 },
  { id: 7, topic: "DB Characteristics", difficulty: "Simple", question: "Where is the database definition stored in a DBMS?", options: ["In the application program", "In the DBMS catalog", "In the operating system", "In the user interface"], answer: 1 },
  { id: 8, topic: "DB Characteristics", difficulty: "Medium", question: "What is program-data independence?", options: ["Programs can run without any data", "The structure of data files is stored separately from access programs", "Data can exist without any programs", "Programs and data are stored on different computers"], answer: 1 },
  { id: 9, topic: "DB Characteristics", difficulty: "Medium", question: "A view in a database may contain virtual data that is:", options: ["Physically stored in a separate database", "Derived from database files but not explicitly stored", "Created by the operating system", "Always identical to the base table data"], answer: 1 },
  { id: 10, topic: "DB Characteristics", difficulty: "Complex", question: "The characteristic of data abstraction in a database approach is achieved through the combination of which two properties?", options: ["Data security and data backup", "Program-data independence and program-operation independence", "Data encryption and data compression", "Data partitioning and data replication"], answer: 1 },

  // ===== TOPIC 3: ACID Properties (2 Simple, 2 Medium, 1 Complex) =====
  { id: 11, topic: "ACID Properties", difficulty: "Simple", question: "The 'All or Nothing' rule in transactions refers to which ACID property?", options: ["Consistency", "Isolation", "Durability", "Atomicity"], answer: 3 },
  { id: 12, topic: "ACID Properties", difficulty: "Simple", question: "Which ACID property ensures that once a transaction is committed, its changes persist even after system failure?", options: ["Atomicity", "Consistency", "Isolation", "Durability"], answer: 3 },
  { id: 13, topic: "ACID Properties", difficulty: "Medium", question: "In a bank transfer of ₹100 from Account A to Account B, the Consistency property ensures that:", options: ["The transfer happens instantly", "The total balance in both accounts remains the same before and after the transaction", "Account A is debited before Account B is credited", "Both accounts are locked during the transfer"], answer: 1 },
  { id: 14, topic: "ACID Properties", difficulty: "Medium", question: "The Isolation property of ACID states that:", options: ["Transactions must be stored in isolated servers", "Each transaction must run in its own database", "One transaction should start execution only when the other has finished", "Transactions cannot share the same data"], answer: 2 },
  { id: 15, topic: "ACID Properties", difficulty: "Complex", question: "Consider two transactions T1 and T2 operating on item X. T1 reads X and multiplies it by 100, while T2 reads X and Y and writes Z=X+Y. If Isolation is violated, which scenario is most likely?", options: ["T2 reads the old value of X before T1 writes, resulting in incorrect Z", "T1 and T2 both complete successfully with correct results", "The database automatically resolves the conflict", "Both transactions are permanently aborted"], answer: 0 },

  // ===== TOPIC 4: Actors/Users in DBMS (2 Simple, 2 Medium, 1 Complex) =====
  { id: 16, topic: "DBMS Actors", difficulty: "Simple", question: "Who is responsible for authorizing access to the database?", options: ["End Users", "Database Designers", "Database Administrator (DBA)", "Application Programmers"], answer: 2 },
  { id: 17, topic: "DBMS Actors", difficulty: "Simple", question: "Which type of end user uses canned transactions to constantly query and update the database?", options: ["Casual end users", "Naïve/Parametric end users", "Sophisticated end users", "Standalone users"], answer: 1 },
  { id: 18, topic: "DBMS Actors", difficulty: "Medium", question: "What is the role of a Database Designer?", options: ["Administering database resources and authorizing access", "Identifying data to be stored and choosing appropriate structures", "Writing and testing application programs", "Using ready-made software packages for personal databases"], answer: 1 },
  { id: 19, topic: "DBMS Actors", difficulty: "Medium", question: "System Analysts in the context of DBMS are primarily responsible for:", options: ["Maintaining personal databases", "Determining requirements of end users and developing specifications for canned transactions", "Managing database security", "Designing the physical storage of data"], answer: 1 },
  { id: 20, topic: "DBMS Actors", difficulty: "Complex", question: "A bank teller who processes deposits and withdrawals using pre-programmed interfaces is classified as which type of end user, and WHY?", options: ["Sophisticated — because they understand banking complexities", "Casual — because they access the database occasionally", "Naïve/Parametric — because they use carefully programmed and tested canned transactions repeatedly", "Standalone — because they work independently at their counter"], answer: 2 },

  // ===== TOPIC 5: Data Types & Data Models (2 Simple, 2 Medium, 1 Complex) =====
  { id: 21, topic: "Data Types & Models", difficulty: "Simple", question: "Which of the following is an example of structured data?", options: ["PDF documents", "XML files", "Relational database tables", "Media logs"], answer: 2 },
  { id: 22, topic: "Data Types & Models", difficulty: "Simple", question: "XML data is an example of which type of data?", options: ["Structured data", "Semi-structured data", "Unstructured data", "Physical data"], answer: 1 },
  { id: 23, topic: "Data Types & Models", difficulty: "Medium", question: "Which data model uses concepts like entities, attributes, and relationships that are close to user perception?", options: ["Physical data model", "Representational data model", "High-level or conceptual data model", "Network data model"], answer: 2 },
  { id: 24, topic: "Data Types & Models", difficulty: "Medium", question: "In a hierarchical data model, data is presented to users in:", options: ["A flat table structure", "A network of interconnected records", "A tree-like hierarchy", "An unstructured format"], answer: 2 },
  { id: 25, topic: "Data Types & Models", difficulty: "Complex", question: "A company stores customer orders in SQL tables, product reviews as XML feeds, and surveillance footage as video files. Which classification correctly maps ALL three?", options: ["Structured, Structured, Semi-structured", "Structured, Semi-structured, Unstructured", "Semi-structured, Unstructured, Unstructured", "Unstructured, Semi-structured, Structured"], answer: 1 },

  // ===== TOPIC 6: Schemas, Instances & Database State (2 Simple, 2 Medium, 1 Complex) =====
  { id: 26, topic: "Schema & State", difficulty: "Simple", question: "The description of a database is called the:", options: ["Database state", "Database instance", "Database schema", "Database snapshot"], answer: 2 },
  { id: 27, topic: "Schema & State", difficulty: "Simple", question: "The data in a database at a particular moment in time is called:", options: ["Database schema", "Database state or snapshot", "Schema diagram", "Database definition"], answer: 1 },
  { id: 28, topic: "Schema & State", difficulty: "Medium", question: "When a new database is defined but no data has been loaded yet, the database is said to be in:", options: ["Initial state", "Empty state", "Valid state", "Current state"], answer: 1 },
  { id: 29, topic: "Schema & State", difficulty: "Medium", question: "When application requirements change and the database schema is modified, this process is known as:", options: ["Database migration", "Schema evolution", "Data transformation", "Schema diagram"], answer: 1 },
  { id: 30, topic: "Schema & State", difficulty: "Complex", question: "A database schema is designed and deployed with no data. Data is then loaded (initial state), and multiple update operations follow. Which statement is MOST accurate about the DBMS's role throughout this lifecycle?", options: ["The DBMS only validates the schema at design time", "The DBMS ensures every state of the database is a valid state that conforms to the schema constraints", "The DBMS only checks data validity during the initial load", "The DBMS delegates all validation to application programs"], answer: 1 },

  // ===== TOPIC 7: Three-Schema Architecture & Data Independence (2 Simple, 2 Medium, 1 Complex) =====
  { id: 31, topic: "Three-Schema & Independence", difficulty: "Simple", question: "The internal level of the three-schema architecture describes:", options: ["User views of the database", "The logical structure of the entire database", "The physical storage structure of the database", "External applications accessing the database"], answer: 2 },
  { id: 32, topic: "Three-Schema & Independence", difficulty: "Simple", question: "How many levels of schemas exist in the three-schema architecture?", options: ["Two", "Three", "Four", "Five"], answer: 1 },
  { id: 33, topic: "Three-Schema & Independence", difficulty: "Medium", question: "Logical data independence is the capacity to change which schema without affecting the external schema?", options: ["Internal schema", "Conceptual schema", "External schema", "Physical schema"], answer: 1 },
  { id: 34, topic: "Three-Schema & Independence", difficulty: "Medium", question: "The process of transforming requests and results between the three schema levels is called:", options: ["Data abstraction", "Mappings", "Schema evolution", "Data transformation"], answer: 1 },
  { id: 35, topic: "Three-Schema & Independence", difficulty: "Complex", question: "A DBA changes the storage structure of the database from B-tree indexing to hash indexing (internal schema change). For physical data independence to hold, which of the following must be TRUE?", options: ["The external schemas must be redesigned", "The conceptual and external schemas remain unchanged", "All application programs must be rewritten", "The database must be completely reloaded"], answer: 1 },

  // ===== TOPIC 8: Database Languages (2 Simple, 2 Medium, 1 Complex) =====
  { id: 36, topic: "DB Languages", difficulty: "Simple", question: "Which SQL command is used to retrieve data from a database?", options: ["INSERT", "UPDATE", "SELECT", "CREATE"], answer: 2 },
  { id: 37, topic: "DB Languages", difficulty: "Simple", question: "The COMMIT command belongs to which database language category?", options: ["DDL", "DML", "DCL", "TCL"], answer: 3 },
  { id: 38, topic: "DB Languages", difficulty: "Medium", question: "Which of the following commands belongs to Data Definition Language (DDL)?", options: ["SELECT", "GRANT", "ALTER", "ROLLBACK"], answer: 2 },
  { id: 39, topic: "DB Languages", difficulty: "Medium", question: "The GRANT and REVOKE commands belong to which language category?", options: ["DDL", "DML", "DCL", "TCL"], answer: 2 },
  { id: 40, topic: "DB Languages", difficulty: "Complex", question: "In a DBMS where DDL is used only for the conceptual schema, which additional languages are needed to specify the internal schema and external schema respectively?", options: ["DML and DCL", "SDL and VDL", "TCL and DCL", "VDL and DML"], answer: 1 },

  // ===== TOPIC 9: Transaction Processing & Concurrency Control (2 Simple, 2 Medium, 1 Complex) =====
  { id: 41, topic: "Transactions & Concurrency", difficulty: "Simple", question: "What are the two basic operations of a transaction?", options: ["Create and Delete", "Open and Close", "Read and Write", "Insert and Update"], answer: 2 },
  { id: 42, topic: "Transactions & Concurrency", difficulty: "Simple", question: "In interleaved processing, concurrent execution of processes occurs on:", options: ["Multiple CPUs simultaneously", "A single CPU with interleaved operations", "Distributed network nodes", "Separate memory partitions"], answer: 1 },
  { id: 43, topic: "Transactions & Concurrency", difficulty: "Medium", question: "The Lost Update Problem occurs when:", options: ["A transaction reads data that was updated by a failed transaction", "Two transactions accessing the same data have interleaved operations causing one update to be overwritten", "A summary function reads inconsistent data", "A transaction reads the same item twice with different values"], answer: 1 },
  { id: 44, topic: "Transactions & Concurrency", difficulty: "Medium", question: "The Temporary Update (Dirty Read) problem occurs when:", options: ["Two transactions overwrite each other's updates", "A transaction reads an item updated by another transaction that later fails", "An aggregate function computes incorrect results", "A transaction cannot find the required data item"], answer: 1 },
  { id: 45, topic: "Transactions & Concurrency", difficulty: "Complex", question: "Transaction T1 reads item X (value 80), subtracts 5, and writes X. Transaction T2 reads X, adds 4, and writes X. Without concurrency control, if T2 reads X AFTER T1 reads but BEFORE T1 writes, what will be the final incorrect value of X?", options: ["75", "79", "84", "80"], answer: 2 },

  // ===== TOPIC 10: Transaction Recovery, Failure & States (2 Simple, 2 Medium, 1 Complex) =====
  { id: 46, topic: "Recovery & States", difficulty: "Simple", question: "When a transaction completes successfully and its changes are permanently applied, the transaction is said to be:", options: ["Aborted", "Committed", "Rolled back", "Partially committed"], answer: 1 },
  { id: 47, topic: "Recovery & States", difficulty: "Simple", question: "The ROLLBACK operation signals that a transaction has ended:", options: ["Successfully", "Unsuccessfully, and all changes must be undone", "Partially, with some changes saved", "Successfully, but changes are temporary"], answer: 1 },
  { id: 48, topic: "Recovery & States", difficulty: "Medium", question: "Which failure type involves the concurrency control method aborting a transaction to resolve deadlock?", options: ["Computer failure", "Disk failure", "Concurrency control enforcement", "Physical catastrophe"], answer: 2 },
  { id: 49, topic: "Recovery & States", difficulty: "Medium", question: "In the transaction state diagram, a transaction moves to the 'partially committed' state when:", options: ["It starts execution", "It completes all its READ and WRITE operations", "It is permanently saved to the database", "It encounters a failure"], answer: 1 },
  { id: 50, topic: "Recovery & States", difficulty: "Complex", question: "A transaction T executes some operations, reaches the partially committed state, but then a system crash occurs before the recovery protocol can confirm permanent recording. According to the state transition diagram, what happens to T?", options: ["T moves to committed state since it was partially committed", "T moves to failed state because the check was not successful, and then to terminated state", "T remains in partially committed state until the system restarts", "T is automatically re-executed from the beginning"], answer: 1 },
];

// Shuffle array using Fisher-Yates
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Also shuffle options for each question
function shuffleQuestions(questions) {
  const shuffled = shuffleArray(questions);
  return shuffled.map(q => {
    const optionIndices = q.options.map((_, i) => i);
    const shuffledIndices = shuffleArray(optionIndices);
    const newOptions = shuffledIndices.map(i => q.options[i]);
    const newAnswer = shuffledIndices.indexOf(q.answer);
    return { ...q, options: newOptions, answer: newAnswer, originalId: q.id };
  });
}

const TIMER_SECONDS = 15;

const GOOGLE_SHEET_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzWdZa66qYq55nlO8KFHVjYN93-UA6ZVkCeKL6sCwG1i7HzzlnhJ-e8KSXukept9sBR/exec";

export default function DBMSQuizPortal() {
  const [screen, setScreen] = useState("login"); // login | rules | quiz | result
  const [studentName, setStudentName] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [score, setScore] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");
  const [locked, setLocked] = useState(false);
  const timerRef = useRef(null);
  const hasMovedRef = useRef(false);

  // Anti-copy: disable right-click, copy, cut, paste
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("copy", prevent);
    document.addEventListener("cut", prevent);
    document.addEventListener("paste", prevent);
    const preventKeys = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        ["c", "v", "x", "a", "u", "s", "p"].includes(e.key.toLowerCase())
      ) {
        e.preventDefault();
      }
      if (e.key === "PrintScreen" || e.key === "F12") e.preventDefault();
    };
    document.addEventListener("keydown", preventKeys);
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("copy", prevent);
      document.removeEventListener("cut", prevent);
      document.removeEventListener("paste", prevent);
      document.removeEventListener("keydown", preventKeys);
    };
  }, []);

  // Timer logic
  useEffect(() => {
    if (screen !== "quiz" || locked) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentQ, screen, locked]);

  const handleNext = useCallback(
    (timedOut = false) => {
      if (hasMovedRef.current) return;
      hasMovedRef.current = true;
      clearInterval(timerRef.current);

      const q = questions[currentQ];
      const chosen = timedOut ? -1 : selectedOption;
      const isCorrect = chosen === q.answer;
      const newAnswer = {
        qId: q.originalId,
        question: q.question,
        topic: q.topic,
        difficulty: q.difficulty,
        selected: chosen === -1 ? "Timed Out" : q.options[chosen],
        correct: q.options[q.answer],
        isCorrect,
      };

      const updatedAnswers = [...answers, newAnswer];
      setAnswers(updatedAnswers);
      if (isCorrect) setScore((s) => s + 1);

      if (currentQ + 1 < questions.length) {
        setCurrentQ((c) => c + 1);
        setSelectedOption(null);
        setTimeLeft(TIMER_SECONDS);
        setTimeout(() => { hasMovedRef.current = false; }, 100);
      } else {
        const finalScore = isCorrect ? score + 1 : score;
        setScreen("result");
        submitToSheet(updatedAnswers, finalScore);
      }
    },
    [currentQ, selectedOption, questions, answers, score]
  );

  const startQuiz = () => {
    if (!studentName.trim() || !registerNo.trim()) return;
    const shuffled = shuffleQuestions(QUESTIONS);
    setQuestions(shuffled);
    setScreen("rules");
  };

  const beginQuiz = () => {
    setQuizStartTime(new Date());
    setScreen("quiz");
    setTimeLeft(TIMER_SECONDS);
    hasMovedRef.current = false;
  };

  const submitToSheet = async (allAnswers, finalScore) => {
    setIsSubmitting(true);
    const payload = {
      timestamp: new Date().toISOString(),
      registerNo,
      studentName,
      score: finalScore,
      total: QUESTIONS.length,
      percentage: ((finalScore / QUESTIONS.length) * 100).toFixed(1),
      answers: allAnswers.map((a) => ({
        question: a.question,
        topic: a.topic,
        difficulty: a.difficulty,
        selected: a.selected,
        correct: a.correct,
        isCorrect: a.isCorrect,
      })),
    };

    if (GOOGLE_SHEET_SCRIPT_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE") {
      setExportStatus("demo_mode");
      setIsSubmitting(false);
      return;
    }

    try {
      await fetch(GOOGLE_SHEET_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setExportStatus("success");
    } catch {
      setExportStatus("error");
    }
    setIsSubmitting(false);
  };

  const downloadCSV = () => {
    const header = "Register No,Name,Score,Total,Percentage,Q#,Topic,Difficulty,Question,Selected,Correct Answer,Result\n";
    const rows = answers.map((a, i) =>
      `"${registerNo}","${studentName}",${score},${QUESTIONS.length},${((score / QUESTIONS.length) * 100).toFixed(1)},"${i + 1}","${a.topic}","${a.difficulty}","${a.question.replace(/"/g, '""')}","${a.selected}","${a.correct}","${a.isCorrect ? "Correct" : "Wrong"}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${registerNo}_DBMS_Quiz_Results.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor = timeLeft <= 5 ? "#ef4444" : timeLeft <= 10 ? "#f59e0b" : "#22c55e";

  // ========== LOGIN SCREEN ==========
  if (screen === "login") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16, userSelect: "none" }}>
        <div style={{ width: "100%", maxWidth: 440, background: "#1e293b", borderRadius: 16, padding: 40, boxShadow: "0 25px 50px rgba(0,0,0,0.4)", border: "1px solid #334155" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: 14, letterSpacing: 3, color: "#94a3b8", textTransform: "uppercase", marginBottom: 8 }}>CHRIST (Deemed to be University)</div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", margin: "0 0 4px" }}>DBMS Quiz Portal</h1>
            <div style={{ fontSize: 13, color: "#64748b" }}>Database Fundamentals & Transaction Management</div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 6, fontWeight: 500 }}>Register Number</label>
            <input value={registerNo} onChange={(e) => setRegisterNo(e.target.value.toUpperCase())} placeholder="e.g. 2341001" style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #475569", background: "#0f172a", color: "#f1f5f9", fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#475569"} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 13, color: "#94a3b8", marginBottom: 6, fontWeight: 500 }}>Full Name</label>
            <input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter your full name" style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: "1px solid #475569", background: "#0f172a", color: "#f1f5f9", fontSize: 15, outline: "none", boxSizing: "border-box", transition: "border 0.2s" }} onFocus={(e) => e.target.style.borderColor = "#6366f1"} onBlur={(e) => e.target.style.borderColor = "#475569"} />
          </div>
          <button onClick={startQuiz} disabled={!studentName.trim() || !registerNo.trim()} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: (!studentName.trim() || !registerNo.trim()) ? "#334155" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: (!studentName.trim() || !registerNo.trim()) ? "#64748b" : "#fff", fontSize: 16, fontWeight: 600, cursor: (!studentName.trim() || !registerNo.trim()) ? "not-allowed" : "pointer", transition: "all 0.2s", letterSpacing: 0.5 }}>
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // ========== RULES SCREEN ==========
  if (screen === "rules") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16, userSelect: "none" }}>
        <div style={{ width: "100%", maxWidth: 520, background: "#1e293b", borderRadius: 16, padding: 40, boxShadow: "0 25px 50px rgba(0,0,0,0.4)", border: "1px solid #334155" }}>
          <h2 style={{ color: "#f1f5f9", fontSize: 22, marginTop: 0, marginBottom: 8 }}>Welcome, {studentName}</h2>
          <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 24 }}>Register No: {registerNo}</p>
          <div style={{ background: "#0f172a", borderRadius: 12, padding: 24, marginBottom: 24, border: "1px solid #334155" }}>
            <h3 style={{ color: "#f59e0b", fontSize: 16, marginTop: 0, marginBottom: 16 }}>Quiz Rules</h3>
            {[
              "You will answer 50 multiple-choice questions.",
              "Each question has a 15-second timer.",
              "If time runs out, the question is marked as unanswered.",
              "Each question can be attempted only ONCE — no going back.",
              "Questions appear in random order unique to you.",
              "Right-click, copy, and keyboard shortcuts are disabled.",
              "Your score and answers will be recorded for grading.",
              "Switching tabs or windows may be monitored."
            ].map((rule, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#6366f1", fontWeight: 700, fontSize: 14, minWidth: 20 }}>{i + 1}.</span>
                <span style={{ color: "#cbd5e1", fontSize: 14, lineHeight: 1.5 }}>{rule}</span>
              </div>
            ))}
          </div>
          <button onClick={beginQuiz} style={{ width: "100%", padding: "14px", borderRadius: 10, border: "none", background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer", letterSpacing: 0.5 }}>
            I Understand — Begin Quiz
          </button>
        </div>
      </div>
    );
  }

  // ========== QUIZ SCREEN ==========
  if (screen === "quiz") {
    const q = questions[currentQ];
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16, userSelect: "none", WebkitUserSelect: "none" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "12px 16px", background: "#1e293b", borderRadius: 12, border: "1px solid #334155" }}>
            <div>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>{studentName}</span>
              <span style={{ color: "#475569", margin: "0 8px" }}>|</span>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>{registerNo}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#94a3b8", fontSize: 12 }}>Score:</span>
              <span style={{ color: "#22c55e", fontSize: 16, fontWeight: 700 }}>{score}</span>
              <span style={{ color: "#475569" }}>/</span>
              <span style={{ color: "#94a3b8", fontSize: 14 }}>{QUESTIONS.length}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 4, background: "#334155", borderRadius: 4, marginBottom: 20, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${((currentQ + 1) / questions.length) * 100}%`, background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: 4, transition: "width 0.3s" }} />
          </div>

          {/* Question Card */}
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 32, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", border: "1px solid #334155" }}>
            {/* Timer + question meta */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ background: "#6366f120", color: "#a5b4fc", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>Q{currentQ + 1}/{questions.length}</span>
                <span style={{ background: q.difficulty === "Simple" ? "#22c55e20" : q.difficulty === "Medium" ? "#f59e0b20" : "#ef444420", color: q.difficulty === "Simple" ? "#4ade80" : q.difficulty === "Medium" ? "#fbbf24" : "#f87171", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{q.difficulty}</span>
                <span style={{ background: "#0ea5e920", color: "#67e8f9", padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 500 }}>{q.topic}</span>
              </div>

              {/* Timer circle */}
              <div style={{ position: "relative", width: 48, height: 48 }}>
                <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="24" cy="24" r="20" fill="none" stroke="#334155" strokeWidth="4" />
                  <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="4" strokeDasharray={`${2 * Math.PI * 20}`} strokeDashoffset={`${2 * Math.PI * 20 * (1 - timerPercent / 100)}`} strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.9s linear, stroke 0.3s" }} />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: timerColor, fontSize: 16, fontWeight: 700 }}>{timeLeft}</div>
              </div>
            </div>

            {/* Question text */}
            <h2 style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 600, lineHeight: 1.6, marginBottom: 24, marginTop: 0 }}>{q.question}</h2>

            {/* Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {q.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                return (
                  <button key={i} onClick={() => setSelectedOption(i)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", borderRadius: 10, border: isSelected ? "2px solid #6366f1" : "1px solid #334155", background: isSelected ? "#6366f115" : "#0f172a", cursor: "pointer", textAlign: "left", transition: "all 0.15s", color: "#e2e8f0" }}>
                    <div style={{ width: 28, height: 28, borderRadius: "50%", border: isSelected ? "2px solid #6366f1" : "2px solid #475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: isSelected ? "#6366f1" : "#94a3b8", background: isSelected ? "#6366f120" : "transparent", flexShrink: 0, transition: "all 0.15s" }}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span style={{ fontSize: 15, lineHeight: 1.5 }}>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Next button */}
            <button onClick={() => handleNext(false)} disabled={selectedOption === null} style={{ marginTop: 24, width: "100%", padding: "14px", borderRadius: 10, border: "none", background: selectedOption === null ? "#334155" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: selectedOption === null ? "#64748b" : "#fff", fontSize: 15, fontWeight: 600, cursor: selectedOption === null ? "not-allowed" : "pointer", transition: "all 0.2s" }}>
              {currentQ + 1 === questions.length ? "Submit Quiz" : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ========== RESULT SCREEN ==========
  if (screen === "result") {
    const pct = ((score / QUESTIONS.length) * 100).toFixed(1);
    const grade = pct >= 90 ? "A+" : pct >= 80 ? "A" : pct >= 70 ? "B+" : pct >= 60 ? "B" : pct >= 50 ? "C" : pct >= 40 ? "D" : "F";
    const gradeColor = pct >= 70 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";

    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", fontFamily: "'Segoe UI', system-ui, sans-serif", padding: 16, userSelect: "none" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Score card */}
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 40, boxShadow: "0 25px 50px rgba(0,0,0,0.4)", border: "1px solid #334155", textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 13, color: "#94a3b8", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Quiz Complete</div>
            <h1 style={{ fontSize: 28, color: "#f1f5f9", marginTop: 0, marginBottom: 4 }}>{studentName}</h1>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>{registerNo}</p>
            <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 120, height: 120, borderRadius: "50%", border: `4px solid ${gradeColor}`, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 36, fontWeight: 800, color: gradeColor }}>{grade}</div>
                <div style={{ fontSize: 12, color: "#94a3b8" }}>{pct}%</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 24 }}>
              <div><div style={{ fontSize: 28, fontWeight: 700, color: "#22c55e" }}>{score}</div><div style={{ fontSize: 12, color: "#94a3b8" }}>Correct</div></div>
              <div><div style={{ fontSize: 28, fontWeight: 700, color: "#ef4444" }}>{QUESTIONS.length - score}</div><div style={{ fontSize: 12, color: "#94a3b8" }}>Wrong</div></div>
              <div><div style={{ fontSize: 28, fontWeight: 700, color: "#f1f5f9" }}>{QUESTIONS.length}</div><div style={{ fontSize: 12, color: "#94a3b8" }}>Total</div></div>
            </div>

            {exportStatus === "demo_mode" && (
              <div style={{ background: "#f59e0b15", border: "1px solid #f59e0b40", borderRadius: 10, padding: 16, marginBottom: 16, textAlign: "left" }}>
                <div style={{ color: "#fbbf24", fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Google Sheets Integration</div>
                <div style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6 }}>
                  To enable automatic export, deploy the Google Apps Script (included in setup instructions) and replace the placeholder URL in the code. For now, you can download results as CSV.
                </div>
              </div>
            )}
            {exportStatus === "success" && (
              <div style={{ background: "#22c55e15", border: "1px solid #22c55e40", borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <span style={{ color: "#4ade80", fontSize: 14 }}>Results exported to Google Sheet successfully.</span>
              </div>
            )}
            {exportStatus === "error" && (
              <div style={{ background: "#ef444415", border: "1px solid #ef444440", borderRadius: 10, padding: 12, marginBottom: 16 }}>
                <span style={{ color: "#f87171", fontSize: 14 }}>Export failed. Please download CSV instead.</span>
              </div>
            )}

            <button onClick={downloadCSV} style={{ padding: "12px 32px", borderRadius: 10, border: "1px solid #6366f1", background: "transparent", color: "#a5b4fc", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Download Results CSV
            </button>
          </div>

          {/* Answer review */}
          <div style={{ background: "#1e293b", borderRadius: 16, padding: 24, border: "1px solid #334155" }}>
            <h3 style={{ color: "#f1f5f9", fontSize: 18, marginTop: 0, marginBottom: 16 }}>Answer Review</h3>
            {answers.map((a, i) => (
              <div key={i} style={{ padding: "14px 16px", borderRadius: 10, border: `1px solid ${a.isCorrect ? "#22c55e30" : "#ef444430"}`, background: a.isCorrect ? "#22c55e08" : "#ef444408", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 500, flex: 1 }}>Q{i + 1}. {a.question}</span>
                  <span style={{ fontSize: 18, marginLeft: 8 }}>{a.isCorrect ? "✓" : "✗"}</span>
                </div>
                <div style={{ fontSize: 13, color: "#94a3b8" }}>
                  <span>Your answer: </span>
                  <span style={{ color: a.isCorrect ? "#4ade80" : "#f87171" }}>{a.selected}</span>
                  {!a.isCorrect && <span style={{ color: "#64748b" }}> → Correct: <span style={{ color: "#4ade80" }}>{a.correct}</span></span>}
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <span style={{ fontSize: 11, color: "#64748b", background: "#0f172a", padding: "2px 8px", borderRadius: 4 }}>{a.topic}</span>
                  <span style={{ fontSize: 11, color: "#64748b", background: "#0f172a", padding: "2px 8px", borderRadius: 4 }}>{a.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
