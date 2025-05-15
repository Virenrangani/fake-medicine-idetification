
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Info, Loader2, AlertCircle, ThermometerSun, Activity } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DiseaseSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDisease, setSelectedDisease] = useState(null);

  const mockDiseaseDatabase = [
    {
      id: 1,
      name: "Common Cold",
      category: "Respiratory",
      severity: "Mild",
      description: "A viral infection of the upper respiratory tract",
      symptoms: ["Runny nose", "Sore throat", "Cough", "Congestion", "Slight body aches"],
      treatment: "Rest, fluids, and over-the-counter medications",
      prevention: [
        "Wash hands frequently",
        "Avoid close contact with infected people",
        "Maintain good hygiene",
      ],
      duration: "7-10 days",
      whenToSeeDoctor: [
        "Fever above 101.3°F (38.5°C)",
        "Symptoms lasting more than 10 days",
        "Severe sinus pain",
      ],
    },
    {
      id: 2,
      name: "Type 2 Diabetes",
      category: "Endocrine",
      severity: "Chronic",
      description: "A chronic condition affecting how the body processes blood sugar",
      symptoms: [
        "Increased thirst",
        "Frequent urination",
        "Increased hunger",
        "Fatigue",
        "Blurred vision",
      ],
      treatment: "Medication, diet control, regular exercise",
      prevention: [
        "Maintain healthy weight",
        "Regular exercise",
        "Balanced diet",
        "Regular check-ups",
      ],
      duration: "Chronic condition",
      whenToSeeDoctor: [
        "Frequent infections",
        "Slow-healing sores",
        "Numbness in hands or feet",
      ],
    },
    {
      id: 3,
      name: "Fever",
      category: "General",
      severity: "Varies",
      description: "An elevated body temperature often indicating infection or illness",
      symptoms: [
        "High body temperature (above 98.6°F/37°C)",
        "Sweating/chills",
        "Headache",
        "Muscle aches",
        "Loss of appetite",
        "Dehydration",
      ],
      treatment: "Rest, hydration, fever-reducing medications (if needed)",
      prevention: [
        "Maintain good hygiene",
        "Stay hydrated",
        "Get adequate rest",
        "Avoid contact with sick individuals",
      ],
      duration: "Usually 3-7 days depending on cause",
      whenToSeeDoctor: [
        "Temperature above 103°F (39.4°C)",
        "Fever lasting more than 3 days",
        "Severe headache",
        "Unusual skin rash",
        "Unusual sensitivity to bright light",
        "Stiff neck and pain when bending head forward",
      ],
    },
    {
      id: 4,
      name: "Lung Cancer",
      category: "Oncology",
      severity: "Severe",
      description: "A type of cancer that begins in the lungs and may spread to other parts of the body",
      symptoms: [
        "Persistent cough",
        "Coughing up blood",
        "Chest pain",
        "Shortness of breath",
        "Hoarseness",
        "Unexplained weight loss",
        "Bone pain",
        "Headache",
      ],
      treatment: "May include surgery, chemotherapy, radiation therapy, targeted drug therapy, or immunotherapy",
      prevention: [
        "Don't smoke or quit smoking",
        "Avoid secondhand smoke",
        "Test home for radon",
        "Avoid carcinogen exposure",
        "Maintain a healthy diet",
      ],
      duration: "Varies based on stage and treatment",
      whenToSeeDoctor: [
        "Persistent cough",
        "Chest pain",
        "Shortness of breath",
        "Unexplained weight loss",
        "Coughing up blood",
      ],
    },
    {
      id: 5,
      name: "Breast Cancer",
      category: "Oncology",
      severity: "Severe",
      description: "Cancer that forms in the cells of the breasts",
      symptoms: [
        "Lump in breast or underarm",
        "Changes in breast size or shape",
        "Skin changes on breast",
        "Nipple discharge",
        "Breast pain",
      ],
      treatment: "Surgery, radiation therapy, chemotherapy, hormone therapy, targeted therapy",
      prevention: [
        "Regular mammograms",
        "Maintain healthy weight",
        "Regular exercise",
        "Limit alcohol consumption",
        "Breast self-exams",
      ],
      duration: "Varies based on stage and treatment",
      whenToSeeDoctor: [
        "Any breast changes",
        "Lumps or thickening",
        "Skin changes",
        "Nipple changes",
        "Unusual discharge",
      ],
    }
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search term required",
        description: "Please enter a disease name or symptom to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSelectedDisease(null);

    // Simulate API call with improved search
    setTimeout(() => {
      const searchTermLower = searchTerm.toLowerCase();
      const results = mockDiseaseDatabase.filter(disease => {
        // Search in name, description, and symptoms
        return (
          disease.name.toLowerCase().includes(searchTermLower) ||
          disease.description.toLowerCase().includes(searchTermLower) ||
          disease.category.toLowerCase().includes(searchTermLower) ||
          disease.symptoms.some(symptom => 
            symptom.toLowerCase().includes(searchTermLower)
          )
        );
      });
      
      setResults(results);
      setIsLoading(false);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try searching with different terms or symptoms",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} matching conditions`,
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'severe':
        return 'bg-red-100 text-red-800';
      case 'chronic':
        return 'bg-purple-100 text-purple-800';
      case 'varies':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <Info className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Disease Information</h2>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by disease name, category, or symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border rounded focus:ring-2 focus:ring-primary/50"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </div>
        <p className="text-sm text-gray-500">
          Try searching for specific diseases, symptoms, or categories like "cancer", "fever", "headache", etc.
        </p>
      </div>

      <div className="space-y-4">
        {results.map((disease) => (
          <motion.div
            key={disease.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedDisease?.id === disease.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedDisease(disease)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">{disease.name}</h3>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(disease.severity)}`}>
                  {disease.severity}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {disease.category}
                </span>
              </div>
            </div>
            <p className="text-gray-600">{disease.description}</p>
            
            {selectedDisease?.id === disease.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-4"
              >
                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <ThermometerSun className="h-4 w-4 text-orange-500" />
                    Symptoms
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {disease.symptoms.map((symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-500" />
                    Treatment
                  </h4>
                  <p className="text-gray-600">{disease.treatment}</p>
                </div>

                <div>
                  <h4 className="font-medium">Prevention</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {disease.prevention.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Duration</h4>
                  <p className="text-gray-600">{disease.duration}</p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-600">When to See a Doctor</h4>
                  </div>
                  <ul className="list-disc list-inside text-yellow-600 mt-1">
                    {disease.whenToSeeDoctor.map((warning, index) => (
                      <li key={index}>{warning}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default DiseaseSearch;
