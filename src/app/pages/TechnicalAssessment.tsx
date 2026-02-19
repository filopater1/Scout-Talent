import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BrainCircuit, Clock, Play, Check, AlertCircle, Terminal } from 'lucide-react';

export default function TechnicalAssessment() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [code, setCode] = useState(initialCode);
  const [testResults, setTestResults] = useState<{ passed: number; total: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRunTests = () => {
    // Simulate test execution
    setTimeout(() => {
      setTestResults({ passed: 8, total: 10 });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-full px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Hakeem</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="px-4 py-2">
                Question {currentQuestion + 1} of {questions.length}
              </Badge>
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg font-semibold">
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate('/applicant')}>
              Save & Exit
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Panel - Problem Description */}
        <div className="w-1/3 border-r bg-white overflow-y-auto p-6">
          <Tabs defaultValue="description">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {questions[currentQuestion].title}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <Badge className={getDifficultyColor(questions[currentQuestion].difficulty)}>
                    {questions[currentQuestion].difficulty}
                  </Badge>
                  <Badge variant="outline">{questions[currentQuestion].category}</Badge>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {questions[currentQuestion].description}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Constraints:</h3>
                <ul className="space-y-1 text-sm text-gray-700">
                  {questions[currentQuestion].constraints.map((constraint, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-gray-400">•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="examples" className="mt-6 space-y-4">
              {questions[currentQuestion].examples.map((example, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Example {idx + 1}:</p>
                    <div className="bg-gray-50 rounded p-3 font-mono text-sm space-y-2">
                      <div>
                        <span className="text-gray-600">Input: </span>
                        <span className="text-gray-900">{example.input}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Output: </span>
                        <span className="text-gray-900">{example.output}</span>
                      </div>
                      {example.explanation && (
                        <div>
                          <span className="text-gray-600">Explanation: </span>
                          <span className="text-gray-700">{example.explanation}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Editor Toolbar */}
          <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300">JavaScript</span>
            </div>
            <div className="flex items-center gap-3">
              {testResults && (
                <div className="flex items-center gap-2 text-sm">
                  <Badge className={testResults.passed === testResults.total ? 'bg-green-600' : 'bg-amber-600'}>
                    {testResults.passed}/{testResults.total} Tests Passed
                  </Badge>
                </div>
              )}
              <Button size="sm" variant="outline" onClick={handleRunTests} className="bg-transparent text-white hover:bg-gray-700">
                <Play className="w-4 h-4 mr-2" />
                Run Tests
              </Button>
              <Button size="sm" onClick={() => {
                if (currentQuestion < questions.length - 1) {
                  setCurrentQuestion(currentQuestion + 1);
                  setTestResults(null);
                } else {
                  navigate('/applicant');
                }
              }}>
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Submit Assessment'}
              </Button>
            </div>
          </div>

          {/* Code Editor Area */}
          <div className="flex-1 p-4">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-gray-900 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
              style={{ tabSize: 2 }}
              spellCheck={false}
            />
          </div>

          {/* Test Results Panel */}
          {testResults && (
            <div className="border-t border-gray-700 bg-gray-800">
              <div className="p-4">
                <h3 className="text-white font-semibold mb-3">Test Results</h3>
                <div className="space-y-2">
                  {Array.from({ length: testResults.total }, (_, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-sm">
                      {idx < testResults.passed ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={idx < testResults.passed ? 'text-green-500' : 'text-red-500'}>
                        Test Case {idx + 1}
                      </span>
                      {idx < testResults.passed ? (
                        <Badge className="ml-auto bg-green-600">Passed</Badge>
                      ) : (
                        <Badge className="ml-auto bg-red-600">Failed</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-amber-100 text-amber-800';
    case 'Hard':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const questions = [
  {
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1]'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ]
  },
  {
    title: 'Valid Parentheses',
    difficulty: 'Medium',
    category: 'Stacks',
    description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets in the correct order.',
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\''
    ],
    examples: [
      {
        input: 's = "()"',
        output: 'true'
      },
      {
        input: 's = "()[]{}"',
        output: 'true'
      },
      {
        input: 's = "(]"',
        output: 'false'
      }
    ]
  }
];

const initialCode = `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
    
};`;