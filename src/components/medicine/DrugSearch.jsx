
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Pill, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const DrugSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState(null);

  const mockDrugDatabase = [
    {
      id: 1,
      name: "Aspirin",
      description: "Pain reliever and fever reducer",
      category: "NSAID",
      usedFor: ["Pain relief", "Fever reduction", "Anti-inflammatory"],
      sideEffects: ["Stomach upset", "Heartburn", "Nausea"],
      dosage: "325-650mg every 4-6 hours",
      warnings: ["Avoid if allergic to NSAIDs", "Consult doctor if pregnant"],
    },
    {
      id: 2,
      name: "Ibuprofen",
      description: "Anti-inflammatory medication",
      category: "NSAID",
      usedFor: ["Pain relief", "Inflammation", "Fever reduction"],
      sideEffects: ["Stomach pain", "Headache", "Dizziness"],
      dosage: "200-400mg every 4-6 hours",
      warnings: ["Do not exceed 1200mg per day", "Take with food"],
    },
  ];

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      toast({
        title: "Search term required",
        description: "Please enter a medicine name to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSelectedDrug(null);

    // Simulate API call
    setTimeout(() => {
      const results = mockDrugDatabase.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults(results);
      setIsLoading(false);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try searching with a different term",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search Complete",
          description: `Found ${results.length} matching medications`,
        });
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="flex items-center gap-2 mb-6">
        <Pill className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Drug Search</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search for medicines..."
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

      <div className="space-y-4">
        {searchResults.map((drug) => (
          <motion.div
            key={drug.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedDrug?.id === drug.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedDrug(drug)}
          >
            <h3 className="text-lg font-medium">{drug.name}</h3>
            <p className="text-gray-600">{drug.description}</p>
            
            {selectedDrug?.id === drug.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 space-y-3"
              >
                <div>
                  <h4 className="font-medium">Category</h4>
                  <p className="text-gray-600">{drug.category}</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Used For</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {drug.usedFor.map((use, index) => (
                      <li key={index}>{use}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Side Effects</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {drug.sideEffects.map((effect, index) => (
                      <li key={index}>{effect}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium">Dosage</h4>
                  <p className="text-gray-600">{drug.dosage}</p>
                </div>

                <div className="bg-yellow-50 p-3 rounded-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <h4 className="font-medium text-yellow-600">Warnings</h4>
                  </div>
                  <ul className="list-disc list-inside text-yellow-600 mt-1">
                    {drug.warnings.map((warning, index) => (
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

export default DrugSearch;
