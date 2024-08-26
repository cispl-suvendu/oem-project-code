export default function getComplexity(complexity: number) {
  if (complexity === 0) {
    return <div className="complexity-badge complexity-easy">Easy</div>;
  } else if (complexity === 1) {
    return <div className="complexity-badge complexity-moderate">Moderate</div>;
  } else if (complexity === 2) {
    return <div className="complexity-badge complexity-complex">Complex</div>;
  } else if (complexity === 3) {
    return <div className="complexity-badge complexity-pro">Pro</div>;
  } else {
    return <div className="complexity-badge complexity-none">None</div>;
  }
}

export const ComplexityData = [
  {
    name: "Easy",
    id: 0,
  },
  {
    name: "Moderate",
    id: 1,
  },
  {
    name: "Complex",
    id: 2,
  },
  {
    name: "Pro",
    id: 3,
  },
];
