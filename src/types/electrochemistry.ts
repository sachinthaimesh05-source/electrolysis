export interface ChemicalReaction {
  equation: string;
  type: 'oxidation' | 'reduction' | 'overall';
  location: string;
  notes?: string;
}

export interface PracticalModule {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'cells' | 'electrolysis' | 'corrosion';
  materials: string[];
  procedure: string[];
  observations: string[];
  conclusions: string[];
  reactions: ChemicalReaction[];
}

export interface QuizQuestion {
  id: number;
  questionNumber: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedTopic: string;
}

export interface EssayQuestion {
  id: number;
  title: string;
  subQuestions: {
    number: string;
    question: string;
    answer: string;
    marks: number;
  }[];
}

export interface GlossaryItem {
  id: string;
  sinhala: string;
  english: string;
  description: string;
  category: 'cell' | 'electrolysis' | 'corrosion' | 'general';
}

export interface MetalReactivity {
  symbol: string;
  nameSinhala: string;
  nameEnglish: string;
  standardReductionPotential: number; // in Volts
  order: number; // 1 = highest reactivity
}
