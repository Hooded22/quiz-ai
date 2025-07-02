'use client';

import styles from './InterviewAISection.module.css';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import QuizIcon from '@mui/icons-material/Quiz';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TimelineIcon from '@mui/icons-material/Timeline';
import { SvgIconProps } from '@mui/material';

// Define the card content
interface CardContent {
  title: string;
  text: string;
  icon: React.ReactNode;
}

const interviewAICards: CardContent[] = [
  {
    title: "Personalized Feedback",
    text: "Get detailed feedback on your interview performance with actionable insights to improve.",
    icon: <FeedbackIcon sx={{ fontSize: 30 }} />
  },
  {
    title: "Real-time Analysis",
    text: "Our AI analyzes your responses in real-time to provide immediate guidance and suggestions.",
    icon: <AnalyticsIcon sx={{ fontSize: 30 }} />
  },
  {
    title: "Customized Questions",
    text: "Practice with questions tailored to your experience level and target position.",
    icon: <QuizIcon sx={{ fontSize: 30 }} />
  },
  {
    title: "Skill Assessment",
    text: "Identify your strengths and areas for improvement with comprehensive skill assessments.",
    icon: <AssessmentIcon sx={{ fontSize: 30 }} />
  },
  {
    title: "Interview Strategies",
    text: "Learn effective strategies to tackle challenging interview questions with confidence.",
    icon: <PsychologyIcon sx={{ fontSize: 30 }} />
  },
  {
    title: "Progress Tracking",
    text: "Monitor your improvement over time with detailed progress reports and analytics.",
    icon: <TimelineIcon sx={{ fontSize: 30 }} />
  }
];

export default function InterviewAISection() {
  return (
    <div className={styles.interviewAISection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Elevate your interviews with <span className={styles.highlight}>Interview AI</span></h2>
        <p className={styles.subtitle}>Our AI-first approach revolutionizes how you learn and master coding</p>
      </div>

      <div className={styles.cardGrid}>
        {interviewAICards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardIcon}>
              {card.icon}
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardText}>{card.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
